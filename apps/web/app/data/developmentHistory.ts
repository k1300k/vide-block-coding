export interface Feature {
  text: string;
}

export interface CreditInfo {
  v0?: string;
  lovable?: string;
  cursor?: string;
  other?: string;
}

export interface Version {
  id: string;
  version: string;
  title: string;
  credits: CreditInfo;
  description: string;
  userPrompt: string;
  features: Feature[];
  impact: string;
}

export const developmentHistory: Version[] = [
  {
    id: 'v1.0',
    version: 'v1.0',
    title: 'MVP 프로젝트 구조 및 기초 구현',
    credits: { v0: '~100 credits' },
    description: 'Monorepo 기반 프로젝트 초기화 및 핵심 아키텍처 구성',
    userPrompt: `너는 15년차 서비스기획 전문가 겸 풀스택 개발자야. AI 개발자들이 반복적인 설정 작업에서 벗어나 핵심 프롬프트 개발에 집중할 수 있도록 하는 3단계 워크플로우 자동화 플랫폼을 만들려고 해. 첫 번째 단계는 프로젝트 구조 설정이야. pnpm 워크스페이스를 이용한 Monorepo 구조로 설계해주고, TypeScript strict mode, Prisma 기반 데이터베이스 스키마, Fastify 백엔드 API 서버, Next.js 프론트엔드를 구성해 주세요.`,
    features: [
      { text: 'pnpm 워크스페이스 기반 Monorepo 구조' },
      { text: 'TypeScript strict mode 설정' },
      { text: 'Prisma + PostgreSQL 데이터베이스 스키마 (8개 모델)' },
      { text: 'Fastify + Zod 기반 API 서버 (11개 엔드포인트)' },
      { text: 'Next.js 15 App Router 프론트엔드' },
      { text: 'Docker Compose 설정' },
      { text: '.cursorrules AI 개발 가이드' },
    ],
    impact: 'AI 워크플로우 자동화 플랫폼의 견고한 기초 구축 완료',
  },
  {
    id: 'v1.1',
    version: 'v1.1',
    title: 'React Flow 워크플로우 빌더 UI',
    credits: { lovable: '~80 credits' },
    description: '드래그 앤 드롭 방식의 3단계 워크플로우 시각화 구현',
    userPrompt: `사용자 질의 1: 사용자들이 직관적으로 워크플로우를 구성할 수 있도록 드래그 앤 드롭 기반 캔버스를 만들어 주세요. → 개선: React Flow 라이브러리를 사용해서 3단계(Intro, Contents, Deploy)로 워크플로우를 시각화해 주세요. 각 단계별로 색상을 다르게 표시해 주세요.`,
    features: [
      { text: 'React Flow 기반 드래그 앤 드롭 캔버스' },
      { text: '3단계 워크플로우 시각화 (Intro/Contents/Deploy)' },
      { text: '9개 컴포넌트 라이브러리 (GitHub Auth, Prompt Editor, Database Setup 등)' },
      { text: '단계별 색상 테마 (녹색/파란색/분홍색)' },
      { text: 'MiniMap 및 Controls 기능' },
      { text: '노드 연결 및 자동 애니메이션' },
      { text: '워크플로우 저장 및 실행 기능' },
    ],
    impact: '사용자가 시각적으로 AI 워크플로우를 설계하고 구성할 수 있는 인터페이스 완성',
  },
  {
    id: 'v1.2',
    version: 'v1.2',
    title: 'GitHub 통합 및 자동화',
    credits: { cursor: '~70 credits' },
    description: 'GitHub API를 통한 저장소 스캔 및 CI/CD 자동화',
    userPrompt: `사용자 질의 1: 사용자의 GitHub 저장소에서 기존 코드를 자동으로 감지해서 재사용할 수 있도록 만들어 주세요. → 개선: Octokit을 사용해서 인증 컴포넌트, UI 컴포넌트, 설정 파일을 자동으로 추출해 주세요. → 사용자 질의 2: GitHub Actions 워크플로우도 자동 생성할 수 있나요? → 응답: 배포 플랫폼(Vercel, Netlify, GitHub Pages)을 지원하도록 자동 생성 기능 구현`,
    features: [
      { text: 'Octokit 기반 GitHub API v4 연동' },
      { text: '인증 컴포넌트 자동 감지 및 추출' },
      { text: 'UI 컴포넌트 분석 및 라이브러리화' },
      { text: '설정 파일 자동 감지' },
      { text: 'GitHub Actions 워크플로우 자동 생성' },
      { text: 'Vercel, Netlify, GitHub Pages 배포 지원' },
      { text: 'CI/CD 파이프라인 자동 구성' },
    ],
    impact: '기존 GitHub 저장소의 자산을 자동으로 재사용하고 배포 파이프라인을 즉시 구성 가능',
  },
  {
    id: 'v1.3',
    version: 'v1.3',
    title: 'Monaco 기반 고급 프롬프트 에디터',
    credits: { lovable: '~90 credits' },
    description: 'VS Code 수준의 프롬프트 편집 경험 및 AI 모델 통합',
    userPrompt: `사용자 질의 1: 프롬프트 개발에 집중할 수 있도록 VS Code 같은 편집 환경을 제공해 주세요. → 개선: Monaco Editor를 사용해서 구문 강조, 변수 지원, 실시간 테스트를 구현해 주세요. → 사용자 질의 2: 여러 AI 모델을 동시에 테스트하고 비교할 수 있으면 좋겠어요. → 응답: GPT-4, Claude 3, Gemini Pro 등 다양한 모델 선택과 비교 기능 추가`,
    features: [
      { text: 'Monaco Editor 기반 전문가 편집 환경' },
      { text: '문법 강조 및 자동 완성' },
      { text: '변수 템플릿 지원 ({{variable}})' },
      { text: '4개 AI 모델 선택 가능 (GPT-4, GPT-3.5, Claude 3, Gemini Pro)' },
      { text: '실시간 프롬프트 테스트' },
      { text: '로컬 저장 및 불러오기' },
      { text: '통계 표시 (라인, 문자, 단어 수)' },
      { text: '결과 복사 및 공유' },
    ],
    impact: 'AI 엔지니어들이 효율적으로 프롬프트를 개발하고 최적화할 수 있는 전문 도구 완성',
  },
  {
    id: 'v1.4',
    version: 'v1.4',
    title: 'Vercel 배포 및 프로젝트 정보 페이지',
    credits: { cursor: '~60 credits' },
    description: '클라우드 배포 최적화 및 개발 이력 문서화',
    userPrompt: `사용자 질의 1: Vercel에 배포가 잘 되도록 최적화해 주세요. npm registry 문제를 해결하고 Monorepo 빌드도 지원해 주세요. → 개선: .npmrc, .nvmrc 설정, vercel.json 구성, Node 22 엔진 설정 → 사용자 질의 2: 프로젝트가 어떻게 개선되었는지 추적할 수 있는 정보 페이지를 만들어 주세요. → 응답: 개발 이력, 프롬프트 질의, 사용 크레딧을 기록하고 시각화하는 정보 모달 구현`,
    features: [
      { text: 'Vercel 배포 최적화 (.npmrc, .nvmrc 설정)' },
      { text: 'npm registry 안정성 개선 (타임아웃, 재시도 설정)' },
      { text: 'Node 22 엔진 호환성 설정' },
      { text: 'Monorepo 빌드 파이프라인 구성' },
      { text: '프로젝트 정보 모달 (헤더 ℹ️ 버튼)' },
      { text: '개발 버전 이력 전체 표시 (v1.0 ~ v1.4)' },
      { text: '각 버전별 실제 사용자 프롬프트 기록' },
      { text: 'AI 솔루션별 크레딧 사용량 추적' },
    ],
    impact: 'Vercel 클라우드에 안정적으로 배포되며, 프로젝트의 진화 과정과 각 버전의 개선사항을 명확하게 추적 가능',
  },
];

export const serviceInfo = {
  title: 'AI Vibe Workflow',
  subtitle: 'AI 개발자를 위한 3단계 워크플로우 자동화 플랫폼',
  description: '반복적인 설정 작업에서 벗어나 핵심 프롬프트 개발에 집중하세요. Intro(초기화) → Contents(개발) → Deploy(배포)의 3단계로 AI 앱 개발을 자동화합니다.',
  workflow: [
    { stage: '🚀 Intro', description: '기존 자산 재활용으로 프로젝트 초기화 자동화' },
    { stage: '✏️ Contents', description: '프롬프트 개발, AI 모델 비교, 고급 편집 환경' },
    { stage: '🔧 Deploy', description: 'GitHub, 데이터베이스, 클라우드 배포 자동화' },
  ],
  goals: [
    { icon: '⚡', text: '프로젝트 설정 시간 60% 단축 (30분 → 12분)' },
    { icon: '♻️', text: '기존 자산 재사용률 70% 달성' },
    { icon: '💰', text: 'AI 크레딧 30% 절감' },
    { icon: '🎯', text: '프롬프트 개발에 집중 가능한 환경' },
  ],
  totalVersions: developmentHistory.length,
  getCreditsSummary: () => {
    const creditsMap: { [key: string]: number } = {};
    
    developmentHistory.forEach((version) => {
      if (version.credits.v0) {
        creditsMap['V0'] = (creditsMap['V0'] || 0) + parseInt(version.credits.v0);
      }
      if (version.credits.lovable) {
        creditsMap['Lovable'] = (creditsMap['Lovable'] || 0) + parseInt(version.credits.lovable);
      }
      if (version.credits.cursor) {
        creditsMap['Cursor'] = (creditsMap['Cursor'] || 0) + parseInt(version.credits.cursor);
      }
      if (version.credits.other) {
        creditsMap['Other'] = (creditsMap['Other'] || 0) + parseInt(version.credits.other);
      }
    });
    
    return creditsMap;
  },
  developmentMethod: 'AI 바이브 코딩 프롬프트 방식',
};
