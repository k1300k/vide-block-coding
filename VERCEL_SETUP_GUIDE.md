# Vercel 배포 설정 가이드

## 🚨 중요: Vercel Dashboard 설정 필수

이 프로젝트는 **monorepo 구조**이므로 Vercel Dashboard에서 Root Directory를 반드시 설정해야 합니다.

## 1단계: Vercel 프로젝트 생성/설정

### Vercel Dashboard 접속
1. https://vercel.com/dashboard 접속
2. 프로젝트 선택 또는 "Import Project" 클릭
3. GitHub 저장소 연결: `k1300k/vide-block-coding`

### 프로젝트 설정 (Project Settings)

#### General Settings
```
Framework Preset: Next.js
Root Directory: apps/web  ⬅️ 이것이 가장 중요!
Node.js Version: 22.x
```

#### Build & Development Settings
```
Build Command: (비워두기 - vercel.json이 처리)
Output Directory: (비워두기 - vercel.json이 처리)  
Install Command: (비워두기 - vercel.json이 처리)
```

**또는** vercel.json을 무시하고 직접 설정하려면:
```
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install --network-timeout 600000
```

## 2단계: 환경 변수 설정

### Settings → Environment Variables

필수 환경 변수:
```env
NODE_ENV=production
ENABLE_EXPERIMENTAL_COREPACK=1
npm_config_fetch_retries=10
npm_config_fetch_retry_mintimeout=30000
npm_config_fetch_retry_maxtimeout=180000
npm_config_network_timeout=600000
```

선택적 환경 변수 (API 연동 시):
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

## 3단계: Root Directory 설정 방법

### 방법 1: 대시보드에서 설정 (권장)

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **General**
3. **Root Directory** 섹션 찾기
4. "Edit" 클릭
5. `apps/web` 입력
6. **Save** 클릭

### 방법 2: 초기 import 시 설정

새 프로젝트 import 시:
1. "Configure Project" 화면에서
2. **Root Directory** 항목 찾기
3. `apps/web` 입력
4. Deploy 클릭

## 4단계: 배포 확인

설정 완료 후:
1. **Deployments** 탭으로 이동
2. 자동으로 배포 시작됨
3. 빌드 로그 확인
4. 배포 성공 시 URL 생성됨

## 트러블슈팅

### "cd: apps/web: No such file or directory" 에러

**원인**: Root Directory가 설정되지 않음

**해결**:
1. Vercel Dashboard → Settings → General
2. Root Directory를 `apps/web`로 설정
3. Save 후 재배포

### pnpm 설치 에러

**원인**: 네트워크 타임아웃 또는 레지스트리 연결 문제

**해결**:
1. 환경 변수가 모두 설정되었는지 확인
2. `npm_config_network_timeout=600000` 확인
3. Redeploy 버튼 클릭

### Workspace 의존성 에러

**원인**: monorepo 구조의 workspace 의존성

**현재 상태**: 
- `@ai-vibe/db` 패키지는 workspace로 연결됨
- Root Directory를 `apps/web`로 설정하면 자동으로 처리됨

## 로컬 테스트

배포 전 로컬에서 테스트:

```bash
# 프로젝트 루트에서
pnpm install
pnpm -F @ai-vibe/web build

# apps/web에서 직접 테스트
cd apps/web
pnpm install
pnpm build
pnpm start
```

## 빌드 프로세스

Vercel이 실행하는 명령:

```bash
# 1. Root Directory로 이동
cd apps/web

# 2. 의존성 설치 (monorepo aware)
pnpm install --network-timeout 600000

# 3. 빌드
pnpm build

# 4. .next 폴더 배포
```

## 현재 프로젝트 구조

```
vide-block-coding/
├── apps/
│   ├── api/          # Backend (별도 배포 필요)
│   └── web/          # Frontend (Vercel) ⬅️ Root Directory
│       ├── package.json
│       ├── next.config.js
│       └── .next/    # 빌드 output
├── packages/
│   └── db/           # Shared package
├── vercel.json       # Vercel 설정 (루트)
├── pnpm-workspace.yaml
└── package.json
```

## 체크리스트

배포 전 확인사항:

- [ ] Vercel 프로젝트 생성됨
- [ ] Root Directory가 `apps/web`로 설정됨
- [ ] Node.js 버전이 22.x로 설정됨
- [ ] 환경 변수가 모두 추가됨
- [ ] GitHub 저장소 연결됨
- [ ] 첫 배포 테스트 완료

## 추가 리소스

- [Vercel Monorepo 가이드](https://vercel.com/docs/concepts/monorepos)
- [Next.js 배포](https://vercel.com/docs/frameworks/nextjs)
- [pnpm Workspace](https://pnpm.io/workspaces)
