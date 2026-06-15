import { Edge, Node } from '@xyflow/react';
import { MindMapNode } from '../types/node';

export type FlowNodeData = MindMapNode & { selected?: boolean } & Record<string, unknown>;
export type MindMapFlowNode = Node<FlowNodeData, 'mindMapNode'>;

export function toFlowNodes(nodes: MindMapNode[], selectedNodeId?: string | null): MindMapFlowNode[] {
  return nodes.map((node) => ({
    id: node.id,
    type: 'mindMapNode',
    position: { x: node.xPosition, y: node.yPosition },
    data: { ...node, selected: selectedNodeId === node.id },
  }));
}

export function toFlowEdges(nodes: MindMapNode[]): Edge[] {
  return nodes
    .filter((node) => node.parentId)
    .map((node) => ({
      id: `${node.parentId}-${node.id}`,
      source: node.parentId as string,
      target: node.id,
      type: 'smoothstep',
      animated: false,
      style: { stroke: node.color ?? '#6366f1', strokeWidth: 2 },
    }));
}
