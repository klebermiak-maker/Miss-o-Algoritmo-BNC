import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Compass,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Calculator,
  Layers,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface MissionSelectorBarProps {
  levels: Level[];
  currentLevelIndex: number;
  currentLevel: Level;
  levelStars: Record<number, number>;
  onSelectLevel: (index: number) => void;
  onOpenRoadmap: () => void;
  onOpenTutorial: () => void;
}

export const MissionSelectorBar: React.FC<MissionSelectorBarProps> = ({
  levels,
  currentLevelIndex,
  currentLevel,
  levelStars,
  onSelectLevel,
  onOpenRoadmap,
  onOpenTutorial,
}) => {
  // Keep track of which world tab is being viewed (defaults to current level's world)
  const [activeWorldId, setActiveWorldId] = useState<number>(currentLevel.world);

  // Sync active world when level changes
  useEffect(() => {
    setActiveWorldId(currentLevel.world);
  }, [currentLevel.world]);

  const worlds = [
    { id: 1, name: 'Setor Alfa', icon: '🪐', phases: '1 a 3' },
    { id: 2, name: 'Setor Beta', icon: '🌱', phases: '4 a 6' },
    { id: 3, name: 'Setor Gama', icon: '💎', phases: '7 a 9' },
    { id: 4, name: 'Setor Ômega', icon: '⚡', phases: '10 a 12' },
    { id: 5, name: 'Setor Épsilon', icon: '🚀', phases: '13 a 17' },
  ];

  const phasesInActiveWorld = levels.filter((l) => l.world === activeWorldId);

  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      sound.playClick();
      onSelectLevel(currentLevelIndex - 1);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      sound.playClick();
      onSelectLevel(currentLevelIndex + 1);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-sm flex flex-col gap-3">
      {/* Top Header: Current Mission Info & Navigation Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        {/* Left: Mission identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60">
                Mundo {currentLevel.world} • {currentLevel.worldName.split(':')[0]}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Fase {currentLevel.id} de {levels.length}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              Fase {currentLevel.id}: {currentLevel.title}
            </h2>
          </div>
        </div>

        {/* Right: Previous / Next & Roadmap / Tutorial buttons */}
        <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
          {/* Quick Prev / Next */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handlePrevLevel}
              disabled={currentLevelIndex === 0}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              title="Ir para a Fase Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
            <span className="text-xs font-mono font-bold text-cyan-400 px-2">
              {currentLevel.id}/{levels.length}
            </span>
            <button
              onClick={handleNextLevel}
              disabled={currentLevelIndex === levels.length - 1}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              title="Ir para a Próxima Fase"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Roadmap Modal Trigger Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenRoadmap();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Abrir o Mapa Completo das 17 Fases"
          >
            <Compass className="w-4 h-4 text-cyan-300" />
            <span>Mapa de Missões</span>
          </button>

          {/* Tutorial Modal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTutorial();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
            title={`Abrir Guia e Dicas da Fase ${currentLevel.id}`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Dicas da Fase</span>
          </button>
        </div>
      </div>

      {/* World Tabs - 5 Worlds grouped in order */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <span>Selecione o Mundo:</span>
          </span>
          <span className="text-[11px] text-slate-400">
            Fases organizadas em ordem sequencial
          </span>
        </div>

        {/* 5 World Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
          {worlds.map((w) => {
            const isWorldActive = activeWorldId === w.id;
            const isCurrentLevelWorld = currentLevel.world === w.id;
            const worldPhases = levels.filter((l) => l.world === w.id);
            const starsInWorld = worldPhases.reduce(
              (acc, l) => acc + (levelStars[l.id] || 0),
              0
            );
            const maxStarsInWorld = worldPhases.length * 3;

            return (
              <button
                key={w.id}
                onClick={() => {
                  sound.playClick();
                  setActiveWorldId(w.id);
                }}
                className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between gap-1.5 ${
                  isWorldActive
                    ? 'bg-indigo-950/80 border-cyan-400/80 text-white shadow-md shadow-indigo-950/50 ring-1 ring-cyan-400/40'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-base">{w.icon}</span>
                  <div className="text-left truncate">
                    <div className="truncate leading-tight">{w.name}</div>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({w.phases})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-amber-400 shrink-0">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <span>
                    {starsInWorld}/{maxStarsInWorld}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Ordered Phases Row of the Active World */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
          {phasesInActiveWorld.map((lvl) => {
            const isCurrent = lvl.id === currentLevel.id;
            const stars = levelStars[lvl.id] || 0;
            const isCompleted = stars > 0;
            const globalIndex = levels.findIndex((l) => l.id === lvl.id);

            return (
              <button
                key={lvl.id}
                id={`select-level-${lvl.id}`}
                onClick={() => {
                  sound.playClick();
                  onSelectLevel(globalIndex);
                }}
                className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 group relative ${
                  isCurrent
                    ? 'bg-gradient-to-b from-indigo-900/90 to-indigo-950/90 border-cyan-400 text-white shadow-lg shadow-indigo-950/60 ring-2 ring-cyan-400/50'
                    : isCompleted
                    ? 'bg-slate-950/80 border-emerald-800/60 text-slate-300 hover:border-emerald-600 hover:text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[11px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Fase {lvl.id}
                  </span>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-2.5 h-2.5 ${
                          s <= stars
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-xs font-bold truncate mt-0.5 text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {lvl.title}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                  <span className="truncate max-w-[90px]">{lvl.d12.connector}</span>
                  <span className="text-cyan-400 font-semibold">{lvl.targetEnergy}e</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Mission Objective Ribbon */}
      <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs text-slate-300 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
            Missão
          </span>
          <span>
            Identifique o conectivo{' '}
            <strong className="text-cyan-300 font-mono font-bold">"{currentLevel.d12.connector}"</strong>{' '}
            ({currentLevel.d12.relationType}) e calibre a energia de Byte de{' '}
            <strong className="text-amber-300 font-mono">{currentLevel.initialEnergy}</strong> para{' '}
            <strong className="text-emerald-300 font-mono">{currentLevel.targetEnergy}</strong> unidades.
          </span>
        </div>
        <div className="text-[11px] text-slate-400 hidden sm:block">
          Limite de blocos: <strong className="text-white">{currentLevel.maxBlocks}</strong>
        </div>
      </div>
    </div>
  );
};
