# Vercel 배포 가이드 (업데이트)

## 🚨 중요: npm 방식으로 변경

pnpm 레지스트리 연결 문제로 인해 **npm 방식**으로 변경했습니다.

## Vercel 설정 (필수)

### 1. Vercel Dashboard 설정

**Project Settings → General**

```
Framework Preset: Next.js
Root Directory: apps/web
Node.js Version: 18.x
```

**Build & Development Settings**

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install --legacy-peer-deps
```

### 2. 환경 변수 설정

**Settings → Environment Variables**

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NODE_ENV=production
```

## 배포 방법

### Option 1: GitHub 연동 (자동 배포)

1. Vercel에서 GitHub 저장소 연결
2. Root Directory를 `apps/web`로 설정
3. 자동으로 배포됨

### Option 2: Vercel CLI

```bash
cd apps/web
npm install -g vercel
vercel --prod
```

## 트러블슈팅

### "workspace:*" 에러 발생 시

✅ **해결됨**: `apps/web/package.json`에서 workspace 의존성 제거

### pnpm 레지스트리 에러

✅ **해결됨**: npm으로 전환, `package-lock.json` 생성

### 빌드 실패 시

```bash
# 로컬에서 테스트
cd apps/web
npm install --legacy-peer-deps
npm run build
```

## Backend API 배포

Frontend는 Vercel, **Backend는 별도 배포** 필요:

### Railway 배포 (추천)

1. https://railway.app 접속
2. New Project → Deploy from GitHub
3. 저장소 선택: `k1300k/vide-block-coding`
4. Root Directory: `apps/api`
5. Start Command: `npm run build && npm start`
6. 환경 변수:
   ```
   DATABASE_URL=postgresql://...
   NODE_ENV=production
   ```

### Render 배포

1. https://render.com 접속
2. New Web Service
3. Root Directory: `apps/api`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`

## 전체 배포 구조

```
┌─────────────────────────────────────┐
│   Frontend (Vercel)                 │
│   apps/web                          │
│   https://your-app.vercel.app       │
└─────────────────────────────────────┘
              ↓ API 호출
┌─────────────────────────────────────┐
│   Backend (Railway/Render)          │
│   apps/api                          │
│   https://your-api.railway.app      │
└─────────────────────────────────────┘
              ↓ DB 연결
┌─────────────────────────────────────┐
│   Database (Supabase)               │
│   PostgreSQL                        │
└─────────────────────────────────────┘
```

## 환경 변수 연결

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

### Backend (Railway)
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
GITHUB_TOKEN=ghp_...
OPENAI_API_KEY=sk-...
```

## 배포 체크리스트

- [x] `apps/web/package.json`에서 workspace 의존성 제거
- [x] `vercel.json` npm 설정 추가
- [x] `.vercelignore` 추가
- [ ] Vercel Root Directory를 `apps/web`로 설정
- [ ] 환경 변수 설정 (NEXT_PUBLIC_API_URL)
- [ ] Backend API 별도 배포
- [ ] CORS 설정 (Backend)
- [ ] 배포 테스트

## 로컬 테스트

```bash
# Frontend 테스트
cd apps/web
npm install --legacy-peer-deps
npm run build
npm start

# Backend 테스트
cd apps/api
npm install
npm run build
npm start
```

## 참고 링크

- [Vercel Next.js 배포](https://vercel.com/docs/frameworks/nextjs)
- [Railway 배포 가이드](https://docs.railway.app/)
- [Render 배포 가이드](https://render.com/docs)
