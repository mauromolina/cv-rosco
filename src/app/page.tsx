"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";
import { Rosco } from "@/components/Rosco";
import { cn } from "@/utils/cn";
import type { LetterState } from "@/types";
import { biblicalRoscos } from "@/data/biblical-roscos";

const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const GROUPS = [
  { id: 1, name: "Grupo 1" },
  { id: 2, name: "Grupo 2" },
  { id: 3, name: "Grupo 3" },
  { id: 4, name: "Grupo 4" },
  { id: 5, name: "Grupo 5" },
  { id: 6, name: "Grupo 6" },
];

type GroupState = {
  letterStates: Record<string, LetterState>;
  currentLetter: string;
  time: number;
  isCompleted: boolean;
  isActive: boolean;
};

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState(1);
  const [showTimeConfig, setShowTimeConfig] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [tempTimeSettings, setTempTimeSettings] = useState<
    Record<number, number>
  >({});
  const [customTimeLimits, setCustomTimeLimits] = useState<
    Record<number, number>
  >({});
  const [activeGroupsCount, setActiveGroupsCount] = useState<number>(6);
  const [customGroupNames, setCustomGroupNames] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [tempGroupNames, setTempGroupNames] = useState<Record<number, string>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [editLetterModal, setEditLetterModal] = useState<{
    isOpen: boolean;
    letter: string;
    currentState: LetterState;
  }>({ isOpen: false, letter: "", currentState: "default" });
  const [groupStates, setGroupStates] = useState<Record<number, GroupState>>(() => {
    const initial: Record<number, GroupState> = {};
    GROUPS.forEach((group) => {
      const rosco = biblicalRoscos.find((r) => r.groupId === group.id);
      initial[group.id] = {
        letterStates: Object.fromEntries(
          ALPHABET.map((letter) => [letter, "default"])
        ),
        currentLetter: "A",
        time: rosco?.timeLimit || 300,
        isCompleted: false,
        isActive: false,
      };
    });
    return initial;
  });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [feedbackBadge, setFeedbackBadge] = useState<{
    type: "correct" | "wrong" | "pass" | null;
    show: boolean;
  }>({ type: null, show: false });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentGroupState = groupStates[selectedGroup];
  const currentRosco = biblicalRoscos.find(
    (rosco) => rosco.groupId === selectedGroup
  );
  const currentQuestion = currentRosco?.questions.find(
    (q) => q.letter === currentGroupState.currentLetter
  );

  const getNextAvailableLetter = (
    letterStates: Record<string, LetterState>,
    fromLetter: string
  ) => {
    const currentIndex = ALPHABET.indexOf(fromLetter);

    // First, look for 'default' states starting from current position
    for (let i = 1; i < ALPHABET.length; i++) {
      const nextIndex = (currentIndex + i) % ALPHABET.length;
      const letter = ALPHABET[nextIndex];
      if (letterStates[letter] === "default") {
        return letter;
      }
    }

    // If no default found, look for 'pass' states
    for (let i = 1; i < ALPHABET.length; i++) {
      const nextIndex = (currentIndex + i) % ALPHABET.length;
      const letter = ALPHABET[nextIndex];
      if (letterStates[letter] === "pass") {
        return letter;
      }
    }

    return fromLetter;
  };

  const startGame = () => {
    const currentGroup = groupStates[selectedGroup];

    // Only reset if this is a completely fresh start (no progress at all)
    const hasAnyProgress = Object.values(currentGroup.letterStates).some(
      (state) => state !== "default"
    );

    let updatedState: Partial<GroupState> = { isActive: true };

    if (hasAnyProgress) {
      // If continuing, check if current letter is still valid
      const currentLetterState = currentGroup.letterStates[currentGroup.currentLetter];
      const currentLetterIsValid = currentLetterState === "default" || currentLetterState === "pass";
      
      let nextLetter = currentGroup.currentLetter;
      
      // Only search for a new letter if the current one is no longer valid
      if (!currentLetterIsValid) {
        nextLetter = "A";

        // Look for first default letter from A
        for (const letter of ALPHABET) {
          if (currentGroup.letterStates[letter] === "default") {
            nextLetter = letter;
            break;
          }
        }

        // If no default letters, look for first pass letter
        if (currentGroup.letterStates[nextLetter] !== "default") {
          for (const letter of ALPHABET) {
            if (currentGroup.letterStates[letter] === "pass") {
              nextLetter = letter;
              break;
            }
          }
        }
      }

      updatedState = { ...updatedState, currentLetter: nextLetter };
    } else {
      // Fresh start - use custom time limit if set, otherwise use rosco default
      const rosco = biblicalRoscos.find((r) => r.groupId === selectedGroup);
      const timeLimit =
        customTimeLimits[selectedGroup] || rosco?.timeLimit || 300;
      updatedState = {
        ...updatedState,
        time: timeLimit,
        currentLetter: "A",
        letterStates: Object.fromEntries(
          ALPHABET.map((letter) => [letter, "default"])
        ),
        isCompleted: false,
      };
    }

    setGroupStates((prev) => ({
      ...prev,
      [selectedGroup]: {
        ...prev[selectedGroup],
        ...updatedState,
      },
    }));

    const id = setInterval(() => {
      setGroupStates((prev) => {        
        const newTime = prev[selectedGroup].time - 1;
        if (newTime <= 0) {
          // Time's up - end game
          clearInterval(id);
          setIntervalId(null);
          setIsPaused(false);
          return {
            ...prev,
            [selectedGroup]: {
              ...prev[selectedGroup],
              time: 0,
              isActive: false,
            },
          };
        }
        return {
          ...prev,
          [selectedGroup]: {
            ...prev[selectedGroup],
            time: newTime,
          },
        };
      });
    }, 1000);
    setIntervalId(id);
  };

  const togglePause = () => {
    if (!currentGroupState.isActive) return;
    setIsPaused(!isPaused);
  };

  const handleLetterClick = (letter: string) => {
    const currentState = currentGroupState.letterStates[letter];
    setEditLetterModal({
      isOpen: true,
      letter,
      currentState,
    });
  };

  const handleLetterStateChange = (newState: LetterState) => {
    setGroupStates((prev) => ({
      ...prev,
      [selectedGroup]: {
        ...prev[selectedGroup],
        letterStates: {
          ...prev[selectedGroup].letterStates,
          [editLetterModal.letter]: newState,
        },
      },
    }));
    setEditLetterModal({ isOpen: false, letter: "", currentState: "default" });
  };

  const resetGame = () => {
    const rosco = biblicalRoscos.find((r) => r.groupId === selectedGroup);
    const timeLimit =
      customTimeLimits[selectedGroup] || rosco?.timeLimit || 300;
    setGroupStates((prev) => ({
      ...prev,
      [selectedGroup]: {
        letterStates: Object.fromEntries(
          ALPHABET.map((letter) => [letter, "default"])
        ),
        currentLetter: "A",
        time: timeLimit,
        isCompleted: false,
        isActive: false,
      },
    }));

    setIsPaused(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleAnswer = (state: LetterState) => {
    if (!currentGroupState.isActive || isPaused) return;

    // Show feedback badge (only for non-default states)
    if (state !== "default") {
      setFeedbackBadge({ type: state as "correct" | "wrong" | "pass", show: true });
    }

    // Hide badge after 2 seconds
    setTimeout(() => {
      setFeedbackBadge({ type: null, show: false });
    }, 2000);

    // Check if we're giving pass to a letter that's already pass
    const currentLetterWasAlreadyPass = currentGroupState.letterStates[currentGroupState.currentLetter] === "pass";
    const givingPassToPassLetter = currentLetterWasAlreadyPass && state === "pass";

    const newLetterStates = {
      ...currentGroupState.letterStates,
      [currentGroupState.currentLetter]: state,
    };

    // Turn ends if answer is wrong or pass
    const turnEnds = state === "wrong" || state === "pass";

    // Find next available letter
    let nextLetter = currentGroupState.currentLetter;
    const currentIndex = ALPHABET.indexOf(currentGroupState.currentLetter);

    // Look for next default letter starting from current position
    for (let i = 1; i < ALPHABET.length; i++) {
      const nextIndex = (currentIndex + i) % ALPHABET.length;
      const letter = ALPHABET[nextIndex];
      if (newLetterStates[letter] === "default") {
        nextLetter = letter;
        break;
      }
    }

    // If no default letters, look for pass letters
    if (nextLetter === currentGroupState.currentLetter) {
      for (let i = 1; i < ALPHABET.length; i++) {
        const nextIndex = (currentIndex + i) % ALPHABET.length;
        const letter = ALPHABET[nextIndex];
        // If we're giving pass to an already pass letter, skip the current letter to force advancement
        const shouldSkipCurrentLetter = givingPassToPassLetter && letter === currentGroupState.currentLetter;
        if (newLetterStates[letter] === "pass" && !shouldSkipCurrentLetter) {
          nextLetter = letter;
          break;
        }
      }
    }

    // Check if rosco is complete (all letters answered)
    const states = Object.values(newLetterStates);
    const hasDefaultOrPass = states.some(
      (s) => s === "default" || s === "pass"
    );
    const isRoscoCompleted = !hasDefaultOrPass;

    setGroupStates((prev) => ({
      ...prev,
      [selectedGroup]: {
        ...prev[selectedGroup],
        letterStates: newLetterStates,
        currentLetter: nextLetter,
        isCompleted: isRoscoCompleted,
        isActive: !turnEnds && !isRoscoCompleted,
      },
    }));

    // Stop timer if turn ends or rosco is completed
    if (turnEnds || isRoscoCompleted) {
      setIsPaused(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      // Auto-advance to next group if available (but don't start their timer)
      if (!isRoscoCompleted) {
        const nextGroup = selectedGroup < activeGroupsCount ? selectedGroup + 1 : 1;
        if (groupStates[nextGroup] && !groupStates[nextGroup].isCompleted) {
          setTimeout(() => {
            setSelectedGroup(nextGroup);
          }, 1500);
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    return `${seconds}`;
  };

  const getGroupStatus = (groupId: number) => {
    const group = groupStates[groupId];
    if (!group) return "pending"; // Group doesn't exist yet
    if (group.isCompleted) return "completed";
    if (group.isActive) return "active";
    const hasProgress = Object.values(group.letterStates).some(
      (state) => state !== "default"
    );
    if (hasProgress) return "progress";
    return "pending";
  };

  const openTimeConfig = () => {
    // Initialize with current times
    const currentTimes: Record<number, number> = {};
    GROUPS.forEach((group) => {
      currentTimes[group.id] = groupStates[group.id].time;
    });
    setTempTimeSettings(currentTimes);
    setShowTimeConfig(true);
  };

  const applyTimeSettings = () => {
    // Update custom time limits
    setCustomTimeLimits(tempTimeSettings);

    // Update current group states
    setGroupStates((prev) => {
      const updated = { ...prev };
      Object.entries(tempTimeSettings).forEach(([groupId, time]) => {
        const id = parseInt(groupId);
        updated[id] = {
          ...updated[id],
          time: time,
        };
      });
      return updated;
    });
    setShowTimeConfig(false);
  };

  const updateTempTime = (groupId: number, time: number) => {
    setTempTimeSettings((prev) => ({
      ...prev,
      [groupId]: time,
    }));
  };

  const clearGameProgress = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rosco-game-state");
    }

    // Reset to initial state
    const initial: Record<number, GroupState> = {};
    GROUPS.forEach((group) => {
      const rosco = biblicalRoscos.find((r) => r.groupId === group.id);
      const timeLimit = customTimeLimits[group.id] || rosco?.timeLimit || 300;
      initial[group.id] = {
        letterStates: Object.fromEntries(
          ALPHABET.map((letter) => [letter, "default"])
        ),
        currentLetter: "A",
        time: timeLimit,
        isCompleted: false,
        isActive: false,
      };
    });

    setGroupStates(initial);
    setSelectedGroup(1);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const getActiveGroups = () => {
    return GROUPS.slice(0, activeGroupsCount).map(group => ({
      ...group,
      name: customGroupNames[group.id] || group.name
    }));
  };

  const getGroupDisplayName = (groupId: number) => {
    return customGroupNames[groupId] || GROUPS.find(g => g.id === groupId)?.name || `Grupo ${groupId}`;
  };

  const getGroupStats = (groupId: number) => {
    const group = groupStates[groupId];
    if (!group) {
      return {
        correct: 0,
        wrong: 0,
        pass: 0,
        time: 300, // Default time
      };
    }
    
    const letterStates = Object.values(group.letterStates);
    return {
      correct: letterStates.filter((s) => s === "correct").length,
      wrong: letterStates.filter((s) => s === "wrong").length,
      pass: letterStates.filter((s) => s === "pass").length,
      time: group.time,
    };
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const updateTempGroupName = (groupId: number, name: string) => {
    setTempGroupNames(prev => ({
      ...prev,
      [groupId]: name
    }));
  };

  const applyGroupNames = () => {
    setCustomGroupNames(tempGroupNames);
  };

  const getGroupStatusColor = (groupId: number) => {
    const status = getGroupStatus(groupId);
    switch (status) {
      case "completed":
        return "border-green-400 bg-green-600 text-white";
      case "active":
        return "border-blue-300 bg-blue-600 text-white";
      case "progress":
        return "border-gray-400 bg-gray-500 text-gray-200";
      default:
        return "border-gray-300 bg-gray-600 text-white hover:border-gray-200";
    }
  };

  // Save game state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("rosco-game-state", JSON.stringify(groupStates));
    }
  }, [groupStates, isLoaded]);

  // Save custom time limits to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem(
        "rosco-time-limits",
        JSON.stringify(customTimeLimits)
      );
    }
  }, [customTimeLimits, isLoaded]);

  // Save active groups count to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("rosco-active-groups", activeGroupsCount.toString());
    }
  }, [activeGroupsCount, isLoaded]);

  // Save custom group names to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("rosco-group-names", JSON.stringify(customGroupNames));
    }
  }, [customGroupNames, isLoaded]);

  // Initialize missing group states when activeGroupsCount changes
  useEffect(() => {
    if (isLoaded) {
      setGroupStates((prev) => {
        const updated = { ...prev };
        let hasChanges = false;
        
        // Initialize missing groups
        for (let i = 1; i <= activeGroupsCount; i++) {
          if (!updated[i]) {
            const rosco = biblicalRoscos.find((r) => r.groupId === i);
            const timeLimit = customTimeLimits[i] || rosco?.timeLimit || 300;
            updated[i] = {
              letterStates: Object.fromEntries(
                ALPHABET.map((letter) => [letter, "default"])
              ),
              currentLetter: "A",
              time: timeLimit,
              isCompleted: false,
              isActive: false,
            };
            hasChanges = true;
          }
        }
        
        return hasChanges ? updated : prev;
      });
    }
  }, [activeGroupsCount, customTimeLimits, isLoaded]);

  // Load localStorage values after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTimeLimits = localStorage.getItem("rosco-time-limits");
      const parsedTimeLimits = savedTimeLimits ? JSON.parse(savedTimeLimits) : {};
      
      const savedActiveGroups = localStorage.getItem("rosco-active-groups");
      const parsedActiveGroups = savedActiveGroups ? parseInt(savedActiveGroups) : 6;
      
      const savedGroupNames = localStorage.getItem("rosco-group-names");
      const parsedGroupNames = savedGroupNames ? JSON.parse(savedGroupNames) : {};
      
      const savedGameState = localStorage.getItem("rosco-game-state");
      
      // Set non-gameState values first
      if (savedTimeLimits) {
        setCustomTimeLimits(parsedTimeLimits);
      }
      if (savedActiveGroups) {
        setActiveGroupsCount(parsedActiveGroups);
      }
      if (savedGroupNames) {
        setCustomGroupNames(parsedGroupNames);
      }
      
      // Set game state last, using the loaded time limits
      if (savedGameState) {
        setGroupStates(JSON.parse(savedGameState));
      } else {
        // If no saved game state, initialize with custom time limits
        const initial: Record<number, GroupState> = {};
        GROUPS.forEach((group) => {
          const rosco = biblicalRoscos.find((r) => r.groupId === group.id);
          const timeLimit = parsedTimeLimits[group.id] || rosco?.timeLimit || 300;
          initial[group.id] = {
            letterStates: Object.fromEntries(
              ALPHABET.map((letter) => [letter, "default"])
            ),
            currentLetter: "A",
            time: timeLimit,
            isCompleted: false,
            isActive: false,
          };
        });
        setGroupStates(initial);
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Handle timer pause/resume
  useEffect(() => {
    if (!currentGroupState.isActive) return;

    if (isPaused) {
      // Pause the timer
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    } else {
      // Resume the timer if not already running
      if (!intervalId) {
        const id = setInterval(() => {
          setGroupStates((prev) => {
            const newTime = prev[selectedGroup].time - 1;
            if (newTime <= 0) {
              // Time's up - end game
              clearInterval(id);
              setIntervalId(null);
              setIsPaused(false);
              return {
                ...prev,
                [selectedGroup]: {
                  ...prev[selectedGroup],
                  time: 0,
                  isActive: false,
                },
              };
            }
            return {
              ...prev,
              [selectedGroup]: {
                ...prev[selectedGroup],
                time: newTime,
              },
            };
          });
        }, 1000);
        setIntervalId(id);
      }
    }
  }, [isPaused, currentGroupState.isActive, selectedGroup, intervalId]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger game actions if we're in an input field or modal
      const activeElement = document.activeElement;
      const isInInput = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';
      const isInModal = showSettings || editLetterModal.isOpen || showControls;
      
      if (isInInput || isInModal) return;

      switch (event.key) {
        case '1':
          event.preventDefault();
          handleAnswer("correct");
          break;
        case '2':
          event.preventDefault();
          handleAnswer("wrong");
          break;
        case '3':
          event.preventDefault();
          handleAnswer("pass");
          break;
        case ' ':
          event.preventDefault();
          if (!currentGroupState.isActive) {
            startGame();
          } else {
            togglePause();
          }
          break;
        case 'Q':
        case 'q':
          if (event.shiftKey) {
            event.preventDefault();
            resetGame();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentGroupState.isActive, showSettings, editLetterModal.isOpen, showControls, handleAnswer, startGame, togglePause, resetGame]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
      {/* Mobile Warning */}
      <div
        className="lg:hidden min-h-screen flex items-center justify-center p-6"
        style={{
          background: "linear-gradient(to bottom, #0E1926, #072E62, #0E1926)",
        }}
      >
        <div className="bg-[#0F58FC] rounded-2xl p-8 border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.6)] text-center max-w-md">
          <div className="text-6xl mb-4">🖥️</div>
          <h2
            className="text-2xl font-bold text-white mb-4"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            Solo disponible en escritorio
          </h2>
          <p
            className="text-white text-lg leading-relaxed"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            Esta aplicación está optimizada para pantallas grandes. Por favor,
            accede desde una computadora o tablet en modo horizontal.
          </p>
        </div>
      </div>

      {/* Desktop Application */}
      <div
        className="hidden lg:block min-h-screen p-6"
        style={{
          background: "linear-gradient(to bottom, #0E1926, #072E62, #0E1926)",
        }}
      >
        <div className="max-w-full mx-auto h-screen px-4 xl:px-8">
          <div className="grid grid-cols-12 gap-4 xl:gap-8 pt-4 xl:pt-8 pb-4">
            {/* Left Column - Groups */}
            <div className="flex flex-col items-center space-y-3 xl:space-y-4 col-span-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-2xl font-bold text-white">Grupos</h2>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    {isFullscreen ? "🗗" : "🗖"} {isFullscreen ? "Salir" : "Pantalla completa"}
                  </button>
                  <button
                    onClick={() => {
                      // Initialize temp settings with current values
                      const currentTimes: Record<number, number> = {};
                      const currentNames: Record<number, string> = {};
                      getActiveGroups().forEach((group) => {
                        currentTimes[group.id] = groupStates[group.id].time;
                        currentNames[group.id] = customGroupNames[group.id] || group.name;
                      });
                      setTempTimeSettings(currentTimes);
                      setTempGroupNames(currentNames);
                      setShowSettings(true);
                    }}
                    className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    ⚙️ Configuración
                  </button>
                </div>
              </div>
              {getActiveGroups().map((group) => {
                const status = getGroupStatus(group.id);
                return (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id)}
                    className={cn(
                      "p-4 xl:p-6 rounded-xl border-2 font-medium transition-all duration-300 transform relative w-full min-w-[140px] xl:min-w-[180px] cursor-pointer",
                      "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4),0_6px_12px_rgba(0,0,0,0.3)]",
                      "hover:scale-105 hover:brightness-110 active:scale-95 active:shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                      selectedGroup === group.id && status !== "completed"
                        ? "border-blue-300 bg-blue-600 text-white"
                        : getGroupStatusColor(group.id)
                    )}
                  >
                    <div className="text-lg xl:text-xl">{group.name}</div>
                    {status === "completed" && (
                      <div className="absolute top-2 right-2 text-green-400 text-xl">
                        ✓
                      </div>
                    )}
                    {status === "active" && selectedGroup === group.id && (
                      <div className="absolute top-2 right-2 text-blue-300 text-xl">
                        ●
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white border-opacity-20">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500 bg-opacity-20 border border-green-400">
                          <span className="text-green-300 font-bold text-sm">
                            ✓
                          </span>
                          <span className="text-green-100 font-medium text-sm">
                            {getGroupStats(group.id).correct}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500 bg-opacity-20 border border-red-400">
                          <span className="text-red-300 font-bold text-sm">
                            ✕
                          </span>
                          <span className="text-red-100 font-medium text-sm">
                            {getGroupStats(group.id).wrong}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500 bg-opacity-20 border border-orange-400">
                          <span className="text-orange-300 font-bold text-sm">
                            —
                          </span>
                          <span className="text-orange-100 font-medium text-sm">
                            {getGroupStats(group.id).pass}
                          </span>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1 rounded-lg font-bold text-base flex items-center gap-2",
                          getGroupStats(group.id).time <= 60
                            ? "bg-red-600 text-white"
                            : getGroupStats(group.id).time < 110
                            ? "bg-yellow-600 text-white"
                            : "bg-blue-600 text-white"
                        )}
                      >
                        <span className="text-sm">⏰</span>
                        {formatTime(getGroupStats(group.id).time)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Center Column - Game Controls */}
            <div className="flex flex-col items-center space-y-4 xl:space-y-6 col-span-3">
              {/* Current Group Playing */}
              <div className="text-center">
                <h2 className="text-2xl xl:text-4xl font-medium text-blue-200 mb-2 xl:mb-3">
                  Jugando:
                </h2>
                <h3 className="text-4xl xl:text-6xl font-bold text-white">
                  {getGroupDisplayName(selectedGroup)}
                </h3>
              </div>

              {/* Timer */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 xl:w-40 xl:h-40 rounded-full bg-[#0F58FC] flex items-center justify-center border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.4),inset_0_2px_0_rgba(255,255,255,0.2)]">
                  <div
                    className="font-mono font-bold text-white text-center leading-none text-3xl xl:text-5xl"
                    style={{
                      textShadow:
                        "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {formatTime(currentGroupState.time)}
                  </div>
                </div>
                {currentGroupState.isCompleted && (
                  <div className="text-center mt-4 text-green-400 font-medium text-lg">
                    ¡Rosco Completado!
                  </div>
                )}
                {isPaused && currentGroupState.isActive && (
                  <div className="text-center mt-4 text-orange-400 font-medium text-lg">
                    ⏸️ PAUSADO
                  </div>
                )}
              </div>

              {/* Game Controls */}
              <div className="space-y-4 xl:space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={startGame}
                    disabled={
                      currentGroupState.isActive ||
                      currentGroupState.isCompleted
                    }
                    className={cn(
                      "px-6 xl:px-8 py-3 xl:py-4 rounded-lg font-medium transition-colors text-base xl:text-lg",
                      currentGroupState.isActive ||
                        currentGroupState.isCompleted
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    )}
                  >
                    Iniciar
                  </button>
                  <button
                    onClick={togglePause}
                    disabled={!currentGroupState.isActive}
                    className={cn(
                      "px-6 xl:px-8 py-3 xl:py-4 rounded-lg font-medium transition-colors text-base xl:text-lg",
                      !currentGroupState.isActive
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : isPaused
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                    )}
                  >
                    {isPaused ? "Reanudar" : "Pausar"}
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-6 xl:px-8 py-3 xl:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-base xl:text-lg"
                  >
                    Reiniciar
                  </button>
                </div>

                <div className="flex justify-center">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <button
                        onClick={() => handleAnswer("correct")}
                        disabled={!currentGroupState.isActive}
                        className={cn(
                          "w-16 h-16 xl:w-20 xl:h-20 rounded-2xl font-bold text-2xl xl:text-3xl transition-all duration-200 border-2 border-white transform-gpu relative",
                          "shadow-[0_8px_16px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
                          !currentGroupState.isActive
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-[#13DB7E] text-white hover:brightness-110 hover:scale-105 active:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95"
                        )}
                      >
                        ✓
                      </button>
                      <div className="text-white text-xs xl:text-sm mt-2">Correcto</div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleAnswer("wrong")}
                        disabled={!currentGroupState.isActive}
                        className={cn(
                          "w-16 h-16 xl:w-20 xl:h-20 rounded-2xl font-bold text-2xl xl:text-3xl transition-all duration-200 border-2 border-white transform-gpu relative",
                          "shadow-[0_8px_16px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
                          !currentGroupState.isActive
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-[#E91111] text-white hover:brightness-110 hover:scale-105 active:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95"
                        )}
                      >
                        ✕
                      </button>
                      <div className="text-white text-xs xl:text-sm mt-2">Incorrecto</div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleAnswer("pass")}
                        disabled={!currentGroupState.isActive}
                        className={cn(
                          "w-16 h-16 xl:w-20 xl:h-20 rounded-2xl font-bold text-2xl xl:text-3xl transition-all duration-200 border-2 border-white transform-gpu relative",
                          "shadow-[0_8px_16px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
                          !currentGroupState.isActive
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-[#E9C911] text-white hover:brightness-110 hover:scale-105 active:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95"
                        )}
                      >
                        —
                      </button>
                      <div className="text-white text-xs xl:text-sm mt-2">Pasapalabra</div>
                    </div>
                  </div>
                </div>

                {/* Keyboard Controls Help Button */}
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowControls(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2 mx-auto"
                  >
                    ⌨️ Controles de Teclado
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Rosco */}
            <div className="flex flex-col items-center col-span-6 pl-4 xl:pl-8">
              {/* Rosco */}
              <div className="relative">
                <Rosco
                  letterStates={currentGroupState.letterStates}
                  currentLetter={currentGroupState.currentLetter}
                  questions={currentRosco?.questions}
                  onLetterClick={handleLetterClick}
                />

                {/* Feedback Badge */}
                {feedbackBadge.show && feedbackBadge.type && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={cn(
                        "px-8 py-4 rounded-2xl font-bold text-3xl text-white border-4 border-white transform transition-all duration-500 animate-bounce-in",
                        "shadow-[0_12px_24px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.4),inset_0_2px_0_rgba(255,255,255,0.3)]",
                        feedbackBadge.type === "correct" && "bg-[#13DB7E]",
                        feedbackBadge.type === "wrong" && "bg-[#E91111]",
                        feedbackBadge.type === "pass" && "bg-[#E9C911]"
                      )}
                      style={{
                        textShadow:
                          "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {feedbackBadge.type === "correct" && "¡Correcto!"}
                      {feedbackBadge.type === "wrong" && "¡Incorrecto!"}
                      {feedbackBadge.type === "pass" && "¡Pasapalabra!"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question/Consigna Display - Only when game is active */}
          {currentGroupState.isActive && (
            <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-8 z-10">
              <div className="bg-[#0F58FC] rounded-2xl p-6 border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.4),inset_0_2px_0_rgba(255,255,255,0.3)]">
                {currentQuestion && (
                  <div className="mb-4 flex justify-start">
                    <span className={cn(
                      "inline-block px-6 py-3 rounded-xl text-lg xl:text-xl font-extrabold border-4 shadow-[0_4px_12px_rgba(0,0,0,0.4)] transform transition-all",
                      currentQuestion.contains
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-200 shadow-orange-500/30"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-200 shadow-green-500/30"
                    )}
                    style={{
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                      letterSpacing: "1px"
                    }}>
                      {currentQuestion.contains 
                        ? `CONTIENE ${currentGroupState.currentLetter}` 
                        : `COMIENZA CON ${currentGroupState.currentLetter}`}
                    </span>
                  </div>
                )}
                <p
                  className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white leading-tight"
                  style={{
                    textShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {currentQuestion ? currentQuestion.question : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Letter State Modal */}
      {editLetterModal.isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0F58FC] rounded-2xl p-8 max-w-md w-full mx-4 border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Editar Estado de Letra {editLetterModal.letter}
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleLetterStateChange("default")}
                className={cn(
                  "w-full px-6 py-4 rounded-lg font-medium transition-colors text-lg border-2",
                  editLetterModal.currentState === "default"
                    ? "bg-gray-500 border-white text-white"
                    : "bg-gray-600 border-gray-400 text-gray-200 hover:border-gray-200"
                )}
              >
                🔘 Sin Responder
              </button>
              
              <button
                onClick={() => handleLetterStateChange("correct")}
                className={cn(
                  "w-full px-6 py-4 rounded-lg font-medium transition-colors text-lg border-2",
                  editLetterModal.currentState === "correct"
                    ? "bg-[#13DB7E] border-white text-white"
                    : "bg-green-600 border-green-400 text-green-200 hover:border-green-200"
                )}
              >
                ✓ Correcto
              </button>
              
              <button
                onClick={() => handleLetterStateChange("wrong")}
                className={cn(
                  "w-full px-6 py-4 rounded-lg font-medium transition-colors text-lg border-2",
                  editLetterModal.currentState === "wrong"
                    ? "bg-[#E91111] border-white text-white"
                    : "bg-red-600 border-red-400 text-red-200 hover:border-red-200"
                )}
              >
                ✕ Incorrecto
              </button>
              
              <button
                onClick={() => handleLetterStateChange("pass")}
                className={cn(
                  "w-full px-6 py-4 rounded-lg font-medium transition-colors text-lg border-2",
                  editLetterModal.currentState === "pass"
                    ? "bg-[#E9C911] border-white text-white"
                    : "bg-yellow-600 border-yellow-400 text-yellow-200 hover:border-yellow-200"
                )}
              >
                — Pasapalabra
              </button>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setEditLetterModal({ isOpen: false, letter: "", currentState: "default" })}
                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Controls Modal */}
      {showControls && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0F58FC] rounded-2xl p-8 max-w-md w-full mx-4 border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              ⌨️ Controles de Teclado
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white bg-opacity-90 rounded-lg p-4">
                <h4 className="text-gray-800 font-bold text-lg mb-3">Durante el Juego</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Respuesta Correcta</span>
                    <span className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Respuesta Incorrecta</span>
                    <span className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pasapalabra</span>
                    <span className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">3</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-90 rounded-lg p-4">
                <h4 className="text-gray-800 font-bold text-lg mb-3">Control del Juego</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Iniciar / Pausar</span>
                    <span className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">Espacio</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reiniciar Grupo</span>
                    <span className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">Shift + Q</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-100 rounded-lg p-3 border border-yellow-300">
                <p className="text-yellow-800 text-sm">
                  <strong>Nota:</strong> Los controles se desactivan automáticamente cuando estás editando nombres de grupos o en los modales de configuración.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowControls(false)}
                className="px-6 py-3 bg-white text-[#0F58FC] rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0F58FC] rounded-2xl p-8 max-w-2xl w-full mx-4 border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.6)] max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              ⚙️ Configuración del Juego
            </h3>

            {/* Number of Groups */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-3">
                Número de Grupos
              </h4>
              <div className="bg-white bg-opacity-90 rounded-lg p-4 border border-gray-300">
                <div className="flex items-center justify-between">
                  <label className="text-gray-800 font-bold text-lg">
                    Grupos activos:
                  </label>
                  <select
                    value={activeGroupsCount}
                    onChange={(e) =>
                      setActiveGroupsCount(parseInt(e.target.value))
                    }
                    className="px-3 py-2 rounded-lg bg-white text-black font-bold border border-gray-300"
                  >
                    <option value={1}>1 Grupo</option>
                    <option value={2}>2 Grupos</option>
                    <option value={3}>3 Grupos</option>
                    <option value={4}>4 Grupos</option>
                    <option value={5}>5 Grupos</option>
                    <option value={6}>6 Grupos</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Group Names Configuration */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-3">Nombres de Grupos</h4>
              <div className="space-y-3">
                {getActiveGroups().map((group) => (
                  <div key={group.id} className="bg-white bg-opacity-90 rounded-lg p-4 border border-gray-300">
                    <div className="flex items-center justify-between">
                      <label className="text-gray-800 font-bold text-lg">
                        Grupo {group.id}:
                      </label>
                      <input
                        type="text"
                        placeholder={`Grupo ${group.id}`}
                        value={tempGroupNames[group.id] ?? customGroupNames[group.id] ?? group.name}
                        onChange={(e) => updateTempGroupName(group.id, e.target.value)}
                        className="w-40 px-3 py-2 rounded-lg bg-white text-black font-bold border border-gray-300"
                        maxLength={20}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Configuration */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-3">
                Tiempo por Grupo
              </h4>
              <div className="space-y-3">
                {getActiveGroups().map((group) => (
                  <div
                    key={group.id}
                    className="bg-white bg-opacity-90 rounded-lg p-4 border border-gray-300"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-gray-800 font-bold text-lg">
                        {group.name}:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="30"
                          max="1800"
                          value={
                            tempTimeSettings[group.id] ??
                            customTimeLimits[group.id] ??
                            groupStates[group.id].time
                          }
                          onChange={(e) =>
                            updateTempTime(
                              group.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-3 py-2 rounded-lg bg-white text-black font-bold text-center border border-gray-300"
                        />
                        <span className="text-gray-800 text-sm font-medium">
                          segundos
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Progress */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-3">
                Progreso del Juego
              </h4>
              <div className="bg-white bg-opacity-90 rounded-lg p-4 border border-gray-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 font-bold text-lg">
                      Limpiar progreso
                    </p>
                    <p className="text-gray-600 text-sm">
                      Reinicia todas las respuestas y tiempos
                    </p>
                  </div>
                  <button
                    onClick={clearGameProgress}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  applyTimeSettings();
                  applyGroupNames();
                  setShowSettings(false);
                }}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
