# AI Vibe Workflow - 설치 및 실행 가이드

## 사전 요구사항

- Node.js 18 이상
- pnpm 9.0.0 이상
- PostgreSQL 15 (또는 Docker)
- Git

## 빠른 시작

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd ai-vibe-workflow
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열어 필요한 값을 설정하세요:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_vibe"
NEXTAUTH_SECRET="your-secret-key-here"
# 필요한 경우 AI 서비스 API 키 추가
```

### 4. 데이터베이스 설정

**Option A: Docker 사용 (권장)**

```bash
docker-compose up -d db
```

**Option B: 로컬 PostgreSQL 사용**

PostgreSQL이 설치되어 있다면 데이터베이스를 생성하세요:

```bash
createdb ai_vibe
```

### 5. Prisma 스키마 푸시

```bash
pnpm db:push
```

### 6. 개발 서버 실행

```bash
pnpm dev
```

이제 다음 주소로 접속할 수 있습니다:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database Studio**: `pnpm db:studio` 실행 후 http://localhost:5555

## Docker로 전체 스택 실행

Docker Compose를 사용하여 모든 서비스를 한 번에 실행할 수 있습니다:

```bash
docker-compose up -d
```

서비스 확인:

```bash
docker-compose ps
```

로그 확인:

```bash
docker-compose logs -f
```

중지:

```bash
docker-compose down
```

## 주요 명령어

### 개발

```bash
# 전체 개발 서버 시작 (병렬 실행)
pnpm dev

# 특정 앱만 실행
pnpm -C apps/web dev        # Frontend만
pnpm -C apps/api dev        # Backend만
```

### 빌드

```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱만 빌드
pnpm -C apps/web build
pnpm -C apps/api build
```

### 데이터베이스

```bash
# 스키마 푸시 (마이그레이션 없이 동기화)
pnpm db:push

# Prisma Studio 실행
pnpm db:studio

# 마이그레이션 생성 및 적용
pnpm -C packages/db db:migrate
```

### 코드 품질

```bash
# 린트 실행
pnpm lint

# 타입 체크
pnpm typecheck

# CI 파이프라인 로컬 실행
pnpm ci
```

### Makefile 명령어 (선택사항)

```bash
# 도움말 보기
make help

# 개발 서버 시작
make dev

# Docker 시작
make docker-up

# Docker 중지
make docker-down
```

## 프로젝트 구조

```
ai-vibe-workflow/
├── apps/
│   ├── api/              # Fastify 백엔드 API
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── services/
│   │   └── package.json
│   └── web/              # Next.js 프론트엔드
│       ├── app/
│       │   ├── builder/  # 워크플로우 빌더
│       │   ├── editor/   # 프롬프트 에디터
│       │   └── page.tsx
│       └── package.json
├── packages/
│   └── db/               # Prisma 데이터베이스 스키마
│       ├── prisma/
│       │   └── schema.prisma
│       └── index.ts
├── .cursorrules          # Cursor AI 설정
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
```

## API 엔드포인트

### Authentication
- `POST /auth/login` - 로그인 (이메일 기반)

### Profiles
- `GET /profiles` - 프로필 목록 조회
- `POST /profiles` - 프로필 생성
- `GET /profiles/:id` - 프로필 상세 조회
- `PUT /profiles/:id` - 프로필 수정
- `DELETE /profiles/:id` - 프로필 삭제

### Projects
- `GET /projects` - 프로젝트 목록 조회
- `POST /projects` - 프로젝트 생성
- `GET /projects/:id` - 프로젝트 상세 조회

### Workflows
- `POST /workflows` - 워크플로우 생성
- `GET /workflows/:id` - 워크플로우 조회
- `POST /workflows/:id/execute` - 워크플로우 실행

### AI Integration
- `POST /ai/run` - AI 프롬프트 실행 (Mock)

### GitHub Integration
- `POST /integrations/github/scan` - GitHub 저장소 스캔 (Mock)

### Components
- `GET /components` - 컴포넌트 라이브러리 조회

## 문제 해결

### 포트 충돌

이미 포트가 사용 중인 경우:

```bash
# 프로세스 확인
lsof -ti:3000  # Frontend
lsof -ti:4000  # Backend
lsof -ti:5432  # PostgreSQL

# 프로세스 종료
kill -9 <PID>
```

### Prisma 클라이언트 에러

```bash
# Prisma 클라이언트 재생성
pnpm -C packages/db db:generate
```

### Docker 빌드 실패

```bash
# 캐시 없이 재빌드
docker-compose build --no-cache
```

### 의존성 설치 문제

```bash
# pnpm 캐시 정리
pnpm store prune

# node_modules 삭제 후 재설치
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

## 다음 단계

1. **워크플로우 빌더 사용**: http://localhost:3000/builder
   - 드래그 앤 드롭으로 워크플로우 구성
   - 컴포넌트 추가 및 연결
   - 워크플로우 저장 및 실행

2. **프롬프트 에디터 사용**: http://localhost:3000/editor
   - AI 프롬프트 작성
   - 다양한 모델로 테스트
   - 프롬프트 저장 및 관리

3. **API 문서 확인**: http://localhost:4000/health
   - 헬스 체크 엔드포인트로 API 상태 확인

## 지원 및 문의

- GitHub Issues: <repository-url>/issues
- Documentation: README.md

