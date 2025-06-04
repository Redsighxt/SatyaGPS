import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { StudentProgress, Achievement } from '@shared/schema';

export function useProgress(userId: number = 1) {
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery<StudentProgress[]>({
    queryKey: ['/api/progress', userId],
  });

  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements', userId],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (data: { module: string; score: number; timeSpent: number; completed: boolean }) => {
      return apiRequest('POST', '/api/progress', { ...data, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress', userId] });
      queryClient.invalidateQueries({ queryKey: ['/api/achievements', userId] });
    },
  });

  const getModuleProgress = (moduleId: string) => {
    return progress?.find(p => p.module === moduleId);
  };

  const getOverallProgress = () => {
    if (!progress) return 0;
    const completed = progress.filter(p => p.completed).length;
    return Math.round((completed / 4) * 100); // 4 total modules
  };

  const getTotalStars = () => {
    if (!progress) return 0;
    return progress.reduce((total, p) => total + p.score, 0);
  };

  const updateProgress = (module: string, score: number, timeSpent: number, completed: boolean = false) => {
    updateProgressMutation.mutate({ module, score, timeSpent, completed });
  };

  return {
    progress,
    achievements,
    isLoading,
    getModuleProgress,
    getOverallProgress,
    getTotalStars,
    updateProgress,
    isUpdating: updateProgressMutation.isPending
  };
}
