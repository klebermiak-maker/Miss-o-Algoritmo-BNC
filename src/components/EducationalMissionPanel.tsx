import React, { useState } from 'react';
import { D12Question, D19MathProblem } from '../types';
import { NarrativeCard } from './NarrativeCard';
import { MathCalculatorPanel } from './MathCalculatorPanel';
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Split,
  HelpCircle,
  Award,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface EducationalMissionPanelProps {
  levelId: number;
  narrative: string;
  d12: D12Question;
  d19: D19MathProblem;
  currentEnergy: number;
  initialEnergy: number;
  targetEnergy: number;
  isD12Resolved: boolean;
  onD12Resolved: (isCorrect: boolean) => void;
  onOpenTutorial: () => void;
}

export const EducationalMissionPanel: React.FC<EducationalMissionPanelProps> = ({
  levelId,
  narrative,
  d12,
  d19,
  currentEnergy,
  initialEnergy,
  targetEnergy,
  isD12Resolved,
  onD12Resolved,
  onOpenTutorial,
}) => {
  // Tabs: 'd12' (Portuguese), 'd19' (Math), or 'both' (Show both stacked)
  const [activeTab, setActiveTab] = useState<'d12' | 'd19' | 'both'>('d12');

  const isEnergyMet = currentEnergy === targetEnergy;

  return (
    <div className="flex flex-col gap-3">
      {/* Friendly Student Step-by-Step Navigation Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-lg backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Step Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {/* Step 1: Portuguese */}
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d12');
            }}
            className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'd12'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-900/40'
                : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-violet-300" />
            <span>1. Português (D12)</span>
            {isD12Resolved && (
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[10px]">
                ✓
              </span>
            )}
          </button>

          {/* Step 2: Math */}
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d19');
            }}
            className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'd19'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/40'
                : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-300" />
            <span>2. Matemática (D19)</span>
            {isEnergyMet && (
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[10px]">
                ✓
              </span>
            )}
          </button>

          {/* View Both Option */}
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('both');
            }}
            className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all hidden md:flex items-center gap-1.5 ${
              activeTab === 'both'
                ? 'bg-slate-800 border border-slate-600 text-white'
                : 'bg-slate-950/40 border border-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
            title="Exibir os dois cadernos simultaneamente"
          >
            <Split className="w-3 h-3 text-slate-400" />
            <span>Ambos</span>
          </button>
        </div>

        {/* Next step hint button */}
        {activeTab === 'd12' && isD12Resolved && (
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d19');
            }}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-900/80 transition-colors self-end sm:self-center"
          >
            <span>Próximo Passo: Matemática</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'd12' && (
        <NarrativeCard
          key={`d12-${levelId}`}
          narrative={narrative}
          d12={d12}
          onD12Resolved={onD12Resolved}
          isD12Resolved={isD12Resolved}
          onOpenTutorial={onOpenTutorial}
        />
      )}

      {activeTab === 'd19' && (
        <MathCalculatorPanel
          key={`d19-${levelId}`}
          d19={d19}
          currentEnergy={currentEnergy}
          initialEnergy={initialEnergy}
          targetEnergy={targetEnergy}
          onOpenTutorial={onOpenTutorial}
        />
      )}

      {activeTab === 'both' && (
        <div className="flex flex-col gap-4">
          <NarrativeCard
            key={`d12-${levelId}`}
            narrative={narrative}
            d12={d12}
            onD12Resolved={onD12Resolved}
            isD12Resolved={isD12Resolved}
            onOpenTutorial={onOpenTutorial}
          />
          <MathCalculatorPanel
            key={`d19-${levelId}`}
            d19={d19}
            currentEnergy={currentEnergy}
            initialEnergy={initialEnergy}
            targetEnergy={targetEnergy}
            onOpenTutorial={onOpenTutorial}
          />
        </div>
      )}
    </div>
  );
};
