import React, { useState } from 'react';
import { D19MathProblem } from '../types';
import { Calculator, Battery, Plus, Minus, Check, Equal, HelpCircle, Lightbulb } from 'lucide-react';
import { sound } from '../utils/sound';

interface MathCalculatorPanelProps {
  d19: D19MathProblem;
  currentEnergy: number;
  initialEnergy: number;
  targetEnergy: number;
  onOpenTutorial?: () => void;
}

export const MathCalculatorPanel: React.FC<MathCalculatorPanelProps> = ({
  d19,
  currentEnergy,
  initialEnergy,
  targetEnergy,
  onOpenTutorial,
}) => {
  const [scratchNum1, setScratchNum1] = useState<string>(initialEnergy.toString());
  const [scratchOp, setScratchOp] = useState<'+' | '-' | null>(null);
  const [scratchNum2, setScratchNum2] = useState<string>('');
  const [scratchResult, setScratchResult] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleCalc = () => {
    const n1 = parseInt(scratchNum1) || 0;
    const n2 = parseInt(scratchNum2) || 0;
    let res = 0;
    if (scratchOp === '+') {
      res = n1 + n2;
      sound.playMathAdd();
    } else if (scratchOp === '-') {
      res = n1 - n2;
      sound.playMathSub();
    } else {
      res = n1;
    }
    setScratchResult(res);
  };

  const resetScratch = () => {
    sound.playClick();
    setScratchNum1(initialEnergy.toString());
    setScratchOp(null);
    setScratchNum2('');
    setScratchResult(null);
  };

  const isTargetAchieved = currentEnergy === targetEnergy;
  const energyPercentage = Math.min(100, Math.max(0, (currentEnergy / targetEnergy) * 100));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            MATEMÁTICA (D19: ADIÇÃO & SUBTRAÇÃO)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {onOpenTutorial && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTutorial();
              }}
              className="px-2 py-0.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors flex items-center gap-1 text-[10px] font-bold"
              title="Abrir Tutorial e Cálculo Passo a Passo desta Fase"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>Passo a Passo</span>
            </button>
          )}
          <button
            onClick={() => {
              sound.playClick();
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            {showHint ? 'Ocultar Dica' : 'Dica D19'}
          </button>
        </div>
      </div>

      {/* Problem Narrative Statement */}
      <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl">
        <h4 className="text-xs font-bold text-cyan-300 mb-1">{d19.title}</h4>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">{d19.story}</p>
      </div>

      {/* Real-time Battery Energy Gauge */}
      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Battery className="w-4 h-4 text-cyan-400" />
            Bateria de Byte:
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`font-bold px-2 py-0.5 rounded text-xs ${
                isTargetAchieved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-700'
              }`}
            >
              {currentEnergy} unidades
            </span>
            <span className="text-slate-500">/ Meta: {targetEnergy}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isTargetAchieved
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/50'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
            style={{ width: `${energyPercentage}%` }}
          />
        </div>

        {isTargetAchieved ? (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            Meta de energia atingida com sucesso!
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Início: {initialEnergy}</span>
            <span>
              {targetEnergy > currentEnergy
                ? `Faltam: +${targetEnergy - currentEnergy}`
                : `Excesso: -${currentEnergy - targetEnergy}`}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Scratchpad Calculator */}
      <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>Rascunho de Cálculo do Aluno:</span>
          <button
            onClick={resetScratch}
            className="text-[10px] text-slate-500 hover:text-slate-300 underline"
          >
            Limpar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={scratchNum1}
            onChange={(e) => setScratchNum1(e.target.value)}
            className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-center text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            placeholder="Nº 1"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.playClick();
                setScratchOp('+');
              }}
              className={`p-1.5 rounded text-xs font-bold border transition-colors ${
                scratchOp === '+'
                  ? 'bg-cyan-600 border-cyan-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title="Adição (juntar / acrescentar)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setScratchOp('-');
              }}
              className={`p-1.5 rounded text-xs font-bold border transition-colors ${
                scratchOp === '-'
                  ? 'bg-amber-600 border-amber-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title="Subtração (retirar / diminuir)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          <input
            type="number"
            value={scratchNum2}
            onChange={(e) => setScratchNum2(e.target.value)}
            className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-center text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            placeholder="Nº 2"
          />

          <button
            onClick={handleCalc}
            disabled={!scratchOp || !scratchNum2}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded text-xs font-bold flex items-center gap-1 transition-all"
          >
            <Equal className="w-3.5 h-3.5" />
            Calcular
          </button>

          {scratchResult !== null && (
            <div className="flex items-center gap-1 ml-auto text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-700">
              = {scratchResult}
            </div>
          )}
        </div>
      </div>

      {/* Pedagogical Hint popup */}
      {showHint && (
        <div className="p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl text-xs text-amber-200 flex items-start gap-2 animate-fade-in">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>{d19.explanation}</p>
        </div>
      )}
    </div>
  );
};
