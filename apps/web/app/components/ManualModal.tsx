"use client";

import React from 'react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManualModal({ isOpen, onClose }: ManualModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 flex justify-between items-center border-b">
          <div>
            <h2 className="text-2xl font-bold">📘 AI Vibe Workflow 서비스 매뉴얼</h2>
            <p className="text-indigo-100 text-sm mt-1">AI 개발자를 위한 프롬프트 개발 및 자동화 플랫폼</p>
          </div>
          <button onClick={onClose} className="text-3xl hover:opacity-80">✕</button>
        </div>

        <div className="p-8 space-y-8">
          {/* 서비스 개요 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">🎯 서비스 개요</h3>
            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
              <p className="text-gray-800 mb-3">
                <strong>AI Vibe Workflow</strong>는 AI 기반 프롬프트 개발과 워크플로우 자동화를 통합 지원하는 플랫폼입니다. 사용자의 실시간 피드백을 바탕으로 프롬프트를 반복 개선하고, 완성된 콘텐츠를 한 번의 푸시로 자동 배포할 수 있습니다.
              </p>
              <p className="text-gray-700">
                이 플랫폼은 <strong>3단계 워크플로우</strong>로 구성되어 있으며, 각 단계는 독립적이면서도 seamless하게 연결되어 있습니다. 개발자는 빠르게 프로토타입을 만들고, 테스트하고, 배포할 수 있습니다.
              </p>
            </div>
          </section>

          {/* 3단계 워크플로우 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">🔄 3단계 워크플로우</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg border-2 border-blue-300">
                <h4 className="text-lg font-bold text-blue-700 mb-2">1️⃣ Intro (초기화)</h4>
                <p className="text-gray-700 text-sm">
                  기존 자산, 템플릿, 설정 정보를 재활용하여 새로운 프로젝트를 빠르게 초기화합니다. 반복적인 세팅 작업을 60% 단축할 수 있습니다.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border-2 border-purple-300">
                <h4 className="text-lg font-bold text-purple-700 mb-2">2️⃣ Contents (개발)</h4>
                <p className="text-gray-700 text-sm">
                  프롬프트 작성, 여러 AI 모델(V0, Lovable, Cursor 등)과의 상호작용, A/B 테스트를 지원합니다. 크레딧 사용량을 실시간으로 추적합니다.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg border-2 border-green-300">
                <h4 className="text-lg font-bold text-green-700 mb-2">3️⃣ Deploy (배포)</h4>
                <p className="text-gray-700 text-sm">
                  GitHub 연동, 자동 빌드, Vercel 배포를 통해 프로덕션까지 한 번에 처리합니다. 배포 로그 및 상태를 실시간 모니터링할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 사용 방법 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">📖 상세 사용 방법</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-bold text-gray-800 mb-2">1단계: 워크플로우 빌더 접속</h4>
                <p className="text-gray-700 text-sm">
                  메인 페이지의 <strong>"워크플로우 빌더 시작하기"</strong> 버튼을 클릭하여 프로젝트 구조와 초기 설정을 정의합니다.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-bold text-gray-800 mb-2">2단계: 프롬프트 에디터에서 개발</h4>
                <p className="text-gray-700 text-sm">
                  <strong>"프롬프트 에디터 열기"</strong> 버튼으로 이동하여 AI 모델과 상호작용하며 프롬프트를 작성 및 테스트합니다. 여러 버전을 비교할 수 있습니다.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-bold text-gray-800 mb-2">3단계: 버전 관리 및 이력 기록</h4>
                <p className="text-gray-700 text-sm">
                  각 개선 사항을 버전으로 기록합니다. <strong>"정보" 버튼</strong> (ℹ️)을 클릭하면 전체 개발 이력, 사용 크레딧, 영향도를 확인할 수 있습니다.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-bold text-gray-800 mb-2">4단계: 자동 배포</h4>
                <p className="text-gray-700 text-sm">
                  Codespaces에서 변경사항을 커밋하고 <code className="bg-gray-200 px-2 py-1 rounded text-sm">git push origin main</code>을 실행하면, GitHub Actions가 자동으로 Vercel에 배포합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 주요 기능 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">✨ 주요 기능</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600 flex items-start gap-3">
                <span className="text-2xl">🔀</span>
                <div>
                  <p className="font-semibold text-gray-800">프롬프트 비교 및 A/B 테스트</p>
                  <p className="text-sm text-gray-700">여러 프롬프트 버전의 결과를 나란히 비교하여 최적의 버전을 선택합니다.</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600 flex items-start gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <p className="font-semibold text-gray-800">크레딧 사용량 실시간 추적</p>
                  <p className="text-sm text-gray-700">V0, Lovable, Cursor 등 각 AI 솔루션별 크레딧 사용량을 버전별로 기록하고 관리합니다.</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600 flex items-start gap-3">
                <span className="text-2xl">🔗</span>
                <div>
                  <p className="font-semibold text-gray-800">GitHub 통합</p>
                  <p className="text-sm text-gray-700">모든 변경사항은 Git 커밋으로 관리되어 이력 추적과 협업이 용이합니다.</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600 flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold text-gray-800">원클릭 배포 (Vercel)</p>
                  <p className="text-sm text-gray-700">GitHub Actions와 Vercel 연동으로 푸시 후 자동 빌드 및 배포가 진행됩니다.</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600 flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-gray-800">모노레포 지원</p>
                  <p className="text-sm text-gray-700">복잡한 프로젝트 구조를 한 번에 관리하며, 각 앱별 독립적인 빌드를 지원합니다.</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600 flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold text-gray-800">개발 이력 관리</p>
                  <p className="text-sm text-gray-700">각 버전의 사용자 피드백, 추가 기능, 영향도를 상세히 기록하고 열람할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 배포 설정 가이드 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">⚙️ 배포 설정 및 주의사항</h3>
            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-600 mb-4">
              <h4 className="font-bold text-yellow-900 mb-2">🔧 필수 설정</h4>
              <ul className="text-gray-800 text-sm space-y-2">
                <li>• <strong>Vercel 프로젝트 루트:</strong> 모노레포이므로 <code className="bg-yellow-100 px-2 py-1 rounded">apps/web</code> 으로 설정</li>
                <li>• <strong>Install Command:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">pnpm install</code> 또는 <code className="bg-yellow-100 px-2 py-1 rounded">pnpm install --frozen-lockfile</code></li>
                <li>• <strong>Build Command:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">pnpm --filter web build</code> 또는 <code className="bg-yellow-100 px-2 py-1 rounded">cd apps/web && pnpm build</code></li>
                <li>• <strong>Output Directory:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">.next</code> (자동 감지)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 mb-4">
              <h4 className="font-bold text-blue-900 mb-2">🔐 GitHub Actions 설정</h4>
              <ul className="text-gray-800 text-sm space-y-2">
                <li>• 레포지토리에 <code className="bg-blue-100 px-2 py-1 rounded">VERCEL_TOKEN</code> 시크릿 추가</li>
                <li>• GitHub Apps에서 Vercel 권한 허용</li>
                <li>• PR과 main 푸시 시 자동으로 배포 시작 (워크플로: <code className="bg-blue-100 px-2 py-1 rounded">.github/workflows/vercel-deploy.yml</code>)</li>
              </ul>
            </div>

            <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
              <h4 className="font-bold text-green-900 mb-2">📋 환경 변수 체크리스트</h4>
              <ul className="text-gray-800 text-sm space-y-2">
                <li>• Database URL (Prisma 사용 시)</li>
                <li>• API 키 (GitHub, 외부 서비스 등)</li>
                <li>• Node 환경 (production / development)</li>
                <li>• 도메인 및 CORS 설정</li>
              </ul>
            </div>
          </section>

          {/* 자주 묻는 질문 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">❓ 자주 묻는 질문 (FAQ)</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-bold text-gray-800 mb-2">Q: Codespaces에서 파일만 수정하면 배포되나요?</dt>
                <dd className="text-gray-700 text-sm">
                  A: 아니요. 파일 수정 후 <code className="bg-gray-200 px-2 py-1 rounded text-xs">git add</code>, <code className="bg-gray-200 px-2 py-1 rounded text-xs">git commit</code>, <code className="bg-gray-200 px-2 py-1 rounded text-xs">git push origin main</code> 순서로 GitHub에 푸시해야 자동 배포가 시작됩니다.
                </dd>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-bold text-gray-800 mb-2">Q: 배포 실패 시 어디서 로그를 확인하나요?</dt>
                <dd className="text-gray-700 text-sm">
                  A: 두 곳에서 확인할 수 있습니다. (1) GitHub Actions: 리포지토리 → Actions → Deploy to Vercel 워크플로우. (2) Vercel: 프로젝트 → Deployments → 해당 배포 항목.
                </dd>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-bold text-gray-800 mb-2">Q: PR(Pull Request)을 만들면 어떻게 되나요?</dt>
                <dd className="text-gray-700 text-sm">
                  A: Vercel이 자동으로 Preview 배포를 생성합니다. PR 상세 페이지 하단의 체크 항목에서 "Visit Preview" 링크를 클릭하여 확인할 수 있습니다. main 병합 시 프로덕션 배포가 진행됩니다.
                </dd>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-bold text-gray-800 mb-2">Q: 프롬프트 버전을 기록하려면?</dt>
                <dd className="text-gray-700 text-sm">
                  A: "프롬프트 에디터" 페이지에서 작업을 마친 후 "저장" 또는 "버전으로 기록" 버튼을 클릭하면, 사용자 피드백, 추가 기능, AI 크레딧 정보가 함께 저장되어 나중에 "정보" 버튼에서 확인할 수 있습니다.
                </dd>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-bold text-gray-800 mb-2">Q: Vercel 배포 없이 로컬에서 테스트하려면?</dt>
                <dd className="text-gray-700 text-sm">
                  A: Codespaces 또는 로컬 터미널에서 <code className="bg-gray-200 px-2 py-1 rounded text-xs">pnpm --filter web dev</code> (또는 <code className="bg-gray-200 px-2 py-1 rounded text-xs">cd apps/web && pnpm dev</code>)를 실행하면 http://localhost:3000에서 개발 서버가 실행됩니다.
                </dd>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-bold text-gray-800 mb-2">Q: 모노레포 구조에서 다른 패키지(API, DB)를 변경했을 때는?</dt>
                <dd className="text-gray-700 text-sm">
                  A: 워크플로우가 <code className="bg-gray-200 px-2 py-1 rounded text-xs">pnpm install --frozen-lockfile</code>을 먼저 실행하므로 전체 워크스페이스 의존성이 설치됩니다. 빌드 커맨드에서 필요한 다른 패키지를 포함하도록 구성하면 됩니다.
                </dd>
              </div>
            </div>
          </section>

          {/* 팁 및 모범 사례 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">💡 팁 및 모범 사례</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <p className="font-bold text-purple-900 mb-2">작은 커밋, 자주 푸시</p>
                <p className="text-sm text-gray-700">큰 변경사항을 한 번에 푸시하기보다 작은 단위로 여러 번 푸시하면 문제 발생 시 원인 파악이 쉽습니다.</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
                <p className="font-bold text-cyan-900 mb-2">PR로 Preview 확인</p>
                <p className="text-sm text-gray-700">main에 직접 푸시하기 전에 브랜치를 만들고 PR을 열어 Vercel Preview에서 먼저 테스트하세요.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <p className="font-bold text-green-900 mb-2">환경 변수 관리</p>
                <p className="text-sm text-gray-700">민감한 정보(API 키, DB URL)는 절대 코드에 하드코딩하지 말고 Vercel 환경 변수로 설정하세요.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                <p className="font-bold text-orange-900 mb-2">배포 로그 모니터링</p>
                <p className="text-sm text-gray-700">배포 후 항상 Vercel 대시보드에서 빌드 로그를 확인하여 경고나 에러가 없는지 점검하세요.</p>
              </div>
            </div>
          </section>

          {/* 추가 리소스 */}
          <section>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">🔗 추가 리소스</h3>
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-300">
              <ul className="text-gray-800 text-sm space-y-2">
                <li>• <strong>개발 이력 확인:</strong> 메인 페이지의 "ℹ️ 정보" 버튼으로 전체 버전 이력 및 크레딧 사용량 조회</li>
                <li>• <strong>GitHub 리포지토리:</strong> <code className="bg-indigo-100 px-2 py-1 rounded">https://github.com/k1300k/vide-block-coding</code></li>
                <li>• <strong>배포 상태 확인:</strong> GitHub Actions 및 Vercel 대시보드에서 실시간 모니터링</li>
                <li>• <strong>피드백 및 이슈:</strong> GitHub Issues 또는 PR에서 새로운 기능 제안 및 버그 리포트</li>
              </ul>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
