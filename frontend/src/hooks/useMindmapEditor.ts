import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { aiApi } from '../api/aiApi';
import { getApiError } from '../api/client';
import { mindmapApi } from '../api/mindmapApi';
import { nodeApi } from '../api/nodeApi';
import { CreateNodeInput, MindMapNode, UpdateNodeInput } from '../types/node';

export function useMindmapEditor(mindMapId: string) {
  const queryClient = useQueryClient();
  const mindMapQuery = useQuery({ queryKey: ['mindmap', mindMapId], queryFn: () => mindmapApi.get(mindMapId) });
  const nodesQuery = useQuery({ queryKey: ['nodes', mindMapId], queryFn: () => nodeApi.list(mindMapId) });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['mindmap', mindMapId] });
    queryClient.invalidateQueries({ queryKey: ['nodes', mindMapId] });
  };

  const createNode = useMutation({
    mutationFn: (input: CreateNodeInput) => nodeApi.create(mindMapId, input),
    onSuccess: invalidate,
    onError: (error) => toast.error(getApiError(error)),
  });

  const updateNode = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateNodeInput }) => nodeApi.update(id, input),
    onSuccess: invalidate,
    onError: (error) => toast.error(getApiError(error)),
  });

  const deleteNode = useMutation({
    mutationFn: (id: string) => nodeApi.remove(id),
    onSuccess: invalidate,
    onError: (error) => toast.error(getApiError(error)),
  });

  const generateMindMap = useMutation({ mutationFn: aiApi.generateMindMap, onError: (error) => toast.error(getApiError(error)) });
  const expandNode = useMutation({ mutationFn: aiApi.expandNode, onError: (error) => toast.error(getApiError(error)) });

  async function insertGeneratedNodes(nodes: Array<{ label: string; description: string; type: CreateNodeInput['type']; parentLabel: string | null }>) {
    const createdByLabel = new Map<string, MindMapNode>();
    const existing = nodesQuery.data ?? [];
    for (const [index, node] of nodes.entries()) {
      const parent = node.parentLabel ? createdByLabel.get(node.parentLabel) ?? existing.find((item) => item.label === node.parentLabel) : null;
      const created = await nodeApi.create(mindMapId, {
        label: node.label,
        description: node.description,
        type: node.type,
        parentId: parent?.id ?? null,
        color: index === 0 ? '#6366f1' : '#10b981',
        xPosition: 120 + (index % 4) * 260,
        yPosition: 120 + Math.floor(index / 4) * 150,
      });
      createdByLabel.set(node.label, created);
    }
    invalidate();
    toast.success('AI nodes inserted');
  }

  return {
    mindMapQuery,
    nodesQuery,
    createNode,
    updateNode,
    deleteNode,
    generateMindMap,
    expandNode,
    insertGeneratedNodes,
  };
}
