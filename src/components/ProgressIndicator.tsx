"use client";

import { cn } from "@/utils/cn";
import type { LetterState } from "@/types";

interface ProgressIndicatorProps {
  letterStates: Record<string, LetterState>;
  className?: string;
}

export function ProgressIndicator({ letterStates, className }: ProgressIndicatorProps) {
  const states = Object.values(letterStates);
  
  const counts = {
    correct: states.filter(state => state === "correct").length,
    wrong: states.filter(state => state === "wrong").length,
    pass: states.filter(state => state === "pass").length,
    default: states.filter(state => state === "default").length,
  };

  const total = states.length;
  const completed = counts.correct + counts.wrong;
  const progressPercentage = (completed / total) * 100;

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Progreso del Rosco
      </h3>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progreso</span>
          <span>{completed}/26</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-6 h-6 rounded-full bg-green-500 mx-auto mb-1"></div>
          <div className="text-2xl font-bold text-green-600">{counts.correct}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Correctas</div>
        </div>
        
        <div className="text-center">
          <div className="w-6 h-6 rounded-full bg-red-500 mx-auto mb-1"></div>
          <div className="text-2xl font-bold text-red-600">{counts.wrong}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Incorrectas</div>
        </div>
        
        <div className="text-center">
          <div className="w-6 h-6 rounded-full bg-yellow-500 mx-auto mb-1"></div>
          <div className="text-2xl font-bold text-yellow-600">{counts.pass}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pasapalabra</div>
        </div>
        
        <div className="text-center">
          <div className="w-6 h-6 rounded-full bg-blue-500 mx-auto mb-1"></div>
          <div className="text-2xl font-bold text-blue-600">{counts.default}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pendientes</div>
        </div>
      </div>
    </div>
  );
}