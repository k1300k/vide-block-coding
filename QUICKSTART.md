# 🚀 AI Vibe Workflow - 빠른 시작 가이드

## 1분 안에 시작하기

### 필수 설치

```bash
# Node.js 18 이상 설치 확인
node --version

# pnpm 설치 (없는 경우)
npm install -g pnpm@9.0.0
```

### 1단계: 프로젝트 설정

```bash
# 의존성 설치
pnpm install

# 환경 변수 복사
cp .env.example .env
```

### 2단계: 데이터베이스 시작 (Docker 사용)

```bash
# PostgreSQL 컨테이너만 시작
docker-compose up -d db

# 또는 로컬 PostgreSQL 사용 시
# DATABASE_URL을 .env에 설정
```

### 3단계: 데이터베이스 스키마 적용

```bash
pnpm db:push
```

### 4단계: 개발 서버 실행

```bash
pnpm dev
```

**완료!** 이제 브라우저에서 확인하세요:

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:4000
- 📊 **DB Studio**: `pnpm db:studio` 후 http://localhost:5555

---

## 주요 기능 둘러보기

### 1️⃣ 워크플로우 빌더

http://localhost:3000/builder

- **Intro 단계**: GitHub Auth, Landing Page, UI Components
- **Contents 단계**: Prompt Editor, AI Model, Knowledge Base  
- **Deploy 단계**: Database Setup, GitHub Actions, Cloud Deploy

**사용법:**
1. 왼쪽 패널에서 컴포넌트 선택
2. 캔버스에 드래그 앤 드롭으로 배치
3. 노드를 연결하여 워크플로우 구성
4. "저장" 버튼으로 저장, "실행" 버튼으로 실행

### 2️⃣ 프롬프트 에디터

http://localhost:3000/editor

- **Monaco Editor**: VS Code와 동일한 편집 경험
- **변수 지원**: `{{variable}}` 형식으로 동적 프롬프트 작성
- **멀티 모델**: GPT-4, Claude 3, Gemini Pro 선택 가능
- **로컬 저장**: 브라우저 localStorage에 자동 저장

**사용법:**
1. 프롬프트 템플릿 작성
2. 모델 선택 (GPT-4, Claude 3 등)
3. "테스트" 버튼으로 AI 응답 확인
4. "저장" 버튼으로 로컬 저장

---

## Docker로 전체 실행

모든 서비스(DB + Backend + Frontend)를 한 번에 실행:

```bash
docker-compose up -d
```

확인:
```bash
docker-compose ps
```

로그 보기:
```bash
docker-compose logs -f
```

중지:
```bash
docker-compose down
```

---

## API 테스트

### Health Check

```bash
curl http://localhost:4000/health
```

### 로그인

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 프로필 생성

```bash
curl -X POST http://localhost:4000/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My GitHub Profile",
    "type": "github",
    "configuration": {
      "token": "ghp_xxx",
      "username": "myusername"
    }
  }'
```

### GitHub 저장소 스캔 (Mock)

```bash
curl -X POST http://localhost:4000/integrations/github/scan \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "facebook",
    "repository": "react"
  }'
```

---

## 문제 해결

### 포트가 이미 사용 중

```bash
# 포트 사용 프로세스 확인
lsof -ti:3000  # Frontend
lsof -ti:4000  # Backend

# 프로세스 종료
kill -9 <PID>
```

### Prisma 클라이언트 에러

```bash
pnpm -C packages/db db:generate
```

### Docker 문제

```bash
# 컨테이너 재시작
docker-compose restart

# 로그 확인
docker-compose logs backend
docker-compose logs frontend
```

---

## 다음 단계

1. ✅ **워크플로우 구성**: `/builder`에서 3단계 워크플로우 설계
2. ✅ **프롬프트 작성**: `/editor`에서 AI 프롬프트 개발
3. ✅ **GitHub 연동**: Profile API로 GitHub 토큰 저장
4. ✅ **자동화 실행**: 워크플로우 실행으로 자동 배포

## 핵심 명령어 요약

```bash
# 개발
pnpm dev              # 전체 개발 서버
pnpm build            # 빌드
pnpm ci               # CI 체크 (lint + typecheck + build)

# 데이터베이스
pnpm db:push          # 스키마 동기화
pnpm db:studio        # Prisma Studio

# Docker
make docker-up        # Docker 시작
make docker-down      # Docker 중지
make docker-logs      # 로그 보기

# 도움말
make help             # 모든 명령어 보기
```

---

## 추가 문서

- 📖 **상세 가이드**: [SETUP.md](./SETUP.md)
- 📘 **README**: [README.md](./README.md)
- 📝 **PRD**: [prd.mdc](./prd.mdc)

**Happy Coding! 🎉**

