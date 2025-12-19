"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useGameStore } from "@/store/game-store";
import { getRoscoById } from "@/mocks/roscos";
import { cn } from "@/utils/cn";
import type { LetterState } from "@/types";

export default function ResultsPage() {
  const params = useParams();
  const roscoId = params.roscoId as string;
  
  const { gameResults, resetRosco } = useGameStore();
  const rosco = getRoscoById(roscoId);
  const result = gameResults[roscoId];

  if (!rosco || !result) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Resultados no encontrados
        </h1>
        <p className="text-gray-600 mb-8">
          No se han encontrado resultados para este rosco.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    const total = result.totalCorrect + result.totalWrong;
    return total > 0 ? Math.round((result.totalCorrect / total) * 100) : 0;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return "¡Excelente!";
    if (percentage >= 70) return "¡Muy bien!";
    if (percentage >= 50) return "Bien";
    return "Puede mejorar";
  };

  const getStateIcon = (state: LetterState) => {
    switch (state) {
      case "correct": return "✓";
      case "wrong": return "✗";
      case "pass": return "⚬";
      default: return "○";
    }
  };

  const getStateColor = (state: LetterState) => {
    switch (state) {
      case "correct": return "text-green-600 bg-green-50";
      case "wrong": return "text-red-600 bg-red-50";
      case "pass": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const percentage = getScorePercentage();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Resultados del Rosco
        </h1>
        <h2 className="text-xl text-gray-600">
          {rosco.title}
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Score */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className={cn("text-4xl font-bold mb-2", getGradeColor(percentage))}>
            {percentage}%
          </div>
          <div className="text-sm text-gray-600">Puntuación</div>
          <div className={cn("text-sm font-medium", getGradeColor(percentage))}>
            {getGradeText(percentage)}
          </div>
        </div>

        {/* Time */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatTime(result.timeConsumed)}
          </div>
          <div className="text-sm text-gray-600">Tiempo usado</div>
        </div>

        {/* Correct */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {result.totalCorrect}
          </div>
          <div className="text-sm text-gray-600">Correctas</div>
        </div>

        {/* Wrong */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">
            {result.totalWrong}
          </div>
          <div className="text-sm text-gray-600">Incorrectas</div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Resultados por letra
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {result.letterResults.map((letterResult) => (
            <div
              key={letterResult.letter}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {/* Letter */}
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {letterResult.letter}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {rosco.questions.find(q => q.letter === letterResult.letter)?.clue}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Respuesta correcta:</span> {letterResult.correctAnswer}
                    </div>
                    {letterResult.userAnswer && (
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Tu respuesta:</span> {letterResult.userAnswer}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                  getStateColor(letterResult.state)
                )}>
                  {getStateIcon(letterResult.state)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => resetRosco(roscoId)}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          🔄 Jugar de nuevo
        </button>
        
        <Link
          href="/"
          className="px-8 py-3 bg-gray-600 text-white text-center rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          🏠 Volver al inicio
        </Link>
        
        <Link
          href={`/game/${roscoId}?demo=1`}
          className="px-8 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          🚀 Modo demo
        </Link>
      </div>

      {/* Completion Date */}
      <div className="text-center mt-8 text-sm text-gray-500">
        Completado el {new Date(result.completedAt).toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
}