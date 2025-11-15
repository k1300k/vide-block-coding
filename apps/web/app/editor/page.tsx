'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const DEFAULT_PROMPT = `# AI Assistant Prompt Template

You are a helpful AI assistant specialized in {{domain}}.

## Context:
{{context}}

## Instructions:
1. Analyze the user's request carefully
2. Provide accurate and helpful information
3. Use {{tone}} tone in your response
4. Include relevant examples when appropriate

## Constraints:
- Keep responses under {{max_words}} words
- Focus on practical solutions
- Avoid {{restrictions}}

User Query: {{user_input}}`;

export default function PromptEditor() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [message, setMessage] = useState('');

  const testPrompt = async () => {
    setIsLoading(true);
    setMessage('');
    setTestResult('');
    
    try {
      const response = await fetch(`${API_URL}/ai/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: prompt.replace(/\{\{.*?\}\}/g, '[VARIABLE]'),
          model: selectedModel
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to test prompt');
      }
      
      const data = await response.json();
      setTestResult(data.output);
      setMessage(`✅ 테스트 완료 (${data.model} | Tokens: ${data.usage.tokens} | Cost: $${data.usage.cost})`);
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setMessage('❌ 테스트 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const savePrompt = () => {
    try {
      localStorage.setItem('ai-vibe-prompt', prompt);
      localStorage.setItem('ai-vibe-prompt-model', selectedModel);
      setMessage('✅ 프롬프트가 로컬에 저장되었습니다');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ 저장 실패');
    }
  };

  const loadPrompt = () => {
    try {
      const savedPrompt = localStorage.getItem('ai-vibe-prompt');
      const savedModel = localStorage.getItem('ai-vibe-prompt-model');
      
      if (savedPrompt) {
        setPrompt(savedPrompt);
        setMessage('✅ 저장된 프롬프트를 불러왔습니다');
      }
      
      if (savedModel) {
        setSelectedModel(savedModel);
      }
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ 불러오기 실패');
    }
  };

  const resetPrompt = () => {
    if (confirm('프롬프트를 기본 템플릿으로 초기화하시겠습니까?')) {
      setPrompt(DEFAULT_PROMPT);
      setTestResult('');
      setMessage('🔄 프롬프트가 초기화되었습니다');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">프롬프트 에디터</h1>
            <p className="text-sm text-gray-500">AI 프롬프트를 작성하고 테스트하세요</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3">Claude 3</option>
              <option value="gemini-pro">Gemini Pro</option>
            </select>
            
            <button
              onClick={loadPrompt}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              📂 불러오기
            </button>
            
            <button
              onClick={resetPrompt}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              🔄 초기화
            </button>
            
            <button
              onClick={testPrompt}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? '테스트 중...' : '🧪 테스트'}
            </button>
            
            <button
              onClick={savePrompt}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              💾 저장
            </button>
          </div>
        </div>
        
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            message.startsWith('✅') ? 'bg-green-50 text-green-800' :
            message.startsWith('❌') ? 'bg-red-50 text-red-800' :
            'bg-blue-50 text-blue-800'
          }`}>
            {message}
          </div>
        )}
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Prompt Editor */}
        <div className="w-1/2 flex flex-col border-r">
          <div className="bg-gray-100 px-4 py-3 text-sm font-medium border-b flex justify-between items-center">
            <span>프롬프트 템플릿</span>
            <span className="text-xs text-gray-500">
              변수: {'{{variable_name}}'} 형식 사용
            </span>
          </div>
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              defaultLanguage="markdown"
              value={prompt}
              onChange={(value) => setPrompt(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
                automaticLayout: true,
                theme: 'vs-dark',
                scrollBeyondLastLine: false,
                renderLineHighlight: 'all',
                bracketPairColorization: {
                  enabled: true
                }
              }}
            />
          </div>
          
          <div className="bg-gray-50 px-4 py-3 border-t text-xs text-gray-600">
            <div className="flex justify-between">
              <span>라인: {prompt.split('\n').length}</span>
              <span>문자: {prompt.length}</span>
              <span>단어: {prompt.split(/\s+/).filter(w => w.length > 0).length}</span>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-gray-100 px-4 py-3 text-sm font-medium border-b">
            테스트 결과 ({selectedModel})
          </div>
          <div className="flex-1 p-6 overflow-auto bg-gray-50">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">AI 모델 응답 대기 중...</p>
                </div>
              </div>
            ) : testResult ? (
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <pre className="whitespace-pre-wrap text-sm font-mono">{testResult}</pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧪</div>
                  <p className="text-lg mb-2">테스트 대기 중</p>
                  <p className="text-sm">
                    "테스트" 버튼을 클릭하여<br/>
                    AI 모델 응답을 확인하세요
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {testResult && !isLoading && (
            <div className="bg-gray-50 px-4 py-3 border-t">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(testResult);
                    setMessage('✅ 결과가 클립보드에 복사되었습니다');
                    setTimeout(() => setMessage(''), 3000);
                  }}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  📋 복사
                </button>
                <button
                  onClick={() => setTestResult('')}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  🗑️ 지우기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

