import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UserProgress, Badge } from "@shared/schema";

export function useProgress(userId: number) {
  const queryClient = useQueryClient();

  const { data: progress = [] } = useQuery<UserProgress[]>({
    queryKey: [`/api/progress/${userId}`],
  });

  const { data: badges = [] } = useQuery<Badge[]>({
    queryKey: [`/api/badges/${userId}`],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (data: { moduleId: string; completed: boolean; score: number; timeSpent: number }) => {
      const response = await apiRequest("POST", "/api/progress", {
        userId,
        ...data
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/progress/${userId}`] });
    },
  });

  const awardBadgeMutation = useMutation({
    mutationFn: async (data: { badgeType: string; badgeName: string }) => {
      const response = await apiRequest("POST", "/api/badges", {
        userId,
        ...data
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/badges/${userId}`] });
    },
  });

  const completedModules = progress.filter(p => p.completed).length;
  const totalModules = 4; // Number magic, Number building, Number families, Square world
  const overallProgress = Math.round((completedModules / totalModules) * 100);
  const totalStars = progress.reduce((sum, p) => sum + p.score, 0) + badges.length * 10;
  const currentStreak = 5; // This would be calculated based on completion dates

  return {
    progress,
    badges,
    completedModules,
    overallProgress,
    totalStars,
    currentStreak,
    updateProgress: updateProgressMutation.mutate,
    awardBadge: awardBadgeMutation.mutate,
    isUpdating: updateProgressMutation.isPending,
  };
}
