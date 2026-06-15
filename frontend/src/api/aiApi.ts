import { ExpandSuggestion, GeneratedMindMap } from '../types/mindmap';
import { apiClient } from './client';

export const aiApi = {
  async generateMindMap(input: { topic: string; context?: string }) {
    const { data } = await apiClient.post<GeneratedMindMap>('/ai/generate-mindmap', input);
    return data;
  },
  async expandNode(input: { label: string; context?: string }) {
    const { data } = await apiClient.post<{ suggestions: ExpandSuggestion[] }>('/ai/expand-node', input);
    return data;
  },
  async ingest(input: { text?: string; url?: string }) {
    const { data } = await apiClient.post<GeneratedMindMap>('/ai/ingest', input);
    return data;
  },
};
