import { MindMapNode } from './node';

export type MindMap = {
  id: string;
  title: string;
  description?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  nodes?: MindMapNode[];
  _count?: { nodes: number };
};

export type CreateMindMapInput = {
  title: string;
  description?: string;
};

export type UpdateMindMapInput = Partial<CreateMindMapInput>;

export type GeneratedMindMapNode = {
  label: string;
  type: 'TOPIC' | 'SUBTOPIC' | 'TASK' | 'RESOURCE' | 'NOTE';
  description: string;
  parentLabel: string | null;
};

export type GeneratedMindMap = {
  title: string;
  nodes: GeneratedMindMapNode[];
};

export type ExpandSuggestion = Omit<GeneratedMindMapNode, 'parentLabel'>;
