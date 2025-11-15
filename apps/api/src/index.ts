import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { PrismaClient } from '@ai-vibe/db';
import { z } from 'zod';
import 'dotenv/config';

export const app = Fastify({ logger: true });
const prisma = new PrismaClient();

// Plugin 등록
await app.register(cors, { origin: true });
await app.register(sensible);

// Health check
app.get('/health', async () => ({ 
  ok: true, 
  timestamp: new Date().toISOString() 
}));

// ========================================
// Authentication APIs
// ========================================

const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요')
});

app.post('/auth/login', async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);
    
    // 기본 Organization 조회 또는 생성
    let org = await prisma.organization.findFirst();
    if (!org) {
      org = await prisma.organization.create({ 
        data: { name: 'Default Organization' }
      });
    }
    
    // 사용자 조회 또는 생성
    let user = await prisma.user.findUnique({ 
      where: { email: body.email }
    });
    if (!user) {
      user = await prisma.user.create({ 
        data: { 
          email: body.email, 
          orgId: org.id 
        }
      });
    }
    
    return { 
      token: body.email, 
      user, 
      organization: org 
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    throw error;
  }
});

// ========================================
// Profile Management APIs
// ========================================

app.get('/profiles', async (req, res) => {
  try {
    const org = await prisma.organization.findFirstOrThrow();
    const profiles = await prisma.profile.findMany({ 
      where: { orgId: org.id },
      orderBy: { createdAt: 'desc' }
    });
    return { data: profiles };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Organization not found' 
    });
  }
});

const createProfileSchema = z.object({
  name: z.string().min(1, '프로필 이름은 필수입니다'),
  type: z.enum(['github', 'database', 'ai', 'cloud', 'ui'], {
    errorMap: () => ({ message: '유효한 프로필 타입을 선택해주세요' })
  }),
  configuration: z.record(z.any())
});

app.post('/profiles', async (req, res) => {
  try {
    const org = await prisma.organization.findFirstOrThrow();
    const body = createProfileSchema.parse(req.body);
    
    const profile = await prisma.profile.create({ 
      data: { 
        orgId: org.id, 
        name: body.name,
        type: body.type,
        configuration: body.configuration 
      }
    });
    
    return { profile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    return res.code(404).send({ 
      error: 'Organization not found' 
    });
  }
});

app.get('/profiles/:id', async (req, res) => {
  const { id } = req.params as { id: string };
  
  try {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: { id }
    });
    return { profile };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Profile not found' 
    });
  }
});

app.put('/profiles/:id', async (req, res) => {
  const { id } = req.params as { id: string };
  
  try {
    const body = createProfileSchema.partial().parse(req.body);
    
    const profile = await prisma.profile.update({
      where: { id },
      data: body
    });
    
    return { profile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    return res.code(404).send({ 
      error: 'Profile not found' 
    });
  }
});

app.delete('/profiles/:id', async (req, res) => {
  const { id } = req.params as { id: string };
  
  try {
    await prisma.profile.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Profile not found' 
    });
  }
});

// ========================================
// Project Management APIs
// ========================================

const createProjectSchema = z.object({
  name: z.string().min(1, '프로젝트 이름은 필수입니다'),
  description: z.string().optional()
});

app.get('/projects', async (req, res) => {
  try {
    const org = await prisma.organization.findFirstOrThrow();
    const projects = await prisma.project.findMany({
      where: { orgId: org.id },
      orderBy: { createdAt: 'desc' },
      include: {
        workflows: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    return { data: projects };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Organization not found' 
    });
  }
});

app.post('/projects', async (req, res) => {
  try {
    const org = await prisma.organization.findFirstOrThrow();
    const body = createProjectSchema.parse(req.body);
    
    const project = await prisma.project.create({ 
      data: { 
        orgId: org.id, 
        ...body 
      }
    });
    
    return { project };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    return res.code(404).send({ 
      error: 'Organization not found' 
    });
  }
});

app.get('/projects/:id', async (req, res) => {
  const { id } = req.params as { id: string };
  
  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: { id },
      include: {
        workflows: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    return { project };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Project not found' 
    });
  }
});

// ========================================
// Workflow Management APIs
// ========================================

const createWorkflowSchema = z.object({
  projectId: z.string().min(1, '프로젝트 ID는 필수입니다'),
  definition: z.any() // React Flow structure
});

app.post('/workflows', async (req, res) => {
  try {
    const body = createWorkflowSchema.parse(req.body);
    
    const workflow = await prisma.workflow.create({ 
      data: { 
        projectId: body.projectId, 
        definition: body.definition 
      }
    });
    
    return { workflow };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    throw error;
  }
});

app.get('/workflows/:id', async (req, res) => {
  const { id } = req.params as { id: string };
  
  try {
    const workflow = await prisma.workflow.findUniqueOrThrow({
      where: { id },
      include: {
        project: true,
        executions: {
          orderBy: { startedAt: 'desc' },
          take: 10
        }
      }
    });
    return { workflow };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Workflow not found' 
    });
  }
});

app.post('/workflows/:id/execute', async (req, res) => {
  const { id } = req.params as { id: string };
  
  try {
    const workflow = await prisma.workflow.findUniqueOrThrow({
      where: { id },
      include: { project: true }
    });
    
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId: id,
        status: 'running',
        logs: { message: 'Workflow execution started' }
      }
    });
    
    // Mock execution logic - 실제로는 워크플로우 실행 엔진이 처리
    setTimeout(async () => {
      await prisma.workflowExecution.update({
        where: { id: execution.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
          logs: { 
            message: 'Workflow completed successfully',
            steps: [
              { stage: 'intro', status: 'completed', duration: 500 },
              { stage: 'contents', status: 'completed', duration: 1200 },
              { stage: 'deploy', status: 'completed', duration: 300 }
            ]
          }
        }
      });
    }, 2000);
    
    return { execution };
  } catch (error) {
    return res.code(404).send({ 
      error: 'Workflow not found' 
    });
  }
});

// ========================================
// AI Integration APIs (Mock)
// ========================================

const aiRunSchema = z.object({
  prompt: z.string().min(1, '프롬프트는 필수입니다'),
  model: z.string().default('gpt-4')
});

app.post('/ai/run', async (req, res) => {
  try {
    const body = aiRunSchema.parse(req.body);
    
    // Mock response for development
    const mockResponse = `Mock AI response for prompt: "${body.prompt.substring(0, 50)}..." using model: ${body.model}
    
이것은 개발 환경에서 사용되는 모의 응답입니다. 
실제 배포 시에는 ${body.model} API를 호출합니다.`;
    
    return { 
      output: mockResponse,
      model: body.model,
      usage: { 
        tokens: 150, 
        cost: 0.003 
      }
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    throw error;
  }
});

// ========================================
// GitHub Integration APIs (Mock)
// ========================================

const githubScanSchema = z.object({
  repository: z.string().min(1, '저장소 이름은 필수입니다'),
  owner: z.string().min(1, '소유자 이름은 필수입니다')
});

app.post('/integrations/github/scan', async (req, res) => {
  try {
    const body = githubScanSchema.parse(req.body);
    
    // Mock repository scan results
    return {
      repository: `${body.owner}/${body.repository}`,
      scannedAt: new Date().toISOString(),
      components: [
        {
          name: 'LoginComponent',
          type: 'auth',
          path: 'src/components/Login.tsx',
          reusable: true,
          description: 'OAuth 2.0 기반 로그인 컴포넌트'
        },
        {
          name: 'NavBar',
          type: 'ui',
          path: 'src/components/NavBar.tsx',
          reusable: true,
          description: '반응형 네비게이션 바'
        },
        {
          name: 'Footer',
          type: 'ui',
          path: 'src/components/Footer.tsx',
          reusable: true,
          description: '소셜 미디어 링크가 포함된 푸터'
        }
      ],
      configurations: [
        {
          type: 'environment',
          file: '.env.example',
          variables: ['DATABASE_URL', 'API_KEY', 'NEXTAUTH_SECRET']
        },
        {
          type: 'build',
          file: 'next.config.js',
          settings: { typescript: true, tailwind: true }
        }
      ]
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.code(400).send({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    throw error;
  }
});

// ========================================
// Component Library APIs
// ========================================

app.get('/components', async (req, res) => {
  const { category } = req.query as { category?: string };
  
  const where = category ? { category } : {};
  
  const components = await prisma.component.findMany({
    where: { ...where, isPublic: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return { data: components };
});

// 서버 시작
export const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
    const host = process.env.HOST || '0.0.0.0';
    
    await app.listen({ port, host });
    
    console.log(`
🚀 API Server running at http://${host}:${port}
📊 Health check: http://${host}:${port}/health
    `);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// 기본 동작: 직접 실행할 때(로컬 개발 등)만 HTTP 서버를 시작합니다.
// Vercel 같은 환경에서 이 모듈을 import하려면 `START_HTTP=false`로 설정하세요.
if (process.env.START_HTTP !== 'false') {
  start();
}

