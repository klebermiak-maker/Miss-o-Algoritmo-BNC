import React from 'react';
import { Level } from '../types';
import {
  MapPin,
  Star,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  Trophy,
  X,
  Compass,
  ArrowRight,
  BookOpen,
  Calculator,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface MissionsRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  levels: Level[];
  currentLevelId: number;
  levelStars: Record<number, number>;
  onSelectLevel: (levelIndex: number) => void;
}

export const MissionsRoadmapModal: React.FC<MissionsRoadmapModalProps> = ({
  isOpen,
  onClose,
  levels,
  currentLevelId,
  levelStars,
  onSelectLevel,
}) => {
  if (!isOpen) return null;

  // Group levels by world
  const worlds = [
    {
      id: 1,
      name: 'Setor Alfa: O Laboratório do Vale',
      shortName: 'Setor Alfa',
      theme: 'Primeiros Passos & Causa Básica',
      icon: '🪐',
      color: 'indigo',
      levels: levels.filter((l) => l.world === 1),
    },
    {
      id: 2,
      name: 'Setor Beta: A Estufa Hidropônica Digital',
      shortName: 'Setor Beta',
      theme: 'Condicionais & Operações de Tempo',
      icon: '🌱',
      color: 'emerald',
      levels: levels.filter((l) => l.world === 2),
    },
    {
      id: 3,
      name: 'Setor Gama: A Mina de Cristais Quânticos',
      shortName: 'Setor Gama',
      theme: 'Oposição & Subtrações Sucessivas',
      icon: '💎',
      color: 'cyan',
      levels: levels.filter((l) => l.world === 3),
    },
    {
      id: 4,
      name: 'Setor Ômega: O Núcleo Lógico Central',
      shortName: 'Setor Ômega',
      theme: 'Decisão Lógica & Calibração Cibernética',
      icon: '⚡',
      color: 'amber',
      levels: levels.filter((l) => l.world === 4),
    },
    {
      id: 5,
      name: 'Setor Épsilon: A Estação Orbital Hiperdimensional',
      shortName: 'Setor Épsilon',
      theme: 'Desafios Supremos & Algoritmos Mestres',
      icon: '🚀',
      color: 'violet',
      levels: levels.filter((l) => l.world === 5),
    },
  ];

  const totalEarnedStars = Object.values(levelStars).reduce<number>(
    (acc, s) => acc + (Number(s) || 0),
    0
  );
  const totalPossibleStars = levels.length * 3;
  const completedMissionsCount = Object.values(levelStars).filter(
    (s) => Number(s) > 0
  ).length;

  const handleLevelClick = (lvlId: number) => {
    const targetIdx = levels.findIndex((l) => l.id === lvlId);
    if (targetIdx !== -1) {
      sound.playClick();
      onSelectLevel(targetIdx);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  Mapa de Missões em Ordem Cronológica
                </h2>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">
                  17 Fases • 5 Mundos
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Acompanhe a sua evolução passo a passo pela trilha espacial de Byte.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stars Summary */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>
                {totalEarnedStars} / {totalPossibleStars} estrelas
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Fechar Mapa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress summary ribbon */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {completedMissionsCount} de {levels.length} missões concluídas
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Fase Atual:{' '}
              <strong className="text-white">
                Fase {currentLevelId}: {levels.find((l) => l.id === currentLevelId)?.title}
              </strong>
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Clique em qualquer missão para jogá-la!
          </div>
        </div>

        {/* Scrollable Missions Tree */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          {worlds.map((world, wIdx) => {
            const worldStars = world.levels.reduce(
              (acc, l) => acc + (levelStars[l.id] || 0),
              0
            );
            const worldMaxStars = world.levels.length * 3;
            const hasCurrentLevel = world.levels.some((l) => l.id === currentLevelId);

            return (
              <div
                key={world.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  hasCurrentLevel
                    ? 'bg-slate-950/80 border-indigo-500/60 shadow-lg shadow-indigo-950/50'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* World Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{world.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                          Mundo {world.id}
                        </span>
                        {hasCurrentLevel && (
                          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-700/60">
                            Setor Atual
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white">
                        {world.name}
                      </h3>
                      <p className="text-xs text-slate-400">{world.theme}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <div className="flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-bold text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>
                        {worldStars} / {worldMaxStars}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Levels Grid in this World */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {world.levels.map((lvl) => {
                    const stars = levelStars[lvl.id] || 0;
                    const isCurrent = lvl.id === currentLevelId;
                    const isCompleted = stars > 0;

                    return (
                      <button
                        key={lvl.id}
                        onClick={() => handleLevelClick(lvl.id)}
                        className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 group relative ${
                          isCurrent
                            ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-cyan-400 shadow-md shadow-cyan-950/40 ring-2 ring-cyan-400/30'
                            : isCompleted
                            ? 'bg-slate-900/90 border-emerald-800/60 hover:border-emerald-500/80 hover:bg-slate-800/90'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        {/* Top row: Stage number & Stars */}
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center font-mono ${
                                isCurrent
                                  ? 'bg-cyan-500 text-slate-950'
                                  : isCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {lvl.id}
                            </span>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                              Fase {lvl.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= stars
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Middle: Title */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                            {lvl.title}
                          </h4>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            <span className="text-[10px] font-medium text-indigo-300 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/50 flex items-center gap-1">
                              <BookOpen className="w-2.5 h-2.5" />
                              {lvl.d12.connector} ({lvl.d12.relationType})
                            </span>
                            <span className="text-[10px] font-medium text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/50 flex items-center gap-1">
                              <Calculator className="w-2.5 h-2.5" />
                              {lvl.initialEnergy} ➔ {lvl.targetEnergy}
                            </span>
                          </div>
                        </div>

                        {/* Bottom: Action / Status */}
                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between w-full text-[11px]">
                          {isCurrent ? (
                            <span className="font-bold text-cyan-400 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Em Andamento
                            </span>
                          ) : isCompleted ? (
                            <span className="font-semibold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Concluída
                            </span>
                          ) : (
                            <span className="text-slate-400">Disponível</span>
                          )}

                          <span className="text-xs text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
                            Jogar <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-400">
            Dica: complete as 17 fases em sequência para dominar Língua Portuguesa D12 e Matemática D19!
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            Fechar Mapa
          </button>
        </div>
      </div>
    </div>
  );
};
