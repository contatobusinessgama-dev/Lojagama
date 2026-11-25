import { StoreApp } from '../types';

const HERO_IMG = '/src/assets/images/featured_app_aether_studio_1795560818381.jpg';
const DESIGN_IMG = '/src/assets/images/screenshot_design_canvas_1795560816939.jpg';
const FINANCE_IMG = '/src/assets/images/screenshot_finance_ledger_1795560818864.jpg';
const GAME_IMG = '/src/assets/images/screenshot_game_odyssey_1795560818892.jpg';

export const STORE_APPS: StoreApp[] = [
  // ==========================================
  // DESIGN (5 Apps: 3 Original + 1 Free + 1 Paid)
  // ==========================================
  {
    id: 'vertex-flow-pro',
    name: 'VertexFlow Studio',
    tagline: 'Modelagem vetorial paramétrica e composição 3D baseada em nós',
    developer: 'Kinetix Labs GmbH',
    category: 'Design',
    price: 49.90,
    rating: 4.9,
    reviewCount: 1420,
    downloadsCount: '84.5 mil',
    isFeatured: true,
    featuredHeadline: 'A nova geração de criação espacial e vetorial com aceleração nativa em GPU.',
    iconBg: 'from-blue-600 to-indigo-800',
    iconAccent: '#60A5FA',
    iconSymbol: 'Layers',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 9f86d081884c7d659a2feaa0c55ad015',
      fileSize: '142.8 MB',
      version: '4.2.1',
      lastUpdated: '18 Nov 2026',
      platforms: ['Desktop', 'Web', 'iOS'],
      privacyScore: 'Zero Telemetria de Terceiros',
      permissions: [
        {
          id: 'storage',
          name: 'Armazenamento Local',
          description: 'Leitura e gravação de projetos .vfx e exportação de ativos SVG/OBJ.',
          criticality: 'Essencial'
        },
        {
          id: 'gpu',
          name: 'Aceleração de Hardware (WebGPU / Metal)',
          description: 'Acesso direto ao pipeline gráfico para renderização em tempo real.',
          criticality: 'Essencial'
        },
        {
          id: 'network',
          name: 'Sincronização em Nuvem',
          description: 'Conexão criptografada opcional para bibliotecas compartilhadas da equipe.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'VertexFlow Studio redefine o fluxo de trabalho de designers de produto, arquitetos de interfaces e artistas técnicos. Combinando a precisão matemática de curvas Bézier com uma árvore de nós não-destrutiva, você pode alterar qualquer parâmetro geométrico semanas após o início do projeto sem perder performance.\n\nConstruído do zero para arquiteturas modernas, o motor de renderização opera a 120 quadros por segundo mesmo em documentos com mais de 50.000 vértices ativos.',
    highlights: [
      'Grafo de nós paramétrico 100% não-destrutivo com histórico infinito',
      'Exportação direta para SVG, glTF 2.0, CSS Shaders e React Three Fiber',
      'Inspeção de malha isométrica com guias magnéticas inteligentes',
      'Modo offline completo com criptografia local de arquivos de projeto'
    ],
    screenshots: [
      {
        id: 'vf-1',
        title: 'Estúdio de Composição Baseado em Nós',
        caption: 'Conecte geradores geométricos, modificadores booleanos e shaders em tempo real.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-slate-900 to-blue-950'
      },
      {
        id: 'vf-2',
        title: 'Malha Isométrica & Curvas de Precisão',
        caption: 'Controle sub-pixel com guias de ângulo e ancoragem automática.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-zinc-900 to-slate-800'
      },
      {
        id: 'vf-3',
        title: 'Exportação e Auditoria de Performance',
        caption: 'Analise o peso dos ativos e otimize polígonos antes de publicar.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-neutral-900 to-stone-800'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Marina Vasconcelos',
        role: 'Lead Industrial Designer na Studio V',
        rating: 5,
        date: '20 Nov 2026',
        version: '4.2.1',
        comment: 'Substituiu três ferramentas diferentes no nosso estúdio. A estabilidade do grafo de nós e a clareza da interface são incomparáveis.'
      },
      {
        id: 'rev-2',
        author: 'Rafael Lindqvist',
        role: 'Creative Technologist',
        rating: 5,
        date: '14 Nov 2026',
        version: '4.2.0',
        comment: 'A exportação limpa para glTF e a ausência de assinatura mensal abusiva fazem do VertexFlow o melhor investimento do ano.'
      }
    ]
  },
  {
    id: 'prism-palette',
    name: 'Prism Color & Contrast',
    tagline: 'Calibração perceptual OKLCH e auditoria de acessibilidade WCAG AAA',
    developer: 'Chroma Systems',
    category: 'Design',
    price: 0,
    rating: 4.8,
    reviewCount: 2150,
    downloadsCount: '320 mil',
    iconBg: 'from-violet-600 to-indigo-950',
    iconAccent: '#A78BFA',
    iconSymbol: 'Palette',
    heroImage: DESIGN_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: d4735e3a265e16eee03f59718b9b5d03',
      fileSize: '18.5 MB',
      version: '1.9.0',
      lastUpdated: '19 Nov 2026',
      platforms: ['Desktop', 'Web'],
      privacyScore: 'Zero Coleta de Dados',
      permissions: [
        {
          id: 'screen-picker',
          name: 'Captura de Pixel da Tela (Conta-gotas)',
          description: 'Permite amostrar cores de qualquer janela aberta quando acionado pelo usuário.',
          criticality: 'Moderada'
        }
      ]
    },
    description:
      'Gere sistemas de cores matematicamente consistentes utilizando o espaço de cor perceptual OKLCH. Ao contrário do RGB ou HSL tradicional, cada escala gerada pelo Prism mantém luminosidade uniforme e contraste previsível em temas claros e escuros.\n\nTotalmente gratuito para designers e desenvolvedores front-end.',
    highlights: [
      'Gerador de escalas de 50 a 950 com contraste APCA e WCAG 2.1 garantido',
      'Simulador em tempo real de daltonismo (Protanopia, Deuteranopia, Tritanopia)',
      'Exportação instantânea para variáveis CSS, Tailwind v4 e Design Tokens JSON',
      'Conta-gotas global com histórico inteligente de paletas'
    ],
    screenshots: [
      {
        id: 'pr-1',
        title: 'Curvas de Luminosidade OKLCH',
        caption: 'Inspeção técnica de matiz, croma e contraste acessível.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-indigo-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-pr-1',
        author: 'Thiago Mendes',
        role: 'Design Systems Architect',
        rating: 5,
        date: '20 Nov 2026',
        version: '1.9.0',
        comment: 'Ser gratuito com esse nível de acabamento é impressionante. Salvou semanas na criação do nosso novo Design System.'
      }
    ]
  },
  {
    id: 'vector-font-lab',
    name: 'Glyphic Type Foundry',
    tagline: 'Inspeção de fontes variáveis OpenType, kerning óptico e espécimes web',
    developer: 'Swiss Typeface Tools',
    category: 'Design',
    price: 34.90,
    rating: 4.9,
    reviewCount: 615,
    downloadsCount: '41 mil',
    iconBg: 'from-rose-700 to-stone-950',
    iconAccent: '#FB7185',
    iconSymbol: 'Type',
    heroImage: DESIGN_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 45c48cce2e2d7fbdea1afc51c7c6ad26',
      fileSize: '86.5 MB',
      version: '2.7.0',
      lastUpdated: '16 Nov 2026',
      platforms: ['Desktop', 'Web'],
      privacyScore: 'Proteção de Licenças Locais',
      permissions: [
        {
          id: 'font-dir',
          name: 'Leitura do Catálogo de Fontes do Sistema',
          description: 'Lista e organiza famílias tipográficas instaladas localmente.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'A ferramenta definitiva para diretores de arte e tipógrafos. Inspecione todos os eixos de fontes variáveis (peso, largura, inclinação óptica), teste pares de kerning em múltiplos idiomas, audite tabelas OpenType (`tabular-nums`, ligaduras, frações) e exporte subconjuntos WOFF2 ultra-otimizados para produção web.',
    highlights: [
      'Laboratório interativo para todos os eixos de Variable Fonts e features OpenType',
      'Subsetting WOFF2 automático que reduz arquivos de fonte em até 78%',
      'Comparador lado-a-lado de altura-x, contraste e legibilidade em tamanhos micro',
      'Gerador automático de CSS `@font-face` com métricas de fallback anti-CLS'
    ],
    screenshots: [
      {
        id: 'gl-1',
        title: 'Anatomia de Glifos e Curvas Bézier',
        caption: 'Inspeção milimétrica de âncoras, hastes e métricas verticais.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-rose-950 to-stone-900'
      }
    ],
    reviews: [
      {
        id: 'rev-gl-1',
        author: 'Clara Dietrich',
        role: 'Brand Designer',
        rating: 5,
        date: '19 Nov 2026',
        version: '2.7.0',
        comment: 'O gerador de subset WOFF2 e o cálculo automático de fallback CSS pagaram o aplicativo no primeiro projeto de cliente.'
      }
    ]
  },
  {
    id: 'svg-forge-lite',
    name: 'SVG Forge & Optimizer',
    tagline: 'Minificação de código vetorial, limpeza de nós e gerador de ícones geométricos',
    developer: 'Vectoria Open Collective',
    category: 'Design',
    price: 0,
    rating: 4.8,
    reviewCount: 1380,
    downloadsCount: '195 mil',
    iconBg: 'from-fuchsia-600 to-purple-950',
    iconAccent: '#E879F9',
    iconSymbol: 'Box',
    heroImage: DESIGN_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 1a91d2274623355499a0124748192f41',
      fileSize: '12.4 MB',
      version: '3.1.2',
      lastUpdated: '22 Nov 2026',
      platforms: ['Web', 'Desktop'],
      privacyScore: 'Processamento 100% Client-Side',
      permissions: [
        {
          id: 'clipboard-svg',
          name: 'Área de Transferência (Copiar SVG/JSX)',
          description: 'Permite copiar caminhos vetoriais otimizados diretamente para o código.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Otimize ícones e ilustrações SVG reduzindo até 70% do tamanho do arquivo sem perda de precisão geométrica. Inclui um gerador interativo de polígonos, estrelas e malhas vetoriais com exportação instantânea para SVG puro ou componentes React/JSX.',
    highlights: [
      'Construtor visual de formas geométricas paramétricas (lados, raio, rotação)',
      'Remoção de metadados redundantes de editores visuais em 1 clique',
      'Conversão instantânea de atributos SVG para camelCase JSX (React)',
      'Totalmente gratuito e executado localmente na memória'
    ],
    screenshots: [
      {
        id: 'svg-1',
        title: 'Estúdio de Otimização e Geometria SVG',
        caption: 'Visualize a árvore de caminhos e o peso em bytes em tempo real.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-purple-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-svg-1',
        author: 'Aline Barros',
        role: 'UI Engineer',
        rating: 5,
        date: '23 Nov 2026',
        version: '3.1.2',
        comment: 'Uso todos os dias antes de subir ícones para produção. O gerador geométrico embutido é super prático!'
      }
    ]
  },
  {
    id: 'bezier-motion-pro',
    name: 'Bezier Motion Lab',
    tagline: 'Coreografia de curvas de animação cubic-bezier e física de molas para UI',
    developer: 'Kinetix Labs GmbH',
    category: 'Design',
    price: 27.90,
    rating: 4.9,
    reviewCount: 740,
    downloadsCount: '52 mil',
    iconBg: 'from-pink-600 to-rose-950',
    iconAccent: '#F472B6',
    iconSymbol: 'Activity',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 7b99d081884c7d659a2feaa0c55ad998',
      fileSize: '41.6 MB',
      version: '2.0.4',
      lastUpdated: '21 Nov 2026',
      platforms: ['Desktop', 'Web'],
      privacyScore: 'Zero Telemetria',
      permissions: [
        {
          id: 'gpu-motion',
          name: 'Sincronização V-Sync 120Hz',
          description: 'Acesso à taxa de atualização nativa do monitor para prévia fluida.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Teste e calibre micro-interações com precisão cirúrgica. Compare curvas `cubic-bezier(x1, y1, x2, y2)` lado a lado contra simulações de física de mola (rigidez, amortecimento e massa) e exporte tokens prontos para CSS, Framer Motion e SwiftUI.',
    highlights: [
      'Simulador interativo em tempo real a 60fps e 120fps',
      'Biblioteca curada de curvas naturais de aceleração e desaceleração',
      'Comparador simultâneo de 3 objetos animados lado a lado',
      'Exportação direta de CSS transition e Spring configs'
    ],
    screenshots: [
      {
        id: 'bz-1',
        title: 'Calibrador de Curvas Temporais',
        caption: 'Ajuste pontos de controle P1 e P2 e teste a resposta tátil.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-rose-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-bz-1',
        author: 'Gabriel Prado',
        role: 'Motion Designer',
        rating: 5,
        date: '22 Nov 2026',
        version: '2.0.4',
        comment: 'Torna muito fácil explicar para os desenvolvedores exatamente qual curva de easing usar em cada transição.'
      }
    ]
  },

  // ==========================================
  // PRODUTIVIDADE (5 Apps: 3 Original + 1 Free + 1 Paid)
  // ==========================================
  {
    id: 'krono-tasks',
    name: 'Krono Focus & Timeline',
    tagline: 'Planejamento executivo com blocos de tempo e ritual diário',
    developer: 'Nordic Craft Software',
    category: 'Produtividade',
    price: 0,
    rating: 4.8,
    reviewCount: 3190,
    downloadsCount: '410 mil',
    iconBg: 'from-emerald-600 to-teal-800',
    iconAccent: '#34D399',
    iconSymbol: 'CheckCircle2',
    heroImage: DESIGN_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 4b227777d4dd1fc61c6f884f48641d02',
      fileSize: '38.4 MB',
      version: '2.9.4',
      lastUpdated: '21 Nov 2026',
      platforms: ['iOS', 'Android', 'Desktop', 'Web'],
      privacyScore: 'Criptografia Ponta-a-Ponta',
      permissions: [
        {
          id: 'calendar',
          name: 'Leitura e Escrita de Calendário',
          description: 'Sincronização bidirecional com agendas CalDAV, Google e iCloud.',
          criticality: 'Essencial'
        },
        {
          id: 'notifications',
          name: 'Notificações do Sistema',
          description: 'Alertas silenciosos de transição de bloco de foco e pausas.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Krono combina sua lista de tarefas complexas com sua agenda real em uma linha do tempo contínua. Ao invés de acumular centenas de pendências sem data, você aloca blocos reais de energia cognitiva ao longo da semana.\n\nTotalmente gratuito para uso individual, com atalhos de teclado globais ultrarrápidos.',
    highlights: [
      'Linha do tempo unificada com detecção automática de sobrecarga',
      'Temporizador Pomodoro integrado com bloqueio de distrações',
      'Captura rápida em linguagem natural via atalho global (Cmd/Ctrl + K)',
      'Armazenamento local-first em SQLite com exportação Markdown'
    ],
    screenshots: [
      {
        id: 'kr-1',
        title: 'Arquitetura de Blocos de Foco',
        caption: 'Visualize sua carga cognitiva diária com precisão.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-emerald-950 to-slate-900'
      },
      {
        id: 'kr-2',
        title: 'Métricas de Produtividade Semanal',
        caption: 'Relatórios claros sobre horas de trabalho profundo vs. reuniões.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-teal-950 to-zinc-900'
      }
    ],
    reviews: [
      {
        id: 'rev-kr-1',
        author: 'Lucas Albuquerque',
        role: 'Staff Software Engineer',
        rating: 5,
        date: '19 Nov 2026',
        version: '2.9.4',
        comment: 'Leve, instantâneo e não tenta empurrar recursos desnecessários. O modo local-first funciona perfeitamente em voos longos.'
      }
    ]
  },
  {
    id: 'folio-markdown',
    name: 'Folio Editorial Writer',
    tagline: 'Estúdio de escrita limpa em Markdown com tipografia de livro impresso',
    developer: 'Atelier Typographique',
    category: 'Produtividade',
    price: 24.90,
    rating: 4.7,
    reviewCount: 830,
    downloadsCount: '54 mil',
    iconBg: 'from-stone-700 to-neutral-900',
    iconAccent: '#E7E5E4',
    iconSymbol: 'FileText',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 6b86b273ff34fce19d6b804eff5a3f57',
      fileSize: '44.0 MB',
      version: '2.1.5',
      lastUpdated: '08 Nov 2026',
      platforms: ['Desktop', 'iOS', 'Web'],
      privacyScore: 'Arquivos .MD Puros no Disco',
      permissions: [
        {
          id: 'files-md',
          name: 'Acesso à Pasta de Documentos',
          description: 'Leitura e salvamento direto em pastas locais de texto.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Folio remove toda a poluição visual dos processadores de texto tradicionais para devolver o prazer da escrita profunda. Seus textos são salvos em arquivos Markdown universais, garantindo que seu conhecimento pertença a você para sempre.\n\nInclui motor de composição tipográfica para exportação direta em PDF com qualidade editorial, ePub para Kindle e HTML semântico.',
    highlights: [
      'Modo Foco Tipográfico que destaca apenas a sentença ou parágrafo atual',
      'Citações acadêmicas BibTeX, notas de rodapé e fórmulas LaTeX nativas',
      'Estatísticas de ritmo de leitura, coesão lexical e metas de palavras',
      'Exportação em 1 clique para PDF pronto para gráfica com hifenização correta'
    ],
    screenshots: [
      {
        id: 'fl-1',
        title: 'Ambiente de Escrita Sem Distrações',
        caption: 'Contraste calibrado para longas sessões de leitura e redação.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-stone-900 to-neutral-950'
      }
    ],
    reviews: [
      {
        id: 'rev-fl-1',
        author: 'Beatriz Helena',
        role: 'Autora & Jornalista',
        rating: 5,
        date: '11 Nov 2026',
        version: '2.1.5',
        comment: 'Escrevi meu último livro inteiro no Folio. A exportação para PDF já sai com margens e espaçamento dignos de editora.'
      }
    ]
  },
  {
    id: 'pulse-habit',
    name: 'Pulse Bio & Rituals',
    tagline: 'Rastreamento minimalista de hábitos, ciclo circadiano e foco metabólico',
    developer: 'Verve Health Studio',
    category: 'Produtividade',
    price: 14.90,
    rating: 4.6,
    reviewCount: 780,
    downloadsCount: '91 mil',
    iconBg: 'from-teal-600 to-cyan-900',
    iconAccent: '#2DD4BF',
    iconSymbol: 'Activity',
    heroImage: FINANCE_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 4e07408562bedb8b60ce05c1decfe3ad',
      fileSize: '31.2 MB',
      version: '3.0.2',
      lastUpdated: '05 Nov 2026',
      platforms: ['iOS', 'Android', 'Web'],
      privacyScore: 'Dados Biométricos Isolados Localmente',
      permissions: [
        {
          id: 'healthkit',
          name: 'Integração Opcional de Saúde',
          description: 'Leitura local de passos e horas de sono para correlação de energia.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Construa consistência sem a pressão tóxica de ofensivas punitivas. O Pulse utiliza uma média móvel de consistência de 30 dias e matrizes visuais limpas para mostrar sua evolução real em leitura, exercícios, hidratação e sono.',
    highlights: [
      'Índice de consistência elástica que não zera seu progresso por um dia de descanso',
      'Gráficos de correlação entre qualidade do sono e foco no trabalho',
      'Widgets nativos de resposta rápida e backup criptografado',
      'Pagamento único vitalício sem mensalidades'
    ],
    screenshots: [
      {
        id: 'pl-1',
        title: 'Painel de Consistência Anual',
        caption: 'Tendências claras de longo prazo com métricas tabulares.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-cyan-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-pl-1',
        author: 'Juliana Paiva',
        role: 'Médica Esportiva',
        rating: 5,
        date: '09 Nov 2026',
        version: '3.0.2',
        comment: 'Recomendo aos meus pacientes pela abordagem saudável de consistência e pela privacidade impecável dos dados de saúde.'
      }
    ]
  },
  {
    id: 'zenith-notes-free',
    name: 'Zenith Quick Capture',
    tagline: 'Bloco de notas instantâneo com cartões de ideias, tags e busca milimétrica',
    developer: 'Nordic Craft Software',
    category: 'Produtividade',
    price: 0,
    rating: 4.8,
    reviewCount: 1540,
    downloadsCount: '230 mil',
    iconBg: 'from-sky-600 to-blue-900',
    iconAccent: '#38BDF8',
    iconSymbol: 'FileText',
    heroImage: DESIGN_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 9c1185a5c5e9fc54612808977ee8f548',
      fileSize: '19.8 MB',
      version: '1.8.0',
      lastUpdated: '22 Nov 2026',
      platforms: ['Web', 'Desktop', 'iOS', 'Android'],
      privacyScore: 'Armazenamento Local Criptografado',
      permissions: [
        {
          id: 'local-notes',
          name: 'Persistência Local IndexedDB',
          description: 'Guarda suas notas rápidas instantaneamente sem depender de internet.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Capture insights, trechos de código, lembretes de reunião e referências em menos de um segundo. O Zenith Quick Capture organiza seus pensamentos em cartões enxutos categorizados por prioridade e permite filtragem instantânea.',
    highlights: [
      'Abertura instantânea com salvamento automático a cada tecla',
      'Organização por categorias rápidas (Ideia, Reunião, Código, Urgente)',
      'Busca em tempo real sobre milhares de notas locais',
      '100% gratuito e sem limite de cartões'
    ],
    screenshots: [
      {
        id: 'zn-1',
        title: 'Mural de Captura Rápida',
        caption: 'Seus insights organizados e sempre acessíveis.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-sky-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-zn-1',
        author: 'Renato Azevedo',
        role: 'Product Manager',
        rating: 5,
        date: '23 Nov 2026',
        version: '1.8.0',
        comment: 'Simples, direto ao ponto e muito rápido para anotar decisões durante calls.'
      }
    ]
  },
  {
    id: 'synapse-kanban-pro',
    name: 'Synapse Kanban Executive',
    tagline: 'Quadros de fluxo de trabalho com limites WIP e métricas de vazão para líderes',
    developer: 'Aether Productivity Works',
    category: 'Produtividade',
    price: 29.90,
    rating: 4.9,
    reviewCount: 690,
    downloadsCount: '47 mil',
    iconBg: 'from-indigo-600 to-blue-950',
    iconAccent: '#818CF8',
    iconSymbol: 'Layers',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 5f4dcc3b5aa765d61d8327deb882cf99',
      fileSize: '52.0 MB',
      version: '3.4.1',
      lastUpdated: '20 Nov 2026',
      platforms: ['Desktop', 'Web'],
      privacyScore: 'Zero Rastreadores Externos',
      permissions: [
        {
          id: 'storage-kanban',
          name: 'Armazenamento de Quadros de Projeto',
          description: 'Gravação local de colunas, tarefas e histórico de cycle time.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Projetado para engenheiros, arquitetos e gestores que detestam ferramentas lentas e burocráticas. O Synapse Kanban permite gerenciar colunas de Backlog, Em Execução e Concluído com controle rigoroso de Work-In-Progress (WIP) e cálculo automático de eficiência.',
    highlights: [
      'Quadros ágeis com movimentação instantânea entre estágios',
      'Alerta visual de gargalo quando o limite WIP da coluna é excedido',
      'Classificação por impacto estratégico e esforço estimado',
      'Licença vitalícia sem cobrança por assento'
    ],
    screenshots: [
      {
        id: 'sy-1',
        title: 'Controle de Fluxo e Limites WIP',
        caption: 'Identifique gargalos operacionais antes que atrasem a entrega.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-indigo-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-sy-1',
        author: 'Fernanda Martins',
        role: 'Engineering Manager',
        rating: 5,
        date: '21 Nov 2026',
        version: '3.4.1',
        comment: 'A velocidade de resposta e o foco em limites WIP mudaram nossa reunião diária.'
      }
    ]
  },

  // ==========================================
  // FINANÇAS (4 Apps: 2 Original + 1 Free + 1 Paid)
  // ==========================================
  {
    id: 'aurum-wealth',
    name: 'Aurum Ledger Pro',
    tagline: 'Gestão patrimonial multicarteira, renda variável e câmbio em tempo real',
    developer: 'Helvetia Financial Systems',
    category: 'Finanças',
    price: 39.90,
    rating: 4.9,
    reviewCount: 940,
    downloadsCount: '62 mil',
    iconBg: 'from-amber-600 to-stone-800',
    iconAccent: '#FBBF24',
    iconSymbol: 'TrendingUp',
    heroImage: FINANCE_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: e3b0c44298fc1c149afbf4c8996fb924',
      fileSize: '64.2 MB',
      version: '5.1.0',
      lastUpdated: '15 Nov 2026',
      platforms: ['Desktop', 'iOS', 'Web'],
      privacyScore: 'Cofre Local AES-256 (Sem Nuvem)',
      permissions: [
        {
          id: 'network-quotes',
          name: 'Consulta de Cotações Financeiras',
          description: 'Busca anônima de preços de ativos B3, NYSE, Nasdaq e moedas.',
          criticality: 'Essencial'
        },
        {
          id: 'biometrics',
          name: 'Autenticação Biométrica (TouchID / FaceID)',
          description: 'Desbloqueio seguro do cofre contábil local.',
          criticality: 'Moderada'
        }
      ]
    },
    description:
      'Inspirado nos terminais de private banking suíços, o Aurum Ledger Pro oferece controle absoluto sobre seu patrimônio líquido sem nunca enviar suas credenciais bancárias para servidores externos. Importe notas de corretagem em PDF ou OFX com processamento 100% local.\n\nAcompanhe alocação de ativos, dividendos projetados, rebalanceamento automático de carteira e apuração de impostos com precisão contábil.',
    highlights: [
      'Painel consolidado multimercado (BRL, USD, EUR, CHF) com conversão histórica',
      'Simulador de independência financeira com projeção de inflação e juros reais',
      'Leitor local de notas de corretagem (B3 e corretoras internacionais)',
      'Auditoria de risco e exposição cambial instantânea'
    ],
    screenshots: [
      {
        id: 'au-1',
        title: 'Visão Patrimonial e Alocação de Ativos',
        caption: 'Gráficos de performance YTD comparados contra benchmarks globais.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-stone-900 to-amber-950'
      },
      {
        id: 'au-2',
        title: 'Workspace de Precisão Técnica',
        caption: 'Layout modular para análise detalhada de fluxo de caixa.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-zinc-900 to-stone-900'
      }
    ],
    reviews: [
      {
        id: 'rev-au-1',
        author: 'Henrique Meirelles Filho',
        role: 'Consultor de Investimentos CEA',
        rating: 5,
        date: '16 Nov 2026',
        version: '5.1.0',
        comment: 'Finalmente um software financeiro que respeita a privacidade do investidor. Os dados ficam criptografados na minha máquina e a tipografia é impecável.'
      }
    ]
  },
  {
    id: 'quota-split',
    name: 'Quota Split & Viagens',
    tagline: 'Divisão instantânea de despesas em grupo e liquidação multimoeda offline',
    developer: 'Meridian Apps',
    category: 'Finanças',
    price: 0,
    rating: 4.7,
    reviewCount: 1940,
    downloadsCount: '280 mil',
    iconBg: 'from-cyan-700 to-blue-950',
    iconAccent: '#38BDF8',
    iconSymbol: 'Wallet',
    heroImage: FINANCE_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 4b227777d4dd1fc61c6f884f48641d09',
      fileSize: '22.4 MB',
      version: '2.4.1',
      lastUpdated: '17 Nov 2026',
      platforms: ['iOS', 'Android', 'Web'],
      privacyScore: 'Sem Cadastro Obrigatório',
      permissions: [
        {
          id: 'camera-receipt',
          name: 'Câmera (Apenas ao Escanear Recibos)',
          description: 'Utilizada exclusivamente quando você opta por digitalizar uma nota fiscal.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Organize contas de viagens, jantares e projetos compartilhados sem exigir que seus amigos criem contas ou assistam a anúncios. O algoritmo de simplificação de dívidas do Quota reduz dezenas de transações cruzadas ao menor número possível de transferências PIX.',
    highlights: [
      'Algoritmo de liquidação mínima de transferências com chave PIX integrada',
      'Suporte offline a 45 moedas para viagens internacionais',
      'Compartilhamento de resumo auditável via link web somente-leitura',
      '100% gratuito e sem limites de lançamentos diários'
    ],
    screenshots: [
      {
        id: 'qt-1',
        title: 'Balanço Multimoeda e Liquidação',
        caption: 'Transparência total para grupos e despesas de viagem.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-blue-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-qt-1',
        author: 'Pedro Henrique',
        role: 'Engenheiro Civil',
        rating: 5,
        date: '18 Nov 2026',
        version: '2.4.1',
        comment: 'Salvou nossa viagem em 6 pessoas pela América do Sul. Funciona sem internet na estrada e calcula tudo na hora.'
      }
    ]
  },
  {
    id: 'fluxo-zero-free',
    name: 'FluxoZero Envelope Budget',
    tagline: 'Orçamento base-zero por envelopes mensais e controle de gastos essenciais',
    developer: 'Meridian Apps',
    category: 'Finanças',
    price: 0,
    rating: 4.8,
    reviewCount: 1620,
    downloadsCount: '215 mil',
    iconBg: 'from-emerald-700 to-green-950',
    iconAccent: '#4ADE80',
    iconSymbol: 'Wallet',
    heroImage: FINANCE_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 3c59dc048e8850243be8079a5c74d079',
      fileSize: '17.6 MB',
      version: '2.1.0',
      lastUpdated: '21 Nov 2026',
      platforms: ['Web', 'iOS', 'Android', 'Desktop'],
      privacyScore: '100% Local (Sem Vínculo Bancário)',
      permissions: [
        {
          id: 'local-budget',
          name: 'Armazenamento Local de Orçamento',
          description: 'Guarda seus envelopes e lançamentos no próprio dispositivo.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Dê uma missão para cada real recebido antes do mês começar. O método de envelopes do FluxoZero permite distribuir sua renda líquida entre Moradia, Alimentação, Reserva e Lazer, exibindo em tempo real o saldo disponível em cada envelope.',
    highlights: [
      'Alocação visual por envelopes com barras de consumo em tempo real',
      'Indicador instantâneo de saldo livre para alocar (Orçamento Base-Zero)',
      'Simulação rápida de corte de gastos supérfluos',
      'Totalmente gratuito e livre de anúncios'
    ],
    screenshots: [
      {
        id: 'fz-1',
        title: 'Painel de Envelopes Base-Zero',
        caption: 'Controle absoluto sobre cada categoria do orçamento doméstico.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-emerald-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-fz-1',
        author: 'Mariana Costa',
        role: 'Educadora Financeira',
        rating: 5,
        date: '22 Nov 2026',
        version: '2.1.0',
        comment: 'A maneira mais didática e limpa de aplicar o método de envelopes digitais sem pagar mensalidade.'
      }
    ]
  },
  {
    id: 'yield-quant-pro',
    name: 'YieldQuant FIIs & Dividendos',
    tagline: 'Simulador de renda passiva isenta, efeito bola de neve e preço-teto Bazin/Graham',
    developer: 'Helvetia Financial Systems',
    category: 'Finanças',
    price: 32.90,
    rating: 4.9,
    reviewCount: 810,
    downloadsCount: '58 mil',
    iconBg: 'from-yellow-600 to-amber-950',
    iconAccent: '#FACC15',
    iconSymbol: 'TrendingUp',
    heroImage: FINANCE_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: b6d767d2f8ed5d21a44b0e5886680cb9',
      fileSize: '45.0 MB',
      version: '3.2.0',
      lastUpdated: '20 Nov 2026',
      platforms: ['Desktop', 'Web', 'iOS'],
      privacyScore: 'Cálculos Isolados Localmente',
      permissions: [
        {
          id: 'export-csv-yield',
          name: 'Exportação de Planilhas de Proventos',
          description: 'Geração de relatórios anuais de dividendos e juros compostos.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Construa sua liberdade financeira com matemática previdenciária séria. O YieldQuant projeta o crescimento exponencial da sua carteira de Fundos Imobiliários e Ações Pagadoras de Dividendos considerando o reinvestimento mensal automático dos proventos.',
    highlights: [
      'Calculadora interativa de efeito bola de neve (reinvestimento de dividendos)',
      'Cálculo automático de Preço-Teto por Décio Bazin (Yield mínimo 6%) e Fórmula de Graham',
      'Simulação do marco onde os dividendos pagam 100% do seu custo de vida',
      'Tabelas comparativas com numerais tabulares de alta precisão'
    ],
    screenshots: [
      {
        id: 'yq-1',
        title: 'Curva de Renda Passiva e Bola de Neve',
        caption: 'Visualize exatamente em qual ano seus proventos superam seus aportes.',
        imageUrl: FINANCE_IMG,
        aspectColor: 'from-amber-950 to-stone-900'
      }
    ],
    reviews: [
      {
        id: 'rev-yq-1',
        author: 'Eduardo Tavares',
        role: 'Analista CNPI',
        rating: 5,
        date: '22 Nov 2026',
        version: '3.2.0',
        comment: 'A calculadora de Preço-Teto Bazin combinada com o simulador de bola de neve é viciante e extremamente precisa.'
      }
    ]
  },

  // ==========================================
  // JOGOS (4 Apps: 2 Original + 1 Free + 1 Paid)
  // ==========================================
  {
    id: 'aetheria-odyssey',
    name: 'Chronicles of Aetheria',
    tagline: 'Estratégia tática e construção de cidades flutuantes acima das nuvens',
    developer: 'Solstice Interactive',
    category: 'Jogos',
    price: 29.90,
    rating: 4.9,
    reviewCount: 4820,
    downloadsCount: '295 mil',
    iconBg: 'from-orange-600 to-rose-900',
    iconAccent: '#FB923C',
    iconSymbol: 'Compass',
    heroImage: GAME_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 7d865e959b2466918c9863afca942d0f',
      fileSize: '1.84 GB',
      version: '1.6.2',
      lastUpdated: '22 Nov 2026',
      platforms: ['Desktop', 'iOS', 'Android'],
      privacyScore: 'Offline Single-Player (Zero Microtransações)',
      permissions: [
        {
          id: 'storage-game',
          name: 'Armazenamento de Saves Locais',
          description: 'Gravação de progresso de campanha e mapas customizados.',
          criticality: 'Essencial'
        },
        {
          id: 'audio',
          name: 'Áudio Espacial 3D',
          description: 'Saída de trilha sonora orquestral adaptativa.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Em Chronicles of Aetheria, você lidera uma guilda de arquitetos e navegadores celestes encarregados de reconstruir santuários suspensos sobre um mar de nuvens eternas. Equilibre a física estrutural das pontes, colete prismas solares e proteja suas rotas comerciais de tempestades etéreas.\n\nUma experiência premium completa: sem anúncios, sem barras de energia e sem compras dentro do aplicativo.',
    highlights: [
      'Campanha narrativa de 35 horas com 18 arquipélagos celestes feitos à mão',
      'Sistema de engenharia arquitetônica com física de equilíbrio real',
      'Trilha sonora acústica dinâmica que reage à hora do dia e clima',
      'Modo Criativo (Sandbox) e editor completo de ilhas para a comunidade'
    ],
    screenshots: [
      {
        id: 'ae-1',
        title: 'Santuário da Cúpula de Esmeralda',
        caption: 'Construa monumentos verticais ao pôr do sol e gerencie rotas de dirigíveis.',
        imageUrl: GAME_IMG,
        aspectColor: 'from-amber-900 to-teal-950'
      },
      {
        id: 'ae-2',
        title: 'Modo de Projeto Arquitetônico',
        caption: 'Planeje estruturas com visão em corte antes de investir recursos.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-slate-900 to-amber-950'
      }
    ],
    reviews: [
      {
        id: 'rev-ae-1',
        author: 'Camila Rocha',
        role: 'Arquiteta & Gamer',
        rating: 5,
        date: '23 Nov 2026',
        version: '1.6.2',
        comment: 'Uma obra de arte relaxante e intelectualmente estimulante. A direção de arte ao entardecer e a mecânica de equilíbrio das ilhas são geniais.'
      }
    ]
  },
  {
    id: 'orbital-synth',
    name: 'Orbital Chess & Tactics',
    tagline: 'Quebra-cabeças táticos de gravidade orbital e xadrez minimalista',
    developer: 'Apogee Play',
    category: 'Jogos',
    price: 12.90,
    rating: 4.8,
    reviewCount: 1120,
    downloadsCount: '78 mil',
    iconBg: 'from-indigo-700 to-slate-950',
    iconAccent: '#818CF8',
    iconSymbol: 'Cpu',
    heroImage: GAME_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: c9f0f895fb98ab9159f51fd0297e236d',
      fileSize: '195.0 MB',
      version: '1.3.0',
      lastUpdated: '14 Nov 2026',
      platforms: ['iOS', 'Android', 'Web', 'Desktop'],
      privacyScore: 'Sem Rastreamento Publicitário',
      permissions: [
        {
          id: 'cloud-save-opt',
          name: 'Sincronização de Progresso',
          description: 'Mantém seus desafios concluídos sincronizados entre dispositivos.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'E se cada peça do tabuleiro possuísse massa gravitacional capaz de curvar a trajetória das peças adversárias? Orbital Chess reinventa o jogo de estratégia abstrata com 180 desafios artesanais, motor contra IA adaptativa e partidas assíncronas.',
    highlights: [
      '180 puzzles táticos graduais com mecânica de órbita e bloqueio',
      'Motor de IA local calibrado para ensinar conceitos posicionais',
      'Modo Zen sem cronômetro com estética sonora ambiente',
      'Suporte a 120Hz em telas ProMotion e Desktop'
    ],
    screenshots: [
      {
        id: 'or-1',
        title: 'Tabuleiro Tático e Gravidade',
        caption: 'Planeje movimentos combinando vetores e tática clássica.',
        imageUrl: GAME_IMG,
        aspectColor: 'from-indigo-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-or-1',
        author: 'Fernando Luz',
        role: 'Mestre FIDE & Professor',
        rating: 5,
        date: '17 Nov 2026',
        version: '1.3.0',
        comment: 'Surpreendentemente profundo! A mecânica orbital cria garfos e cravadas geométricas que desafiam até jogadores experientes.'
      }
    ]
  },
  {
    id: 'hexa-logic-free',
    name: 'HexaLogic Quantum Grid',
    tagline: 'Desafio diário de matrizes luminosas e dedução lógica estilo Lights Out',
    developer: 'Apogee Play',
    category: 'Jogos',
    price: 0,
    rating: 4.8,
    reviewCount: 2890,
    downloadsCount: '390 mil',
    iconBg: 'from-teal-600 to-emerald-950',
    iconAccent: '#2DD4BF',
    iconSymbol: 'Box',
    heroImage: GAME_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 6512bd43d9caa6e02c990b0a82652dca',
      fileSize: '28.0 MB',
      version: '2.2.0',
      lastUpdated: '21 Nov 2026',
      platforms: ['Web', 'iOS', 'Android', 'Desktop'],
      privacyScore: '100% Gratuito & Sem Anúncios',
      permissions: [
        {
          id: 'local-save-hexa',
          name: 'Progresso Local de Puzzles',
          description: 'Armazena seu recorde de movimentos e sementes resolvidas.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Exercite seu raciocínio espacial em uma matriz quântica interconectada. Cada clique inverte o estado energético da célula escolhida e de suas vizinhas ortogonais. Sincronize toda a grade no estado ativo com o menor número possível de movimentos.',
    highlights: [
      'Gerador infinito de tabuleiros matematicamente solucionáveis',
      'Contador de eficiência de movimentos e cronômetro de precisão',
      'Visual relaxante com feedback imediato e zero distrações',
      'Totalmente gratuito para jogar no navegador ou desktop'
    ],
    screenshots: [
      {
        id: 'hx-1',
        title: 'Matriz Quântica de Dedução',
        caption: 'Sincronize todos os núcleos luminosos usando lógica pura.',
        imageUrl: GAME_IMG,
        aspectColor: 'from-teal-950 to-slate-900'
      }
    ],
    reviews: [
      {
        id: 'rev-hx-1',
        author: 'Igor Cavalcanti',
        role: 'Matemático',
        rating: 5,
        date: '22 Nov 2026',
        version: '2.2.0',
        comment: 'Meu ritual matinal junto com o café. Limpo, inteligente e sem propagandas irritantes.'
      }
    ]
  },
  {
    id: 'cyber-circuit-defense',
    name: 'Neon Circuit: Protocol Defense',
    tagline: 'Defesa tática de nós de rede, roteamento de energia e contenção de intrusão',
    developer: 'Solstice Interactive',
    category: 'Jogos',
    price: 22.90,
    rating: 4.9,
    reviewCount: 1310,
    downloadsCount: '112 mil',
    iconBg: 'from-blue-700 to-slate-950',
    iconAccent: '#60A5FA',
    iconSymbol: 'Cpu',
    heroImage: GAME_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: c20ad4d76fe97759aa27a0c99bff6710',
      fileSize: '420.5 MB',
      version: '1.4.5',
      lastUpdated: '23 Nov 2026',
      platforms: ['Desktop', 'Web', 'iOS'],
      privacyScore: 'Jogo Completo Sem DLCs Ocultos',
      permissions: [
        {
          id: 'save-circuit',
          name: 'Gravação de Campanhas Táticas',
          description: 'Salva configurações de torres e recordes de ondas.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Assuma o comando da defesa cibernética de um núcleo de dados orbital. Posicione sentinelas de pulso, firewalls refratores e condensadores de energia em uma grade tática para neutralizar ondas crescentes de pacotes hostis em tempo real.',
    highlights: [
      'Simulação tática interativa com 3 classes de torres modulares',
      'Gestão dinâmica de orçamento de energia (Watts) durante o combate',
      'Ondas progressivas com estatísticas de integridade do núcleo',
      'Execução nativa instantânea direto da sua biblioteca'
    ],
    screenshots: [
      {
        id: 'nc-1',
        title: 'Grade Tática de Contenção',
        caption: 'Posicione sentinelas e gerencie a malha energética sob pressão.',
        imageUrl: GAME_IMG,
        aspectColor: 'from-blue-950 to-slate-950'
      }
    ],
    reviews: [
      {
        id: 'rev-nc-1',
        author: 'Victor Hugo',
        role: 'Game Designer',
        rating: 5,
        date: '23 Nov 2026',
        version: '1.4.5',
        comment: 'Balanço perfeito entre estratégia rápida e gerenciamento de recursos.'
      }
    ]
  },

  // ==========================================
  // UTILITÁRIOS (4 Apps: 2 Original + 1 Free + 1 Paid)
  // ==========================================
  {
    id: 'aegis-guard',
    name: 'Aegis Firewall & Monitor',
    tagline: 'Inspeção de pacotes de rede em tempo real e bloqueio de conexões ocultas',
    developer: 'Bastion Security Collective',
    category: 'Utilitários',
    price: 19.90,
    rating: 4.8,
    reviewCount: 1650,
    downloadsCount: '128 mil',
    iconBg: 'from-slate-700 to-zinc-900',
    iconAccent: '#38BDF8',
    iconSymbol: 'ShieldCheck',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 2c26b46b68ffc68ff99b453c1d304134',
      fileSize: '29.1 MB',
      version: '3.4.0',
      lastUpdated: '10 Nov 2026',
      platforms: ['Desktop', 'Android'],
      privacyScore: 'Auditado Independentemente (Código Aberto)',
      permissions: [
        {
          id: 'network-filter',
          name: 'Extensão de Filtro de Rede Local',
          description: 'Intercepta chamadas de saída para permitir ou bloquear domínios por app.',
          criticality: 'Essencial'
        },
        {
          id: 'notifications-sec',
          name: 'Alertas de Conexão Suspeita',
          description: 'Notifica imediatamente quando um binário tenta acessar um novo servidor.',
          criticality: 'Moderada'
        }
      ]
    },
    description:
      'Saiba exatamente quais aplicativos estão enviando dados do seu computador ou smartphone em segundo plano. O Aegis exibe um mapa claro de todas as conexões ativas, país de destino, processo responsável e volume de bytes transferidos.\n\nCom um único clique, crie regras permanentes para silenciar rastreadores, telemetria indesejada e servidores de anúncios ao nível do sistema operacional.',
    highlights: [
      'Alerta interativo instantâneo para qualquer nova tentativa de conexão',
      'Listas de bloqueio DNS integradas contra rastreadores e malwares',
      'Consumo de RAM inferior a 35 MB graças ao motor escrito em Rust',
      'Exportação de logs PCAP e relatórios de auditoria de privacidade'
    ],
    screenshots: [
      {
        id: 'ag-1',
        title: 'Inspeção de Fluxo e Processos',
        caption: 'Auditoria granular de cada requisição realizada pelo sistema.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-slate-900 to-zinc-950'
      }
    ],
    reviews: [
      {
        id: 'rev-ag-1',
        author: 'Daniel Costa',
        role: 'Analista de Cibersegurança',
        rating: 5,
        date: '12 Nov 2026',
        version: '3.4.0',
        comment: 'Indispensável. Descobri três utilitários antigos que faziam ping para servidores externos a cada 5 minutos e bloqueei todos em segundos.'
      }
    ]
  },
  {
    id: 'Monolith-Archive',
    name: 'Monolith Archiver XT',
    tagline: 'Compressão ultrarrápida Zstandard, verificação de hash e montagem de ISOs',
    developer: 'Ironclad Systems',
    category: 'Utilitários',
    price: 0,
    rating: 4.9,
    reviewCount: 2610,
    downloadsCount: '510 mil',
    iconBg: 'from-zinc-700 to-neutral-950',
    iconAccent: '#A1A1AA',
    iconSymbol: 'Archive',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: 8f14e45fceea167a5a36dedd4bea2543',
      fileSize: '14.2 MB',
      version: '4.0.8',
      lastUpdated: '12 Nov 2026',
      platforms: ['Desktop'],
      privacyScore: '100% Offline (Zero Acesso à Rede)',
      permissions: [
        {
          id: 'fs-archive',
          name: 'Acesso a Arquivos Selecionados',
          description: 'Compactação e extração apenas nas pastas escolhidas pelo usuário.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Um utilitário de arquivamento moderno, nativo e livre de bloatware. Utiliza multithreading completo para compactar e extrair arquivos .ZST, .7Z, .TAR.GZ, .ZIP e .RAR até 4x mais rápido que ferramentas legadas, além de verificar assinaturas SHA-256 automaticamente.',
    highlights: [
      'Pré-visualização instantânea do conteúdo do arquivo sem extrair para o disco',
      'Criptografia AES-256 com proteção dos nomes de arquivos no cabeçalho',
      'Verificador integrado de checksums (SHA-256, SHA-512, BLAKE3)',
      'Zero permissão de rede: seus arquivos nunca saem da máquina'
    ],
    screenshots: [
      {
        id: 'mn-1',
        title: 'Inspeção de Pacotes e Hash BLAKE3',
        caption: 'Verificação instantânea de integridade antes da extração.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-zinc-900 to-black'
      }
    ],
    reviews: [
      {
        id: 'rev-mn-1',
        author: 'Gustavo Silveira',
        role: 'DevOps Lead',
        rating: 5,
        date: '15 Nov 2026',
        version: '4.0.8',
        comment: 'O suporte nativo a Zstandard e a verificação automática de SHA-256 tornam o Monolith obrigatório em qualquer estação de trabalho.'
      }
    ]
  },
  {
    id: 'cipher-vault-free',
    name: 'CipherPass Generator & Entropy',
    tagline: 'Gerador criptográfico de senhas, passphrases Diceware e auditoria de entropia',
    developer: 'Bastion Security Collective',
    category: 'Utilitários',
    price: 0,
    rating: 4.9,
    reviewCount: 2180,
    downloadsCount: '340 mil',
    iconBg: 'from-slate-600 to-slate-900',
    iconAccent: '#94A3B8',
    iconSymbol: 'ShieldCheck',
    heroImage: HERO_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: c51ce410c124a10e0db5e4b97fc2af39',
      fileSize: '9.8 MB',
      version: '2.5.0',
      lastUpdated: '22 Nov 2026',
      platforms: ['Web', 'Desktop', 'iOS', 'Android'],
      privacyScore: 'WebCrypto CSPRNG Offline',
      permissions: [
        {
          id: 'crypto-rng',
          name: 'Gerador de Números Aleatórios de Hardware',
          description: 'Utiliza a entropia do sistema operacional para gerar chaves imprevisíveis.',
          criticality: 'Essencial'
        }
      ]
    },
    description:
      'Gere credenciais matematicamente invioláveis utilizando o gerador criptográfico nativo do seu dispositivo. O CipherPass calcula em tempo real os bits de entropia (Shannon/Combinatória) e estima o tempo necessário para um ataque de força bruta moderno.',
    highlights: [
      'Geração CSPRNG com controle granular de comprimento e símbolos',
      'Medidor real de entropia em bits e resistência contra clusters GPU',
      'Gerador de chaves de API hexadecimais e tokens Base64',
      '100% gratuito, código auditado e execução offline'
    ],
    screenshots: [
      {
        id: 'cp-1',
        title: 'Laboratório de Entropia Criptográfica',
        caption: 'Audite a força real de qualquer credencial em milissegundos.',
        imageUrl: HERO_IMG,
        aspectColor: 'from-slate-900 to-zinc-950'
      }
    ],
    reviews: [
      {
        id: 'rev-cp-1',
        author: 'Marcelo Viana',
        role: 'Pentester OSCP',
        rating: 5,
        date: '23 Nov 2026',
        version: '2.5.0',
        comment: 'Excelente para gerar chaves de serviço e explicar entropia real para equipes de desenvolvimento.'
      }
    ]
  },
  {
    id: 'regex-studio-pro',
    name: 'Regex & JSON Schema Inspector',
    tagline: 'Depuração em tempo real de expressões regulares, grupos de captura e payloads JSON',
    developer: 'Ironclad Systems',
    category: 'Utilitários',
    price: 16.90,
    rating: 4.9,
    reviewCount: 920,
    downloadsCount: '69 mil',
    iconBg: 'from-amber-700 to-neutral-950',
    iconAccent: '#F59E0B',
    iconSymbol: 'Cpu',
    heroImage: DESIGN_IMG,
    verification: {
      verified: true,
      signatureHash: 'SHA256: aab3238922bcc25a6f606eb525ffdc56',
      fileSize: '24.6 MB',
      version: '3.0.1',
      lastUpdated: '19 Nov 2026',
      platforms: ['Desktop', 'Web'],
      privacyScore: 'Dados de Teste Nunca Saem da Máquina',
      permissions: [
        {
          id: 'local-snippets',
          name: 'Biblioteca Local de Padrões',
          description: 'Armazena suas expressões regulares e payloads de teste favoritos.',
          criticality: 'Baixa'
        }
      ]
    },
    description:
      'Pare de colar logs confidenciais de produção em sites públicos na internet para testar expressões regulares ou formatar JSON. O Regex & JSON Schema Inspector executa localmente com destaque instantâneo de capturas, validação e biblioteca de padrões prontos (CPF, CNPJ, E-mail, IPv6, JWT).',
    highlights: [
      'Avaliação em tempo real de Regex com contagem e destaque de matches',
      'Presets prontos em 1 clique para validação de documentos brasileiros e logs',
      'Formatador, minificador e validador sintático de payloads JSON',
      'Ambiente 100% privado para dados sensíveis de engenharia'
    ],
    screenshots: [
      {
        id: 'rx-1',
        title: 'Inspetor de Grupos de Captura e JSON',
        caption: 'Teste expressões complexas com segurança e feedback instantâneo.',
        imageUrl: DESIGN_IMG,
        aspectColor: 'from-neutral-900 to-amber-950'
      }
    ],
    reviews: [
      {
        id: 'rev-rx-1',
        author: 'Bruno Magalhães',
        role: 'Backend Architect',
        rating: 5,
        date: '21 Nov 2026',
        version: '3.0.1',
        comment: 'Por compliance não podemos usar testadores online de regex com logs reais. Essa ferramenta local resolveu nosso problema com maestria.'
      }
    ]
  }
];

export const CATEGORIES: { id: 'Todos' | StoreApp['category']; label: string }[] = [
  { id: 'Todos', label: 'Todas as Categorias' },
  { id: 'Produtividade', label: 'Produtividade' },
  { id: 'Design', label: 'Design' },
  { id: 'Finanças', label: 'Finanças' },
  { id: 'Jogos', label: 'Jogos' },
  { id: 'Utilitários', label: 'Utilitários' }
];
