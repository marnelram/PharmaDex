export type GameMode =
  | "classic"
  | "lightning"
  | "timeAttack"
  | "blitz"
  | "survival"
  | "endless"
  | "practice";

export interface GameModeConfig {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
  questionCount: number | "unlimited";
  timePerQuestion?: number; // in seconds, undefined for no timer
  totalTime?: number; // in seconds, for time attack mode
  lives?: number; // for survival mode
  scoreMultiplier: number;
  features: string[];
}

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    id: "classic",
    name: "Classic",
    description: "The original PharmaDex experience",
    icon: "🎮",
    questionCount: 25,
    timePerQuestion: 5,
    scoreMultiplier: 1,
    features: ["5 seconds per question", "Streak multipliers", "Leaderboard ranking"],
  },
  lightning: {
    id: "lightning",
    name: "Lightning Round",
    description: "Ultra-fast questions for expert players",
    icon: "⚡",
    questionCount: 25,
    timePerQuestion: 2,
    scoreMultiplier: 1.5,
    features: ["2 seconds per question", "Higher score multipliers", "Expert difficulty"],
  },
  timeAttack: {
    id: "timeAttack",
    name: "Time Attack",
    description: "Answer as many as possible in 60 seconds",
    icon: "⏱️",
    questionCount: "unlimited",
    totalTime: 60,
    scoreMultiplier: 1.2,
    features: ["60 second time limit", "Unlimited questions", "Fast-paced action"],
  },
  blitz: {
    id: "blitz",
    name: "Blitz Mode",
    description: "Quick 10-question sprint",
    icon: "💥",
    questionCount: 10,
    timePerQuestion: 5,
    scoreMultiplier: 1.3,
    features: ["10 questions only", "Perfect for quick games", "Bonus multiplier"],
  },
  survival: {
    id: "survival",
    name: "Survival",
    description: "Three strikes and you're out",
    icon: "❤️",
    questionCount: "unlimited",
    timePerQuestion: 5,
    lives: 3,
    scoreMultiplier: 1.4,
    features: ["3 lives total", "Game ends on third mistake", "High stakes gameplay"],
  },
  endless: {
    id: "endless",
    name: "Endless",
    description: "Keep going until you make a mistake",
    icon: "🔁",
    questionCount: "unlimited",
    timePerQuestion: 5,
    scoreMultiplier: 1.5,
    features: ["One mistake ends game", "Ultimate streak challenge", "Highest multiplier"],
  },
  practice: {
    id: "practice",
    name: "Practice",
    description: "Learn without pressure",
    icon: "📚",
    questionCount: 25,
    scoreMultiplier: 0,
    features: ["No timer", "Immediate feedback", "Perfect for learning"],
  },
};
