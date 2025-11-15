'use client';

import { useState } from 'react';
import { developmentHistory, serviceInfo } from '@/app/data/developmentHistory';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedVersionData = selectedVersion
    ? developmentHistory.find((v) => v.id === selectedVersion)
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{serviceInfo.title}</h1>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-80 transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!selectedVersion ? (
            <>
              {/* Service Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">서비스 소개</h2>
                <p className="text-xl font-semibold text-indigo-600 mb-2">{serviceInfo.subtitle}</p>
                <p className="text-gray-700 mb-6">{serviceInfo.description}</p>

                {/* 3-Stage Workflow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {serviceInfo.workflow.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-lg border-2 border-indigo-300"
                    >
                      <h3 className="text-xl font-bold mb-2 text-indigo-700">{step.stage}</h3>
                      <p className="text-gray-700 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {serviceInfo.goals.map((goal, idx) => (
                    <div
                      key={idx}
                      className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <p className="text-gray-700">{goal.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credits by Solution */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg mb-8 border-2 border-indigo-200">
                <h3 className="text-xl font-bold mb-4">💳 솔루션별 크레딧 사용 현황</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">총 버전 이력</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {serviceInfo.totalVersions}
                    </p>
                    <p className="text-sm text-gray-600">개 버전의 개발 이력</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(serviceInfo.getCreditsSummary()).map(([solution, credits]) => (
                    <div key={solution} className="bg-white p-3 rounded-lg border border-indigo-200">
                      <p className="text-gray-600 text-xs font-semibold">{solution}</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">~{credits}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Methodology */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-600">
                <h3 className="text-lg font-bold mb-2">개발 방식</h3>
                <p className="text-gray-700 font-semibold text-lg">
                  {serviceInfo.developmentMethod}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  사용자의 실시간 피드백과 프롬프트 기반의 반복적인 개선을 통해 서비스가 진화했습니다.
                </p>
              </div>

              {/* Development History */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">개발 이력 및 개선사항</h2>
                <div className="space-y-4">
                  {developmentHistory.map((version) => (
                    <button
                      key={version.id}
                      onClick={() => setSelectedVersion(version.id)}
                      className="w-full text-left bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 p-6 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl font-bold text-indigo-700">
                              {version.version}
                            </h3>
                            <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                              {version.title}
                            </span>
                            <div className="flex gap-2">
                              {version.credits.v0 && (
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">V0: {version.credits.v0}</span>
                              )}
                              {version.credits.lovable && (
                                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Lovable: {version.credits.lovable}</span>
                              )}
                              {version.credits.cursor && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Cursor: {version.credits.cursor}</span>
                              )}
                              {version.credits.other && (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Other: {version.credits.other}</span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2 font-medium">
                            {version.description}
                          </p>
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {version.impact}
                          </p>
                        </div>
                        <div className="text-indigo-600 text-xl ml-4">→</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Version Detail */}
              {selectedVersionData && (
                <div>
                  <button
                    onClick={() => setSelectedVersion(null)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6"
                  >
                    ← 목록으로 돌아가기
                  </button>

                  {/* Version Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-lg mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold">
                        {selectedVersionData.version}
                      </h2>
                      <span className="bg-indigo-400 px-4 py-1 rounded-full text-sm font-semibold">
                        {selectedVersionData.title}
                      </span>
                    </div>
                    <p className="text-indigo-100 mb-3">
                      {selectedVersionData.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedVersionData.credits.v0 && (
                        <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded">🔵 V0: {selectedVersionData.credits.v0}</span>
                      )}
                      {selectedVersionData.credits.lovable && (
                        <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded">💜 Lovable: {selectedVersionData.credits.lovable}</span>
                      )}
                      {selectedVersionData.credits.cursor && (
                        <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded">🟢 Cursor: {selectedVersionData.credits.cursor}</span>
                      )}
                      {selectedVersionData.credits.other && (
                        <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded">📌 Other: {selectedVersionData.credits.other}</span>
                      )}
                    </div>
                  </div>

                  {/* Version Details */}
                  <div className="space-y-6">
                    {/* User Prompt */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        👤 사용자 프롬프트
                      </h3>
                      <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-indigo-600">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          "{selectedVersionData.userPrompt}"
                        </p>
                      </div>
                    </div>

                    {/* Added Features */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        ✨ 추가된 기능
                      </h3>
                      <ul className="space-y-2">
                        {selectedVersionData.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="text-indigo-600 font-bold mt-1">
                              •
                            </span>
                            <span>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        🎯 서비스 영향
                      </h3>
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-200">
                        <p className="text-gray-700">
                          {selectedVersionData.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
