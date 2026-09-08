import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, ArrowRight, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface LevelSuccessModalProps {
  isOpen: boolean;
  stars: number;
  levelId: number;
  levelTitle: string;
  isD12Resolved: boolean;
  blockCount: number;
  maxBlocks: number;
  energyTargetMet: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  hasNextLevel: boolean;
}

export const LevelSuccessModal: React.FC<LevelSuccessModalProps> = ({
  isOpen,
  stars,
  levelId,
  levelTitle,
  isD12Resolved,
  blockCount,
  maxBlocks,
  energyTargetMet,
  onNextLevel,
  onReplay,
  hasNextLevel,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#6366f1', '#f59e0b'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col items-center text-center relative">
        {/* Glowing aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/30 flex items-center justify-center mb-3">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          Missão {levelId} Concluída!
        </span>
        <h2 className="text-xl font-extrabold text-slate-100 mt-1">{levelTitle}</h2>

        {/* Star Rating Display */}
        <div className="flex items-center gap-2 my-4">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`p-2 rounded-xl transition-all ${
                starIdx <= stars
                  ? 'bg-amber-500/20 text-amber-400 scale-110 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-600'
              }`}
            >
              <Star
                className={`w-7 h-7 ${starIdx <= stars ? 'fill-amber-400' : ''}`}
              />
            </div>
          ))}
        </div>

        {/* Skill Achievements Checklist */}
        <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 mb-5 text-left text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Matemática (D19: Equação Resolvida)
            </span>
            <span className="font-bold text-emerald-400 font-mono">100%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2
                className={`w-4 h-4 ${isD12Resolved ? 'text-emerald-400' : 'text-slate-500'}`}
              />
              Português (D12: Conectivo Validado)
            </span>
            <span
              className={`font-bold font-mono ${isD12Resolved ? 'text-emerald-400' : 'text-slate-500'}`}
            >
              {isD12Resolved ? 'Correto' : 'Pendente'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2
                className={`w-4 h-4 ${blockCount <= maxBlocks ? 'text-emerald-400' : 'text-slate-500'}`}
              />
              Algoritmo (EF05CO04: Otimização)
            </span>
            <span className="font-mono text-slate-400">
              {blockCount} / {maxBlocks} blocos
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onReplay();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Jogar Novamente
          </button>

          {hasNextLevel ? (
            <button
              onClick={() => {
                sound.playClick();
                onNextLevel();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition-all hover:scale-105"
            >
              Próxima Fase
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex-1 text-xs font-bold text-amber-300 bg-amber-950/50 py-2.5 px-3 rounded-xl border border-amber-600/50 flex items-center justify-center gap-1">
              <Award className="w-4 h-4" />
              Mestre dos Algoritmos!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
