import {
  FactsQuestion,
  FactsQuizAttempt,
  FactsQuizAnswer,
} from "@prisma/client";

export type FactsQuizQuestion = FactsQuestion & {
  shuffledAnswers?: string[]; // Shuffled array of all 4 answers (correct + wrong)
};

export type FactsQuizQuestions = FactsQuizQuestion[];

export type FactsQuiz = {
  quizId: string;
  questions: FactsQuizQuestions;
};

export type FactsQuizAnswerRequest = {
  quizId: string;
  questionId: string;
  userAnswer: string;
  score: number;
  isCorrect: boolean;
};

export type FactsQuizCompleteRequest = {
  quizId: string;
  totalScore: number;
};

export type FactsQuizAttemptWithAnswers = FactsQuizAttempt & {
  answers: (FactsQuizAnswer & {
    question: FactsQuestion;
  })[];
};
