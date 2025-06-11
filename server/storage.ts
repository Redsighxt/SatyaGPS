import { 
  users, 
  userProgress, 
  badges, 
  quizResults,
  type User, 
  type InsertUser,
  type UserProgress,
  type InsertProgress,
  type Badge,
  type InsertBadge,
  type QuizResult,
  type InsertQuizResult,
  type ChallengeScore,
  type InsertChallengeScore
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUsersWithTotalScores(): Promise<(User & { score: number })[]>;
  getUsersWithProgress(): Promise<(User & { progress: UserProgress[] })[]>;
  
  // Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getModuleProgress(userId: number, moduleId: string): Promise<UserProgress | undefined>;
  updateProgress(progress: InsertProgress): Promise<UserProgress>;
  
  // Badge methods
  getUserBadges(userId: number): Promise<Badge[]>;
  awardBadge(badge: InsertBadge): Promise<Badge>;
  
  // Quiz methods
  saveQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId: number, moduleId?: string): Promise<QuizResult[]>;

  // Challenge methods
  saveChallengeScore(score: InsertChallengeScore): Promise<ChallengeScore>;
  getChallengeScores(userId: number, moduleId?: string): Promise<ChallengeScore[]>;
  getTopChallengeScores(limit: number): Promise<ChallengeScore[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProgress: Map<number, UserProgress>;
  private badges: Map<number, Badge>;
  private quizResults: Map<number, QuizResult>;
  private challengeScores: Map<number, ChallengeScore>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentBadgeId: number;
  private currentQuizId: number;
  private currentChallengeScoreId: number;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.badges = new Map();
    this.quizResults = new Map();
    this.challengeScores = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentBadgeId = 1;
    this.currentQuizId = 1;
    this.currentChallengeScoreId = 1;

    // Add some demo scores
    this.saveChallengeScore({ userId: 1, moduleId: 'fractions', difficulty: 'beginner', score: 85 });
    this.saveChallengeScore({ userId: 1, moduleId: 'fractions', difficulty: 'intermediate', score: 120 }); // Higher score for same module
    this.saveChallengeScore({ userId: 1, moduleId: 'algebraic-operations', difficulty: 'advanced', score: 250 });
    this.saveChallengeScore({ userId: 2, moduleId: 'fractions', difficulty: 'hard', score: 300 });
    this.saveChallengeScore({ userId: 3, moduleId: 'time', difficulty: 'easy', score: 100 });
    this.saveChallengeScore({ userId: 3, moduleId: 'time', difficulty: 'medium', score: 50 }); // Lower score for same module
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      grade: 1,
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(
      progress => progress.userId === userId
    );
  }

  async getModuleProgress(userId: number, moduleId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      progress => progress.userId === userId && progress.moduleId === moduleId
    );
  }

  async updateProgress(insertProgress: InsertProgress): Promise<UserProgress> {
    const existing = await this.getModuleProgress(insertProgress.userId, insertProgress.moduleId);
    
    if (existing) {
      const updated: UserProgress = {
        ...existing,
        ...insertProgress,
        completedAt: insertProgress.completed ? new Date() : existing.completedAt,
        score: insertProgress.score ?? existing.score,
        timeSpent: insertProgress.timeSpent ?? existing.timeSpent
      };
      this.userProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const progress: UserProgress = {
        id,
        completed: false,
        score: 0,
        timeSpent: 0,
        ...insertProgress,
        completedAt: insertProgress.completed ? new Date() : null
      };
      this.userProgress.set(id, progress);
      return progress;
    }
  }

  async getUserBadges(userId: number): Promise<Badge[]> {
    return Array.from(this.badges.values()).filter(
      badge => badge.userId === userId
    );
  }

  async awardBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.currentBadgeId++;
    const badge: Badge = {
      ...insertBadge,
      id,
      earnedAt: new Date()
    };
    this.badges.set(id, badge);
    return badge;
  }

  async saveQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.currentQuizId++;
    const result: QuizResult = {
      ...insertResult,
      id,
      answeredAt: new Date()
    };
    this.quizResults.set(id, result);
    return result;
  }

  async getQuizResults(userId: number, moduleId?: string): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      result => result.userId === userId && (!moduleId || result.moduleId === moduleId)
    );
  }

  async saveChallengeScore(insertScore: InsertChallengeScore): Promise<ChallengeScore> {
    const id = this.currentChallengeScoreId++;
    const score: ChallengeScore = {
      ...insertScore,
      id,
      earnedAt: new Date()
    };
    this.challengeScores.set(id, score);
    return score;
  }

  async getChallengeScores(userId: number, moduleId?: string): Promise<ChallengeScore[]> {
    return Array.from(this.challengeScores.values()).filter(
      score => score.userId === userId && (!moduleId || score.moduleId === moduleId)
    );
  }

  async getTopChallengeScores(limit: number): Promise<ChallengeScore[]> {
    const allScores = Array.from(this.challengeScores.values());
    allScores.sort((a, b) => b.score - a.score);
    return allScores.slice(0, limit);
  }

  async getUsersWithTotalScores(): Promise<(User & { score: number })[]> {
    const userScores: Map<number, number> = new Map();
    const userBestScores: Map<string, number> = new Map(); // key: 'userId-moduleId'

    for (const score of Array.from(this.challengeScores.values())) {
        const key = `${score.userId}-${score.moduleId}`;
        const currentBest = userBestScores.get(key) ?? 0;
        if (score.score > currentBest) {
            userBestScores.set(key, score.score);
        }
    }

    const userTotals: Map<number, number> = new Map();
    for(const [key, score] of Array.from(userBestScores.entries())) {
        const userId = parseInt(key.split('-')[0]);
        const currentTotal = userTotals.get(userId) ?? 0;
        userTotals.set(userId, currentTotal + score);
    }
    
    const usersWithScores = Array.from(this.users.values()).map(user => ({
      ...user,
      score: userTotals.get(user.id) ?? 0,
    }));

    return usersWithScores.sort((a, b) => b.score - a.score);
  }

  async getUsersWithProgress(): Promise<(User & { progress: UserProgress[] })[]> {
    const users = await this.getAllUsers();
    const allProgress = Array.from(this.userProgress.values());

    const usersWithProgress = users.map(user => {
      const userProgress = allProgress.filter(p => p.userId === user.id);
      return { ...user, progress: userProgress };
    });

    return usersWithProgress;
  }
}

export const storage = new MemStorage();
