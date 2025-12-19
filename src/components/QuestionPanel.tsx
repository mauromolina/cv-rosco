"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import type { Question } from "@/types";

interface QuestionPanelProps {
  question: Question;
  isDemoMode: boolean;
  isGameActive: boolean;
  onAnswer: (answer: string) => void;
  onPass: () => void;
  onMarkCorrect?: () => void;
  onMarkWrong?: () => void;
  className?: string;
}

export function QuestionPanel({
  question,
  isDemoMode,
  isGameActive,
  onAnswer,
  onPass,
  onMarkCorrect,
  onMarkWrong,
  className,
}: QuestionPanelProps) {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim() && isGameActive) {
      onAnswer(userAnswer.trim());
      setUserAnswer("");
    }
  };

  const handlePass = () => {
    if (isGameActive) {
      onPass();
    }
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6", className)}>
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center">
            {question.letter}
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Pregunta para la letra {question.letter}
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {question.clue}
        </p>
      </div>

      {isGameActive && (
        <>
          {/* Normal answer input */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                disabled={!isGameActive}
              />
              <button
                type="submit"
                disabled={!userAnswer.trim() || !isGameActive}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </div>
          </form>

          {/* Control buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePass}
              disabled={!isGameActive}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Pasapalabra
            </button>

            {isDemoMode && (
              <>
                <button
                  onClick={onMarkCorrect}
                  disabled={!isGameActive}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Marcar Correcta
                </button>
                <button
                  onClick={onMarkWrong}
                  disabled={!isGameActive}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Marcar Incorrecta
                </button>
              </>
            )}
          </div>
        </>
      )}

      {!isGameActive && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          El juego ha terminado
        </div>
      )}
    </div>
  );
}