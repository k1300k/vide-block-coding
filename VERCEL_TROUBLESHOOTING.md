# Vercel 배포 문제 해결 가이드

## 🚨 현재 상황
- GitHub에 코드는 정상 반영됨
- Vercel 배포가 자동으로 트리거되지 않음

## ✅ 해결 방법

### 방법 1: Vercel Dashboard에서 수동 배포 (권장)

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard

2. **프로젝트 선택**
   - `vide-block-coding` 또는 해당 프로젝트 클릭

3. **Deployments 탭으로 이동**

4. **Redeploy 실행**
   - 최신 배포 옆의 `⋯` (점 3개) 메뉴 클릭
   - "Redeploy" 선택
   - "Use existing Build Cache" 체크 해제 (권장)
   - "Redeploy" 버튼 클릭

5. **배포 로그 확인**
   - 실시간으로 빌드 진행 상황 확인
   - 완료 후 "Visit" 버튼으로 사이트 확인

### 방법 2: Git Integration 확인

Vercel이 GitHub 푸시를 감지하지 못하는 경우:

1. **Vercel Dashboard → 프로젝트 → Settings → Git**

2. **Git Integration 상태 확인**
   - Connected Repository가 올바른지 확인
   - Branch: `main` 으로 설정되어 있는지 확인

3. **Production Branch 설정**
   ```
   Production Branch: main
   ```

4. **Deploy Hooks 확인**
   - Settings → Git → Deploy Hooks
   - 필요시 새 Deploy Hook 생성

### 방법 3: Vercel CLI로 수동 배포

```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 3. Vercel 로그인
vercel login

# 4. 프로덕션 배포
vercel --prod

# 또는 Root Directory 지정
vercel --prod --cwd apps/web
```

### 방법 4: GitHub Webhook 재설정

1. **GitHub Repository 설정**
   - https://github.com/k1300k/vide-block-coding/settings/hooks

2. **Vercel Webhook 확인**
   - Webhook이 있는지 확인
   - Recent Deliveries에서 실패 여부 확인

3. **Webhook 재전송**
   - 실패한 Delivery 클릭
   - "Redeliver" 버튼 클릭

4. **없으면 Vercel에서 재연결**
   - Vercel Dashboard → Project → Settings → Git
   - "Disconnect" 후 "Connect"

## 🔍 배포 상태 확인 방법

### Vercel Dashboard 확인
```
1. https://vercel.com/dashboard
2. 프로젝트 선택
3. Deployments 탭
4. 최신 배포의 상태 확인:
   - ✅ Ready: 배포 성공
   - 🔄 Building: 빌드 중
   - ❌ Failed: 배포 실패
```

### GitHub Actions 확인
```bash
# GitHub Repository → Actions 탭
# 최근 workflow 실행 상태 확인
```

### 로컬에서 빌드 테스트
```bash
cd /home/user/webapp/apps/web
pnpm install
pnpm build

# 성공하면 Vercel에서도 성공해야 함
```

## 🎯 체크리스트

배포 전 확인사항:

- [ ] GitHub에 코드가 push됨
- [ ] Vercel Dashboard에서 프로젝트가 활성화됨
- [ ] Git Integration이 연결됨
- [ ] Production Branch가 `main`으로 설정됨
- [ ] Root Directory가 `apps/web`로 설정됨
- [ ] Build Command가 설정됨 (또는 비어있음)
- [ ] 환경 변수가 설정됨 (필요한 경우)

## 📊 현재 프로젝트 설정

### Git 정보
```
Repository: k1300k/vide-block-coding
Branch: main
Latest Commit: a7e64a3 (trigger: force Vercel deployment)
```

### Vercel 설정 (권장)
```
Root Directory: apps/web
Framework Preset: Next.js
Node.js Version: 22.x
Build Command: (auto-detect)
Output Directory: (auto-detect)
Install Command: (auto-detect)
```

### 최근 변경사항
```
- ServiceGuideModal.tsx 추가 (296 lines)
- page.tsx 업데이트 (📖 사용법 버튼)
- 3단계 상세 가이드 구현
```

## 💡 일반적인 문제와 해결책

### 문제 1: "No deployments triggered"
**원인**: Vercel이 Git push를 감지하지 못함
**해결**: 수동으로 Redeploy 또는 Git Integration 재연결

### 문제 2: Build 실패
**원인**: 빌드 에러, 의존성 문제
**해결**: 
- Vercel 빌드 로그 확인
- 로컬에서 `pnpm build` 테스트
- package.json 의존성 확인

### 문제 3: 오래된 버전이 표시됨
**원인**: Vercel 캐시
**해결**: 
- Redeploy 시 "Use existing Build Cache" 체크 해제
- Vercel Dashboard → Settings → General → Clear Cache

### 문제 4: 환경 변수 문제
**원인**: 필요한 환경 변수가 설정되지 않음
**해결**: 
- Vercel Dashboard → Settings → Environment Variables
- 필요한 변수 추가 후 Redeploy

## 🚀 빠른 해결 (요약)

**가장 빠른 방법:**

1. Vercel Dashboard 접속
2. 프로젝트 선택
3. Deployments 탭
4. Redeploy 버튼 클릭
5. 배포 완료 대기 (2-3분)
6. Visit 버튼으로 확인

**긴급 시:**
```bash
# 빈 커밋으로 강제 푸시
git commit --allow-empty -m "trigger: force deploy"
git push origin main
```

## 📞 추가 지원

문제가 계속되면:
- Vercel 지원: https://vercel.com/support
- Vercel 문서: https://vercel.com/docs
- GitHub Issues 확인

---

**Last Updated**: 2025-11-15
**Status**: Troubleshooting Guide
