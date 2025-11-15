'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  addEdge, 
  useNodesState, 
  useEdgesState,
  Node,
  Edge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const initialNodes: Node[] = [
  { 
    id: 'intro', 
    position: { x: 100, y: 100 }, 
    data: { 
      label: 'Intro Stage',
      stage: 'intro',
      components: []
    }, 
    type: 'default',
    style: { background: '#e8f5e8', border: '2px solid #4caf50', padding: 10, borderRadius: 8 }
  },
  { 
    id: 'contents', 
    position: { x: 400, y: 100 }, 
    data: { 
      label: 'Contents Stage',
      stage: 'contents',
      components: []
    },
    style: { background: '#e3f2fd', border: '2px solid #2196f3', padding: 10, borderRadius: 8 }
  },
  { 
    id: 'deploy', 
    position: { x: 700, y: 100 }, 
    data: { 
      label: 'Deploy Stage',
      stage: 'deploy',
      components: []
    }, 
    type: 'output',
    style: { background: '#fce4ec', border: '2px solid #e91e63', padding: 10, borderRadius: 8 }
  }
];

const initialEdges: Edge[] = [
  { id: 'intro-contents', source: 'intro', target: 'contents', animated: true },
  { id: 'contents-deploy', source: 'contents', target: 'deploy', animated: true }
];

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const saveWorkflow = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      // Create project first
      const projectRes = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `Workflow-${new Date().toLocaleDateString('ko-KR')}`,
          description: '워크플로우 빌더에서 생성됨'
        })
      });
      
      if (!projectRes.ok) {
        throw new Error('Failed to create project');
      }
      
      const { project } = await projectRes.json();

      // Save workflow
      const workflowRes = await fetch(`${API_URL}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectId: project.id, 
          definition: { nodes, edges }
        })
      });
      
      if (!workflowRes.ok) {
        throw new Error('Failed to save workflow');
      }
      
      const { workflow } = await workflowRes.json();

      setMessage(`✅ 워크플로우 저장 완료! Project: ${project.name}, Workflow ID: ${workflow.id}`);
    } catch (error) {
      setMessage(`❌ 저장 실패: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const executeWorkflow = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${API_URL}/workflows/demo/execute`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to execute workflow');
      }
      
      const { execution } = await response.json();
      setMessage(`✅ 워크플로우 실행 시작! Execution ID: ${execution.id}`);
    } catch (error) {
      setMessage(`❌ 실행 실패: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addComponent = (stage: string, componentType: string) => {
    const newNode: Node = {
      id: `${componentType}-${Date.now()}`,
      position: { x: 150 + Math.random() * 300, y: 250 + Math.random() * 200 },
      data: { 
        label: componentType,
        stage,
        type: componentType
      },
      style: { 
        background: stage === 'intro' ? '#c8e6c9' : 
                   stage === 'contents' ? '#bbdefb' : '#f8bbd9',
        border: '1px solid #666',
        padding: 10,
        borderRadius: 6,
        fontSize: 12
      }
    };
    setNodes((nds) => [...nds, newNode]);
    setMessage(`➕ ${componentType} 컴포넌트 추가됨`);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">워크플로우 빌더</h1>
            <p className="text-sm text-gray-500">드래그 앤 드롭으로 워크플로우를 구성하세요</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={saveWorkflow}
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50 transition-colors"
            >
              {isLoading ? '저장 중...' : '💾 저장'}
            </button>
            <button
              onClick={executeWorkflow}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 transition-colors"
            >
              {isLoading ? '실행 중...' : '▶️ 실행'}
            </button>
          </div>
        </div>
        
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            message.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Component Palette */}
        <div className="w-80 bg-gray-50 p-4 overflow-y-auto border-r">
          <h3 className="text-lg font-bold mb-4 text-gray-800">컴포넌트 라이브러리</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-intro-700 flex items-center gap-2">
              <span className="text-xl">🚀</span> Intro 컴포넌트
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => addComponent('intro', 'GitHub Auth')}
                className="w-full p-3 bg-intro-100 hover:bg-intro-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">🔐 GitHub Authentication</div>
                <div className="text-xs text-gray-600 mt-1">OAuth 2.0 인증</div>
              </button>
              <button
                onClick={() => addComponent('intro', 'Landing Page')}
                className="w-full p-3 bg-intro-100 hover:bg-intro-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">🏠 Landing Page Scanner</div>
                <div className="text-xs text-gray-600 mt-1">기존 랜딩페이지 재활용</div>
              </button>
              <button
                onClick={() => addComponent('intro', 'UI Components')}
                className="w-full p-3 bg-intro-100 hover:bg-intro-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">🎨 UI Component Library</div>
                <div className="text-xs text-gray-600 mt-1">공통 UI 컴포넌트</div>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-contents-700 flex items-center gap-2">
              <span className="text-xl">✏️</span> Contents 컴포넌트
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => addComponent('contents', 'Prompt Editor')}
                className="w-full p-3 bg-contents-100 hover:bg-contents-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">✏️ Prompt Editor</div>
                <div className="text-xs text-gray-600 mt-1">고급 프롬프트 편집기</div>
              </button>
              <button
                onClick={() => addComponent('contents', 'AI Model')}
                className="w-full p-3 bg-contents-100 hover:bg-contents-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">🤖 AI Model Comparison</div>
                <div className="text-xs text-gray-600 mt-1">멀티 모델 비교</div>
              </button>
              <button
                onClick={() => addComponent('contents', 'Knowledge Base')}
                className="w-full p-3 bg-contents-100 hover:bg-contents-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">📚 Knowledge Base</div>
                <div className="text-xs text-gray-600 mt-1">벡터 DB 연동</div>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-deploy-700 flex items-center gap-2">
              <span className="text-xl">🔧</span> Deploy 컴포넌트
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => addComponent('deploy', 'Database Setup')}
                className="w-full p-3 bg-deploy-100 hover:bg-deploy-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">🗄️ Database Configuration</div>
                <div className="text-xs text-gray-600 mt-1">DB 자동 설정</div>
              </button>
              <button
                onClick={() => addComponent('deploy', 'GitHub Actions')}
                className="w-full p-3 bg-deploy-100 hover:bg-deploy-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">⚙️ GitHub Actions CI/CD</div>
                <div className="text-xs text-gray-600 mt-1">자동 배포 파이프라인</div>
              </button>
              <button
                onClick={() => addComponent('deploy', 'Cloud Deploy')}
                className="w-full p-3 bg-deploy-100 hover:bg-deploy-200 rounded-lg text-sm text-left transition-colors"
              >
                <div className="font-medium">☁️ Cloud Deployment</div>
                <div className="text-xs text-gray-600 mt-1">클라우드 배포</div>
              </button>
            </div>
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-gray-100"
          >
            <Background color="#aaa" gap={16} />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                if (node.data.stage === 'intro') return '#4caf50';
                if (node.data.stage === 'contents') return '#2196f3';
                return '#e91e63';
              }}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

