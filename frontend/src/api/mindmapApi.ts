import { CreateMindMapInput, MindMap, UpdateMindMapInput } from '../types/mindmap';
import { apiClient } from './client';

export const mindmapApi = {
  async list() {
    const { data } = await apiClient.get<MindMap[]>('/mindmaps');
    return data;
  },
  async get(id: string) {
    const { data } = await apiClient.get<MindMap>(`/mindmaps/${id}`);
    return data;
  },
  async create(input: CreateMindMapInput) {
    const { data } = await apiClient.post<MindMap>('/mindmaps', input);
    return data;
  },
  async update(id: string, input: UpdateMindMapInput) {
    const { data } = await apiClient.patch<MindMap>(`/mindmaps/${id}`, input);
    return data;
  },
  async remove(id: string) {
    const { data } = await apiClient.delete<{ success: true }>(`/mindmaps/${id}`);
    return data;
  },
};
