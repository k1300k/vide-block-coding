# Vercel 배포 가이드

## 문제 해결: workspace 프로토콜 에러

Vercel은 기본적으로 npm을 사용하므로 pnpm workspace 프로토콜(`workspace:*`)을 인식하지 못합니다.

## 해결 방법

### Option 1: Vercel 설정 (권장)

Vercel 대시보드에서 다음 설정을 적용하세요:

1. **Project Settings → General**
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && pnpm install && cd apps/web && pnpm build`
   - Output Directory: `apps/web/.next`
   - Install Command: `pnpm install`

2. **Settings → Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.vercel.app
   ```

### Option 2: vercel.json 사용

프로젝트 루트의 `vercel.json` 파일이 생성되었습니다:

```json
{
  "buildCommand": "cd apps/web && pnpm install && pnpm build",
  "installCommand": "pnpm install",
  "framework": null,
  "outputDirectory": "apps/web/.next"
}
```

### Option 3: 독립 배포 (가장 간단)

`apps/web`만 별도로 배포:

1. GitHub에서 `apps/web` 폴더만 선택
2. Vercel에서 Root Directory를 `apps/web`로 설정
3. 환경 변수 설정:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.vercel.app
   ```

## 배포 단계

### 1. Vercel CLI 설치 (선택사항)

```bash
npm install -g vercel
```

### 2. 프로젝트 연결

```bash
cd /Users/john/block-coding/vide-block-coding
vercel
```

### 3. 프로덕션 배포

```bash
vercel --prod
```

## 주의사항

### Database 연결
- Vercel은 서버리스 환경이므로 PostgreSQL 연결이 제한될 수 있습니다
- Supabase 또는 Vercel Postgres 사용을 권장합니다

### API 서버
- Backend API(`apps/api`)는 별도로 배포해야 합니다
- 추천 플랫폼:
  - **Railway**: Node.js + PostgreSQL 지원
  - **Render**: 무료 tier 제공
  - **Fly.io**: Dockerfile 지원
  - **Vercel Serverless Functions**: API를 서버리스로 변환

## Backend API 배포 (Railway 예시)

1. Railway 회원가입: https://railway.app
2. New Project → Deploy from GitHub
3. 저장소 선택: `k1300k/vide-block-coding`
4. Root Directory: `apps/api`
5. 환경 변수 설정:
   ```
   DATABASE_URL=postgresql://...
   GITHUB_TOKEN=ghp_...
   ```

## 전체 스택 배포 구조

```
Frontend (Vercel)
└── apps/web
    └── https://vide-block-coding.vercel.app

Backend (Railway/Render)
└── apps/api
    └── https://vide-block-coding-api.railway.app

Database (Supabase)
└── PostgreSQL
    └── connection string
```

## 환경 변수

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

### Backend (.env)
```env
DATABASE_URL=postgresql://...
GITHUB_TOKEN=ghp_...
OPENAI_API_KEY=sk-...
```

## 배포 체크리스트

- [ ] `vercel.json` 파일 확인
- [ ] `.npmrc` 파일 확인
- [ ] `next.config.js`에 `output: 'standalone'` 추가됨
- [ ] Backend API 별도 배포
- [ ] 환경 변수 설정 (Vercel Dashboard)
- [ ] Database 연결 문자열 설정
- [ ] CORS 설정 (Backend API)
- [ ] API URL 환경 변수 설정

## 트러블슈팅

### workspace 에러가 계속 발생하는 경우

```bash
# 1. pnpm-lock.yaml 재생성
rm pnpm-lock.yaml
pnpm install

# 2. Git 커밋
git add .
git commit -m "fix: Vercel 배포를 위한 설정 수정"
git push origin main
```

### Build 실패 시

Vercel 로그를 확인하고 다음을 시도:

1. Node.js 버전 확인 (18 이상)
2. Build Command 수정
3. Root Directory 설정 확인

## 참고 링크

- [Vercel Monorepo 배포](https://vercel.com/docs/monorepos)
- [Next.js Standalone Output](https://nextjs.org/docs/advanced-features/output-file-tracing)
- [Railway 배포 가이드](https://docs.railway.app/)

