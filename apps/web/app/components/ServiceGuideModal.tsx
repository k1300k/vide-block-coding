'use client';

import { useState } from 'react';

interface ServiceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'intro' | 'contents' | 'deploy';

export function ServiceGuideModal({ isOpen, onClose }: ServiceGuideModalProps) {
  const [selectedStep, setSelectedStep] = useState<Step>('intro');

  if (!isOpen) return null;

  const steps = {
    intro: {
      title: '🚀 Step 1: Intro (프로젝트 초기화)',
      color: 'blue',
      description: '기존 자산을 재활용하여 새 프로젝트를 빠르게 시작합니다.',
      timeReduction: '30분 → 5분 (83% 절감)',
      features: [
        {
          title: 'GitHub 저장소 스캔',
          desc: '기존 GitHub 저장소에서 재사용 가능한 컴포넌트와 설정을 자동으로 찾습니다.',
          icon: '🔍',
        },
        {
          title: '프롬프트 템플릿 선택',
          desc: '검증된 프롬프트 템플릿 라이브러리에서 프로젝트에 맞는 템플릿을 선택합니다.',
          icon: '📋',
        },
        {
          title: '자동 프로젝트 생성',
          desc: 'GitHub 저장소가 자동으로 생성되고 초기 설정이 완료됩니다.',
          icon: '✨',
        },
      ],
      howTo: [
        '워크플로우 빌더에서 "GitHub Auth" 노드를 추가합니다',
        'GitHub 계정으로 로그인하고 저장소 접근 권한을 부여합니다',
        '"Repository Scanner" 노드로 기존 코드를 분석합니다',
        '"Prompt Library" 노드에서 템플릿을 선택합니다',
        '"Create Project" 노드로 새 저장소를 생성합니다',
      ],
      tips: [
        '💡 이전 프로젝트의 인증 컴포넌트를 70% 이상 재사용할 수 있습니다',
        '💡 프롬프트 템플릿은 버전 관리되어 개선 이력을 추적할 수 있습니다',
        '💡 GitHub Actions 워크플로우도 자동으로 생성됩니다',
      ],
    },
    contents: {
      title: '✏️ Step 2: Contents (프롬프트 개발)',
      color: 'green',
      description: 'AI 프롬프트를 개발하고 여러 모델을 비교하여 최적화합니다.',
      timeReduction: 'AI 크레딧 30% 절감',
      features: [
        {
          title: 'Monaco 에디터',
          desc: 'VS Code와 같은 전문가용 편집 환경에서 프롬프트를 작성합니다.',
          icon: '⌨️',
        },
        {
          title: '멀티 AI 모델 비교',
          desc: 'GPT-4, Claude 3, Gemini Pro 등 여러 모델의 결과를 동시에 비교합니다.',
          icon: '🤖',
        },
        {
          title: '실시간 테스트',
          desc: '프롬프트를 수정하면 즉시 결과를 확인하고 최적화합니다.',
          icon: '⚡',
        },
      ],
      howTo: [
        '프롬프트 에디터 페이지로 이동합니다',
        '왼쪽 Monaco 에디터에서 프롬프트를 작성합니다',
        '변수 지원: {{variable}} 형식으로 동적 값을 삽입할 수 있습니다',
        'AI 모델을 선택합니다 (GPT-4, GPT-3.5, Claude 3, Gemini Pro)',
        '"테스트" 버튼을 클릭하여 결과를 확인합니다',
        '여러 모델의 결과를 비교하고 최적의 모델을 선택합니다',
        '"저장" 버튼으로 프롬프트를 로컬에 저장합니다',
      ],
      tips: [
        '💡 구문 강조 기능으로 프롬프트 구조를 명확하게 파악할 수 있습니다',
        '💡 자동 완성 기능으로 빠르게 프롬프트를 작성할 수 있습니다',
        '💡 통계 표시로 토큰 수를 예측하여 비용을 절감할 수 있습니다',
        '💡 결과를 복사하여 다른 도구와 연동할 수 있습니다',
      ],
    },
    deploy: {
      title: '🔧 Step 3: Deploy (배포 자동화)',
      color: 'orange',
      description: 'GitHub, 데이터베이스, 클라우드 플랫폼에 자동으로 배포합니다.',
      timeReduction: '45분 → 7분 (84% 절감)',
      features: [
        {
          title: 'Vercel/Netlify 배포',
          desc: '원클릭으로 프로덕션 환경에 배포하고 도메인을 자동 설정합니다.',
          icon: '☁️',
        },
        {
          title: 'Supabase 설정',
          desc: 'PostgreSQL 데이터베이스와 인증 시스템을 자동으로 구성합니다.',
          icon: '🗄️',
        },
        {
          title: '환경 변수 관리',
          desc: 'API 키와 설정값을 안전하게 저장하고 자동으로 주입합니다.',
          icon: '🔐',
        },
      ],
      howTo: [
        '워크플로우 빌더에서 "Vercel Deploy" 노드를 추가합니다',
        'Vercel 계정으로 로그인합니다',
        '배포할 프로젝트와 브랜치를 선택합니다',
        '"Database Setup" 노드로 Supabase를 연결합니다',
        '필요한 환경 변수를 입력합니다',
        '"Deploy" 버튼을 클릭하면 자동으로 배포가 진행됩니다',
        '배포 완료 후 생성된 URL로 바로 접속할 수 있습니다',
      ],
      tips: [
        '💡 GitHub Actions가 자동으로 설정되어 push할 때마다 재배포됩니다',
        '💡 Supabase pgvector로 벡터 검색 기능도 사용할 수 있습니다',
        '💡 환경 변수는 암호화되어 안전하게 저장됩니다',
        '💡 배포 상태를 실시간으로 모니터링할 수 있습니다',
      ],
    },
  };

  const currentStep = steps[selectedStep];
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-5xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className={`sticky top-0 ${colorClasses[currentStep.color as keyof typeof colorClasses]} text-white p-6 flex justify-between items-center`}>
          <div>
            <h1 className="text-3xl font-bold mb-2">📖 서비스 사용 가이드</h1>
            <p className="text-sm opacity-90">3단계로 완성하는 AI 앱 개발 워크플로우</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-80 transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 border-b">
          <button
            onClick={() => setSelectedStep('intro')}
            className={`p-4 rounded-lg font-semibold transition-all ${
              selectedStep === 'intro'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl mb-1">🚀</div>
            <div className="text-sm">Step 1: Intro</div>
          </button>
          <button
            onClick={() => setSelectedStep('contents')}
            className={`p-4 rounded-lg font-semibold transition-all ${
              selectedStep === 'contents'
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl mb-1">✏️</div>
            <div className="text-sm">Step 2: Contents</div>
          </button>
          <button
            onClick={() => setSelectedStep('deploy')}
            className={`p-4 rounded-lg font-semibold transition-all ${
              selectedStep === 'deploy'
                ? 'bg-orange-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl mb-1">🔧</div>
            <div className="text-sm">Step 3: Deploy</div>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">{currentStep.title}</h2>
            <p className="text-xl text-gray-700 mb-2">{currentStep.description}</p>
            <div className="inline-block bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 px-4 py-2 rounded-lg">
              <span className="font-bold text-green-700">⚡ {currentStep.timeReduction}</span>
            </div>
          </div>

          {/* Main Features */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">✨ 주요 기능</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStep.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border-2 border-gray-300"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-700 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">📝 사용 방법</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ol className="space-y-3">
                {currentStep.howTo.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">💡 활용 팁</h3>
            <div className="space-y-3">
              {currentStep.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg"
                >
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <button
              onClick={() => {
                if (selectedStep === 'contents') setSelectedStep('intro');
                else if (selectedStep === 'deploy') setSelectedStep('contents');
              }}
              disabled={selectedStep === 'intro'}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedStep === 'intro'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              ← 이전 단계
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {selectedStep === 'intro' && 'Step 1 of 3'}
                {selectedStep === 'contents' && 'Step 2 of 3'}
                {selectedStep === 'deploy' && 'Step 3 of 3'}
              </p>
            </div>

            <button
              onClick={() => {
                if (selectedStep === 'intro') setSelectedStep('contents');
                else if (selectedStep === 'contents') setSelectedStep('deploy');
                else onClose();
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedStep === 'deploy'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {selectedStep === 'deploy' ? '시작하기 ✨' : '다음 단계 →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
