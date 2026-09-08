import React, { useState } from 'react';
import { X, BookOpen, Calculator, Cpu, Lightbulb, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface PedagogicalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogicalModal: React.FC<PedagogicalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'d19' | 'd12' | 'computacao'>('d19');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="font-bold text-slate-100 text-base">
                Guia Pedagógico & Habilidades BNCC / SAEB
              </h2>
              <p className="text-xs text-slate-400">
                Fundamentação teórica e didática integrada no jogo
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-4 pt-2 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d19');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'd19'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Matemática (D19)
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('d12');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'd12'
                ? 'border-violet-400 text-violet-300 bg-violet-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Língua Portuguesa (D12)
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('computacao');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'computacao'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Computação (EF05CO04)
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          {activeTab === 'd19' && (
            <div className="space-y-4">
              <div className="p-3 bg-cyan-950/40 border border-cyan-800 rounded-xl">
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                  Descritor SAEB Matemática D19
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">
                  Resolver problema com números naturais, envolvendo diferentes significados da adição ou subtração.
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-100 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Significados Trabalhados na Aventura:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-cyan-300 mb-1">1. Ideia de Juntar / Acrescentar (Adição)</p>
                    <p className="text-xs text-slate-300">
                      O personagem possui uma quantidade inicial e recolhe novos cristais ou baterias, somando os valores para atingir a carga necessária.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-amber-300 mb-1">2. Ideia de Retirar / Diminuir (Subtração)</p>
                    <p className="text-xs text-slate-300">
                      Consumo de energia por propulsores, drenagem de pressão excessiva ou pagamento de taxas para liberar portais.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-emerald-300 mb-1">3. Ideia de Comparar e Completar</p>
                    <p className="text-xs text-slate-300">
                      Calcular quanto falta para atingir a meta do portal ou quanto sobrou além do limite permitido.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-violet-300 mb-1">4. Resolução em Etapas Compostas</p>
                    <p className="text-xs text-slate-300">
                      Problemas com múltiplas operações encadeadas: somar ganhos e subtrair perdas em sequência lógica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'd12' && (
            <div className="space-y-4">
              <div className="p-3 bg-violet-950/40 border border-violet-800 rounded-xl">
                <span className="text-[11px] font-mono text-violet-400 uppercase font-bold">
                  Descritor SAEB Língua Portuguesa D12
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">
                  Estabelecer relações lógico-discursivas presentes no texto, marcadas por conjunções, advérbios, etc.
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-100">Guia de Relações e Conectivos do Jogo:</h4>
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-cyan-300">Causa:</span>{' '}
                      <span className="text-xs text-slate-300">Indica a razão ou motivo do acontecimento.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      porque, já que, visto que, como
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-amber-300">Consequência:</span>{' '}
                      <span className="text-xs text-slate-300">Indica o efeito gerado por uma ação prévia.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      por isso, de modo que, tanto que
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-rose-300">Oposição / Adversidade:</span>{' '}
                      <span className="text-xs text-slate-300">Quebra de expectativa ou contraste de ideias.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      mas, porém, contudo, entretanto
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-emerald-300">Condição:</span>{' '}
                      <span className="text-xs text-slate-300">Requisito ou hipótese para que a ação ocorra.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      se, caso, desde que, a não ser que
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-indigo-300">Tempo:</span>{' '}
                      <span className="text-xs text-slate-300">Localização temporal em que o fato se realiza.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      quando, enquanto, logo que, assim que
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-teal-300">Conclusão / Finalidade:</span>{' '}
                      <span className="text-xs text-slate-300">Fechamento do raciocínio ou objetivo pretendido.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      portanto, logo / para que, a fim de
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-sky-300">Conformidade:</span>{' '}
                      <span className="text-xs text-slate-300">Indica acordo, concordância ou obediência a regras.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      conforme, segundo, consoante
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-purple-300">Proporção:</span>{' '}
                      <span className="text-xs text-slate-300">Eventos que variam de forma simultânea e dependente.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      à medida que, à proporção que
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-pink-300">Adição Textual:</span>{' '}
                      <span className="text-xs text-slate-300">Soma de argumentos, informações ou fatores.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      além disso, bem como, e, também
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-lime-300">Explicação:</span>{' '}
                      <span className="text-xs text-slate-300">Justificativa ou esclarecimento do enunciado anterior.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      pois, porque, porquanto, já que
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'computacao' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl">
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                  BNCC Computação EF05CO04
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">
                  Criar e simular algoritmos para resolver problemas, identificando e corrigindo eventuais erros (depuração).
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-100">Pilares do Pensamento Computacional no Jogo:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Sequenciamento Lógico
                    </p>
                    <p className="text-xs text-slate-300">
                      Organizar instruções passo a passo em ordem estrita de execução (avançar, virar, calcular, coletar).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Simulação e Teste
                    </p>
                    <p className="text-xs text-slate-300">
                      Executar o programa no grid interativo em tempo real para visualizar o comportamento do robô.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Depuração (Debug)
                    </p>
                    <p className="text-xs text-slate-300">
                      Identificar falhas (colisão com barreiras, falta de passos, energia incorreta) e corrigir os blocos.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-violet-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Otimização de Algoritmo
                    </p>
                    <p className="text-xs text-slate-300">
                      Completar a missão utilizando o menor número de blocos possível para conquistar 3 estrelas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            Entendido, Continuar Aventura!
          </button>
        </div>
      </div>
    </div>
  );
};
