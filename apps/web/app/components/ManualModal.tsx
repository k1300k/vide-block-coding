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
      <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto w-full">
        <div className="sticky top-0 bg-gray-100 p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">서비스 설명 매뉴얼</h2>
          <button onClick={onClose} className="text-2xl">✕</button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">서비스 개요</h3>
            <p className="text-gray-700">AI Vibe Workflow는 AI 기반 프롬프트 개발과 워크플로우 자동화를 지원하는 플랫폼입니다. 프로젝트 초기화부터 프롬프트 에디팅, 배포까지 3단계로 구성되어 있습니다.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">사용 방법 (빠른 가이드)</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>워크플로우 빌더로 이동: 화면의 "워크플로우 빌더 시작하기" 버튼을 클릭합니다.</li>
              <li>프롬프트 생성: 에디터에서 프롬프트를 만들고 테스트합니다.</li>
              <li>버전 관리: 변경사항을 저장하고 버전으로 기록합니다. 개발 이력에서 상세 정보를 확인하세요.</li>
              <li>배포: 변경사항을 GitHub에 커밋/푸시하면 자동으로 배포 프로세스가 시작됩니다.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">주요 기능</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>프롬프트 비교 및 A/B 테스트</li>
              <li>버전별 크레딧 사용량 관리</li>
              <li>모노레포 지원 (앱 루트: <code>apps/web</code>)</li>
              <li>CI를 통한 자동 배포 연동 (Vercel)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">배포 및 설정 주의사항</h3>
            <p className="text-gray-700">레포를 Vercel과 연결하거나 GitHub Actions에 VERCEL_TOKEN을 설정해야 자동 배포가 정상 작동합니다. 모노레포인 경우 빌드 루트가 <code>apps/web</code>로 지정되어야 합니다.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">자주 묻는 질문</h3>
            <dl className="text-gray-700 space-y-3">
              <dt className="font-semibold">Q: Codespaces에서 수정만 하면 배포되나요?</dt>
              <dd>A: 아니요. 변경사항을 GitHub에 푸시하거나 Vercel CLI로 직접 배포해야 합니다.</dd>

              <dt className="font-semibold">Q: 프리뷰 배포는 어떻게 확인하나요?</dt>
              <dd>A: PR을 생성하면 Vercel이 Preview 배포를 생성합니다. Vercel 대시보드 또는 PR 체크에서 링크를 확인하세요.</dd>
            </dl>
          </section>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
