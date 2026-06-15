import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getApiError } from '../api/client';
import { mindmapApi } from '../api/mindmapApi';
import { CreateMindMapInput } from '../types/mindmap';

export function useMindmaps() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['mindmaps'], queryFn: mindmapApi.list });

  const createMutation = useMutation({
    mutationFn: (input: CreateMindMapInput) => mindmapApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindmaps'] });
      toast.success('Mind map created');
    },
    onError: (error) => toast.error(getApiError(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mindmapApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mindmaps'] });
      toast.success('Mind map deleted');
    },
    onError: (error) => toast.error(getApiError(error)),
  });

  return { ...query, createMindmap: createMutation, deleteMindmap: deleteMutation };
}
