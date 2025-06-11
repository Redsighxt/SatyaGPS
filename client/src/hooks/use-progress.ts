import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User, UserProgress, Badge } from "@shared/schema";

export interface ProgressData {
  progress: UserProgress[];
  badges: Badge[];
  totalPoints: number;
  overallProgress: number;
  completedModules: number;
  currentStreak: number;
}

export function useProgress(studentId: number = 1) {
  return useQuery<ProgressData>({
    queryKey: ["/api/progress", studentId],
    enabled: !!studentId,
  });
}

export function useStudent(studentId: number = 1) {
  return useQuery<User>({
    queryKey: ["/api/students", studentId],
    enabled: !!studentId,
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { studentId: number; moduleId: string; score: number; timeSpent: number }) => {
      const response = await apiRequest("POST", "/api/progress", data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", variables.studentId] });
      queryClient.invalidateQueries({ queryKey: ["/api/students", variables.studentId] });
    },
  });
}

export function useCompleteModule() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { studentId: number; moduleId: string; score: number; timeSpent: number }) => {
      const response = await apiRequest("POST", "/api/progress/complete", data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", variables.studentId] });
      queryClient.invalidateQueries({ queryKey: ["/api/students", variables.studentId] });
    },
  });
}

export function useAwardBadge() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { studentId: number; badgeType: string; badgeName: string }) => {
      const response = await apiRequest("POST", "/api/badges", data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements", variables.studentId] });
    },
  });
}

export function useAchievements(studentId: number = 1) {
  return useQuery<Badge[]>({
    queryKey: ["/api/achievements", studentId],
    enabled: !!studentId,
  });
}

export function useAllStudents() {
  return useQuery<User[]>({
    queryKey: ["/api/students"],
  });
}
