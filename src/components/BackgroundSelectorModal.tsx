import React from 'react';
import { BackgroundThemeId, BackgroundThemeConfig } from '../types';
import { Palette, Check, X, Sparkles, Compass, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface BackgroundSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: BackgroundThemeId;
  onSelectTheme: (theme: BackgroundThemeId) => void;
}

export const THEMES: BackgroundThemeConfig[] = [
  {
    id: 'deep-space',
    name: 'Cosmos Estelar',
    tagline: 'Galáxias profundas, nébulas cósmicas violeta e anéis orbitais.',
    accentColor: 'from-indigo-500 to-violet-600',
    previewBg: 'bg-gradient-to-br from-[#060814] via-[#0e1630] to-[#04060d] border-indigo-500/40',
  },
  {
    id: 'cyber-grid',
    name: 'Ciber-Grid Neon',
    tagline: 'Malha geométrica de computação holográfica em ciano neon.',
    accentColor: 'from-cyan-500 to-blue-600',
    previewBg: 'bg-gradient-to-br from-[#020617] via-[#04162e] to-[#01040f] border-cyan-500/40',
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Quântica',
    tagline: 'Ondulações etéreas em tons esmeralda, turquesa e violeta.',
    accentColor: 'from-emerald-400 to-teal-600',
    previewBg: 'bg-gradient-to-br from-[#060d17] via-[#0a2324] to-[#0b1329] border-emerald-500/40',
  },
  {
    id: 'cad-blueprint',
    name: 'CAD Blueprint Técnico',
    tagline: 'Papel milimetrado técnico de engenharia com eixos de precisão.',
    accentColor: 'from-sky-400 to-indigo-600',
    previewBg: 'bg-gradient-to-br from-[#071326] via-[#0c2447] to-[#050f1e] border-sky-500/40',
  },
  {
    id: 'solar-station',
    name: 'Estação Solar Âmbar',
    tagline: 'Flares estelares radiantes, poeira de ouro e radiação solar.',
    accentColor: 'from-amber-400 to-orange-600',
    previewBg: 'bg-gradient-to-br from-[#140b04] via-[#2a1708] to-[#0a0502] border-amber-500/40',
  },
  {
    id: 'stealth-matrix',
    name: 'Matriz Furtiva',
    tagline: 'Fundo preto absoluto com circuitos integrados esmeralda.',
    accentColor: 'from-green-400 to-emerald-600',
    previewBg: 'bg-gradient-to-br from-[#020508] via-[#04140c] to-[#010305] border-green-500/40',
  },
];

export const BackgroundSelectorModal: React.FC<BackgroundSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-lg">
                Personalizar Plano de Fundo
              </h3>
              <p className="text-xs text-slate-400">
                Escolha o ambiente visual e a atmosfera para sua aventura
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Options Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTheme(theme.id);
                }}
                className={`group relative text-left rounded-2xl p-4 border transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[120px] ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-xl shadow-cyan-500/10'
                    : 'border-slate-800 hover:border-slate-700 hover:scale-[1.01]'
                } ${theme.previewBg}`}
              >
                {/* Visual Header */}
                <div className="flex items-start justify-between gap-2 z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.accentColor}" />
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-white transition-colors">
                      {theme.name}
                    </h4>
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-500/50 px-2 py-0.5 rounded-full shadow-sm">
                      <Check className="w-3 h-3" />
                      Ativo
                    </span>
                  )}
                </div>

                {/* Theme Description */}
                <p className="text-xs text-slate-400 mt-2 z-10 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {theme.tagline}
                </p>

                {/* Subtle Accent Glow Corner */}
                <div
                  className={`absolute -bottom-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-25 bg-gradient-to-br ${theme.accentColor}`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            A seleção é salva automaticamente no seu navegador.
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
