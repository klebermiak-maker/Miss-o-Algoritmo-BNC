import React from 'react';
import { CommandBlock, CommandType } from '../types';
import {
  ArrowUp,
  RotateCcw,
  RotateCw,
  PlusCircle,
  MinusCircle,
  Hand,
  Play,
  RotateCcw as ResetIcon,
  Pause,
  Trash2,
  ChevronUp,
  ChevronDown,
  Gauge,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface BlockWorkspaceProps {
  blocks: CommandBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<CommandBlock[]>>;
  availableCommands: CommandType[];
  maxBlocks: number;
  isRunning: boolean;
  isPaused: boolean;
  activeBlockId: string | null;
  onRun: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
}

export const BlockWorkspace: React.FC<BlockWorkspaceProps> = ({
  blocks,
  setBlocks,
  availableCommands,
  maxBlocks,
  isRunning,
  isPaused,
  activeBlockId,
  onRun,
  onPause,
  onReset,
  onStep,
}) => {
  const addCommand = (type: CommandType, defaultValue: number = 10) => {
    if (blocks.length >= maxBlocks) {
      sound.playError();
      return;
    }
    sound.playClick();
    const newBlock: CommandBlock = {
      id: `cmd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      value: type === 'add_energy' || type === 'sub_energy' ? defaultValue : undefined,
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const removeBlock = (id: string) => {
    sound.playClick();
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setBlocks(newBlocks);
  };

  const updateBlockValue = (id: string, value: number) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, value: Math.max(1, value) } : b))
    );
  };

  const clearAllBlocks = () => {
    sound.playClick();
    setBlocks([]);
  };

  const getCommandConfig = (type: CommandType) => {
    switch (type) {
      case 'forward':
        return {
          label: 'Avançar 1 passo',
          color: 'from-blue-600 to-cyan-600 border-cyan-500/50',
          icon: <ArrowUp className="w-4 h-4" />,
          category: 'Movimento',
        };
      case 'turn_left':
        return {
          label: 'Girar à Esquerda ↺',
          color: 'from-indigo-600 to-violet-600 border-indigo-500/50',
          icon: <RotateCcw className="w-4 h-4" />,
          category: 'Direção',
        };
      case 'turn_right':
        return {
          label: 'Girar à Direita ↻',
          color: 'from-purple-600 to-pink-600 border-purple-500/50',
          icon: <RotateCw className="w-4 h-4" />,
          category: 'Direção',
        };
      case 'collect':
        return {
          label: 'Coletar / Interagir',
          color: 'from-emerald-600 to-teal-600 border-emerald-500/50',
          icon: <Hand className="w-4 h-4" />,
          category: 'Ação',
        };
      case 'add_energy':
        return {
          label: 'Somar Energia (+)',
          color: 'from-cyan-600 to-sky-600 border-cyan-400/50',
          icon: <PlusCircle className="w-4 h-4" />,
          category: 'Matemática D19',
        };
      case 'sub_energy':
        return {
          label: 'Subtrair Energia (-)',
          color: 'from-amber-600 to-orange-600 border-amber-400/50',
          icon: <MinusCircle className="w-4 h-4" />,
          category: 'Matemática D19',
        };
      default:
        return {
          label: 'Comando',
          color: 'from-slate-700 to-slate-800 border-slate-600',
          icon: <Code2 className="w-4 h-4" />,
          category: 'Geral',
        };
    }
  };

  return (
    <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            ALGORITMO (EF05CO04)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded-full font-mono border ${
              blocks.length >= maxBlocks
                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {blocks.length} / {maxBlocks} blocos
          </span>
          {blocks.length > 0 && !isRunning && (
            <button
              onClick={clearAllBlocks}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 ml-1"
              title="Limpar todos os blocos"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Palette of Available Blocks */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase text-slate-400 mb-2 tracking-wider flex items-center gap-1">
          <span>Paleta de Instruções:</span>
          <span className="text-slate-500 font-normal">(clique para adicionar ao algoritmo)</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableCommands.map((cmd) => {
            const config = getCommandConfig(cmd);
            return (
              <button
                key={cmd}
                id={`btn-add-${cmd}`}
                onClick={() => addCommand(cmd)}
                disabled={isRunning || blocks.length >= maxBlocks}
                className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-semibold text-white bg-gradient-to-r ${config.color} border shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <div className="p-1 rounded bg-black/20">{config.icon}</div>
                <span className="truncate">{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Sequence Execution List */}
      <div className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-1.5 p-2 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-4">
        {blocks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <Code2 className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-xs font-medium text-slate-400">Nenhum bloco de código adicionado ainda.</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Monte o algoritmo clicando nas instruções da paleta acima para conduzir Byte até a meta!
            </p>
          </div>
        ) : (
          blocks.map((block, index) => {
            const config = getCommandConfig(block.type);
            const isActive = activeBlockId === block.id;

            return (
              <div
                key={block.id}
                id={`exec-block-${block.id}`}
                className={`flex items-center justify-between p-2 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.01]'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Step order index */}
                  <span className="font-mono text-[11px] text-slate-500 w-5">
                    {index + 1}.
                  </span>

                  <div
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-amber-400 animate-ping' : 'bg-slate-600'
                    }`}
                  />

                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded bg-slate-800 text-slate-300">
                      {config.icon}
                    </span>
                    <span className="font-semibold text-slate-100">{config.label}</span>
                  </div>

                  {/* Value input for math blocks */}
                  {(block.type === 'add_energy' || block.type === 'sub_energy') && (
                    <div className="flex items-center gap-1 ml-2">
                      <span className="text-[11px] text-slate-400">valor:</span>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={block.value ?? 10}
                        disabled={isRunning}
                        onChange={(e) =>
                          updateBlockValue(block.id, parseInt(e.target.value) || 0)
                        }
                        className="w-14 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-center text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                      />
                    </div>
                  )}
                </div>

                {/* Move & Delete controls */}
                {!isRunning && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-20"
                      title="Mover para cima"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === blocks.length - 1}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-20"
                      title="Mover para baixo"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-1 rounded hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors ml-1"
                      title="Remover bloco"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Control Simulation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              id="btn-run-simulation"
              onClick={onRun}
              disabled={blocks.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-white" />
              Executar Algoritmo
            </button>
          ) : (
            <button
              id="btn-pause-simulation"
              onClick={onPause}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all"
            >
              {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Continuar' : 'Pausar'}
            </button>
          )}

          <button
            id="btn-step-simulation"
            onClick={onStep}
            disabled={isRunning && !isPaused}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all disabled:opacity-40"
            title="Executar um passo por vez (depuração)"
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            Passo a Passo
          </button>
        </div>

        <button
          id="btn-reset-simulation"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-all"
        >
          <ResetIcon className="w-3.5 h-3.5 text-slate-400" />
          Reiniciar Posição
        </button>
      </div>
    </div>
  );
};
