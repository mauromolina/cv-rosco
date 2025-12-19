"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import type { LetterState } from "@/types";

interface LetterNodeProps {
  letter: string;
  state: LetterState;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  questionData?: { letter: string; question: string; answer: string };
  showTooltipBelow?: boolean;
}

const stateStyles: Record<LetterState, string> = {
  default:
    "text-white border-white border-4 shadow-xl shadow-black/80 drop-shadow-xl",
  pass: "bg-yellow-500 text-white border-white border-4 shadow-xl shadow-black/80 drop-shadow-xl",
  correct:
    "bg-green-500 text-white border-white border-4 shadow-xl shadow-black/80 drop-shadow-xl",
  wrong:
    "bg-red-500 text-white border-white border-2 shadow-xl shadow-black/80 drop-shadow-xl",
};

export function LetterNode({
  letter,
  state,
  isActive,
  onClick,
  className,
  questionData,
  showTooltipBelow = false,
}: LetterNodeProps) {
  const [previousState, setPreviousState] = useState<LetterState>(state);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (previousState !== state && state !== "default") {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 500);
      setPreviousState(state);
      return () => clearTimeout(timer);
    }
  }, [state, previousState]);

  const shouldShowTooltip = questionData && (state === "correct" || state === "wrong");
  
  // Debug logging
  useEffect(() => {
    if (questionData && (state === "correct" || state === "wrong")) {
      console.log(`Letter ${letter}: questionData exists, state is ${state}`);
    }
  }, [questionData, state, letter]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => {
        console.log(`Mouse enter on ${letter}, shouldShowTooltip: ${shouldShowTooltip}`);
        if (shouldShowTooltip && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: showTooltipBelow ? rect.bottom + 8 : rect.top - 8
          });
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => {
        console.log(`Mouse leave on ${letter}`);
        setShowTooltip(false);
      }}
    >
      <button
        ref={buttonRef}
        onClick={onClick}
        className={cn(
          "flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 rounded-full font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl transition-all duration-200 transform-gpu relative",
          "shadow-[0_8px_16px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
          stateStyles[state],
          state === "default" && "bg-[#0F58FC]",
          isActive &&
            "ring-4 ring-white ring-opacity-80 scale-110 animate-pulse-glow",
          showAnimation && state === "correct" && "animate-bounce-in",
          showAnimation && state === "wrong" && "animate-shake",
          "hover:shadow-[0_12px_24px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110 hover:scale-105",
          "active:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95",
          className
        )}
        disabled={!onClick}
      >
        <span
          className={cn(
            "transition-all duration-200 drop-shadow-sm font-black",
            isActive && "drop-shadow-lg"
          )}
          style={{
            textShadow:
              "0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)",
            fontWeight: 900,
            letterSpacing: "0.05em",
          }}
        >
          {letter}
        </span>
      </button>

      {/* Tooltip rendered via portal */}
      {showTooltip && shouldShowTooltip && questionData && typeof window !== 'undefined' &&
        createPortal(
          <div 
            className="fixed pointer-events-none"
            style={{ 
              left: tooltipPosition.x,
              top: showTooltipBelow ? tooltipPosition.y : tooltipPosition.y,
              transform: 'translateX(-50%)',
              zIndex: 999999 
            }}
          >
            <div 
              className="bg-gray-900 text-white p-3 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-white w-64" 
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))',
                transform: showTooltipBelow ? 'translateY(0)' : 'translateY(-100%)'
              }}
            >
              <div className="text-sm font-bold mb-2 text-blue-300">
                Letra {questionData.letter}
              </div>
              <div className="text-xs mb-2">
                <span className="text-gray-300">Pregunta:</span>
                <div className="text-white font-medium mt-1">{questionData.question}</div>
              </div>
              <div className="text-xs">
                <span className="text-gray-300">Respuesta:</span>
                <div className="text-green-400 font-bold mt-1">{questionData.answer}</div>
              </div>
              {/* Arrow */}
              {showTooltipBelow ? (
                // Arrow pointing up (for tooltip below)
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-900"></div>
                </div>
              ) : (
                // Arrow pointing down (for tooltip above)
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900"></div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
}
