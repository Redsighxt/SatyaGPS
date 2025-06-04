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
  type InsertQuizResult
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProgress: Map<number, UserProgress>;
  private badges: Map<number, Badge>;
  private quizResults: Map<number, QuizResult>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentBadgeId: number;
  private currentQuizId: number;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.badges = new Map();
    this.quizResults = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentBadgeId = 1;
    this.currentQuizId = 1;

    // Create a demo user
    this.createUser({
      username: "demo",
      password: "demo123",
      displayName: "Demo Student",
      grade: 3
    });
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
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
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
        completedAt: insertProgress.completed ? new Date() : existing.completedAt
      };
      this.userProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const progress: UserProgress = {
        ...insertProgress,
        id,
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
}

export const storage = new MemStorage();
