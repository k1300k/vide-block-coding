# 📂 AI Vibe Workflow - 프로젝트 구조

## 전체 구조 개요

```
ai-vibe-workflow/
├── 📱 apps/                    # 애플리케이션
│   ├── 🔌 api/                # Fastify 백엔드 API
│   │   ├── src/
│   │   │   ├── index.ts              # API 서버 진입점
│   │   │   └── services/
│   │   │       └── github.service.ts # GitHub 통합 서비스
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── 🌐 web/                # Next.js 프론트엔드
│       ├── app/
│       │   ├── builder/              # 워크플로우 빌더
│       │   │   └── page.tsx
│       │   ├── editor/               # 프롬프트 에디터
│       │   │   └── page.tsx
│       │   ├── layout.tsx            # 루트 레이아웃
│       │   ├── page.tsx              # 홈페이지
│       │   └── globals.css           # 전역 스타일
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── package.json
│       └── tsconfig.json
│
├── 📦 packages/               # 공유 패키지
│   └── 🗄️ db/                # Prisma 데이터베이스
│       ├── prisma/
│       │   └── schema.prisma         # 데이터베이스 스키마
│       ├── index.ts                  # Prisma 클라이언트 export
│       ├── package.json
│       └── tsconfig.json
│
├── 🐳 docker-compose.yml      # Docker Compose 설정
├── 📝 .cursorrules            # Cursor AI 개발 가이드
├── 🚫 .gitignore             # Git ignore 설정
├── 🔧 Makefile               # Make 명령어 모음
├── 📄 package.json           # 루트 패키지 설정 (monorepo)
├── 🔗 pnpm-workspace.yaml    # pnpm 워크스페이스 설정
│
├── 📚 문서/
│   ├── README.md             # 프로젝트 개요
│   ├── QUICKSTART.md         # 빠른 시작 가이드
│   ├── SETUP.md              # 상세 설치 가이드
│   ├── PROJECT_STRUCTURE.md  # 이 문서
│   └── prd.mdc               # Product Requirements Document
│
└── ⚙️ .github/
    └── workflows/
        └── ci.yml            # GitHub Actions CI 파이프라인

```

## 상세 구조 설명

### 🔌 Backend API (`apps/api/`)

**역할**: RESTful API 서버, 비즈니스 로직 처리

**기술 스택**:
- Fastify (웹 프레임워크)
- Zod (스키마 검증)
- Prisma (ORM)
- TypeScript

**주요 파일**:
- `src/index.ts`: API 라우트 정의, 서버 설정
- `src/services/github.service.ts`: GitHub API 통합 로직

**API 엔드포인트**:
```
POST   /auth/login                    # 로그인
GET    /profiles                      # 프로필 목록
POST   /profiles                      # 프로필 생성
GET    /projects                      # 프로젝트 목록
POST   /projects                      # 프로젝트 생성
POST   /workflows                     # 워크플로우 생성
POST   /workflows/:id/execute         # 워크플로우 실행
POST   /ai/run                        # AI 프롬프트 실행
POST   /integrations/github/scan      # GitHub 저장소 스캔
GET    /components                    # 컴포넌트 목록
```

### 🌐 Frontend Web (`apps/web/`)

**역할**: 사용자 인터페이스, 워크플로우 빌더, 프롬프트 에디터

**기술 스택**:
- Next.js 15 (React 프레임워크)
- React Flow (워크플로우 시각화)
- Monaco Editor (코드 에디터)
- Tailwind CSS (스타일링)
- TypeScript

**주요 페이지**:
- `/` - 홈페이지 (랜딩)
- `/builder` - 워크플로우 빌더 (드래그 앤 드롭)
- `/editor` - 프롬프트 에디터 (Monaco)

**컴포넌트 구조**:
```
app/
├── layout.tsx          # 전역 레이아웃 (메타데이터, 폰트)
├── page.tsx            # 홈페이지
├── globals.css         # Tailwind 설정 및 전역 스타일
├── builder/
│   └── page.tsx        # 워크플로우 빌더 (React Flow)
└── editor/
    └── page.tsx        # 프롬프트 에디터 (Monaco)
```

### 🗄️ Database (`packages/db/`)

**역할**: 데이터베이스 스키마 정의 및 Prisma 클라이언트

**기술 스택**:
- Prisma (ORM)
- PostgreSQL (데이터베이스)

**데이터 모델**:
```
Organization    # 조직
User            # 사용자
Project         # 프로젝트
Workflow        # 워크플로우
WorkflowExecution # 워크플로우 실행 기록
Profile         # 재사용 프로필 (GitHub, DB, AI 설정)
Component       # 컴포넌트 라이브러리
Integration     # 외부 서비스 연동
```

**관계도**:
```
Organization
├── User[]
├── Project[]
└── Profile[]

Project
└── Workflow[]
    └── WorkflowExecution[]

User
└── Profile[]
```

## 워크플로우 실행 흐름

```
1. 사용자 → Frontend (/builder)
   ↓ 워크플로우 구성 (드래그 앤 드롭)

2. Frontend → Backend API (POST /workflows)
   ↓ 워크플로우 정의 저장

3. 사용자 → 실행 버튼 클릭
   ↓

4. Frontend → Backend API (POST /workflows/:id/execute)
   ↓ WorkflowExecution 생성

5. Backend → Workflow Engine (비동기)
   ├── Intro 단계 실행
   ├── Contents 단계 실행
   └── Deploy 단계 실행

6. Backend → Database (WorkflowExecution 상태 업데이트)
   ↓ 'running' → 'completed' / 'failed'

7. Frontend ← Backend (실행 결과 조회)
```

## 데이터 흐름

```
┌──────────────┐
│   Browser    │ 
│  (React)     │
└──────┬───────┘
       │ HTTP/REST
       ↓
┌──────────────┐
│   Next.js    │
│   Server     │
└──────┬───────┘
       │ API Call
       ↓
┌──────────────┐
│   Fastify    │
│   API Server │
└──────┬───────┘
       │ Prisma
       ↓
┌──────────────┐
│  PostgreSQL  │
│   Database   │
└──────────────┘
```

## 개발 워크플로우

### 로컬 개발

```bash
# 1. 의존성 설치
pnpm install

# 2. 데이터베이스 시작
docker-compose up -d db

# 3. 스키마 동기화
pnpm db:push

# 4. 개발 서버 실행 (병렬)
pnpm dev
# → apps/api: http://localhost:4000
# → apps/web: http://localhost:3000
```

### Docker 개발

```bash
# 전체 스택 시작
docker-compose up -d

# 특정 서비스만
docker-compose up -d db backend
```

### CI/CD 파이프라인

```
GitHub Push/PR
    ↓
GitHub Actions
    ├── Lint & Type Check
    ├── Run Tests
    └── Build
        ↓
    Deploy (Manual)
```

## 환경 변수 구조

### Backend (`apps/api/.env`)
```env
DATABASE_URL=postgresql://...
GITHUB_TOKEN=ghp_...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 빌드 출력

```
apps/
├── api/
│   └── dist/              # TypeScript → JavaScript
│       └── index.js
│
└── web/
    └── .next/             # Next.js 빌드
        ├── static/
        ├── server/
        └── standalone/
```

## Docker 이미지 계층

### Backend API
```
node:18-alpine
├── pnpm install
├── Prisma generate
├── TypeScript build
└── dist/ (production)
```

### Frontend Web
```
node:18-alpine
├── pnpm install
├── Next.js build
└── .next/standalone/ (production)
```

## 성능 최적화 전략

### Backend
- ✅ Fastify (고성능 웹 프레임워크)
- ✅ Prisma Connection Pooling
- ✅ Zod 스키마 캐싱

### Frontend
- ✅ Next.js 15 App Router (RSC)
- ✅ Code Splitting (자동)
- ✅ Image Optimization
- ✅ Tailwind CSS Purging

### Database
- ✅ PostgreSQL 인덱스
- ✅ Prisma Query 최적화
- ✅ Connection Pooling

## 확장 가능성

### 신규 API 추가
```typescript
// apps/api/src/index.ts
app.post('/new-endpoint', async (req, res) => {
  const body = schema.parse(req.body);
  // 로직 구현
  return { result };
});
```

### 신규 페이지 추가
```typescript
// apps/web/app/new-page/page.tsx
export default function NewPage() {
  return <div>New Feature</div>;
}
```

### 신규 서비스 추가
```typescript
// apps/api/src/services/new.service.ts
export class NewService {
  async doSomething() {
    // 서비스 로직
  }
}
```

## 보안 고려사항

- ✅ Zod 입력 검증 (모든 API)
- ✅ CORS 설정 (Fastify)
- ✅ 환경 변수 암호화 (민감 정보)
- ✅ JWT 인증 (예정)
- ✅ HTTPS/TLS (프로덕션)

## 테스트 전략

### 단위 테스트
```bash
# 서비스 로직 테스트
pnpm -C apps/api test
```

### 통합 테스트
```bash
# API 엔드포인트 테스트
pnpm test:integration
```

### E2E 테스트
```bash
# 전체 플로우 테스트 (예정)
pnpm test:e2e
```

---

## 추가 리소스

- **API 문서**: http://localhost:4000/health
- **Prisma Studio**: `pnpm db:studio`
- **React Flow Docs**: https://reactflow.dev
- **Fastify Docs**: https://fastify.dev

**프로젝트 문의**: GitHub Issues

