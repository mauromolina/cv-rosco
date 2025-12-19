"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface TimerProps {
  endTimestamp?: number;
  remainingTime?: number;
  isPaused: boolean;
  onTimeUp: () => void;
  onTick?: (remaining: number) => void;
  className?: string;
}

export function Timer({ 
  endTimestamp, 
  remainingTime, 
  isPaused, 
  onTimeUp, 
  onTick,
  className 
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (isPaused) {
      setTimeLeft(remainingTime || 0);
      return;
    }

    if (!endTimestamp) {
      setTimeLeft(remainingTime || 0);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTimestamp - now) / 1000));
      
      setTimeLeft(remaining);
      onTick?.(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);

    // Initial calculation
    const now = Date.now();
    const remaining = Math.max(0, Math.floor((endTimestamp - now) / 1000));
    setTimeLeft(remaining);

    return () => clearInterval(interval);
  }, [endTimestamp, remainingTime, isPaused, onTimeUp, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (timeLeft <= 10) return "text-red-500";
    if (timeLeft <= 30) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Tiempo restante
      </div>
      <div className={cn(
        "text-4xl md:text-5xl font-bold font-mono tabular-nums transition-colors duration-200",
        getColorClass(),
        isPaused && "opacity-60"
      )}>
        {formatTime(timeLeft)}
      </div>
      {isPaused && (
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          PAUSADO
        </div>
      )}
    </div>
  );
}