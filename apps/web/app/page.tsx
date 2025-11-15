'use client';

import Link from 'next/link'
import { useState } from 'react'
import { InfoModal } from '@/app/components/InfoModal'

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-6xl font-bold text-center flex-1">
            AI Vibe Workflow
          </h1>
          <button
            onClick={() => setIsInfoOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors whitespace-nowrap"
            title="개발 이력 및 서비스 정보"
          >
            ℹ️ 정보
          </button>
        </div>
        
        <p className="text-xl text-center mb-12 text-gray-600">
          AI 개발자를 위한 3단계 워크플로우 자동화 플랫폼
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-intro-50 p-6 rounded-lg border-2 border-intro-500">
            <h3 className="text-2xl font-bold mb-3 text-intro-700">
              🚀 Intro
            </h3>
            <p className="text-gray-700">
              로그인 시스템, 랜딩페이지, UI 컴포넌트 자동 재활용
            </p>
          </div>

          <div className="bg-contents-50 p-6 rounded-lg border-2 border-contents-500">
            <h3 className="text-2xl font-bold mb-3 text-contents-700">
              ✏️ Contents
            </h3>
            <p className="text-gray-700">
              프롬프트 개발, AI 모델 비교, 지식 베이스 연동
            </p>
          </div>

          <div className="bg-deploy-50 p-6 rounded-lg border-2 border-deploy-500">
            <h3 className="text-2xl font-bold mb-3 text-deploy-700">
              🔧 Deploy
            </h3>
            <p className="text-gray-700">
              GitHub Actions, 데이터베이스, 클라우드 자동 배포
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/builder"
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg transition-colors"
          >
            워크플로우 빌더 시작하기
          </Link>
          <Link
            href="/editor"
            className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg transition-colors"
          >
            프롬프트 에디터 열기
          </Link>
        </div>

        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            프로젝트 설정 시간 60% 단축 | 자산 재사용률 70% | AI 크레딧 30% 절감
          </p>
        </div>
      </div>

      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </main>
  )
}

