import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { insertProgressSchema, insertBadgeSchema, insertQuizResultSchema, insertUserSchema, insertChallengeScoreSchema } from "@shared/schema";
import { z } from "zod";

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Signup
  app.post("/api/signup", async (req, res) => {
    try {
      const { username, password, displayName } = insertUserSchema.pick({ username: true, password: true, displayName: true }).parse(req.body);
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashedPassword, displayName });
      req.session.userId = user.id;
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  // Login
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.pick({ username: true, password: true }).parse(req.body);
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session.userId = user.id;
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to login" });
      }
    }
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Middleware to check if user is authenticated
  app.use('/api', (req, res, next) => {
    if (req.path.startsWith('/login') || req.path.startsWith('/signup') || req.path.startsWith('/me')) {
      return next();
    }

    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

  // Get user progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      if (req.session.userId !== parseInt(req.params.userId)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Update progress
  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertProgressSchema.parse(req.body);
      const progress = await storage.updateProgress(validatedData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update progress" });
      }
    }
  });

  // Get user badges
  app.get("/api/badges/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const badges = await storage.getUserBadges(userId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  // Award badge
  app.post("/api/badges", async (req, res) => {
    try {
      const validatedData = insertBadgeSchema.parse(req.body);
      const badge = await storage.awardBadge(validatedData);
      res.json(badge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to award badge" });
      }
    }
  });

  // Save quiz result
  app.post("/api/quiz-results", async (req, res) => {
    try {
      const validatedData = insertQuizResultSchema.parse(req.body);
      const result = await storage.saveQuizResult(validatedData);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save quiz result" });
      }
    }
  });

  // Get quiz results
  app.get("/api/quiz-results/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const moduleId = req.query.moduleId as string;
      const results = await storage.getQuizResults(userId, moduleId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz results" });
    }
  });

  // Get user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsersWithTotalScores();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Get all users with progress
  app.get("/api/users/progress", async (req, res) => {
    try {
      const users = await storage.getUsersWithProgress();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users with progress" });
    }
  });

  // Save challenge score
  app.post("/api/challenge-scores", async (req, res) => {
    try {
      const validatedData = insertChallengeScoreSchema.parse(req.body);
      const score = await storage.saveChallengeScore(validatedData);
      res.json(score);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save challenge score" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

