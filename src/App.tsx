import React, { useState, useEffect, useRef } from 'react';
import { LEVELS } from './data/levels';
import { CommandBlock, CommandType, Direction, Level, BackgroundThemeId } from './types';
import { GridMap } from './components/GridMap';
import { BlockWorkspace } from './components/BlockWorkspace';
import { PedagogicalModal } from './components/PedagogicalModal';
import { LevelSuccessModal } from './components/LevelSuccessModal';
import { FreeSandboxMode } from './components/FreeSandboxMode';
import { LevelTutorialModal } from './components/LevelTutorialModal';
import { GameBackground } from './components/GameBackground';
import { BackgroundSelectorModal } from './components/BackgroundSelectorModal';
import { MissionsRoadmapModal } from './components/MissionsRoadmapModal';
import { MissionSelectorBar } from './components/MissionSelectorBar';
import { EducationalMissionPanel } from './components/EducationalMissionPanel';
import { sound } from './utils/sound';
import {
  Sparkles,
  BookOpen,
  Cpu,
  Volume2,
  VolumeX,
  Trophy,
  Star,
  Layers,
  ChevronRight,
  ChevronLeft,
  Info,
  RotateCcw,
  HelpCircle,
  Palette,
  Compass,
} from 'lucide-react';

export default function App() {
  // Navigation & Level State
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'adventure' | 'sandbox'>('adventure');
  const [isPedagogicalOpen, setIsPedagogicalOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState<boolean>(false);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundThemeId>(() => {
    const saved = localStorage.getItem('missao_algoritmo_bg_theme');
    return (saved as BackgroundThemeId) || 'deep-space';
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Current Level
  const currentLevel: Level = LEVELS[currentLevelIndex] || LEVELS[0];

  // Algorithmic Program State
  const [blocks, setBlocks] = useState<CommandBlock[]>([]);
  const [robotPos, setRobotPos] = useState<{ x: number; y: number; dir: Direction }>(
    currentLevel.startPos
  );
  const [currentEnergy, setCurrentEnergy] = useState<number>(currentLevel.initialEnergy);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);

  // LocalStorage Persisted Stores: Stars & D12 completions
  const [levelStars, setLevelStars] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('missao_algoritmo_stars');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const [d12ResolvedMap, setD12ResolvedMap] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('missao_algoritmo_d12');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  // Simulation Runner State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'info' | 'error' | 'success';
    text: string;
  }>({
    type: 'info',
    text: 'Monte o algoritmo na paleta e pressione Executar para guiar o robô Byte!',
  });

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [currentStars, setCurrentStars] = useState<number>(0);

  // Execution Control Ref
  const isPausedRef = useRef<boolean>(false);
  const isStoppedRef = useRef<boolean>(false);
  isPausedRef.current = isPaused;

  // Total stars calculated across all levels
  const totalStarsEarned = (Object.values(levelStars) as number[]).reduce(
    (acc, curr) => acc + (curr || 0),
    0
  );

  // Reset when level changes
  useEffect(() => {
    resetLevelState();
  }, [currentLevelIndex]);

  const resetLevelState = () => {
    isStoppedRef.current = true;
    setIsRunning(false);
    setIsPaused(false);
    setStepIndex(0);
    setActiveBlockId(null);
    setRobotPos(currentLevel.startPos);
    setCurrentEnergy(currentLevel.initialEnergy);
    setCollectedItems([]);
    setStatusMessage({
      type: 'info',
      text: `Fase ${currentLevel.id}: Interprete o texto (D12), calcule a energia (D19) e programe Byte (EF05CO04)!`,
    });
  };

  const handleLoadSampleAlgorithm = (commands: CommandType[]) => {
    const newBlocks: CommandBlock[] = commands.map((type, i) => ({
      id: `sample-${Date.now()}-${i}`,
      type,
      value: type === 'add_energy' || type === 'sub_energy' ? 10 : undefined,
    }));
    setBlocks(newBlocks);
    resetLevelState();
    sound.playMathAdd();
    setStatusMessage({
      type: 'info',
      text: `Algoritmo modelo da Fase ${currentLevel.id} inserido no editor (${commands.length} blocos). Pronto para testar!`,
    });
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectTheme = (theme: BackgroundThemeId) => {
    setBackgroundTheme(theme);
    localStorage.setItem('missao_algoritmo_bg_theme', theme);
    sound.playMathAdd();
  };

  // Helper to rotate robot direction
  const turnDirection = (currentDir: Direction, turn: 'left' | 'right'): Direction => {
    const dirs: Direction[] = ['up', 'right', 'down', 'left'];
    const idx = dirs.indexOf(currentDir);
    if (turn === 'right') {
      return dirs[(idx + 1) % 4];
    } else {
      return dirs[(idx - 1 + 4) % 4];
    }
  };

  // Helper to get forward coordinates
  const getNextPosition = (pos: { x: number; y: number; dir: Direction }) => {
    let { x, y } = pos;
    if (pos.dir === 'up') y -= 1;
    if (pos.dir === 'right') x += 1;
    if (pos.dir === 'down') y += 1;
    if (pos.dir === 'left') x -= 1;
    return { x, y, dir: pos.dir };
  };

  // Shared execution core for single block
  const executeSingleBlock = (
    block: CommandBlock,
    currentPos: { x: number; y: number; dir: Direction },
    currentEng: number,
    currentItems: string[]
  ): {
    newPos: { x: number; y: number; dir: Direction };
    newEng: number;
    newItems: string[];
    error?: string;
  } => {
    let pos = { ...currentPos };
    let energy = currentEng;
    const items = [...currentItems];

    if (block.type === 'forward') {
      sound.playStep();
      const next = getNextPosition(pos);

      // Check bounds
      if (
        next.x < 0 ||
        next.x >= currentLevel.gridSize.cols ||
        next.y < 0 ||
        next.y >= currentLevel.gridSize.rows
      ) {
        sound.playError();
        return {
          newPos: pos,
          newEng: energy,
          newItems: items,
          error: `Erro de Depuração: O robô bateu na borda do setor na posição (${next.x}, ${next.y})!`,
        };
      }

      // Check wall collision
      const hitWall = currentLevel.cells.find(
        (c) => c.x === next.x && c.y === next.y && c.type === 'wall'
      );
      if (hitWall) {
        sound.playError();
        return {
          newPos: pos,
          newEng: energy,
          newItems: items,
          error: `Erro de Depuração: Colisão com barreira laser em (${next.x}, ${next.y})! Desvie o caminho.`,
        };
      }

      pos = next;

      // Check automatic cell item
      const cellItem = currentLevel.cells.find((c) => c.x === pos.x && c.y === pos.y);
      const cellKey = `${pos.x},${pos.y}`;
      if (cellItem && !items.includes(cellKey)) {
        if (cellItem.type === 'crystal_add' && cellItem.value) {
          energy += cellItem.value;
          items.push(cellKey);
          sound.playMathAdd();
        } else if (cellItem.type === 'crystal_sub' && cellItem.value) {
          energy = Math.max(0, energy - cellItem.value);
          items.push(cellKey);
          sound.playMathSub();
        }
      }
    } else if (block.type === 'turn_left') {
      sound.playTurn();
      pos = { ...pos, dir: turnDirection(pos.dir, 'left') };
    } else if (block.type === 'turn_right') {
      sound.playTurn();
      pos = { ...pos, dir: turnDirection(pos.dir, 'right') };
    } else if (block.type === 'add_energy') {
      const val = block.value ?? 10;
      energy += val;
      sound.playMathAdd();
    } else if (block.type === 'sub_energy') {
      const val = block.value ?? 10;
      energy = Math.max(0, energy - val);
      sound.playMathSub();
    } else if (block.type === 'collect') {
      const cellKey = `${pos.x},${pos.y}`;
      const cellItem = currentLevel.cells.find((c) => c.x === pos.x && c.y === pos.y);
      if (cellItem && !items.includes(cellKey)) {
        if (cellItem.type === 'crystal_add' && cellItem.value) {
          energy += cellItem.value;
          items.push(cellKey);
          sound.playMathAdd();
        } else if (cellItem.type === 'crystal_sub' && cellItem.value) {
          energy = Math.max(0, energy - cellItem.value);
          items.push(cellKey);
          sound.playMathSub();
        }
      }
    }

    return { newPos: pos, newEng: energy, newItems: items };
  };

  // Evaluate victory condition
  const evaluateCompletion = (
    pos: { x: number; y: number; dir: Direction },
    energy: number
  ) => {
    const isAtTarget =
      pos.x === currentLevel.targetPos.x && pos.y === currentLevel.targetPos.y;
    const isEnergyCorrect = energy === currentLevel.targetEnergy;
    const d12Done = Boolean(d12ResolvedMap[currentLevel.id]);

    if (isAtTarget && isEnergyCorrect) {
      let stars = 1;
      if (d12Done) stars += 1;
      if (blocks.length <= currentLevel.maxBlocks) stars += 1;

      setCurrentStars(stars);
      setLevelStars((prev) => {
        const updated = {
          ...prev,
          [currentLevel.id]: Math.max(prev[currentLevel.id] || 0, stars),
        };
        try {
          localStorage.setItem('missao_algoritmo_stars', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      setStatusMessage({
        type: 'success',
        text: 'Excelente! O algoritmo atingiu o portal e a meta exata de energia!',
      });
      setShowSuccessModal(true);
    } else if (isAtTarget && !isEnergyCorrect) {
      sound.playError();
      setStatusMessage({
        type: 'error',
        text: `Quase lá! Byte chegou ao portal, mas com ${energy} unidades. A meta exigia exatamente ${currentLevel.targetEnergy}! Revise os cálculos de adição e subtração.`,
      });
    } else {
      sound.playError();
      setStatusMessage({
        type: 'error',
        text: `O algoritmo finalizou na posição (${pos.x}, ${pos.y}), mas o portal está em (${currentLevel.targetPos.x}, ${currentLevel.targetPos.y}). Ajuste o trajeto para conduzir o robô até o destino!`,
      });
    }
  };

  // Full continuous simulation run
  const handleRun = async () => {
    if (blocks.length === 0) {
      sound.playError();
      setStatusMessage({
        type: 'error',
        text: 'Adicione pelo menos um comando de instrução ao algoritmo antes de executar!',
      });
      return;
    }

    isStoppedRef.current = false;
    setIsRunning(true);
    setIsPaused(false);
    setStepIndex(0);
    setRobotPos(currentLevel.startPos);
    setCurrentEnergy(currentLevel.initialEnergy);
    setCollectedItems([]);
    sound.playClick();

    let pos = { ...currentLevel.startPos };
    let energy = currentLevel.initialEnergy;
    let items: string[] = [];

    setStatusMessage({
      type: 'info',
      text: 'Simulando algoritmo passo a passo...',
    });

    for (let i = 0; i < blocks.length; i++) {
      if (isStoppedRef.current) break;

      while (isPausedRef.current) {
        if (isStoppedRef.current) break;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (isStoppedRef.current) break;

      const block = blocks[i];
      setActiveBlockId(block.id);
      setStepIndex(i + 1);

      const result = executeSingleBlock(block, pos, energy, items);
      if (result.error) {
        setStatusMessage({
          type: 'error',
          text: result.error,
        });
        setIsRunning(false);
        setActiveBlockId(null);
        return;
      }

      pos = result.newPos;
      energy = result.newEng;
      items = result.newItems;

      setRobotPos(pos);
      setCurrentEnergy(energy);
      setCollectedItems([...items]);

      await new Promise((resolve) => setTimeout(resolve, 550));
    }

    setActiveBlockId(null);
    setIsRunning(false);

    if (!isStoppedRef.current) {
      evaluateCompletion(pos, energy);
    }
  };

  // Step-by-Step execution (Depuração passo a passo)
  const handleStep = () => {
    if (blocks.length === 0) {
      sound.playError();
      setStatusMessage({
        type: 'error',
        text: 'Adicione instruções à sequência antes de executar passo a passo.',
      });
      return;
    }

    let currentIdx = stepIndex;
    let currentPos = robotPos;
    let currentEng = currentEnergy;
    let currentItms = collectedItems;

    // Restart from step 0 if reached end
    if (currentIdx >= blocks.length) {
      currentIdx = 0;
      currentPos = currentLevel.startPos;
      currentEng = currentLevel.initialEnergy;
      currentItms = [];
      setRobotPos(currentPos);
      setCurrentEnergy(currentEng);
      setCollectedItems([]);
    }

    const block = blocks[currentIdx];
    setActiveBlockId(block.id);

    const result = executeSingleBlock(block, currentPos, currentEng, currentItms);

    if (result.error) {
      setStatusMessage({
        type: 'error',
        text: result.error,
      });
      setIsRunning(false);
      return;
    }

    setRobotPos(result.newPos);
    setCurrentEnergy(result.newEng);
    setCollectedItems(result.newItems);
    const nextIdx = currentIdx + 1;
    setStepIndex(nextIdx);

    setStatusMessage({
      type: 'info',
      text: `Passo ${nextIdx} de ${blocks.length} executado. Energia atual: ${result.newEng} / Meta: ${currentLevel.targetEnergy}`,
    });

    if (nextIdx === blocks.length) {
      evaluateCompletion(result.newPos, result.newEng);
    }
  };

  const handlePause = () => {
    sound.playClick();
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    sound.playClick();
    resetLevelState();
  };

  const handleNextLevel = () => {
    setShowSuccessModal(false);
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    }
  };

  const handleD12Resolved = (isCorrect: boolean) => {
    setD12ResolvedMap((prev) => {
      const next = { ...prev, [currentLevel.id]: isCorrect };
      try {
        localStorage.setItem('missao_algoritmo_d12', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Themed Background */}
      <GameBackground theme={backgroundTheme} />

      {/* App Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 border-b border-slate-800/80 backdrop-blur-md px-3 sm:px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-600 p-0.5 shadow-md shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Missão Algoritmo
                </h1>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60 hidden sm:inline-block">
                  BNCC & SAEB
                </span>
                <span className="text-[11px] font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800/60 hidden md:inline-block">
                  Fase {currentLevel.id} de {LEVELS.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Matemática D19 • Português D12 • Computação EF05CO04
              </p>
            </div>
          </div>

          {/* Star Counter & Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Stars summary pill */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>
                {totalStarsEarned} / {LEVELS.length * 3}
              </span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800">
              <button
                id="tab-adventure"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('adventure');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'adventure'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trophy className="w-3 h-3" />
                <span>Missões</span>
              </button>

              <button
                id="tab-sandbox"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('sandbox');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'sandbox'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Laboratório</span>
              </button>
            </div>

            {/* Roadmap Modal Button */}
            <button
              id="btn-open-roadmap-header"
              onClick={() => {
                sound.playClick();
                setIsRoadmapOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-700/60 text-indigo-300 hover:text-indigo-100 transition-all flex items-center gap-1.5"
              title="Abrir o Mapa Completo das 17 Fases"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Mapa de Missões</span>
            </button>

            {/* Pedagogical Guide Button */}
            <button
              id="btn-pedagogical-guide"
              onClick={() => {
                sound.playClick();
                setIsPedagogicalOpen(true);
              }}
              className="p-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 hover:text-cyan-200 transition-all"
              title="Ver Guia Pedagógico (D19, D12, EF05CO04)"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Tutorial Button in Header */}
            <button
              id="btn-header-tutorials"
              onClick={() => {
                sound.playClick();
                setIsTutorialOpen(true);
              }}
              className="p-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 hover:text-amber-200 transition-all"
              title="Ver Tutoriais e Dicas Passo a Passo"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
            </button>

            {/* Background Theme Selector Button */}
            <button
              id="btn-select-background"
              onClick={() => {
                sound.playClick();
                setIsBgModalOpen(true);
              }}
              className="p-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 hover:text-cyan-200 transition-all"
              title="Trocar Plano de Fundo"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Audio Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title={isMuted ? 'Ativar Efeitos Sonoros' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {activeTab === 'sandbox' ? (
          <FreeSandboxMode />
        ) : (
          <>
            {/* Structured Mission Selector Bar (Grouped by World in order) */}
            <MissionSelectorBar
              levels={LEVELS}
              currentLevelIndex={currentLevelIndex}
              currentLevel={currentLevel}
              levelStars={levelStars}
              onSelectLevel={(idx) => {
                setCurrentLevelIndex(idx);
              }}
              onOpenRoadmap={() => {
                setIsRoadmapOpen(true);
              }}
              onOpenTutorial={() => {
                setIsTutorialOpen(true);
              }}
            />

            {/* Status Alert Banner */}
            <div
              className={`px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center justify-between gap-2 shadow-sm transition-all ${
                statusMessage.type === 'error'
                  ? 'bg-rose-950/70 border-rose-600/70 text-rose-200'
                  : statusMessage.type === 'success'
                  ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Info
                  className={`w-4 h-4 shrink-0 ${
                    statusMessage.type === 'error'
                      ? 'text-rose-400'
                      : statusMessage.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-cyan-400'
                  }`}
                />
                <span>{statusMessage.text}</span>
              </div>
              <button
                onClick={handleReset}
                className="text-[11px] underline text-slate-400 hover:text-white shrink-0 ml-2"
              >
                Reiniciar
              </button>
            </div>

            {/* Main Interactive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Educational Skills (D12 & D19 organized in clean tabs) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <EducationalMissionPanel
                  key={`edu-${currentLevel.id}`}
                  levelId={currentLevel.id}
                  narrative={currentLevel.narrative}
                  d12={currentLevel.d12}
                  d19={currentLevel.d19}
                  currentEnergy={currentEnergy}
                  initialEnergy={currentLevel.initialEnergy}
                  targetEnergy={currentLevel.targetEnergy}
                  isD12Resolved={Boolean(d12ResolvedMap[currentLevel.id])}
                  onD12Resolved={(isCorrect) => handleD12Resolved(isCorrect)}
                  onOpenTutorial={() => {
                    sound.playClick();
                    setIsTutorialOpen(true);
                  }}
                />
              </div>

              {/* Center/Right Column: 2D Simulator Grid & Algorithm Block Workspace */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* 2D Interactive Robot Grid */}
                <GridMap
                  cols={currentLevel.gridSize.cols}
                  rows={currentLevel.gridSize.rows}
                  cells={currentLevel.cells}
                  robotPos={robotPos}
                  targetPos={currentLevel.targetPos}
                  targetEnergy={currentLevel.targetEnergy}
                  currentEnergy={currentEnergy}
                  collectedItems={collectedItems}
                />

                {/* Algorithmic Workspace (EF05CO04) */}
                <BlockWorkspace
                  blocks={blocks}
                  setBlocks={setBlocks}
                  availableCommands={currentLevel.availableCommands}
                  maxBlocks={currentLevel.maxBlocks}
                  isRunning={isRunning}
                  isPaused={isPaused}
                  activeBlockId={activeBlockId}
                  onRun={handleRun}
                  onPause={handlePause}
                  onReset={handleReset}
                  onStep={handleStep}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Missions Roadmap Modal (Full Ordered Journey) */}
      <MissionsRoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        levels={LEVELS}
        currentLevelId={currentLevel.id}
        levelStars={levelStars}
        onSelectLevel={(idx) => {
          setCurrentLevelIndex(idx);
        }}
      />

      {/* Pedagogical Details Modal */}
      <PedagogicalModal
        isOpen={isPedagogicalOpen}
        onClose={() => setIsPedagogicalOpen(false)}
      />

      {/* Level Tutorial & Walkthrough Modal */}
      <LevelTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        currentLevel={currentLevel}
        allLevels={LEVELS}
        onSelectLevel={(idx) => {
          setCurrentLevelIndex(idx);
        }}
        onLoadSampleAlgorithm={handleLoadSampleAlgorithm}
      />

      {/* Background Theme Selector Modal */}
      <BackgroundSelectorModal
        isOpen={isBgModalOpen}
        onClose={() => setIsBgModalOpen(false)}
        currentTheme={backgroundTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Success Modal */}
      <LevelSuccessModal
        isOpen={showSuccessModal}
        stars={currentStars}
        levelId={currentLevel.id}
        levelTitle={currentLevel.title}
        isD12Resolved={Boolean(d12ResolvedMap[currentLevel.id])}
        blockCount={blocks.length}
        maxBlocks={currentLevel.maxBlocks}
        energyTargetMet={currentEnergy === currentLevel.targetEnergy}
        onNextLevel={handleNextLevel}
        onReplay={() => {
          setShowSuccessModal(false);
          resetLevelState();
        }}
        hasNextLevel={currentLevelIndex < LEVELS.length - 1}
      />
    </div>
  );
}
