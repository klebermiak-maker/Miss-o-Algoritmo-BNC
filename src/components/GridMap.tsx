import React from 'react';
import { motion } from 'motion/react';
import { Direction, GridCell } from '../types';
import { Bot, Sparkles, ShieldAlert, Zap, Flame, Compass } from 'lucide-react';

interface GridMapProps {
  cols: number;
  rows: number;
  cells: GridCell[];
  robotPos: { x: number; y: number; dir: Direction };
  targetPos: { x: number; y: number };
  targetEnergy: number;
  currentEnergy: number;
  collectedItems: string[];
}

export const GridMap: React.FC<GridMapProps> = ({
  cols,
  rows,
  cells,
  robotPos,
  targetPos,
  targetEnergy,
  currentEnergy,
  collectedItems,
}) => {
  // Map direction to rotation degrees
  const getRotation = (dir: Direction) => {
    switch (dir) {
      case 'up':
        return -90;
      case 'right':
        return 0;
      case 'down':
        return 90;
      case 'left':
        return 180;
    }
  };

  const getCellAt = (x: number, y: number) => {
    return cells.find((c) => c.x === x && c.y === y);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Sector Header / Coordinates */}
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>SIMULADOR DE ALGORITMOS 2D</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Robô: ({robotPos.x}, {robotPos.y})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Meta: ({targetPos.x}, {targetPos.y})
          </span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="w-full overflow-x-auto flex justify-center py-1">
        <div
          className="relative grid gap-1.5 sm:gap-2 p-2 sm:p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: '100%',
          }}
        >
          {Array.from({ length: rows }).map((_, rIndex) =>
            Array.from({ length: cols }).map((_, cIndex) => {
              const cell = getCellAt(cIndex, rIndex);
              const isTarget = cIndex === targetPos.x && rIndex === targetPos.y;
              const isRobotHere = robotPos.x === cIndex && robotPos.y === rIndex;
              const itemKey = `${cIndex},${rIndex}`;
              const isCollected = collectedItems.includes(itemKey);

              return (
                <div
                  key={`${cIndex}-${rIndex}`}
                  id={`grid-cell-${cIndex}-${rIndex}`}
                  className={`relative w-11 h-11 xs:w-13 xs:h-13 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center border transition-all duration-300 select-none ${
                    cell?.type === 'wall'
                      ? 'bg-rose-950/40 border-rose-900/60 text-rose-400'
                      : isTarget
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-900/30'
                      : cell?.type === 'crystal_add' && !isCollected
                      ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300'
                      : cell?.type === 'crystal_sub' && !isCollected
                      ? 'bg-amber-950/50 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                {/* Coordinate subtle watermark */}
                <span className="absolute top-1 left-1 text-[9px] font-mono text-slate-600">
                  {cIndex},{rIndex}
                </span>

                {/* Wall / Obstacle */}
                {cell?.type === 'wall' && (
                  <div className="flex flex-col items-center justify-center text-rose-400 animate-pulse">
                    <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7" />
                    <span className="text-[9px] font-bold tracking-tight uppercase mt-0.5">Laser</span>
                  </div>
                )}

                {/* Target Portal */}
                {isTarget && (
                  <div className="flex flex-col items-center justify-center text-emerald-400 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md animate-ping" />
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 z-10" />
                    <span className="text-[9px] font-extrabold tracking-wider text-emerald-300 z-10">
                      META {targetEnergy}
                    </span>
                  </div>
                )}

                {/* Crystal / Energy Battery to Add */}
                {cell?.type === 'crystal_add' && !isCollected && !isRobotHere && (
                  <div className="flex flex-col items-center justify-center text-cyan-400">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/90 px-1 rounded border border-cyan-700/50">
                      +{cell.value}
                    </span>
                  </div>
                )}

                {/* Drain / Pressure to Subtract */}
                {cell?.type === 'crystal_sub' && !isCollected && !isRobotHere && (
                  <div className="flex flex-col items-center justify-center text-amber-400">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/90 px-1 rounded border border-amber-700/50">
                      -{cell.value}
                    </span>
                  </div>
                )}

                {/* Collected Marker */}
                {isCollected && !isRobotHere && (
                  <span className="text-[10px] font-mono text-slate-600 italic">coletado</span>
                )}

                {/* Robot Character */}
                {isRobotHere && (
                  <motion.div
                    layoutId="robot-automaton"
                    initial={false}
                    animate={{
                      rotate: getRotation(robotPos.dir),
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    className="relative z-20 flex items-center justify-center"
                  >
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-sky-400 p-0.5 shadow-xl shadow-cyan-500/30 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative">
                        <Bot className="w-6 h-6 text-cyan-300" />
                        {/* Heading direction arrow */}
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-cyan-300 rotate-45" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })
        )}
        </div>
      </div>

      {/* Mini Legend Footer */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-500"></div>
          <span>Bateria (+Adição)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></div>
          <span>Dreno (-Subtração)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500"></div>
          <span>Barreira / Laser</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></div>
          <span>Portal Meta</span>
        </div>
      </div>
    </div>
  );
};
