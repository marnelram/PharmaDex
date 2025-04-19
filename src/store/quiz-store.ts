import { create } from "zustand";
import { AchievementDefinition } from "@/lib/achievements/achievement-defs";
import { updateStatsAfterAnswer } from "@/lib/stats/update-stats";

interface QuizState {
  // Quiz progress
  currentQuestion: number;
  totalScore: number;
  showFeedback: boolean;
  isQuizComplete: boolean;
  streak: number;
  multiplier: number;
  isGameStarted: boolean;
  isPracticeMode: boolean;
  quizStartTime: number;
  quizDuration: number;
  correctAnswers: number;
  startTimeRef: number;

  // Achievement tracking
  newAchievements: AchievementDefinition[];
  showAchievements: boolean;

  // Actions
  startGame: (mode: "timed" | "practice") => void;
  answerQuestion: (
    answer: string,
    questionType: string,
    userId?: string
  ) => Promise<{
    correct: boolean;
    currentScore: number;
  }>;
  nextQuestion: (totalQuestions: number) => void;
  completeQuiz: () => void;
  hideAchievements: () => void;
  setNewAchievements: (achievements: AchievementDefinition[]) => void;

  // Utility functions
  calculateMultiplier: (streak: number) => number;
  calculateScore: (elapsedTime: number) => number;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  currentQuestion: 0,
  totalScore: 0,
  showFeedback: false,
  isQuizComplete: false,
  streak: 0,
  multiplier: 1,
  isGameStarted: false,
  isPracticeMode: false,
  quizStartTime: 0,
  quizDuration: 0,
  correctAnswers: 0,
  startTimeRef: 0,
  newAchievements: [],
  showAchievements: false,

  // Actions
  startGame: (mode) => {
    const now = Date.now();
    set({
      isGameStarted: true,
      isPracticeMode: mode === "practice",
      quizStartTime: now,
      startTimeRef: now,
    });
  },

  answerQuestion: async (answer, questionType, userId) => {
    const {
      streak,
      startTimeRef,
      isPracticeMode,
      calculateMultiplier,
      calculateScore,
    } = get();

    const elapsedTime = (Date.now() - startTimeRef) / 1000;
    const correct = answer === questionType;
    let currentScore = 0;

    if (correct) {
      // Increment streak and update multiplier
      const newStreak = streak + 1;
      const newMultiplier = calculateMultiplier(newStreak);

      currentScore = calculateScore(elapsedTime);

      set((state) => ({
        streak: newStreak,
        multiplier: newMultiplier,
        correctAnswers: state.correctAnswers + 1,
        totalScore: state.totalScore + currentScore,
        showFeedback: isPracticeMode,
      }));

      // Update stats after correct answer
      if (userId) {
        const category = questionType.toLowerCase() as "pokemon" | "drug";
        await updateStatsAfterAnswer(userId, true, category, newStreak);
      }
    } else {
      // Reset streak and multiplier on wrong answer
      set({
        streak: 0,
        multiplier: 1,
        showFeedback: isPracticeMode,
      });

      // Update stats after incorrect answer if needed
      if (userId) {
        const category = questionType.toLowerCase() as "pokemon" | "drug";
        await updateStatsAfterAnswer(userId, false, category, 0);
      }
    }

    return { correct, currentScore };
  },

  nextQuestion: (totalQuestions) => {
    const { currentQuestion } = get();
    set({
      showFeedback: false,
      startTimeRef: Date.now(),
    });

    if (currentQuestion < totalQuestions - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    } else {
      set({
        isQuizComplete: true,
        quizDuration: Date.now() - get().quizStartTime,
      });
    }
  },

  completeQuiz: () => {
    set({
      quizDuration: Date.now() - get().quizStartTime,
    });
  },

  hideAchievements: () => {
    set({ showAchievements: false });
  },

  setNewAchievements: (achievements) => {
    set({
      newAchievements: achievements,
      showAchievements: true,
    });
  },

  // Utility functions
  calculateMultiplier: (currentStreak) => {
    if (currentStreak >= 10) return 3;
    if (currentStreak >= 5) return 2;
    if (currentStreak >= 3) return 1.5;
    return 1;
  },

  calculateScore: (elapsedTime) => {
    const { multiplier } = get();
    let baseScore;

    // If remaining time is between 4.95 and 5 seconds (answered within first 0.05s)
    if (elapsedTime <= 0.1) {
      baseScore = 1000;
    } else if (elapsedTime >= 4.9) {
      baseScore = 100;
    } else {
      const x = elapsedTime;
      baseScore = Math.round(25 + 1000 * Math.exp(-0.5 * (x - 0.05)));
    }

    // Apply streak multiplier
    return Math.round(baseScore * multiplier);
  },
}));
