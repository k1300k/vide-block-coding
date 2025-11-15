# ⚡ Vercel Dashboard 설정 (최종 버전)

## 🎯 핵심: vercel.json 없이 Dashboard만 사용

이 프로젝트는 **Vercel Dashboard 설정만으로 배포**됩니다.

## ✅ 단계별 설정

### 1단계: Vercel 프로젝트 생성

1. https://vercel.com/dashboard 접속
2. **Add New** → **Project** 클릭
3. GitHub 저장소 선택: `k1300k/vide-block-coding`
4. **Import** 클릭

### 2단계: Configure Project (중요!)

Import 시 나타나는 설정 화면에서:

#### Framework Preset
```
Next.js (자동 감지됨)
```

#### Root Directory ⭐ 가장 중요!
```
apps/web
```
"Edit" 버튼을 클릭하고 `apps/web`를 입력하세요.

#### Build and Output Settings
```
Build Command: (비워두기 또는 자동)
Output Directory: (비워두기 또는 자동)
Install Command: (비워두기 또는 자동)
```

Vercel이 `apps/web/package.json`을 자동으로 감지합니다.

#### Node.js Version
```
22.x (자동 선택됨)
```

### 3단계: Environment Variables

**선택사항** - API가 있을 때만 필요:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NODE_ENV=production
```

### 4단계: Deploy

**Deploy** 버튼 클릭!

## 🔍 작동 원리

Vercel이 자동으로 수행:

```bash
# 1. Root Directory로 이동
cd apps/web

# 2. package.json의 packageManager 확인
#    → "pnpm@9.0.0" 없으면 npm 사용

# 3. 의존성 설치
npm install

# 4. 빌드
npm run build

# 5. .next 폴더 배포
```

## ⚠️ 중요 사항

### Root Directory 설정이 필수입니다!

- ✅ **설정함**: `apps/web`
  - Vercel이 `apps/web/package.json` 사용
  - Next.js 자동 감지
  - 정상 빌드

- ❌ **설정 안함**: (프로젝트 루트)
  - Vercel이 루트 `package.json` 사용 (monorepo 설정)
  - workspace 의존성 문제
  - 빌드 실패

## 🛠️ 트러블슈팅

### "No such file or directory" 에러

**해결**: Root Directory를 `apps/web`로 설정

Settings → General → Root Directory → Edit → `apps/web` → Save

### 빌드가 느리거나 타임아웃

**원인**: pnpm 사용 시 네트워크 문제

**해결 1**: `apps/web`에 `package-lock.json` 생성하여 npm 강제 사용
```bash
cd apps/web
rm -f pnpm-lock.yaml
npm install
git add package-lock.json
git commit -m "Add package-lock.json for npm"
```

**해결 2**: Vercel Settings에서 Install Command 지정
```
npm install --legacy-peer-deps
```

## 📋 배포 체크리스트

배포 전 확인:

- [ ] Vercel 프로젝트 생성됨
- [ ] **Root Directory = `apps/web`** ⭐ 가장 중요!
- [ ] Framework Preset = Next.js
- [ ] Node.js Version = 22.x
- [ ] (선택) 환경 변수 설정
- [ ] Deploy 버튼 클릭
- [ ] 빌드 로그에서 "apps/web" 확인

## 🎉 성공 확인

배포 성공 시:
- ✅ Build logs에 "Building Next.js" 표시
- ✅ Deployment URL 생성
- ✅ 사이트 접속 가능

## 📚 참고

- Root Directory가 설정되면 Vercel은 **그 디렉토리 안에서만** 작업합니다
- `apps/web/package.json`에는 workspace 의존성이 없으므로 독립적으로 배포 가능
- monorepo의 다른 패키지(`packages/db` 등)는 이 배포에 영향을 주지 않습니다

## 🚀 빠른 재배포

설정 완료 후:
1. 코드 변경 후 GitHub에 push
2. Vercel이 자동으로 감지하고 재배포
3. 끝!
