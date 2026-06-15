import { ReactFlowProvider } from '@xyflow/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { aiApi } from '../api/aiApi';
import { AIGenerateModal } from '../components/mindmap/AIGenerateModal';
import { AIExpandPanel } from '../components/mindmap/AIExpandPanel';
import { EditorSidebar } from '../components/mindmap/EditorSidebar';
import { MindMapCanvas } from '../components/mindmap/MindMapCanvas';
import { NodeInspector } from '../components/mindmap/NodeInspector';
import { useMindmapEditor } from '../hooks/useMindmapEditor';
import { ExpandSuggestion } from '../types/mindmap';
import { MindMapNode, NodeType } from '../types/node';
import { exportMindMapJson } from '../utils/exportJson';

export function MindMapEditorPage() {
  const { id } = useParams();
  const mindMapId = id ?? '';
  const editor = useMindmapEditor(mindMapId);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filter, setFilter] = useState<NodeType | 'ALL'>('ALL');
  const [generateOpen, setGenerateOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<ExpandSuggestion[]>([]);

  // Refs to canvas-exposed functions
  const layoutFnRef = useRef<(() => void) | null>(null);
  const exportFnRef = useRef<(() => void) | null>(null);

  const nodes = editor.nodesQuery.data ?? [];
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;
  const visibleNodes = useMemo(
    () => (filter === 'ALL' ? nodes : nodes.filter((node) => node.type === filter)),
    [filter, nodes],
  );

  const handleLayoutReady = useCallback((fn: () => void) => { layoutFnRef.current = fn; }, []);
  const handleExportReady = useCallback((fn: () => void) => { exportFnRef.current = fn; }, []);

  if (editor.mindMapQuery.isLoading) {
    return <main className="grid flex-1 place-items-center text-slate-500">Loading editor...</main>;
  }
  if (!editor.mindMapQuery.data) {
    return <main className="grid flex-1 place-items-center text-slate-500">Study flow not found.</main>;
  }

  const mindMap = editor.mindMapQuery.data;

  async function addNode(parentId?: string | null, suggestion?: ExpandSuggestion) {
    const count = nodes.length;
    const node = await editor.createNode.mutateAsync({
      parentId: parentId ?? null,
      label: suggestion?.label ?? `New Node ${count + 1}`,
      description: suggestion?.description ?? '',
      type: suggestion?.type ?? 'SUBTOPIC',
      color: suggestion ? '#10b981' : '#6366f1',
      xPosition: 180 + (count % 4) * 240,
      yPosition: 160 + Math.floor(count / 4) * 140,
    });
    setSelectedNodeId(node.id);
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col overflow-hidden lg:flex-row">
      <EditorSidebar
        mindMap={mindMap}
        activeType={filter}
        onTypeChange={setFilter}
        onAddNode={() => addNode(selectedNode?.id)}
        onGenerate={() => setGenerateOpen(true)}
        onExportJson={() => exportMindMapJson(mindMap, nodes)}
        onExportPng={() => {
          if (exportFnRef.current) {
            exportFnRef.current();
            toast.success('Exporting PNG...');
          }
        }}
        onAutoLayout={() => {
          if (layoutFnRef.current) {
            layoutFnRef.current();
            toast.success('Layout applied');
          }
        }}
      />

      <section className="relative min-h-[560px] flex-1 bg-slate-100">
        <ReactFlowProvider>
          <MindMapCanvas
            nodes={visibleNodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={(node: MindMapNode | null) => setSelectedNodeId(node?.id ?? null)}
            onMoveNode={(nodeId, position) =>
              editor.updateNode.mutate({ id: nodeId, input: { xPosition: position.x, yPosition: position.y } })
            }
            onConnectNodes={(sourceId, targetId) =>
              editor.updateNode.mutate({ id: targetId, input: { parentId: sourceId } })
            }
            onLayoutReady={handleLayoutReady}
            onExportReady={handleExportReady}
          />
        </ReactFlowProvider>

        <AIExpandPanel
          suggestions={suggestions}
          onClose={() => setSuggestions([])}
          onAdd={(items) => {
            if (!selectedNode) return;
            items.forEach((item) => void addNode(selectedNode.id, item));
            setSuggestions([]);
          }}
        />
      </section>

      <NodeInspector
        node={selectedNode}
        onUpdate={(input) => {
          if (!selectedNode) return;
          editor.updateNode.mutate({ id: selectedNode.id, input });
        }}
        onDelete={() => {
          if (!selectedNode) return;
          editor.deleteNode.mutate(selectedNode.id);
          setSelectedNodeId(null);
        }}
        onExpand={async () => {
          if (!selectedNode) return;
          const result = await editor.expandNode.mutateAsync({
            label: selectedNode.label,
            context: mindMap.title,
          });
          setSuggestions(result.suggestions);
          toast.success('AI suggestions ready');
        }}
      />

      <AIGenerateModal
        open={generateOpen}
        loading={editor.generateMindMap.isPending}
        onClose={() => setGenerateOpen(false)}
        onGenerate={(input) => editor.generateMindMap.mutateAsync(input)}
        onIngest={async (input) => {
          const result = await aiApi.ingest(input);
          return result;
        }}
        onInsert={async (map) => {
          await editor.insertGeneratedNodes(map.nodes);
          setGenerateOpen(false);
        }}
      />
    </main>
  );
}
