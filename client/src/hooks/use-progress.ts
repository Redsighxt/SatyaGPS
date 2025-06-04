import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Student, Progress, Achievement } from "@shared/schema";

export function useProgress(studentId: number = 1) {
  return useQuery({
    queryKey: ["/api/progress", studentId],
    enabled: !!studentId,
  });
}

export function useStudent(studentId: number = 1) {
  return useQuery<Student>({
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

export function useAchievements(studentId: number = 1) {
  return useQuery<Achievement[]>({
    queryKey: ["/api/achievements", studentId],
    enabled: !!studentId,
  });
}

export function useAllStudents() {
  return useQuery<Student[]>({
    queryKey: ["/api/students"],
  });
}
