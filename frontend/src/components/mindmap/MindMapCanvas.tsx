import { Background, Connection, Controls, MiniMap, ReactFlow, useReactFlow } from '@xyflow/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MindMapNode } from '../../types/node';
import { applyDagreLayout } from '../../utils/dagreLayout';
import { toFlowEdges, toFlowNodes } from '../../utils/nodeMapper';
import { CustomMindMapNode } from './CustomMindMapNode';

const nodeTypes = { mindMapNode: CustomMindMapNode };

interface MindMapCanvasProps {
  nodes: MindMapNode[];
  selectedNodeId: string | null;
  onSelectNode: (node: MindMapNode | null) => void;
  onMoveNode: (nodeId: string, position: { x: number; y: number }) => void;
  onConnectNodes: (sourceId: string, targetId: string) => void;
  onLayoutReady?: (layoutFn: () => void) => void;
  onExportReady?: (exportFn: () => void) => void;
}

function CanvasInner({
  nodes,
  selectedNodeId,
  onSelectNode,
  onMoveNode,
  onConnectNodes,
  onLayoutReady,
  onExportReady,
}: MindMapCanvasProps) {
  const { fitView, getNodes, getEdges, setNodes } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);

  const flowNodes = useMemo(() => toFlowNodes(nodes, selectedNodeId), [nodes, selectedNodeId]);
  const flowEdges = useMemo(() => toFlowEdges(nodes), [nodes]);

  // Auto-layout via dagre
  const runLayout = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    const laid = applyDagreLayout(currentNodes, currentEdges, 'TB');
    setNodes(laid);
    setTimeout(() => fitView({ padding: 0.15, duration: 500 }), 50);
  }, [getNodes, getEdges, setNodes, fitView]);

  // PNG export
  const exportPng = useCallback(async () => {
    if (!containerRef.current) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(containerRef.current, {
      backgroundColor: '#f1f5f9',
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.download = 'studyflow.png';
    link.href = dataUrl;
    link.click();
  }, []);

  // Expose functions to parent
  useEffect(() => { onLayoutReady?.(runLayout); }, [runLayout, onLayoutReady]);
  useEffect(() => { onExportReady?.(exportPng); }, [exportPng, onExportReady]);

  function handleConnect(connection: Connection) {
    if (connection.source && connection.target) {
      onConnectNodes(connection.source, connection.target);
    }
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        onPaneClick={() => onSelectNode(null)}
        onNodeClick={(_, node) => onSelectNode(nodes.find((item) => item.id === node.id) ?? null)}
        onNodeDragStop={(_, node) => onMoveNode(node.id, node.position)}
        onConnect={handleConnect}
      >
        <Background color="#cbd5e1" gap={22} />
        <MiniMap pannable zoomable nodeStrokeWidth={3} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export function MindMapCanvas(props: MindMapCanvasProps) {
  // CanvasInner must live inside ReactFlowProvider (provided by MindMapEditorPage)
  return <CanvasInner {...props} />;
}
