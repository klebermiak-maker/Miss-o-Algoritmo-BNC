export type Direction = 'up' | 'right' | 'down' | 'left';

export type CommandType =
  | 'forward'
  | 'turn_left'
  | 'turn_right'
  | 'add_energy'
  | 'sub_energy'
  | 'collect'
  | 'if_condition'
  | 'repeat';

export interface CommandBlock {
  id: string;
  type: CommandType;
  value?: number; // For add/sub or repeat count
  conditionType?: 'energy_greater' | 'energy_equal' | 'has_item' | 'text_choice';
  conditionValue?: number | string;
  nestedCommands?: CommandBlock[]; // For repeat or if
}

export type CellType =
  | 'empty'
  | 'start'
  | 'target'
  | 'wall'
  | 'crystal_add'
  | 'crystal_sub'
  | 'door'
  | 'gate';

export interface GridCell {
  x: number;
  y: number;
  type: CellType;
  value?: number; // e.g. +15 or -8
  label?: string;
  isOpen?: boolean;
}

export interface D12Question {
  question: string;
  highlightedText: string;
  connector: string;
  relationType:
    | 'Causa'
    | 'Consequência'
    | 'Oposição / Adversidade'
    | 'Condição'
    | 'Tempo'
    | 'Conclusão / Finalidade'
    | 'Adição'
    | 'Conformidade'
    | 'Proporção'
    | 'Explicação'
    | string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface D19MathProblem {
  title: string;
  story: string;
  initialValue: number;
  operations: {
    type: 'add' | 'sub';
    amount: number;
    description: string;
  }[];
  targetValue: number;
  explanation: string;
}

export interface LevelTutorial {
  summary: string;
  threeStarGoals: string[];
  readingGuide: {
    clue: string;
    focusWord: string;
    explanation: string;
    correctOptionLabel: string;
  };
  mathGuide: {
    startingPoint: string;
    steps: { operation: string; calculation: string; result: string }[];
    finalTarget: string;
    tip: string;
  };
  algorithmGuide: {
    strategy: string;
    stepList: string[];
    suggestedBlocks: CommandType[];
  };
}

export interface Level {
  id: number;
  world: number;
  worldName: string;
  title: string;
  narrative: string;
  gridSize: { cols: number; rows: number };
  startPos: { x: number; y: number; dir: Direction };
  targetPos: { x: number; y: number };
  initialEnergy: number;
  targetEnergy: number;
  cells: GridCell[];
  availableCommands: CommandType[];
  maxBlocks: number;
  d12: D12Question;
  d19: D19MathProblem;
  pedagogicalTip: string;
  tutorial?: LevelTutorial;
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  stepIndex: number;
  activeBlockId: string | null;
  robotPos: { x: number; y: number; dir: Direction };
  currentEnergy: number;
  collectedItems: string[];
  openedGates: string[];
  historyLog: string[];
  status: 'idle' | 'running' | 'success' | 'failed';
  errorMessage?: string;
}

export type BackgroundThemeId =
  | 'deep-space'
  | 'cyber-grid'
  | 'aurora-borealis'
  | 'cad-blueprint'
  | 'solar-station'
  | 'stealth-matrix';

export interface BackgroundThemeConfig {
  id: BackgroundThemeId;
  name: string;
  tagline: string;
  accentColor: string;
  previewBg: string;
}

