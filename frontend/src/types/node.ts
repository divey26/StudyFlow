export type NodeType = 'TOPIC' | 'SUBTOPIC' | 'TASK' | 'RESOURCE' | 'NOTE';

export type MindMapNode = {
  id: string;
  mindMapId: string;
  parentId: string | null;
  label: string;
  description?: string | null;
  type: NodeType;
  color?: string | null;
  xPosition: number;
  yPosition: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateNodeInput = {
  parentId?: string | null;
  label: string;
  description?: string;
  type: NodeType;
  color?: string;
  xPosition: number;
  yPosition: number;
};

export type UpdateNodeInput = Partial<CreateNodeInput>;
