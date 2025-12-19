"use client";

import { useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Rosco } from "@/components/Rosco";
import { Timer } from "@/components/Timer";
import { QuestionPanel } from "@/components/QuestionPanel";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useGameEngine } from "@/hooks/useGameEngine";
import { useTimer } from "@/hooks/useTimer";
import { useGameStore } from "@/store/game-store";

export default function GamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const roscoId = params.roscoId as string;
  
  const { setGameSettings, resetRosco } = useGameStore();
  const isDemo = searchParams?.get("demo") === "1";
  
  const {
    rosco,
    progress,
    currentQuestion,
    gameSettings,
    handleAnswer,
    handlePass,
    handleMarkCorrect,
    handleMarkWrong,
    startGame,
  } = useGameEngine(roscoId);

  const {
    handleTimeUp,
    handleTick,
    pause,
    resume,
    restart,
    canPause,
    canResume,
  } = useTimer(roscoId);

  const gameStartedRef = useRef(false);

  // Set demo mode on mount
  useEffect(() => {
    if (isDemo) {
      setGameSettings({ isDemoMode: true });
    }
  }, [isDemo, setGameSettings]);

  // Start game automatically if not started
  useEffect(() => {
    if (rosco && !gameStartedRef.current && !progress.isGameActive && !progress.isGameComplete) {
      startGame();
      gameStartedRef.current = true;
    }
  }, [rosco, progress.isGameActive, progress.isGameComplete, startGame]);

  // Redirect to results when game is complete
  useEffect(() => {
    if (progress.isGameComplete) {
      setTimeout(() => {
        router.push(`/results/${roscoId}`);
      }, 1500);
    }
  }, [progress.isGameComplete, router, roscoId]);

  if (!rosco) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Rosco no encontrado</h1>
        <p className="text-gray-600 mb-8">El rosco que buscas no existe.</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {rosco.title}
        </h1>
        {gameSettings.isDemoMode && (
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            Modo Demo
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Rosco and Timer */}
        <div className="space-y-6">
          {/* Timer */}
          <div className="flex justify-center">
            <Timer
              endTimestamp={progress.endTimestamp}
              remainingTime={progress.remainingTime}
              isPaused={progress.isPaused}
              onTimeUp={handleTimeUp}
              onTick={handleTick}
            />
          </div>

          {/* Timer Controls (Demo Mode) */}
          {gameSettings.isDemoMode && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={canPause ? pause : canResume ? resume : undefined}
                disabled={!canPause && !canResume}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {canPause ? "Pausar" : "Reanudar"}
              </button>
              <button
                onClick={() => restart(120)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                Reiniciar Tiempo
              </button>
            </div>
          )}

          {/* Rosco */}
          <div className="flex justify-center">
            <Rosco
              letterStates={progress.letterStates}
              currentLetter={progress.currentLetter}
            />
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            letterStates={progress.letterStates}
            className="lg:hidden"
          />
        </div>

        {/* Right Column - Question and Progress */}
        <div className="space-y-6">
          {/* Question Panel */}
          <QuestionPanel
            question={currentQuestion}
            isDemoMode={gameSettings.isDemoMode}
            isGameActive={progress.isGameActive}
            onAnswer={handleAnswer}
            onPass={handlePass}
            onMarkCorrect={handleMarkCorrect}
            onMarkWrong={handleMarkWrong}
          />

          {/* Progress Indicator (Desktop) */}
          <ProgressIndicator
            letterStates={progress.letterStates}
            className="hidden lg:block"
          />

          {/* Game Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Controles del Juego
            </h3>
            
            <div className="space-y-3">
              {gameSettings.isDemoMode && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-purple-800 mb-2">
                    Modo Demo Activo
                  </div>
                  <div className="text-xs text-purple-600">
                    Puedes usar los botones de marcar correcta/incorrecta para navegar rápidamente.
                  </div>
                </div>
              )}
              
              <button
                onClick={() => resetRosco(roscoId)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                🔄 Reset Rosco
              </button>
              
              <a
                href="/"
                className="block w-full px-4 py-2 bg-gray-600 text-white text-center rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                🏠 Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Game Complete Overlay */}
      {progress.isGameComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Juego Completado!
              </h2>
              <p className="text-gray-600 mb-6">
                Redirigiendo a los resultados...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}