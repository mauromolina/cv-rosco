"use client";

import { useCallback, useEffect } from "react";
import { useGameStore } from "@/store/game-store";

export function useTimer(roscoId: string) {
  const {
    roscoProgresses,
    updateTimer,
    pauseTimer,
    resumeTimer,
    setGameComplete,
    getRoscoProgress,
  } = useGameStore();

  const progress = getRoscoProgress(roscoId);

  const handleTimeUp = useCallback(() => {
    setGameComplete(roscoId);
  }, [roscoId, setGameComplete]);

  const handleTick = useCallback((remaining: number) => {
    updateTimer(roscoId, remaining);
  }, [roscoId, updateTimer]);

  const pause = useCallback(() => {
    if (progress.isGameActive && !progress.isPaused) {
      pauseTimer(roscoId);
    }
  }, [progress.isGameActive, progress.isPaused, pauseTimer, roscoId]);

  const resume = useCallback(() => {
    if (progress.isGameActive && progress.isPaused) {
      resumeTimer(roscoId);
    }
  }, [progress.isGameActive, progress.isPaused, resumeTimer, roscoId]);

  const restart = useCallback((newTime: number) => {
    updateTimer(roscoId, newTime);
  }, [roscoId, updateTimer]);

  // Cleanup on unmount or when game becomes inactive
  useEffect(() => {
    if (!progress.isGameActive) {
      return;
    }

    // If the component unmounts while game is active, pause the timer
    return () => {
      if (progress.isGameActive && !progress.isPaused) {
        pauseTimer(roscoId);
      }
    };
  }, [progress.isGameActive, progress.isPaused, pauseTimer, roscoId]);

  return {
    progress,
    handleTimeUp,
    handleTick,
    pause,
    resume,
    restart,
    canPause: progress.isGameActive && !progress.isPaused,
    canResume: progress.isGameActive && progress.isPaused,
  };
}