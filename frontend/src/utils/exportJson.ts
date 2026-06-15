import { MindMap } from '../types/mindmap';
import { MindMapNode } from '../types/node';

export function exportMindMapJson(mindMap: MindMap, nodes: MindMapNode[]) {
  const payload = {
    title: mindMap.title,
    description: mindMap.description,
    exportedAt: new Date().toISOString(),
    nodes: nodes.map((node) => ({
      id: node.id,
      parentId: node.parentId,
      label: node.label,
      description: node.description,
      type: node.type,
      color: node.color,
      position: { x: node.xPosition, y: node.yPosition },
    })),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${mindMap.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'mind-map'}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
