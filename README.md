# AI Vibe Workflow

**AI 개발자를 위한 3단계 워크플로우 자동화 플랫폼**

AI 개발자가 반복적인 설정 작업에서 벗어나 핵심 프롬프트 개발에 집중할 수 있도록 하는 자동화 플랫폼입니다.

## 🎯 3단계 워크플로우

### 1️⃣ Intro (프로젝트 초기화)
기존 자산 재활용으로 프로젝트 설정을 자동화합니다.
- GitHub 저장소 자동 생성
- 프롬프트 재사용 및 템플릿 적용
- 초기 설정 시간 대폭 단축

### 2️⃣ Contents (프롬프트 개발)
AI 프롬프트 개발과 테스트에 집중합니다.
- 멀티 AI 모델 비교 (GPT, Claude, Gemini)
- 고급 프롬프트 에디터 (Monaco Editor)
- 실시간 결과 비교

### 3️⃣ Deploy (배포 자동화)
GitHub, 데이터베이스, 클라우드 배포를 자동화합니다.
- Vercel/Netlify 자동 배포
- Supabase 데이터베이스 설정
- 환경 변수 자동 구성

## 💡 핵심 가치

- ⚡ **설정 시간 60% 단축**: 30분 → 12분
- ♻️ **자산 재사용률 70% 달성**: 검증된 프롬프트와 설정 재활용
- 💰 **AI 크레딧 30% 절감**: 효율적인 프롬프트 관리로 비용 절감

## 기술 스택

- **Backend**: Fastify + Zod + Prisma + PostgreSQL
- **Frontend**: Next.js 15 + React Flow + Zustand + TypeScript
- **Database**: PostgreSQL with Supabase pgvector
- **Deployment**: Docker + GitHub Actions

## 프로젝트 구조

```
ai-vibe-workflow/
├── apps/
│   ├── api/          # Fastify 백엔드 API
│   └── web/          # Next.js 프론트엔드
├── packages/
│   └── db/           # Prisma 데이터베이스 스키마
├── .cursorrules      # Cursor AI 개발 가이드
├── docker-compose.yml
└── package.json      # Monorepo 설정
```

## 시작 방법

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일에서 필요한 값들 설정
```

### 3. 데이터베이스 설정

```bash
pnpm db:push
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

또는 Docker로 실행:

```bash
docker-compose up -d
```

### 5. 접속

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database Studio: http://localhost:5555 (pnpm db:studio)

## 개발 로드맵

### MVP 단계 (8주)

- **Week 1-2**: 프로젝트 구조 및 인증 시스템
- **Week 3-4**: 워크플로우 빌더 UI
- **Week 5-6**: GitHub 통합
- **Week 7-8**: AI 통합 및 배포

### Phase 1 (추가 6주)

- 멀티 AI 모델 비교
- 고급 프롬프트 에디터
- Supabase 자동 설정
- 실시간 모니터링

### Phase 2 (추가 8주)

- 컴포넌트 마켓플레이스
- 팀 협업 기능
- 고급 분석 및 리포팅

## 라이선스

MIT

# Last updated: Sat Nov 15 10:50:04 UTC 2025
