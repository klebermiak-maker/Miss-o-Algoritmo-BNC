import React, { useState } from 'react';
import { Bot, Play, RotateCcw, RotateCw, Plus, Minus, ArrowUp, Sparkles, CheckCircle, Info } from 'lucide-react';
import { sound } from '../utils/sound';

interface SandboxBlock {
  id: string;
  type: 'forward' | 'turn_left' | 'turn_right' | 'add' | 'sub';
  value?: number;
}

export const FreeSandboxMode: React.FC = () => {
  const [gridSize] = useState({ cols: 5, rows: 5 });
  const [robotPos, setRobotPos] = useState({ x: 0, y: 2, dir: 0 }); // 0: right, 90: down, 180: left, 270: up
  const [energy, setEnergy] = useState<number>(20);
  const [initialEnergy, setInitialEnergy] = useState<number>(20);
  const [targetEnergy, setTargetEnergy] = useState<number>(50);
  const [blocks, setBlocks] = useState<SandboxBlock[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [customNarrative, setCustomNarrative] = useState<string>(
    'O explorador deve avançar com prudência, porque o terreno exige equilíbrio exato de carga.'
  );
  const [selectedConnector, setSelectedConnector] = useState<string>('porque (Causa)');
  const [log, setLog] = useState<string[]>(['Laboratório pronto. Crie o seu algoritmo!']);

  const addBlock = (type: SandboxBlock['type'], val: number = 10) => {
    sound.playClick();
    setBlocks((prev) => [
      ...prev,
      { id: `sb-${Date.now()}-${Math.random()}`, type, value: type === 'add' || type === 'sub' ? val : undefined },
    ]);
  };

  const resetSimulation = () => {
    sound.playClick();
    setIsRunning(false);
    setActiveIdx(null);
    setRobotPos({ x: 0, y: 2, dir: 0 });
    setEnergy(initialEnergy);
    setLog(['Simulação reiniciada.']);
  };

  const runSimulation = async () => {
    if (blocks.length === 0 || isRunning) return;
    setIsRunning(true);
    sound.playClick();

    let curPos = { ...robotPos };
    let curEnergy = initialEnergy;
    setEnergy(curEnergy);

    for (let i = 0; i < blocks.length; i++) {
      setActiveIdx(i);
      const b = blocks[i];

      if (b.type === 'forward') {
        sound.playStep();
        let nx = curPos.x;
        let ny = curPos.y;
        if (curPos.dir === 0) nx += 1;
        else if (curPos.dir === 90) ny += 1;
        else if (curPos.dir === 180) nx -= 1;
        else if (curPos.dir === 270) ny -= 1;

        if (nx >= 0 && nx < gridSize.cols && ny >= 0 && ny < gridSize.rows) {
          curPos = { ...curPos, x: nx, y: ny };
          setRobotPos(curPos);
          setLog((prev) => [`Passo ${i + 1}: Avançou para (${nx}, ${ny})`, ...prev]);
        } else {
          sound.playError();
          setLog((prev) => [`Passo ${i + 1}: Limite da borda atingido!`, ...prev]);
        }
      } else if (b.type === 'turn_left') {
        sound.playTurn();
        const newDir = (curPos.dir - 90 + 360) % 360;
        curPos = { ...curPos, dir: newDir };
        setRobotPos(curPos);
        setLog((prev) => [`Passo ${i + 1}: Girou à esquerda (orientação ${newDir}°)`, ...prev]);
      } else if (b.type === 'turn_right') {
        sound.playTurn();
        const newDir = (curPos.dir + 90) % 360;
        curPos = { ...curPos, dir: newDir };
        setRobotPos(curPos);
        setLog((prev) => [`Passo ${i + 1}: Girou à direita (orientação ${newDir}°)`, ...prev]);
      } else if (b.type === 'add') {
        const val = b.value || 10;
        curEnergy += val;
        setEnergy(curEnergy);
        sound.playMathAdd();
        setLog((prev) => [`Passo ${i + 1}: Somou +${val} (Total: ${curEnergy})`, ...prev]);
      } else if (b.type === 'sub') {
        const val = b.value || 10;
        curEnergy = Math.max(0, curEnergy - val);
        setEnergy(curEnergy);
        sound.playMathSub();
        setLog((prev) => [`Passo ${i + 1}: Subtraiu -${val} (Total: ${curEnergy})`, ...prev]);
      }

      await new Promise((r) => setTimeout(r, 600));
    }

    setActiveIdx(null);
    setIsRunning(false);

    if (curEnergy === targetEnergy) {
      sound.playSuccess();
      setLog((prev) => ['Parabéns! O algoritmo atingiu o valor exato da meta!', ...prev]);
    } else {
      setLog((prev) => [
        `Fim do algoritmo. Energia final: ${curEnergy}. Meta era: ${targetEnergy}.`,
        ...prev,
      ]);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              Laboratório Criativo: Crie seu Próprio Problema & Algoritmo
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Experimente associar conectivos discursivos (D12) com equações de adição/subtração (D19) e testar a simulação (EF05CO04).
          </p>
        </div>
      </div>

      {/* Narrative & Connector Designer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
          <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>1. Narrativa & Relação Lógico-Discursiva (D12)</span>
          </label>
          <textarea
            value={customNarrative}
            onChange={(e) => setCustomNarrative(e.target.value)}
            rows={3}
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
            placeholder="Digite a frase da missão contendo um conectivo..."
          />

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0">Conectivo Utilizado:</span>
            <select
              value={selectedConnector}
              onChange={(e) => setSelectedConnector(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-violet-300 font-semibold focus:outline-none focus:border-violet-500"
            >
              <option value="porque (Causa)">porque / já que (Causa)</option>
              <option value="por isso (Consequência)">por isso / de modo que (Consequência)</option>
              <option value="mas / porém (Oposição)">mas / porém / contudo (Oposição)</option>
              <option value="se / caso (Condição)">se / caso (Condição)</option>
              <option value="quando (Tempo)">quando / enquanto (Tempo)</option>
              <option value="portanto (Conclusão)">portanto / logo (Conclusão)</option>
            </select>
          </div>
        </div>

        {/* Math Target Configurator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
          <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
            2. Configuração Matemática (D19: Adição e Subtração)
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">Energia Inicial:</span>
              <input
                type="number"
                value={initialEnergy}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 0;
                  setInitialEnergy(v);
                  setEnergy(v);
                }}
                className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 text-center focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-slate-400">Meta de Energia:</span>
              <input
                type="number"
                value={targetEnergy}
                onChange={(e) => setTargetEnergy(parseInt(e.target.value) || 0)}
                className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-emerald-300 text-center focus:outline-none"
              />
            </div>
          </div>

          <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Energia Atual na Simulação:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                energy === targetEnergy
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
              }`}
            >
              {energy} / {targetEnergy}
            </span>
          </div>
        </div>
      </div>

      {/* Algorithmic Workspace & Mini Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Palette & Code Block Sequence */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              3. Construtor de Algoritmo (EF05CO04)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBlocks([])}
                className="text-[11px] text-slate-400 hover:text-rose-400 underline"
              >
                Limpar Blocos
              </button>
            </div>
          </div>

          {/* Quick Palette */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => addBlock('forward')}
              disabled={isRunning}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex flex-col items-center gap-1 transition-all disabled:opacity-40"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Avançar</span>
            </button>
            <button
              onClick={() => addBlock('turn_left')}
              disabled={isRunning}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex flex-col items-center gap-1 transition-all disabled:opacity-40"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Girar Esq.</span>
            </button>
            <button
              onClick={() => addBlock('turn_right')}
              disabled={isRunning}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex flex-col items-center gap-1 transition-all disabled:opacity-40"
            >
              <RotateCw className="w-4 h-4" />
              <span>Girar Dir.</span>
            </button>
            <button
              onClick={() => addBlock('add', 15)}
              disabled={isRunning}
              className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex flex-col items-center gap-1 transition-all disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
              <span>Somar +15</span>
            </button>
            <button
              onClick={() => addBlock('sub', 10)}
              disabled={isRunning}
              className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex flex-col items-center gap-1 transition-all disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
              <span>Subtrair -10</span>
            </button>
          </div>

          {/* Blocks List */}
          <div className="min-h-[140px] max-h-[180px] overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-1.5 items-start">
            {blocks.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 text-center w-full">
                Clique nos botões acima para montar uma sequência de comandos.
              </p>
            ) : (
              blocks.map((b, idx) => (
                <div
                  key={b.id}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeIdx === idx
                      ? 'bg-amber-500 text-slate-950 border-amber-300 scale-105 shadow-md shadow-amber-500/30'
                      : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="text-[10px] opacity-60">{idx + 1}.</span>
                  <span>
                    {b.type === 'forward' && 'Avançar'}
                    {b.type === 'turn_left' && 'Girar Esq'}
                    {b.type === 'turn_right' && 'Girar Dir'}
                    {b.type === 'add' && `+${b.value}`}
                    {b.type === 'sub' && `-${b.value}`}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Run / Reset Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning || blocks.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Play className="w-4 h-4" />
              Executar Simulação
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Mini 5x5 Grid Display & Execution Log */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Visualização 2D
          </span>
          <div className="grid grid-cols-5 gap-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800 justify-items-center">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => {
                const isRobot = robotPos.x === c && robotPos.y === r;
                return (
                  <div
                    key={`${c}-${r}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                      isRobot
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/30'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    {isRobot ? (
                      <Bot
                        className="w-6 h-6"
                        style={{ transform: `rotate(${robotPos.dir}deg)` }}
                      />
                    ) : (
                      <span className="text-[8px] font-mono text-slate-700">
                        {c},{r}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Simulation Log */}
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 max-h-[100px] overflow-y-auto space-y-1">
            {log.slice(0, 4).map((entry, idx) => (
              <p key={idx} className="truncate">
                &gt; {entry}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
