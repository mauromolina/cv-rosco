import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LetterState, RoscoProgress, GameSettings, GameResult } from "@/types";
import { roscos } from "@/mocks/roscos";

type GameStore = {
  // Game state per rosco
  roscoProgresses: Record<string, RoscoProgress>;
  gameSettings: GameSettings;
  gameResults: Record<string, GameResult>;

  // Actions
  initializeRosco: (roscoId: string) => void;
  resetRosco: (roscoId: string) => void;
  resetAllRoscos: () => void;
  setLetterState: (roscoId: string, letter: string, state: LetterState) => void;
  setCurrentLetter: (roscoId: string, letter: string) => void;
  setUserAnswer: (roscoId: string, letter: string, answer: string) => void;
  setGameActive: (roscoId: string, isActive: boolean) => void;
  setGameComplete: (roscoId: string) => void;
  updateTimer: (roscoId: string, remainingTime: number) => void;
  pauseTimer: (roscoId: string) => void;
  resumeTimer: (roscoId: string) => void;
  setGameSettings: (settings: Partial<GameSettings>) => void;
  saveGameResult: (result: GameResult) => void;
  getNextAvailableLetter: (roscoId: string) => string;
  getRoscoProgress: (roscoId: string) => RoscoProgress;
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const createInitialProgress = (): RoscoProgress => ({
  letterStates: Object.fromEntries(ALPHABET.map(letter => [letter, "default" as LetterState])),
  currentLetter: "A",
  isGameActive: false,
  isGameComplete: false,
  userAnswers: {},
  isPaused: false,
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      roscoProgresses: {},
      gameSettings: {
        isDemoMode: false,
        timeLimitSec: 120,
      },
      gameResults: {},

      initializeRosco: (roscoId: string) => {
        const state = get();
        const rosco = roscos.find(r => r.id === roscoId);
        
        if (!rosco) return;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...createInitialProgress(),
              isGameActive: true,
              endTimestamp: Date.now() + (state.gameSettings.timeLimitSec * 1000),
            },
          },
          gameSettings: {
            ...state.gameSettings,
            timeLimitSec: rosco.timeLimitSec,
          },
        });
      },

      resetRosco: (roscoId: string) => {
        const state = get();
        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: createInitialProgress(),
          },
          gameResults: {
            ...state.gameResults,
            [roscoId]: undefined as any,
          },
        });
      },

      resetAllRoscos: () => {
        set({
          roscoProgresses: {},
          gameResults: {},
        });
      },

      setLetterState: (roscoId: string, letter: string, state: LetterState) => {
        const currentState = get();
        const progress = currentState.roscoProgresses[roscoId];
        if (!progress) return;

        set({
          roscoProgresses: {
            ...currentState.roscoProgresses,
            [roscoId]: {
              ...progress,
              letterStates: {
                ...progress.letterStates,
                [letter]: state,
              },
            },
          },
        });
      },

      setCurrentLetter: (roscoId: string, letter: string) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              currentLetter: letter,
            },
          },
        });
      },

      setUserAnswer: (roscoId: string, letter: string, answer: string) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              userAnswers: {
                ...progress.userAnswers,
                [letter]: answer,
              },
            },
          },
        });
      },

      setGameActive: (roscoId: string, isActive: boolean) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              isGameActive: isActive,
            },
          },
        });
      },

      setGameComplete: (roscoId: string) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              isGameActive: false,
              isGameComplete: true,
            },
          },
        });
      },

      updateTimer: (roscoId: string, remainingTime: number) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return;

        if (remainingTime <= 0) {
          get().setGameComplete(roscoId);
          return;
        }

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              remainingTime,
              endTimestamp: Date.now() + (remainingTime * 1000),
            },
          },
        });
      },

      pauseTimer: (roscoId: string) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return;

        const now = Date.now();
        const remaining = progress.endTimestamp ? Math.max(0, Math.floor((progress.endTimestamp - now) / 1000)) : 0;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              isPaused: true,
              remainingTime: remaining,
              endTimestamp: undefined,
            },
          },
        });
      },

      resumeTimer: (roscoId: string) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress || !progress.remainingTime) return;

        set({
          roscoProgresses: {
            ...state.roscoProgresses,
            [roscoId]: {
              ...progress,
              isPaused: false,
              endTimestamp: Date.now() + (progress.remainingTime * 1000),
            },
          },
        });
      },

      setGameSettings: (settings: Partial<GameSettings>) => {
        const state = get();
        set({
          gameSettings: {
            ...state.gameSettings,
            ...settings,
          },
        });
      },

      saveGameResult: (result: GameResult) => {
        const state = get();
        set({
          gameResults: {
            ...state.gameResults,
            [result.roscoId]: result,
          },
        });
      },

      getNextAvailableLetter: (roscoId: string) => {
        const state = get();
        const progress = state.roscoProgresses[roscoId];
        if (!progress) return "A";

        const currentIndex = ALPHABET.indexOf(progress.currentLetter);
        
        // First, look for 'default' states starting from current position
        for (let i = currentIndex + 1; i < ALPHABET.length; i++) {
          if (progress.letterStates[ALPHABET[i]] === "default") {
            return ALPHABET[i];
          }
        }
        
        // If no default found, wrap around to the beginning
        for (let i = 0; i <= currentIndex; i++) {
          if (progress.letterStates[ALPHABET[i]] === "default") {
            return ALPHABET[i];
          }
        }

        // If no default states, look for 'pass' states
        for (let i = currentIndex + 1; i < ALPHABET.length; i++) {
          if (progress.letterStates[ALPHABET[i]] === "pass") {
            return ALPHABET[i];
          }
        }
        
        // Wrap around for pass states
        for (let i = 0; i <= currentIndex; i++) {
          if (progress.letterStates[ALPHABET[i]] === "pass") {
            return ALPHABET[i];
          }
        }

        return progress.currentLetter;
      },

      getRoscoProgress: (roscoId: string) => {
        const state = get();
        return state.roscoProgresses[roscoId] || createInitialProgress();
      },
    }),
    {
      name: "cv-rosco-storage",
    }
  )
);