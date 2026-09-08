import React, { useState } from 'react';
import { Level, CommandType } from '../types';
import { LEVEL_TUTORIALS } from '../data/tutorials';
import { sound } from '../utils/sound';
import {
  X,
  BookOpen,
  Calculator,
  Cpu,
  Star,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  PlayCircle,
  Layers,
} from 'lucide-react';

interface LevelTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: Level;
  allLevels: Level[];
  onSelectLevel: (index: number) => void;
  onLoadSampleAlgorithm?: (commands: CommandType[]) => void;
}

export const LevelTutorialModal: React.FC<LevelTutorialModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  allLevels,
  onSelectLevel,
  onLoadSampleAlgorithm,
}) => {
  const [activeTab, setActiveTab] = useState<'stars' | 'd12' | 'd19' | 'algo'>('stars');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(currentLevel.id);

  // Sync selected level with current level when modal opens or currentLevel changes
  React.useEffect(() => {
    setSelectedLevelId(currentLevel.id);
  }, [currentLevel.id, isOpen]);

  if (!isOpen) return null;

  const displayLevel = allLevels.find((l) => l.id === selectedLevelId) || currentLevel;
  const tutorial = LEVEL_TUTORIALS[displayLevel.id] || LEVEL_TUTORIALS[1];
  const displayLevelIndex = allLevels.findIndex((l) => l.id === displayLevel.id);

  const handleLevelChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < allLevels.length) {
      sound.playClick();
      setSelectedLevelId(allLevels[newIndex].id);
      onSelectLevel(newIndex);
    }
  };

  const handleApplySampleCode = () => {
    if (tutorial.algorithmGuide.suggestedBlocks && onLoadSampleAlgorithm) {
      sound.playMathAdd();
      onLoadSampleAlgorithm(tutorial.algorithmGuide.suggestedBlocks);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-400 shrink-0 mt-0.5">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
                  Tutorial e Guia Passo a Passo
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {displayLevel.worldName}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                Fase {displayLevel.id}: {displayLevel.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Fechar Tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Selector Bar */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleLevelChange(displayLevelIndex - 1)}
              disabled={displayLevelIndex === 0}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Fase Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 font-bold whitespace-nowrap px-1">
              Fase {displayLevel.id} de {allLevels.length}
            </span>
            <button
              onClick={() => handleLevelChange(displayLevelIndex + 1)}
              disabled={displayLevelIndex === allLevels.length - 1}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Próxima Fase"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {allLevels.map((lvl, idx) => (
              <button
                key={lvl.id}
                onClick={() => handleLevelChange(idx)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono transition-all shrink-0 ${
                  lvl.id === displayLevel.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                F{lvl.id}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800 bg-slate-900/90 px-4 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('stars');
            }}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'stars'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Objetivos & 3 Estrelas</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d12');
            }}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'd12'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Passo 1: Português (D12)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d19');
            }}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'd19'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Passo 2: Matemática (D19)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('algo');
            }}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'algo'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Passo 3: Algoritmo (EF05CO04)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-slate-300 text-sm">
          {/* TAB 1: 3 Estrelas & Visão Geral */}
          {activeTab === 'stars' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-bold font-mono text-indigo-400 uppercase tracking-wider block mb-1">
                  Enredo & Resumo da Missão:
                </span>
                <p className="text-slate-200 leading-relaxed">{tutorial.summary}</p>
              </div>

              <div className="space-y-2.5">
                <h4 className="font-extrabold text-slate-100 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Como Conquistar a Pontuação Máxima (3 Estrelas):
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 flex items-start gap-3">
                    <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-100 text-xs block">
                        1ª Estrela: Chegada & Meta de Energia
                      </span>
                      <span className="text-xs text-slate-300">
                        Conduzir Byte até a coordenada da meta ({displayLevel.targetPos.x},{' '}
                        {displayLevel.targetPos.y}) com exatamente{' '}
                        <strong>{displayLevel.targetEnergy} unidades de energia</strong>.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
                    <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-100 text-xs block">
                        2ª Estrela: Interpretação de Texto (D12)
                      </span>
                      <span className="text-xs text-slate-300">
                        Responder com sucesso à questão sobre a relação lógico-discursiva do
                        conectivo destacado na narrativa.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-3">
                    <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-100 text-xs block">
                        3ª Estrela: Otimização de Código (EF05CO04)
                      </span>
                      <span className="text-xs text-slate-300">
                        Montar o algoritmo completo sem ultrapassar o limite de{' '}
                        <strong>{displayLevel.maxBlocks} blocos de comando</strong>.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: D12 Português */}
          {activeTab === 'd12' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
                <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Dica Pedagógica de Língua Portuguesa (D12):</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {tutorial.readingGuide.clue}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400">Conectivo em Foco:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono font-bold text-xs">
                    "{tutorial.readingGuide.focusWord}"
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400">Relação Estabelecida:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold text-xs">
                    {tutorial.readingGuide.correctOptionLabel}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong>Por que essa é a resposta correta?</strong>{' '}
                  {tutorial.readingGuide.explanation}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Responda à pergunta no cartão à esquerda da tela antes ou depois de rodar o
                  robô para garantir sua estrela!
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: D19 Matemática */}
          {activeTab === 'd19' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60">
                <div className="flex items-center gap-2 text-amber-300 font-bold mb-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>Passo a Passo Matemático (Adição e Subtração):</span>
                </div>
                <p className="text-xs text-amber-200/90">{tutorial.mathGuide.startingPoint}</p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-200 text-xs uppercase font-mono">
                  Etapas das Operações:
                </h5>
                <div className="space-y-1.5">
                  {tutorial.mathGuide.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="font-medium text-slate-300">{step.operation}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {step.calculation}
                        </span>
                        <span className="text-slate-500">=</span>
                        <span className="text-emerald-400 font-bold">{step.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Meta Final de Energia:</span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  {tutorial.mathGuide.finalTarget}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                <strong>Dica de Cálculo Mental:</strong> {tutorial.mathGuide.tip}
              </div>
            </div>
          )}

          {/* TAB 4: Algoritmo EF05CO04 */}
          {activeTab === 'algo' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60">
                <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Estratégia de Programação (EF05CO04):</span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">
                  {tutorial.algorithmGuide.strategy}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-200 text-xs uppercase font-mono">
                  Roteiro de Execução do Percurso:
                </h5>
                <div className="space-y-1.5">
                  {tutorial.algorithmGuide.stepList.map((stepDesc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-snug"
                    >
                      {stepDesc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action button to load sample algorithm */}
              {tutorial.algorithmGuide.suggestedBlocks && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-300 block">
                      Precisa de Ajuda Prática?
                    </span>
                    Carregue a sequência de blocos recomendada diretamente no editor de comandos.
                  </div>

                  <button
                    onClick={handleApplySampleCode}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 transition-all shrink-0"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Inserir Algoritmo Modelo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            Use este guia para planejar a rota e tirar dúvidas antes de executar.
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 ml-auto"
          >
            Entendido, vamos programar!
          </button>
        </div>
      </div>
    </div>
  );
};
