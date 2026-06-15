import { CreateNodeInput, MindMapNode, UpdateNodeInput } from '../types/node';
import { apiClient } from './client';

export const nodeApi = {
  async list(mindMapId: string) {
    const { data } = await apiClient.get<MindMapNode[]>(`/mindmaps/${mindMapId}/nodes`);
    return data;
  },
  async create(mindMapId: string, input: CreateNodeInput) {
    const { data } = await apiClient.post<MindMapNode>(`/mindmaps/${mindMapId}/nodes`, input);
    return data;
  },
  async update(id: string, input: UpdateNodeInput) {
    const { data } = await apiClient.patch<MindMapNode>(`/nodes/${id}`, input);
    return data;
  },
  async remove(id: string) {
    const { data } = await apiClient.delete<{ success: true }>(`/nodes/${id}`);
    return data;
  },
};
