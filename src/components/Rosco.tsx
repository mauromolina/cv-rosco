"use client";

import { LetterNode } from "./LetterNode";
import type { LetterState } from "@/types";

interface RoscoProps {
  letterStates: Record<string, LetterState>;
  currentLetter: string;
  onLetterClick?: (letter: string) => void;
  questions?: Array<{ letter: string; question: string; answer: string }>;
}

const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

export function Rosco({
  letterStates,
  currentLetter,
  onLetterClick,
  questions = [],
}: RoscoProps) {
  
  return (
    <div className="relative w-[28rem] h-[28rem] lg:w-[36rem] lg:h-[36rem] xl:w-[42rem] xl:h-[42rem] 2xl:w-[48rem] 2xl:h-[48rem] mx-auto">
      {ALPHABET.map((letter, index) => {
        const angle = (index * 360) / ALPHABET.length + 90; // Start from top (12 o'clock)
        const questionData = questions.find(q => q.letter === letter);
        
        // Determine if letter is in top half of circle (should show tooltip below)
        const normalizedAngle = ((angle % 360) + 360) % 360;
        const isTopHalf = normalizedAngle > 315 || normalizedAngle < 225; // Top portion of circle

        return (
          <div
            key={letter}
            className="absolute left-1/2 top-1/2 [--r:200px] lg:[--r:270px] xl:[--r:315px] 2xl:[--r:360px]"
            style={{
              transform: `
                translate(-50%, -50%)
                rotate(${angle - 90}deg)
                translateY(calc(var(--r) * -1))
                rotate(${-angle + 90}deg)
              `,
            }}
          >
            <LetterNode
              letter={letter}
              state={letterStates[letter] || "default"}
              isActive={currentLetter === letter}
              onClick={onLetterClick ? () => onLetterClick(letter) : undefined}
              questionData={questionData}
              showTooltipBelow={isTopHalf}
            />
          </div>
        );
      })}

    </div>
  );
}
