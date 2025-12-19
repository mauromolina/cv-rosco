export type LetterState = "default" | "pass" | "correct" | "wrong";

export type Question = {
  letter: string;
  clue: string;
  answer: string;
};

export type Rosco = {
  id: string;
  title: string;
  timeLimitSec: number;
  questions: Question[];
};

export type RoscoProgress = {
  letterStates: Record<string, LetterState>;
  currentLetter: string;
  isGameActive: boolean;
  isGameComplete: boolean;
  userAnswers: Record<string, string>;
  endTimestamp?: number;
  remainingTime?: number;
  isPaused: boolean;
};

export type GameSettings = {
  isDemoMode: boolean;
  timeLimitSec: number;
};

export type GameResult = {
  roscoId: string;
  timeConsumed: number;
  totalCorrect: number;
  totalWrong: number;
  totalPass: number;
  letterResults: {
    letter: string;
    state: LetterState;
    userAnswer?: string;
    correctAnswer: string;
  }[];
  completedAt: Date;
};