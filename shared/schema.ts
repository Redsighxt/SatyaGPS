import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  grade: integer("grade").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: text("module_id").notNull(),
  completed: boolean("completed").default(false).notNull(),
  score: integer("score").default(0).notNull(),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent").default(0).notNull(), // in seconds
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  badgeType: text("badge_type").notNull(),
  badgeName: text("badge_name").notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: text("module_id").notNull(),
  questionId: text("question_id").notNull(),
  answer: text("answer").notNull(),
  correct: boolean("correct").notNull(),
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
});

export const challengeScores = pgTable("challenge_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: text("module_id").notNull(),
  difficulty: text("difficulty").notNull(),
  score: integer("score").notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  grade: true,
});

export const insertProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  moduleId: true,
  completed: true,
  score: true,
  timeSpent: true,
});

export const insertBadgeSchema = createInsertSchema(badges).pick({
  userId: true,
  badgeType: true,
  badgeName: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  userId: true,
  moduleId: true,
  questionId: true,
  answer: true,
  correct: true,
});

export const insertChallengeScoreSchema = createInsertSchema(challengeScores).pick({
  userId: true,
  moduleId: true,
  difficulty: true,
  score: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type ChallengeScore = typeof challengeScores.$inferSelect;
export type InsertChallengeScore = z.infer<typeof insertChallengeScoreSchema>;
