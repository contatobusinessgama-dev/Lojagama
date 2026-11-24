import { StoreApp } from '../types';

const HERO_IMG = '/src/assets/images/featured_app_aether_studio_1795560818381.jpg';
const DESIGN_IMG = '/src/assets/images/screenshot_design_canvas_1795560816939.jpg';
const FINANCE_IMG = '/src/assets/images/screenshot_finance_ledger_1795560818864.jpg';
const GAME_IMG = '/src/assets/images/screenshot_game_odyssey_1795560818892.jpg';

export const STORE_APPS: StoreApp[] = [
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
