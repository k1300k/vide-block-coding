import { Octokit } from '@octokit/rest';

interface RepositoryInfo {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  createdAt: string;
}

interface ComponentFile {
  name: string;
  path: string;
  type: string;
  url?: string;
  downloadUrl?: string | null;
}

interface Configuration {
  filename: string;
  content?: string;
  type: string;
  settings?: Record<string, any>;
}

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  /**
   * GitHub 저장소를 스캔하여 재사용 가능한 컴포넌트를 추출합니다.
   */
  async scanRepository(owner: string, repo: string) {
    try {
      // 저장소 기본 정보 조회
      const { data: repository } = await this.octokit.repos.get({ owner, repo });
      
      // 인증 관련 파일 스캔
      const authComponents = await this.scanForAuthComponents(owner, repo);
      
      // UI 컴포넌트 스캔
      const uiComponents = await this.scanForUIComponents(owner, repo);
      
      // 설정 파일 스캔
      const configurations = await this.scanForConfigurations(owner, repo);

      return {
        repository: {
          name: repository.name,
          fullName: repository.full_name,
          description: repository.description,
          language: repository.language,
          createdAt: repository.created_at
        } as RepositoryInfo,
        components: {
          auth: authComponents,
          ui: uiComponents
        },
        configurations
      };
    } catch (error) {
      throw new Error(`Failed to scan repository: ${error}`);
    }
  }

  /**
   * 인증 관련 컴포넌트를 검색합니다.
   */
  private async scanForAuthComponents(owner: string, repo: string): Promise<ComponentFile[]> {
    const authFiles: ComponentFile[] = [];
    const searchTerms = ['auth', 'login', 'oauth', 'jwt', 'session'];
    
    for (const term of searchTerms) {
      try {
        const { data } = await this.octokit.search.code({
          q: `${term} repo:${owner}/${repo} extension:tsx extension:ts extension:jsx extension:js`,
          per_page: 5
        });
        
        authFiles.push(...data.items.map(item => ({
          name: item.name,
          path: item.path,
          type: this.determineAuthType(item.name, item.path),
          url: item.html_url
        })));
      } catch (error) {
        console.warn(`Search failed for term ${term}:`, error);
      }
    }
    
    return this.deduplicateFiles(authFiles);
  }

  /**
   * UI 컴포넌트를 검색합니다.
   */
  private async scanForUIComponents(owner: string, repo: string): Promise<ComponentFile[]> {
    try {
      // src/components 디렉토리 스캔
      const { data: contents } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: 'src/components'
      });

      if (Array.isArray(contents)) {
        const componentFiles = contents
          .filter(file => 
            file.type === 'file' && 
            (file.name.endsWith('.tsx') || file.name.endsWith('.jsx'))
          )
          .map(file => ({
            name: file.name.replace(/\.(tsx|jsx)$/, ''),
            path: file.path,
            type: 'ui-component',
            downloadUrl: 'download_url' in file ? file.download_url : undefined
          }));

        return componentFiles;
      }
    } catch (error) {
      console.warn('No components directory found:', error);
    }
    
    return [];
  }

  /**
   * 설정 파일을 검색합니다.
   */
  private async scanForConfigurations(owner: string, repo: string): Promise<Configuration[]> {
    const configFiles = [
      '.env.example',
      'package.json',
      'next.config.js',
      'vite.config.ts',
      'tailwind.config.js'
    ];

    const configurations: Configuration[] = [];

    for (const filename of configFiles) {
      try {
        const { data } = await this.octokit.repos.getContent({
          owner,
          repo,
          path: filename
        });

        if ('content' in data) {
          configurations.push({
            filename,
            content: Buffer.from(data.content, 'base64').toString(),
            type: this.determineConfigType(filename)
          });
        }
      } catch (error) {
        // 파일이 없는 경우 무시
      }
    }

    return configurations;
  }

  /**
   * 인증 타입을 결정합니다.
   */
  private determineAuthType(name: string, path: string): string {
    const content = (name + path).toLowerCase();
    
    if (content.includes('oauth')) return 'oauth';
    if (content.includes('jwt')) return 'jwt';
    if (content.includes('session')) return 'session';
    if (content.includes('login')) return 'login';
    
    return 'authentication';
  }

  /**
   * 설정 타입을 결정합니다.
   */
  private determineConfigType(filename: string): string {
    if (filename.includes('env')) return 'environment';
    if (filename.includes('package')) return 'dependencies';
    if (filename.includes('next') || filename.includes('vite')) return 'build';
    if (filename.includes('tailwind')) return 'styling';
    
    return 'configuration';
  }

  /**
   * 중복 파일을 제거합니다.
   */
  private deduplicateFiles(files: ComponentFile[]): ComponentFile[] {
    const seen = new Set<string>();
    return files.filter(file => {
      const key = file.path;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * GitHub Actions 워크플로우를 생성합니다.
   */
  async createDeploymentWorkflow(
    owner: string, 
    repo: string, 
    config: { platform?: string; env?: Record<string, string> }
  ) {
    const workflowContent = this.generateWorkflowYAML(config);
    
    try {
      await this.octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: '.github/workflows/ai-vibe-deploy.yml',
        message: 'Add AI Vibe auto-deployment workflow',
        content: Buffer.from(workflowContent).toString('base64')
      });

      return { 
        success: true, 
        path: '.github/workflows/ai-vibe-deploy.yml',
        url: `https://github.com/${owner}/${repo}/blob/main/.github/workflows/ai-vibe-deploy.yml`
      };
    } catch (error) {
      throw new Error(`Failed to create workflow: ${error}`);
    }
  }

  /**
   * GitHub Actions YAML 파일을 생성합니다.
   */
  private generateWorkflowYAML(config: { platform?: string; env?: Record<string, string> }): string {
    const envVars = config.env || {};
    const envSection = Object.keys(envVars).length > 0
      ? Object.keys(envVars)
          .map(key => `        ${key}: \${{ secrets.${key} }}`)
          .join('\n')
      : '';

    return `name: AI Vibe Auto Deploy

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test --if-present
    
    - name: Build application
      run: npm run build
      env:
        NODE_ENV: production
${envSection}
    
    - name: Deploy to ${config.platform || 'Vercel'}
      run: |
        ${this.generateDeploymentCommands(config)}
`.trim();
  }

  /**
   * 배포 명령어를 생성합니다.
   */
  private generateDeploymentCommands(config: { platform?: string }): string {
    switch (config.platform) {
      case 'vercel':
        return 'npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}';
      case 'netlify':
        return 'npx netlify deploy --prod --auth ${{ secrets.NETLIFY_AUTH_TOKEN }}';
      case 'github-pages':
        return 'npm run deploy';
      default:
        return 'echo "Custom deployment commands here"';
    }
  }
}

