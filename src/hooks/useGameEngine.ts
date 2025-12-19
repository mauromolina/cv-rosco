"use client";

import { useCallback } from "react";
import { useGameStore } from "@/store/game-store";
import { getRoscoById } from "@/mocks/roscos";
import type { LetterState, GameResult } from "@/types";

export function useGameEngine(roscoId: string) {
  const {
    roscoProgresses,
    gameSettings,
    initializeRosco,
    setLetterState,
    setCurrentLetter,
    setUserAnswer,
    setGameComplete,
    getNextAvailableLetter,
    getRoscoProgress,
    saveGameResult,
  } = useGameStore();

  const rosco = getRoscoById(roscoId);
  const progress = getRoscoProgress(roscoId);
  
  const currentQuestion = rosco?.questions.find(q => q.letter === progress.currentLetter);

  const checkAnswer = useCallback((userAnswer: string, correctAnswer: string): boolean => {
    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  }, []);

  const moveToNextLetter = useCallback(() => {
    const nextLetter = getNextAvailableLetter(roscoId);
    setCurrentLetter(roscoId, nextLetter);
  }, [roscoId, getNextAvailableLetter, setCurrentLetter]);

  const checkGameCompletion = useCallback(() => {
    const states = Object.values(progress.letterStates);
    const hasUnfinished = states.some(state => state === "default" || state === "pass");
    
    if (!hasUnfinished) {
      setGameComplete(roscoId);
      
      // Generate game result
      const result: GameResult = {
        roscoId,
        timeConsumed: (gameSettings.timeLimitSec * 1000) - (progress.remainingTime || 0),
        totalCorrect: states.filter(s => s === "correct").length,
        totalWrong: states.filter(s => s === "wrong").length,
        totalPass: 0, // All pass states should be resolved by this point
        letterResults: rosco?.questions.map(q => ({
          letter: q.letter,
          state: progress.letterStates[q.letter] as LetterState,
          userAnswer: progress.userAnswers[q.letter],
          correctAnswer: q.answer,
        })) || [],
        completedAt: new Date(),
      };
      
      saveGameResult(result);
      return true;
    }
    
    return false;
  }, [progress, roscoId, gameSettings.timeLimitSec, setGameComplete, saveGameResult, rosco?.questions]);

  const handleAnswer = useCallback((userAnswer: string) => {
    if (!currentQuestion || !progress.isGameActive) return;

    const isCorrect = checkAnswer(userAnswer, currentQuestion.answer);
    const newState: LetterState = isCorrect ? "correct" : "wrong";
    
    setLetterState(roscoId, currentQuestion.letter, newState);
    setUserAnswer(roscoId, currentQuestion.letter, userAnswer);
    
    setTimeout(() => {
      if (!checkGameCompletion()) {
        moveToNextLetter();
      }
    }, 500);
  }, [currentQuestion, progress.isGameActive, checkAnswer, setLetterState, setUserAnswer, roscoId, checkGameCompletion, moveToNextLetter]);

  const handlePass = useCallback(() => {
    if (!currentQuestion || !progress.isGameActive) return;

    setLetterState(roscoId, currentQuestion.letter, "pass");
    moveToNextLetter();
  }, [currentQuestion, progress.isGameActive, setLetterState, roscoId, moveToNextLetter]);

  const handleMarkCorrect = useCallback(() => {
    if (!currentQuestion || !progress.isGameActive) return;

    setLetterState(roscoId, currentQuestion.letter, "correct");
    
    setTimeout(() => {
      if (!checkGameCompletion()) {
        moveToNextLetter();
      }
    }, 500);
  }, [currentQuestion, progress.isGameActive, setLetterState, roscoId, checkGameCompletion, moveToNextLetter]);

  const handleMarkWrong = useCallback(() => {
    if (!currentQuestion || !progress.isGameActive) return;

    setLetterState(roscoId, currentQuestion.letter, "wrong");
    
    setTimeout(() => {
      if (!checkGameCompletion()) {
        moveToNextLetter();
      }
    }, 500);
  }, [currentQuestion, progress.isGameActive, setLetterState, roscoId, checkGameCompletion, moveToNextLetter]);

  const startGame = useCallback(() => {
    if (!rosco) return;
    initializeRosco(roscoId);
  }, [rosco, initializeRosco, roscoId]);

  return {
    rosco,
    progress,
    currentQuestion,
    gameSettings,
    handleAnswer,
    handlePass,
    handleMarkCorrect,
    handleMarkWrong,
    startGame,
    moveToNextLetter,
  };
}