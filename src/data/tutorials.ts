import { CommandType, LevelTutorial } from '../types';

export const LEVEL_TUTORIALS: Record<number, LevelTutorial> = {
  1: {
    summary:
      'Na Fase 1, Byte acorda no Laboratório e deve seguir em linha reta pelo corredor desobstruído para absorver uma cápsula energética e ativar o primeiro portal.',
    threeStarGoals: [
      'Estrela 1: Conduzir o robô até o portal (4, 2) com exatas 40 unidades de energia.',
      'Estrela 2: Responder corretamente à questão de Língua Portuguesa D12 (relação de Causa com "porque").',
      'Estrela 3: Utilizar até 6 blocos no algoritmo.',
    ],
    readingGuide: {
      clue: 'Identifique o motivo que levou Byte a precisar de recarga.',
      focusWord: 'porque',
      explanation:
        'A palavra "porque" une a necessidade do robô à causa real: a tempestade descarregou seus circuitos.',
      correctOptionLabel: 'Relação de Causa',
    },
    mathGuide: {
      startingPoint: 'Byte inicia com 15 unidades de energia.',
      steps: [
        {
          operation: 'Adição da cápsula',
          calculation: '15 + 25',
          result: '40 unidades',
        },
      ],
      finalTarget: '40 unidades (meta exata do portal)',
      tip: 'Some as unidades (5 + 5 = 10) e depois as dezenas (10 + 20 + 10 = 40).',
    },
    algorithmGuide: {
      strategy:
        'Byte já começa virado para a direita (leste). Basta avançar 4 vezes seguidas em linha reta.',
      stepList: [
        '1. Avance 1 casa para a posição (1, 2).',
        '2. Avance mais 1 casa para (2, 2) e colete o cristal (+25 unidades).',
        '3. Avance para (3, 2).',
        '4. Avance para (4, 2) para entrar no portal com 40 de energia!',
      ],
      suggestedBlocks: ['forward', 'forward', 'forward', 'forward'],
    },
  },

  2: {
    summary:
      'A pressão nos dutos está alta! Byte precisa drenar vapor em uma válvula e contornar barreiras laser para chegar à comporta de segurança.',
    threeStarGoals: [
      'Estrela 1: Alcançar a comporta em (4, 3) com 45 unidades de energia.',
      'Estrela 2: Identificar a relação de Consequência estabelecida por "por isso" no D12.',
      'Estrela 3: Concluir o percurso em no máximo 9 blocos.',
    ],
    readingGuide: {
      clue: 'Observe o que acontece em decorrência do aumento de pressão.',
      focusWord: 'por isso',
      explanation:
        '"Por isso" indica o efeito ou consequência direta do problema de pressão anterior.',
      correctOptionLabel: 'Relação de Consequência',
    },
    mathGuide: {
      startingPoint: 'Pressão inicial no duto: 70 bar.',
      steps: [
        {
          operation: 'Drenagem de vapor',
          calculation: '70 - 25',
          result: '45 bar',
        },
      ],
      finalTarget: '45 bar',
      tip: 'Decomponha 25 em 20 e 5: 70 - 20 = 50, e 50 - 5 = 45.',
    },
    algorithmGuide: {
      strategy:
        'Avance 2 casas até a válvula em (2, 1), gire para baixo, desça até a linha 3, gire para a direita e avance até a comporta.',
      stepList: [
        '1. Avance 2 vezes até a posição (2, 1) onde a energia é reduzida em 25.',
        '2. Gire à direita para mirar para o sul.',
        '3. Avance 2 vezes até a posição (2, 3).',
        '4. Gire à esquerda para mirar para o leste.',
        '5. Avance 2 vezes até atingir a comporta (4, 3).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
      ],
    },
  },

  3: {
    summary:
      'O corredor principal está quebrado por barreiras de alerta. Byte deve desviar por caminhos secundários, recolhendo e balanceando múltiplas fontes de carga.',
    threeStarGoals: [
      'Estrela 1: Chegar ao portal (4, 4) com exatamente 65 unidades.',
      'Estrela 2: Reconhecer a relação de Oposição/Adversidade marcada por "contudo" no D12.',
      'Estrela 3: Programar o algoritmo usando no máximo 12 blocos.',
    ],
    readingGuide: {
      clue: 'Perceba a quebra de expectativa entre o bloqueio da porta e a persistência do robô.',
      focusWord: 'contudo',
      explanation:
        'Conectivos como "contudo", "porém" e "mas" introduzem contraste e oposição.',
      correctOptionLabel: 'Relação de Oposição / Adversidade',
    },
    mathGuide: {
      startingPoint: 'Energia inicial: 30 unidades.',
      steps: [
        {
          operation: 'Primeiro cristal (+20)',
          calculation: '30 + 20',
          result: '50 unidades',
        },
        {
          operation: 'Segundo cristal (+30)',
          calculation: '50 + 30',
          result: '80 unidades',
        },
        {
          operation: 'Dreno de choque (-15)',
          calculation: '80 - 15',
          result: '65 unidades',
        },
      ],
      finalTarget: '65 unidades',
      tip: 'Faça o balanço das adições primeiro (20 + 30 = 50), depois subtraia 15 de 80.',
    },
    algorithmGuide: {
      strategy:
        'Desça duas casas até (0, 2), vire à direita e avance até (2, 2). Em seguida desça até (2, 4), vire à esquerda e avance até (4, 4).',
      stepList: [
        '1. Avance 2 vezes para o sul até (0, 2) coletando +20.',
        '2. Gire à esquerda (leste) e avance 2 vezes até (2, 2) coletando +30.',
        '3. Gire à direita (sul) e avance 2 vezes até (2, 4) drenando -15.',
        '4. Gire à esquerda (leste) e avance 2 vezes até o portal (4, 4).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
      ],
    },
  },

  4: {
    summary:
      'Na Estufa Botânica, uma espessa cortina de vapor esconde barreiras laser verticais. Byte precisa navegar contornando a parede central.',
    threeStarGoals: [
      'Estrela 1: Chegar ao portal (4, 4) com 80 de energia.',
      'Estrela 2: Identificar a relação temporal indicada por "assim que" no D12.',
      'Estrela 3: Concluir em até 14 blocos de comandos.',
    ],
    readingGuide: {
      clue: 'Preste atenção ao momento em que a comporta se abriu.',
      focusWord: 'assim que',
      explanation:
        'A expressão "assim que" localiza o tempo de forma imediata (tempo coincidente).',
      correctOptionLabel: 'Relação de Tempo',
    },
    mathGuide: {
      startingPoint: 'Energia inicial: 50 unidades.',
      steps: [
        {
          operation: 'Condensador (+20)',
          calculation: '50 + 20',
          result: '70 unidades',
        },
        {
          operation: 'Fotossíntese (+25)',
          calculation: '70 + 25',
          result: '95 unidades',
        },
        {
          operation: 'Gasto no nebulizador (-15)',
          calculation: '95 - 15',
          result: '80 unidades',
        },
      ],
      finalTarget: '80 unidades',
      tip: '50 + 20 = 70; 70 + 25 = 95; 95 - 15 = 80.',
    },
    algorithmGuide: {
      strategy:
        'Desça pela coluna 1 até passar a parede laser em (2, 3), cruze para a direita e suba para coletar os cristais antes de ir à meta.',
      stepList: [
        '1. Avance para (1, 0), gire à direita e desça até (1, 3).',
        '2. Gire à esquerda e avance até (3, 3) contornando o obstáculo.',
        '3. Suba até (3, 1) para coletar a carga adicional.',
        '4. Desça diretamente até o portal em (4, 4).',
      ],
      suggestedBlocks: [
        'forward',
        'turn_right',
        'forward',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'forward',
      ],
    },
  },

  5: {
    summary:
      'As sementes bioluminescentes dependem de uma condição essencial: a umidade e a energia devem ser reguladas antes que a estufa abra.',
    threeStarGoals: [
      'Estrela 1: Atingir a estufa em (4, 0) com 75 unidades de energia.',
      'Estrela 2: Identificar a relação de Condição da conjunção "se" no D12.',
      'Estrela 3: Utilizar no máximo 14 blocos no algoritmo.',
    ],
    readingGuide: {
      clue: 'Qual é o requisito para que as mudas sobrevivam?',
      focusWord: 'se',
      explanation:
        'A conjunção "se" estabelece a hipótese e requisito condicional necessário.',
      correctOptionLabel: 'Relação de Condição',
    },
    mathGuide: {
      startingPoint: 'Energia inicial: 90 unidades.',
      steps: [
        {
          operation: 'Consumo da bomba (-35)',
          calculation: '90 - 35',
          result: '55 unidades',
        },
        {
          operation: 'Recarga solar (+40)',
          calculation: '55 + 40',
          result: '95 unidades',
        },
        {
          operation: 'Gasto nos filtros (-20)',
          calculation: '95 - 20',
          result: '75 unidades',
        },
      ],
      finalTarget: '75 unidades',
      tip: '90 - 35 = 55. Somando 40 temos 95. Tirando 20, obtemos 75.',
    },
    algorithmGuide: {
      strategy:
        'Partindo de (0, 4) virado para o norte, suba coletando os recursos até contornar a parede do setor norte e entrar em (4, 0).',
      stepList: [
        '1. Avance para o norte até a linha 1.',
        '2. Gire para o leste e avance até a coluna 3.',
        '3. Ajuste a rota para atingir a meta em (4, 0).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'turn_right',
        'forward',
      ],
    },
  },

  6: {
    summary:
      'No final da Biosfera, Byte prepara a transição para o próximo setor calculando o objetivo de purificação total com finalidade estrita.',
    threeStarGoals: [
      'Estrela 1: Concluir no portal (4, 4) com 95 unidades de energia.',
      'Estrela 2: Reconhecer a relação de Finalidade de "a fim de que" no D12.',
      'Estrela 3: Limitar o programa a 15 blocos.',
    ],
    readingGuide: {
      clue: 'Qual é a intenção ou objetivo de enviar as amostras?',
      focusWord: 'a fim de que',
      explanation:
        'A locução "a fim de que" indica o propósito, meta ou finalidade da ação.',
      correctOptionLabel: 'Relação de Finalidade / Conclusão',
    },
    mathGuide: {
      startingPoint: 'Carga inicial: 65 unidades.',
      steps: [
        {
          operation: 'Purificação (+30)',
          calculation: '65 + 30',
          result: '95 unidades',
        },
        {
          operation: 'Perda térmica (-15)',
          calculation: '95 - 15',
          result: '80 unidades',
        },
        {
          operation: 'Reator botânico (+30)',
          calculation: '80 + 30',
          result: '110 unidades',
        },
        {
          operation: 'Selagem de segurança (-15)',
          calculation: '110 - 15',
          result: '95 unidades',
        },
      ],
      finalTarget: '95 unidades',
      tip: 'Observe o cancelamento: +30 e -15 ocorrem duas vezes (+15 + 15 = +30). Logo, 65 + 30 = 95.',
    },
    algorithmGuide: {
      strategy:
        'Siga em zigue-zague suave desviando dos blocos laser nos cantos da estufa.',
      stepList: [
        '1. Avance 1 casa para o leste.',
        '2. Desça 2 casas contornando a parede.',
        '3. Prossiga para o leste e desça até a meta (4, 4).',
      ],
      suggestedBlocks: [
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
      ],
    },
  },

  7: {
    summary:
      'Nas cavernas de cristal, Byte opera em conformidade estrita com o mapa do radar sonoro para não quebrar estalagmites condutoras.',
    threeStarGoals: [
      'Estrela 1: Alcançar a saída (4, 4) com 110 unidades de energia.',
      'Estrela 2: Identificar a relação de Conformidade de "conforme" no D12.',
      'Estrela 3: Usar até 16 blocos.',
    ],
    readingGuide: {
      clue: 'Observe como Byte age de acordo com as leituras do radar.',
      focusWord: 'conforme',
      explanation:
        '"Conforme", "segundo" e "consoante" expressam conformidade e acordo com uma regra ou dado.',
      correctOptionLabel: 'Relação de Conformidade',
    },
    mathGuide: {
      startingPoint: 'Energia inicial: 100 unidades.',
      steps: [
        {
          operation: 'Mineração (+35)',
          calculation: '100 + 35',
          result: '135 unidades',
        },
        {
          operation: 'Broca de perfuração (-40)',
          calculation: '135 - 40',
          result: '95 unidades',
        },
        {
          operation: 'Cristal ressonante (+15)',
          calculation: '95 + 15',
          result: '110 unidades',
        },
      ],
      finalTarget: '110 unidades',
      tip: 'Subtraia 40 de 135 (135 - 40 = 95), depois adicione 15 (95 + 15 = 110).',
    },
    algorithmGuide: {
      strategy:
        'Desça contornando os paredões de cristal da mina até a base do setor.',
      stepList: [
        '1. Avance pelo túnel coletando o cristal de +35.',
        '2. Passe pelo ponto de drenagem (-40).',
        '3. Ative o cristal final (+15) e alcance o elevador (4, 4).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
      ],
    },
  },

  8: {
    summary:
      'Quanto mais fundo Byte descia, mais a pressão subterrânea subia de forma proporcional, exigindo cálculo dinâmico de dissipação.',
    threeStarGoals: [
      'Estrela 1: Chegar ao portal (5, 5) com 85 unidades de energia.',
      'Estrela 2: Reconhecer a relação de Proporção em "à medida que" no D12.',
      'Estrela 3: Concluir em até 18 blocos.',
    ],
    readingGuide: {
      clue: 'Perceba a variação simultânea: descer mais gera mais pressão.',
      focusWord: 'à medida que',
      explanation:
        'A locução "à medida que" indica que dois fatos progridem em proporção simultânea.',
      correctOptionLabel: 'Relação de Proporção',
    },
    mathGuide: {
      startingPoint: 'Carga inicial: 80 unidades.',
      steps: [
        {
          operation: 'Calor geotérmico (+45)',
          calculation: '80 + 45',
          result: '125 unidades',
        },
        {
          operation: 'Resfriamento criogênico (-50)',
          calculation: '125 - 50',
          result: '75 unidades',
        },
        {
          operation: 'Vetor de quartzo (+30)',
          calculation: '75 + 30',
          result: '105 unidades',
        },
        {
          operation: 'Exaustor (-20)',
          calculation: '105 - 20',
          result: '85 unidades',
        },
      ],
      finalTarget: '85 unidades',
      tip: '80 + 45 = 125. 125 - 50 = 75. 75 + 30 = 105. 105 - 20 = 85.',
    },
    algorithmGuide: {
      strategy:
        'Navegue pela malha 6x6 contornando as colunas rochosas centrais em serpentina.',
      stepList: [
        '1. Avance 2 casas para o leste.',
        '2. Gire ao sul e desça 2 casas.',
        '3. Gire ao leste e avance mais 2 casas.',
        '4. Desça até a linha 5 e entre no portal em (5, 5).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
      ],
    },
  },

  9: {
    summary:
      'Byte não só coletou os minerais preciosos como também mapeou as galerias subterrâneas para as futuras expedições.',
    threeStarGoals: [
      'Estrela 1: Chegar em (0, 0) com 125 unidades de energia.',
      'Estrela 2: Identificar a relação de Adição em "além disso" no D12.',
      'Estrela 3: Limitar a sequência a 18 blocos.',
    ],
    readingGuide: {
      clue: 'Qual conectivo soma duas informações no texto narrativo?',
      focusWord: 'além disso',
      explanation:
        '"Além disso" e "bem como" acrescentam argumentos e ações ao enunciado.',
      correctOptionLabel: 'Relação de Adição Textual',
    },
    mathGuide: {
      startingPoint: 'Bateria inicial: 110 unidades.',
      steps: [
        {
          operation: 'Fusão de minerais (+55)',
          calculation: '110 + 55',
          result: '165 unidades',
        },
        {
          operation: 'Gasto da broca (-45)',
          calculation: '165 - 45',
          result: '120 unidades',
        },
        {
          operation: 'Núcleo de geodo (+35)',
          calculation: '120 + 35',
          result: '155 unidades',
        },
        {
          operation: 'Elevação de carga (-30)',
          calculation: '155 - 30',
          result: '125 unidades',
        },
      ],
      finalTarget: '125 unidades',
      tip: '110 + 55 = 165. 165 - 45 = 120. 120 + 35 = 155. 155 - 30 = 125.',
    },
    algorithmGuide: {
      strategy:
        'Partindo do canto inferior direito (5, 5), suba e vire à esquerda até chegar ao topo esquerdo (0, 0).',
      stepList: [
        '1. Suba em direção ao norte desviando das estalagmites.',
        '2. Gire para o oeste e avance até a coluna 0.',
        '3. Conclua o percurso no portal (0, 0).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
        'forward',
      ],
    },
  },

  10: {
    summary:
      'No Núcleo Quântico, os reatores de fissão emitem ruídos alarmantes pois um dos selos magnéticos perdeu a sincronia.',
    threeStarGoals: [
      'Estrela 1: Concluir em (5, 5) com 130 unidades de energia.',
      'Estrela 2: Reconhecer a relação de Explicação introduzida por "pois" no D12.',
      'Estrela 3: Utilizar até 18 blocos no algoritmo.',
    ],
    readingGuide: {
      clue: 'Qual é a justificativa ou explicação para os alarmes estarem soando?',
      focusWord: 'pois',
      explanation:
        'A conjunção "pois" (antes do verbo) introduz a explicação e justificativa do fato anterior.',
      correctOptionLabel: 'Relação de Explicação',
    },
    mathGuide: {
      startingPoint: 'Carga inicial: 95 unidades.',
      steps: [
        {
          operation: 'Injeção de plasma (+60)',
          calculation: '95 + 60',
          result: '155 unidades',
        },
        {
          operation: 'Dreno de contenção (-35)',
          calculation: '155 - 35',
          result: '120 unidades',
        },
        {
          operation: 'Condensador quântico (+45)',
          calculation: '120 + 45',
          result: '165 unidades',
        },
        {
          operation: 'Purga do reator (-35)',
          calculation: '165 - 35',
          result: '130 unidades',
        },
      ],
      finalTarget: '130 unidades',
      tip: 'Observe que as duas subtrações somam 70 (-35 - 35). As adições somam 105 (60 + 45). 95 + 105 - 70 = 130.',
    },
    algorithmGuide: {
      strategy:
        'Percorra o corredor perimetral do núcleo quântico para evitar os campos magnéticos centrais.',
      stepList: [
        '1. Avance 2 vezes para o leste até (2, 0).',
        '2. Gire para o sul e desça 2 casas.',
        '3. Prossiga contornando os reatores até a saída em (5, 5).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'turn_right',
        'forward',
        'forward',
      ],
    },
  },

  11: {
    summary:
      'Byte precisa realinhar os feixes laser com precisão milimétrica, contanto que o fluxo de energia não sofra picos súbitos.',
    threeStarGoals: [
      'Estrela 1: Chegar em (0, 5) com 145 unidades de energia.',
      'Estrela 2: Identificar a relação de Condição da locução "contanto que" no D12.',
      'Estrela 3: Limitar a sequência a 18 blocos.',
    ],
    readingGuide: {
      clue: 'Qual condição é imposta para que os feixes sejam alinhados?',
      focusWord: 'contanto que',
      explanation:
        'A locução "contanto que" expressa uma condição indispensável para a ação.',
      correctOptionLabel: 'Relação de Condição',
    },
    mathGuide: {
      startingPoint: 'Potência inicial: 130 unidades.',
      steps: [
        {
          operation: 'Harmonização de feixe (+50)',
          calculation: '130 + 50',
          result: '180 unidades',
        },
        {
          operation: 'Dispersão de calor (-45)',
          calculation: '180 - 45',
          result: '135 unidades',
        },
        {
          operation: 'Filtro polarizador (+35)',
          calculation: '135 + 35',
          result: '170 unidades',
        },
        {
          operation: 'Estabilização final (-25)',
          calculation: '170 - 25',
          result: '145 unidades',
        },
      ],
      finalTarget: '145 unidades',
      tip: '130 + 50 = 180; 180 - 45 = 135; 135 + 35 = 170; 170 - 25 = 145.',
    },
    algorithmGuide: {
      strategy:
        'Desça do canto superior direito (5, 0) contornando as barreiras até o canto inferior esquerdo (0, 5).',
      stepList: [
        '1. Desça 2 casas para o sul.',
        '2. Gire ao oeste e cruze a linha central.',
        '3. Desça até a linha 5 e entre no portal em (0, 5).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'turn_right',
        'forward',
        'forward',
      ],
    },
  },

  12: {
    summary:
      'O Núcleo Quântico atingiu estabilidade plena; portanto, Byte ativou o campo de força a fim de blindar toda a instalação cósmica.',
    threeStarGoals: [
      'Estrela 1: Concluir no portal central (5, 0) com 160 unidades.',
      'Estrela 2: Reconhecer a relação simultânea de Conclusão ("portanto") e Finalidade ("a fim de") no D12.',
      'Estrela 3: Construir o algoritmo com até 20 blocos.',
    ],
    readingGuide: {
      clue: 'Preste atenção em "portanto" (fechamento lógico) e "a fim de" (propósito).',
      focusWord: 'portanto / a fim de',
      explanation:
        '"Portanto" conclui o raciocínio da estabilização e "a fim de" introduz o objetivo pretendido.',
      correctOptionLabel: 'Conclusão e Finalidade',
    },
    mathGuide: {
      startingPoint: 'Carga inicial: 140 unidades.',
      steps: [
        {
          operation: 'Injeção atômica (+70)',
          calculation: '140 + 70',
          result: '210 unidades',
        },
        {
          operation: 'Purga de gás (-55)',
          calculation: '210 - 55',
          result: '155 unidades',
        },
        {
          operation: 'Campo de contenção (+45)',
          calculation: '155 + 45',
          result: '200 unidades',
        },
        {
          operation: 'Bloqueio de emergência (-40)',
          calculation: '200 - 40',
          result: '160 unidades',
        },
      ],
      finalTarget: '160 unidades',
      tip: '140 + 70 = 210. 210 - 55 = 155. 155 + 45 = 200. 200 - 40 = 160.',
    },
    algorithmGuide: {
      strategy:
        'Parta de (0, 5), suba contornando os obstáculos e atravesse para o quadrante leste até atingir o portal em (5, 0).',
      stepList: [
        '1. Avance para o norte desviando das placas de indução.',
        '2. Gire para o leste e suba até o portal final em (5, 0).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
      ],
    },
  },

  13: {
    summary:
      'Na Estação Orbital, os painéis fotovoltaicos absorvem calor solar em proporção à aproximação da órbita; por isso, Byte deve balancear os condensadores com precisão.',
    threeStarGoals: [
      'Estrela 1: Chegar ao portal (5, 5) com exatas 120 unidades de energia.',
      'Estrela 2: Identificar a relação de Proporção em "à medida que" no D12.',
      'Estrela 3: Limitar o percurso a 16 blocos.',
    ],
    readingGuide: {
      clue: 'Veja como a absorção de calor varia ao mesmo tempo em que a nave se aproxima do sol.',
      focusWord: 'à medida que',
      explanation:
        'Expressões como "à medida que" e "à proporção que" marcam fatos que variam juntos no tempo.',
      correctOptionLabel: 'Relação de Proporção',
    },
    mathGuide: {
      startingPoint: 'Reserva inicial: 120 megawatts.',
      steps: [
        {
          operation: 'Interferência solar (-45)',
          calculation: '120 - 45',
          result: '75 MW',
        },
        {
          operation: 'Recarga do painel (+68)',
          calculation: '75 + 68',
          result: '143 MW',
        },
        {
          operation: 'Alinhamento de antena (-23)',
          calculation: '143 - 23',
          result: '120 MW',
        },
      ],
      finalTarget: '120 MW',
      tip: 'Observe que 68 - 45 = +23. Ao final temos -23, o que retorna perfeitamente aos 120 iniciais!',
    },
    algorithmGuide: {
      strategy:
        'Siga em S pelo canal aberto: desça pela coluna 0 até a linha 3, cruze para a coluna 3 e desça até a linha 5, virando à direita para a meta.',
      stepList: [
        '1. Desça 3 casas pela coluna 0 coletando o dreno (-45).',
        '2. Gire à esquerda (leste) e avance 3 casas coletando +68 e -23.',
        '3. Gire à direita (sul) e desça 2 casas até a linha 5.',
        '4. Gire à esquerda (leste) e avance 2 casas até o portal (5, 5).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
      ],
    },
  },

  14: {
    summary:
      'O compartimento do reator exige resfriamento criogênico em 4 etapas térmicas sucessivas para evitar colapso dos cristais.',
    threeStarGoals: [
      'Estrela 1: Alcançar a câmara em (0, 5) com 190 litros de hélio.',
      'Estrela 2: Reconhecer a relação de Oposição/Adversidade da conjunção "contudo" no D12.',
      'Estrela 3: Não ultrapassar 20 blocos no algoritmo.',
    ],
    readingGuide: {
      clue: 'Qual conjunção mostra que a ação de Byte impediu a tragédia esperada?',
      focusWord: 'contudo',
      explanation:
        '"Contudo" expressa contraste, ressalva e quebra de expectativa adversativa.',
      correctOptionLabel: 'Relação de Oposição / Adversidade',
    },
    mathGuide: {
      startingPoint: 'Volume inicial: 180 litros.',
      steps: [
        {
          operation: 'Injeção no núcleo (-65)',
          calculation: '180 - 65',
          result: '115 litros',
        },
        {
          operation: 'Reciclagem de vapor (+42)',
          calculation: '115 + 42',
          result: '157 litros',
        },
        {
          operation: 'Purga de escape (-38)',
          calculation: '157 - 38',
          result: '119 litros',
        },
        {
          operation: 'Tanque reserva (+71)',
          calculation: '119 + 71',
          result: '190 litros',
        },
      ],
      finalTarget: '190 litros',
      tip: '180 - 65 = 115. 115 + 42 = 157. 157 - 38 = 119. 119 + 71 = 190.',
    },
    algorithmGuide: {
      strategy:
        'Parta de (5, 0) virado para o oeste. Percorra o corredor em serpentina até o dreno em (0, 5).',
      stepList: [
        '1. Avance pelo topo coletando o dreno de -65.',
        '2. Desça e retorne pela linha 2 coletando +42 e -38.',
        '3. Desça e cruze a linha 4 coletando +71.',
        '4. Desça para (0, 5) entrando na câmara de descompressão.',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'forward',
        'turn_left',
        'forward',
      ],
    },
  },

  15: {
    summary:
      'Byte desfragmenta os bancos de dados cósmicos em conformidade com o protocolo estelar porque setores de memória foram corrompidos.',
    threeStarGoals: [
      'Estrela 1: Alcançar o console mestre em (5, 0) com 240 petabytes livres.',
      'Estrela 2: Identificar a relação de Conformidade ("conforme") e Explicação ("porquanto") no D12.',
      'Estrela 3: Limitar a sequência a 22 blocos.',
    ],
    readingGuide: {
      clue: 'Perceba a conformidade com as normas e a explicação do motivo da limpeza.',
      focusWord: 'conforme / porquanto',
      explanation:
        '"Conforme" estabelece acordo com as diretrizes e "porquanto" explica a razão (sinônimo de porque/já que).',
      correctOptionLabel: 'Conformidade e Explicação',
    },
    mathGuide: {
      startingPoint: 'Espaço livre inicial: 210 petabytes.',
      steps: [
        {
          operation: 'Backup gravado (-75)',
          calculation: '210 - 75',
          result: '135 PB',
        },
        {
          operation: 'Compressão quântica (+92)',
          calculation: '135 + 92',
          result: '227 PB',
        },
        {
          operation: 'Telemetria enviada (-48)',
          calculation: '227 - 48',
          result: '179 PB',
        },
        {
          operation: 'Limpeza de temporários (+61)',
          calculation: '179 + 61',
          result: '240 PB',
        },
      ],
      finalTarget: '240 PB',
      tip: '210 - 75 = 135. 135 + 92 = 227. 227 - 48 = 179. 179 + 61 = 240.',
    },
    algorithmGuide: {
      strategy:
        'Suba pela coluna 0 até (0, 2), vire para o leste, desça pelo canal da coluna 2, suba pela coluna 4 e entre em (5, 0).',
      stepList: [
        '1. Suba 3 casas até (0, 2) coletando -75.',
        '2. Vire à direita e avance até (2, 2) coletando +92.',
        '3. Desça até (2, 4) coletando -48.',
        '4. Vire à esquerda e avance até (4, 4) coletando +61.',
        '5. Suba até (4, 1), vire à direita e acesse o terminal (5, 0).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
      ],
    },
  },

  16: {
    summary:
      'O enxame de nanorrobôs realiza reparos críticos na carcaça da estação. Uma sequência de 5 operações de alta energia deve ser balanceada com rigor.',
    threeStarGoals: [
      'Estrela 1: Concluir no portal de recarga (5, 5) com 230 baterias.',
      'Estrela 2: Identificar a relação de Adição em "não só... mas também" no D12.',
      'Estrela 3: Utilizar até 24 blocos no algoritmo.',
    ],
    readingGuide: {
      clue: 'Qual par de conectivos correlativos soma duas ações simultâneas?',
      focusWord: 'não só... mas também',
      explanation:
        'A locução correlativa "não só... mas também" adiciona argumentos sem excluir nenhum deles.',
      correctOptionLabel: 'Relação de Adição',
    },
    mathGuide: {
      startingPoint: 'Baterias do enxame: 250 unidades.',
      steps: [
        {
          operation: 'Reparo do casco (-85)',
          calculation: '250 - 85',
          result: '165 baterias',
        },
        {
          operation: 'Recuperação de sucata (+64)',
          calculation: '165 + 64',
          result: '229 baterias',
        },
        {
          operation: 'Solda a laser (-52)',
          calculation: '229 - 52',
          result: '177 baterias',
        },
        {
          operation: 'Recarga sem fio (+93)',
          calculation: '177 + 93',
          result: '270 baterias',
        },
        {
          operation: 'Blindagem final (-40)',
          calculation: '270 - 40',
          result: '230 baterias',
        },
      ],
      finalTarget: '230 baterias',
      tip: '250 - 85 = 165. 165 + 64 = 229. 229 - 52 = 177. 177 + 93 = 270. 270 - 40 = 230.',
    },
    algorithmGuide: {
      strategy:
        'Navegue pelo zigue-zague pelas estações de trabalho de cada compartimento da nave até a câmara (5, 5).',
      stepList: [
        '1. Avance pela linha 0 até (4, 0) coletando -85.',
        '2. Desça para (4, 1) coletando +64.',
        '3. Retorne para a esquerda na linha 2 coletando -52 em (2, 2).',
        '4. Desça até a linha 4 e colete +93 em (1, 4).',
        '5. Avance para a direita até (4, 4) coletando -40 e desça até a meta (5, 5).',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'forward',
        'turn_right',
        'forward',
      ],
    },
  },

  17: {
    summary:
      'O Desafio Mestre Supremo: Byte deve sincronizar o Grande Portal Hiperdimensional da Consciência através de um labirinto quântico com 5 operações em escala de centenas!',
    threeStarGoals: [
      'Estrela 1: Atravessar o portal mestre em (0, 0) com exatos 250 gigawatts.',
      'Estrela 2: Reconhecer a relação de Concessão ("ainda que") e Conclusão ("portanto") no D12.',
      'Estrela 3: Concluir o algoritmo mestre em no máximo 26 blocos.',
    ],
    readingGuide: {
      clue: 'Perceba a concessão que supera a tempestade e a conclusão lógica que alinha os prismas.',
      focusWord: 'ainda que / portanto',
      explanation:
        '"Ainda que" estabelece concessão (oposição superada) e "portanto" fecha com a conclusão de vitória.',
      correctOptionLabel: 'Concessão e Conclusão',
    },
    mathGuide: {
      startingPoint: 'Potência cósmica inicial: 300 gigawatts.',
      steps: [
        {
          operation: 'Abertura do vácuo (-115)',
          calculation: '300 - 115',
          result: '185 GW',
        },
        {
          operation: 'Geradores de fusão (+95)',
          calculation: '185 + 95',
          result: '280 GW',
        },
        {
          operation: 'Flutuação de gravidade (-65)',
          calculation: '280 - 65',
          result: '215 GW',
        },
        {
          operation: 'Feixe de fótons (+110)',
          calculation: '215 + 110',
          result: '325 GW',
        },
        {
          operation: 'Sincronização dimensional (-75)',
          calculation: '325 - 75',
          result: '250 GW',
        },
      ],
      finalTarget: '250 gigawatts exatos',
      tip: '300 - 115 = 185; 185 + 95 = 280; 280 - 65 = 215; 215 + 110 = 325; 325 - 75 = 250!',
    },
    algorithmGuide: {
      strategy:
        'Parta do canto inferior direito (5, 5) virado para o norte. Suba desviando das paredes laterais, cruze os prismas pelas colunas 3 e 1 e acesse o portal supremo em (0, 0).',
      stepList: [
        '1. Suba 3 casas pela coluna 5 coletando o cristal de -115.',
        '2. Gire à esquerda (oeste) e avance até (3, 2).',
        '3. Desça para (3, 3) coletando +95 e suba até (3, 1) coletando -65.',
        '4. Gire à esquerda (oeste) e avance para a coluna 1 coletando +110.',
        '5. Suba até (1, 0) coletando -75 e vire à esquerda para entrar no portal em (0, 0)!',
      ],
      suggestedBlocks: [
        'forward',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'turn_right',
        'turn_right',
        'forward',
        'forward',
        'turn_left',
        'forward',
        'forward',
        'turn_right',
        'forward',
        'turn_left',
        'forward',
      ],
    },
  },
};
