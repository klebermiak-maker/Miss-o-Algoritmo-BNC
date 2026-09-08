import React, { useState } from 'react';
import { D12Question } from '../types';
import { BookOpen, CheckCircle, AlertCircle, HelpCircle, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface NarrativeCardProps {
  narrative: string;
  d12: D12Question;
  onD12Resolved: (isCorrect: boolean) => void;
  isD12Resolved: boolean;
  onOpenTutorial?: () => void;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = ({
  narrative,
  d12,
  onD12Resolved,
  isD12Resolved,
  onOpenTutorial,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handleSelectOption = (option: { id: string; text: string; isCorrect: boolean; explanation: string }) => {
    setSelectedOptionId(option.id);
    sound.playClick();

    if (option.isCorrect) {
      sound.playSuccess();
      setFeedback({ isCorrect: true, text: option.explanation });
      onD12Resolved(true);
    } else {
      sound.playError();
      setFeedback({ isCorrect: false, text: option.explanation });
      onD12Resolved(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            NARRATIVA & LÍNGUA PORTUGUESA (D12)
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {onOpenTutorial && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTutorial();
              }}
              className="px-2 py-0.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors flex items-center gap-1 text-[10px] font-bold"
              title="Abrir Tutorial e Dicas desta Fase"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>Dicas</span>
            </button>
          )}
          {isD12Resolved ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              D12 Validado
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-950/50 border border-amber-700/50 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Desafio Ativo
            </span>
          )}
        </div>
      </div>

      {/* Story Excerpt */}
      <div className="p-3 bg-indigo-950/20 border border-indigo-800/40 rounded-xl relative">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          "{narrative}"
        </p>
      </div>

      {/* Question prompt */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-1.5 text-xs text-indigo-300 font-semibold">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>{d12.question}</span>
        </div>

        {/* Highlighted text badge */}
        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
          Trecho chave:{' '}
          <span className="text-cyan-300 font-bold bg-cyan-950/80 px-1 py-0.5 rounded border border-cyan-700/50">
            {d12.highlightedText}
          </span>
        </div>

        {/* Multiple choice options */}
        <div className="flex flex-col gap-1.5 mt-1">
          {d12.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let btnStyle = 'bg-slate-800/70 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600';

            if (isSelected) {
              btnStyle = opt.isCorrect
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else if (isD12Resolved && opt.isCorrect) {
              btnStyle = 'bg-emerald-950/40 border-emerald-600 text-emerald-300';
            }

            return (
              <button
                key={opt.id}
                id={`d12-opt-${opt.id}`}
                onClick={() => handleSelectOption(opt)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-start gap-2 ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center text-[10px] font-mono shrink-0 uppercase">
                  {opt.id}
                </span>
                <span className="flex-1">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div
            className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 mt-1 animate-fade-in ${
              feedback.isCorrect
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <p>{feedback.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};
