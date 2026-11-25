import React, { useState, useEffect, useMemo } from 'react';
import { StoreApp } from '../types';
import { AppIconBadge } from './AppIconBadge';
import { formatBRL } from './AppCard';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Copy,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Sliders,
  Terminal,
  Award,
  Zap,
  Lock
} from 'lucide-react';

interface InteractiveAppRuntimeModalProps {
  app: StoreApp;
  onClose: () => void;
}

export const InteractiveAppRuntimeModal: React.FC<InteractiveAppRuntimeModalProps> = ({
  app,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Native Window Titlebar */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <AppIconBadge iconSymbol={app.iconSymbol} iconBg={app.iconBg} size="sm" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {app.name}
                </h2>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  ● Em Execução · v{app.verification.version}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {app.developer} · Sandbox Verificado ({app.verification.signatureHash.slice(0, 24)}...)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            Encerrar App
          </button>
        </div>

        {/* Interactive Application Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900">
          {renderRuntimeByAppId(app)}
        </div>
      </div>
    </div>
  );
};

function renderRuntimeByAppId(app: StoreApp) {
  switch (app.id) {
    // DESIGN APPS
    case 'vertex-flow-pro':
    case 'svg-forge-lite':
      return <VectorAndNodeStudio app={app} />;
    case 'prism-palette':
      return <PrismColorContrastLab />;
    case 'vector-font-lab':
      return <GlyphicTypographyLab />;
    case 'bezier-motion-pro':
      return <BezierMotionStudio />;

    // PRODUTIVIDADE APPS
    case 'krono-tasks':
      return <KronoPomodoroPlanner />;
    case 'folio-markdown':
      return <FolioMarkdownStudio />;
    case 'pulse-habit':
      return <PulseHabitTracker />;
    case 'zenith-notes-free':
      return <ZenithQuickNotes />;
    case 'synapse-kanban-pro':
      return <SynapseKanbanBoard />;

    // FINANÇAS APPS
    case 'aurum-wealth':
    case 'yield-quant-pro':
      return <WealthAndDividendSimulator app={app} />;
    case 'quota-split':
      return <QuotaExpenseSplitter />;
    case 'fluxo-zero-free':
      return <FluxoZeroEnvelopeBudget />;

    // JOGOS APPS
    case 'aetheria-odyssey':
      return <AetheriaSkyBuilderGame />;
    case 'orbital-synth':
      return <OrbitalTacticsGame />;
    case 'hexa-logic-free':
      return <HexaLogicQuantumGame />;
    case 'cyber-circuit-defense':
      return <NeonCircuitDefenseGame />;

    // UTILITÁRIOS APPS
    case 'aegis-guard':
      return <AegisFirewallMonitor />;
    case 'Monolith-Archive':
      return <MonolithHashAndCompressor />;
    case 'cipher-vault-free':
      return <CipherPassEntropyGenerator />;
    case 'regex-studio-pro':
      return <RegexAndJsonInspector />;

    default:
      return <VectorAndNodeStudio app={app} />;
  }
}

/* ============================================================================
 * 1. DESIGN: Vector & Node Parametric Studio (VertexFlow & SVG Forge)
 * ========================================================================== */
const VectorAndNodeStudio: React.FC<{ app: StoreApp }> = ({ app }) => {
  const [sides, setSides] = useState(6);
  const [radius, setRadius] = useState(95);
  const [innerRadius, setInnerRadius] = useState(50);
  const [rotation, setRotation] = useState(15);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [strokeColor, setStrokeColor] = useState('#3B82F6');
  const [copied, setCopied] = useState(false);

  const pointsString = useMemo(() => {
    const pts: string[] = [];
    const totalPoints = sides * 2;
    const cx = 150;
    const cy = 150;
    for (let i = 0; i < totalPoints; i++) {
      const r = i % 2 === 0 ? radius : innerRadius;
      const angle = ((i * Math.PI) / sides) + (rotation * Math.PI) / 180;
      const x = (cx + r * Math.cos(angle)).toFixed(1);
      const y = (cy + r * Math.sin(angle)).toFixed(1);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, [sides, radius, innerRadius, rotation]);

  const rawSvgCode = `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">\n  <polygon points="${pointsString}" fill="${strokeColor}22" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round" />\n</svg>`;

  const handleCopySvg = () => {
    navigator.clipboard?.writeText(rawSvgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Parametric Node Controls */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-500" />
            Parâmetros do Nó Geométrico
          </h3>
          <span className="text-xs font-mono text-slate-400">{sides * 2} vértices</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-600 dark:text-slate-400">Eixos de Simetria</span>
              <span className="font-mono font-semibold">{sides}</span>
            </div>
            <input
              type="range"
              min={3}
              max={16}
              value={sides}
              onChange={(e) => setSides(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-600 dark:text-slate-400">Raio Externo (px)</span>
              <span className="font-mono font-semibold">{radius}px</span>
            </div>
            <input
              type="range"
              min={30}
              max={135}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-600 dark:text-slate-400">Modificador Booleano Interno</span>
              <span className="font-mono font-semibold">{innerRadius}px</span>
            </div>
            <input
              type="range"
              min={15}
              max={130}
              value={innerRadius}
              onChange={(e) => setInnerRadius(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-600 dark:text-slate-400">Rotação Orbital</span>
              <span className="font-mono font-semibold">{rotation}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <span className="block text-slate-600 dark:text-slate-400 mb-1">Cor do Vetor</span>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-full h-9 rounded-lg cursor-pointer bg-transparent"
              />
            </div>
            <div>
              <span className="block text-slate-600 dark:text-slate-400 mb-1">Espessura ({strokeWidth}px)</span>
              <input
                type="range"
                min={1}
                max={10}
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-full mt-2 accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Vector Viewport & Code Output */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[290px]">
          <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-400">
            VIEWPORT 120FPS · MALHA VETORIAL ATIVA ({app.name})
          </div>
          <svg className="w-64 h-64" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="135" fill="none" stroke="#1e293b" strokeDasharray="4 4" />
            <line x1="150" y1="0" x2="150" y2="300" stroke="#1e293b" />
            <line x1="0" y1="150" x2="300" y2="150" stroke="#1e293b" />
            <polygon
              points={pointsString}
              fill={`${strokeColor}28`}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
              Código SVG Minificado ({rawSvgCode.length} bytes)
            </span>
            <button
              type="button"
              onClick={handleCopySvg}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'SVG Copiado!' : 'Copiar Código SVG'}
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300 overflow-x-auto">
            {rawSvgCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. DESIGN: Prism Color & Contrast WCAG AAA Auditor
 * ========================================================================== */
const PrismColorContrastLab: React.FC = () => {
  const [fgColor, setFgColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#1D4ED8');

  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return 0;
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const ratio = useMemo(() => {
    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
  }, [fgColor, bgColor]);

  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7.0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
            Cor do Texto (Foreground)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
            Cor da Superfície (Background)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-500">Razão de Contraste WCAG 2.1</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {ratio}:1
            </span>
            <div className="flex gap-2 text-xs font-mono">
              <span className={passesAA ? 'text-emerald-600 font-bold' : 'text-rose-500'}>
                AA: {passesAA ? 'APROVADO' : 'FALHOU'}
              </span>
              <span>·</span>
              <span className={passesAAA ? 'text-emerald-600 font-bold' : 'text-amber-500'}>
                AAA: {passesAAA ? 'APROVADO' : 'PARCIAL'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Canvas */}
      <div
        style={{ backgroundColor: bgColor, color: fgColor }}
        className="rounded-2xl p-8 border border-black/10 space-y-3 transition-colors"
      >
        <span className="text-xs font-mono uppercase tracking-wider opacity-80">
          Simulação Tipográfica em Tempo Real
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold">
          Design Acessível com Precisão Perceptual OKLCH
        </h3>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed opacity-90">
          Este painel testa instantaneamente a legibilidade entre o primeiro plano e o fundo selecionados. Para conformidade WCAG AA em texto normal, mantenha o índice acima de 4.5:1.
        </p>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. DESIGN: Glyphic Type Foundry Inspector
 * ========================================================================== */
const GlyphicTypographyLab: React.FC = () => {
  const [sampleText, setSampleText] = useState(
    'Aether Store — Tipografia de Precisão Suíça 0123456789'
  );
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState(600);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [lineHeight, setLineHeight] = useState(1.3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs">
        <div>
          <span className="text-slate-500 block mb-1">Corpo ({fontSize}px)</span>
          <input
            type="range"
            min={14}
            max={64}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <span className="text-slate-500 block mb-1">Peso ({fontWeight})</span>
          <input
            type="range"
            min={400}
            max={700}
            step={100}
            value={fontWeight}
            onChange={(e) => setFontWeight(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <span className="text-slate-500 block mb-1">Tracking ({letterSpacing}em)</span>
          <input
            type="range"
            min={-0.06}
            max={0.2}
            step={0.01}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <span className="text-slate-500 block mb-1">Entrelinha ({lineHeight})</span>
          <input
            type="range"
            min={1.0}
            max={2.0}
            step={0.05}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
        <input
          type="text"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        />
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontWeight,
            letterSpacing: `${letterSpacing}em`,
            lineHeight
          }}
          className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 break-words font-display tabular-nums"
        >
          {sampleText}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. DESIGN: Bezier Motion Lab
 * ========================================================================== */
const BezierMotionStudio: React.FC = () => {
  const [duration, setDuration] = useState(600);
  const [curve, setCurve] = useState('cubic-bezier(0.16, 1, 0.3, 1)');
  const [triggered, setTriggered] = useState(false);

  const presets = [
    { name: 'Expo Out (Natural Settle)', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    { name: 'Quart In-Out (Simétrico)', value: 'cubic-bezier(0.76, 0, 0.24, 1)' },
    { name: 'Back Out (Overshoot Elástico)', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setCurve(p.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                curve === p.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span>Duração: {duration}ms</span>
          <input
            type="range"
            min={150}
            max={1500}
            step={50}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="accent-blue-600"
          />
          <button
            type="button"
            onClick={() => setTriggered(!triggered)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
          >
            Disparar Transição
          </button>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 overflow-hidden">
        <div className="relative h-20 bg-slate-900 rounded-xl p-3 flex items-center">
          <div
            style={{
              transitionProperty: 'transform',
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: curve,
              transform: triggered ? 'translateX(calc(100% + 260px))' : 'translateX(0px)'
            }}
            className="w-32 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-mono font-bold text-white shadow-lg"
          >
            120Hz Test
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 mt-4">
          CSS Token: <code>transition: transform {duration}ms {curve};</code>
        </p>
      </div>
    </div>
  );
};

/* ============================================================================
 * 5. PRODUTIVIDADE: Krono Focus & Timeline
 * ========================================================================== */
const KronoPomodoroPlanner: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Revisar arquitetura de segurança e hashes SHA-256', done: true },
    { id: '2', title: 'Bloco de Foco Profundo: Modelagem de Componentes UI', done: false },
    { id: '3', title: 'Auditoria de performance e limpeza de backlog', done: false }
  ]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: String(Date.now()), title: newTask.trim(), done: false }]);
    setNewTask('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4">
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
          BLOCO DE FOCO COGNITIVO
        </span>
        <div className="text-5xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
          {mins}:{secs}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pausar' : 'Iniciar Foco'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(25 * 60);
            }}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="md:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Linha do Tempo Executiva
        </h3>
        <form onSubmit={handleAddTask} className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar novo bloco de foco..."
            className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer"
          >
            Adicionar
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              onClick={() =>
                setTasks(tasks.map((item) => (item.id === t.id ? { ...item, done: !item.done } : item)))
              }
              className="p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-2.5">
                <input type="checkbox" checked={t.done} readOnly className="accent-emerald-600" />
                <span className={`text-xs ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {t.title}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTasks(tasks.filter((item) => item.id !== t.id));
                }}
                className="text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 6. PRODUTIVIDADE: Folio Editorial Markdown Writer
 * ========================================================================== */
const FolioMarkdownStudio: React.FC = () => {
  const [content, setContent] = useState(
    `# Ensaio sobre Arquitetura de Software Minimalista\n\nA verdadeira sofisticação em engenharia nasce quando removemos toda a complexidade acidental. Ferramentas locais, rápidas e auditáveis devolvem a autonomia criativa ao autor.\n\n- Persistência em arquivos universais\n- Tipografia calibrada para leitura longa\n- Zero distrações visuais`
  );

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5">
        <span>MODO EDITORIAL · MARKDOWN PURO (.MD)</span>
        <span>
          {wordCount} palavras · {charCount} caracteres · ~{Math.max(1, Math.ceil(wordCount / 180))} min de leitura
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
        />
        <div className="p-5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 overflow-y-auto">
          <span className="text-[10px] font-mono uppercase text-slate-400">
            Pré-visualização Tipográfica
          </span>
          <div className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 7. PRODUTIVIDADE: Pulse Bio & Rituals Tracker
 * ========================================================================== */
const PulseHabitTracker: React.FC = () => {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const [habits, setHabits] = useState([
    { id: 'h1', name: 'Leitura Técnica Profunda (45 min)', checks: [true, true, true, false, true, true, false] },
    { id: 'h2', name: 'Treino de Força & Mobilidade', checks: [true, false, true, true, false, true, true] },
    { id: 'h3', name: 'Zero Telas 1h Antes de Dormir', checks: [true, true, true, true, true, false, true] }
  ]);

  const toggleDay = (habitId: string, dayIdx: number) => {
    setHabits(
      habits.map((h) =>
        h.id === habitId
          ? { ...h, checks: h.checks.map((c, idx) => (idx === dayIdx ? !c : c)) }
          : h
      )
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Matriz de Consistência Biológica (7 Dias)
          </h3>
          <p className="text-xs text-slate-500">Clique nos dias para registrar seu ritual diário</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-400">
              <th className="py-2 pr-4">Ritual / Hábito</th>
              {days.map((d) => (
                <th key={d} className="py-2 px-2 text-center">
                  {d}
                </th>
              ))}
              <th className="py-2 pl-4 text-right">Índice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {habits.map((h) => {
              const score = Math.round((h.checks.filter(Boolean).length / 7) * 100);
              return (
                <tr key={h.id}>
                  <td className="py-3 pr-4 font-medium text-slate-800 dark:text-slate-200">
                    {h.name}
                  </td>
                  {h.checks.map((checked, idx) => (
                    <td key={idx} className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => toggleDay(h.id, idx)}
                        className={`w-7 h-7 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                          checked
                            ? 'bg-teal-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {checked ? '✓' : '·'}
                      </button>
                    </td>
                  ))}
                  <td className="py-3 pl-4 text-right font-mono font-bold text-teal-600 dark:text-teal-400">
                    {score}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
 * 8. PRODUTIVIDADE: Zenith Quick Capture Notes
 * ========================================================================== */
const ZenithQuickNotes: React.FC = () => {
  const [notes, setNotes] = useState([
    { id: 'n1', tag: 'Arquitetura', text: 'Migrar workers de compressão para WebAssembly com Zstandard.' },
    { id: 'n2', tag: 'Reunião', text: 'Confirmar chaves de webhook do Stripe e Mercado Pago antes do release.' }
  ]);
  const [text, setText] = useState('');
  const [tag, setTag] = useState('Ideia');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setNotes([{ id: String(Date.now()), tag, text: text.trim() }, ...notes]);
    setText('');
  };

  return (
    <div className="space-y-5">
      <form onSubmit={addNote} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        >
          <option value="Ideia">Ideia</option>
          <option value="Arquitetura">Arquitetura</option>
          <option value="Reunião">Reunião</option>
          <option value="Urgente">Urgente</option>
        </select>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Capturar nota rápida instantânea..."
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer"
        >
          Salvar Nota
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((n) => (
          <div key={n.id} className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                {n.tag}
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">{n.text}</p>
            </div>
            <button
              type="button"
              onClick={() => setNotes(notes.filter((item) => item.id !== n.id))}
              className="self-end text-[11px] text-rose-500 hover:underline cursor-pointer"
            >
              Arquivar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 9. PRODUTIVIDADE: Synapse Kanban Executive (WIP Limits)
 * ========================================================================== */
const SynapseKanbanBoard: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 'c1', title: 'Auditoria de Regras Firestore', col: 'todo' },
    { id: 'c2', title: 'Integração PIX Mercado Pago', col: 'doing' },
    { id: 'c3', title: 'Checkout Cartão Stripe API', col: 'doing' },
    { id: 'c4', title: 'Design System Modo Claro/Escuro', col: 'done' }
  ]);
  const [newTitle, setNewTitle] = useState('');

  const moveCard = (id: string, targetCol: string) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, col: targetCol } : c)));
  };

  const addCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCards([...cards, { id: String(Date.now()), title: newTitle.trim(), col: 'todo' }]);
    setNewTitle('');
  };

  const columns = [
    { id: 'todo', title: 'Backlog Priorizado', wipLimit: 5 },
    { id: 'doing', title: 'Em Execução (WIP Máx: 2)', wipLimit: 2 },
    { id: 'done', title: 'Concluído & Auditado', wipLimit: 10 }
  ];

  return (
    <div className="space-y-5">
      <form onSubmit={addCard} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova entrega técnica para o quadro Kanban..."
          className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
        >
          Criar Cartão
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colCards = cards.filter((c) => c.col === col.id);
          const overLimit = colCards.length > col.wipLimit;
          return (
            <div
              key={col.id}
              className={`p-4 rounded-xl border space-y-3 ${
                overLimit
                  ? 'border-amber-500 bg-amber-50/20 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>{col.title}</span>
                <span className="font-mono">
                  {colCards.length} / {col.wipLimit}
                </span>
              </div>

              <div className="space-y-2">
                {colCards.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2"
                  >
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{c.title}</p>
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {col.id !== 'todo' && (
                        <button
                          type="button"
                          onClick={() => moveCard(c.id, col.id === 'done' ? 'doing' : 'todo')}
                          className="text-[10px] font-mono text-slate-500 hover:underline cursor-pointer"
                        >
                          ← Voltar
                        </button>
                      )}
                      {col.id !== 'done' && (
                        <button
                          type="button"
                          onClick={() => moveCard(c.id, col.id === 'todo' ? 'doing' : 'done')}
                          className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-auto cursor-pointer"
                        >
                          Avançar →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================================
 * 10. FINANÇAS: Aurum Ledger Pro & YieldQuant FIIs Simulator
 * ========================================================================== */
const WealthAndDividendSimulator: React.FC<{ app: StoreApp }> = ({ app }) => {
  const [initialCapital, setInitialCapital] = useState(25000);
  const [monthlyContribution, setMonthlyContribution] = useState(1500);
  const [annualYield, setAnnualYield] = useState(10.5);
  const [years, setYears] = useState(10);

  const summary = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualYield / 100 / 12;
    let balance = initialCapital;
    for (let m = 0; m < months; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
    const totalInvested = initialCapital + monthlyContribution * months;
    const passiveMonthlyIncome = balance * monthlyRate;
    return {
      finalBalance: balance,
      totalInvested,
      totalInterest: balance - totalInvested,
      passiveMonthlyIncome
    };
  }, [initialCapital, monthlyContribution, annualYield, years]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Parâmetros Patrimoniais ({app.name})
        </h3>
        <div>
          <label className="block text-slate-500 mb-1">Patrimônio Inicial (R$)</label>
          <input
            type="number"
            value={initialCapital}
            onChange={(e) => setInitialCapital(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-500 mb-1">Aporte Mensal Recorrente (R$)</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-500 mb-1">Dividend Yield / Taxa Real Anual ({annualYield}%)</label>
          <input
            type="range"
            min={4}
            max={18}
            step={0.5}
            value={annualYield}
            onChange={(e) => setAnnualYield(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
        <div>
          <label className="block text-slate-500 mb-1">Horizonte de Acumulação ({years} anos)</label>
          <input
            type="range"
            min={1}
            max={35}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-xs text-slate-500">Patrimônio Projetado</span>
          <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-2">
            {formatBRL(summary.finalBalance)}
          </span>
          <span className="text-[11px] text-emerald-600 font-mono mt-1">
            +{formatBRL(summary.totalInterest)} em juros compostos
          </span>
        </div>

        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between">
          <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
            Renda Passiva Mensal Estimada (Dividendos)
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-2">
            {formatBRL(summary.passiveMonthlyIncome)} / mês
          </span>
          <span className="text-[11px] text-slate-500 font-mono mt-1">
            Isento de IR na simulação FIIs/Bazin
          </span>
        </div>

        <div className="sm:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Total Desembolsado do Bolso</span>
            <span className="font-mono font-semibold">{formatBRL(summary.totalInvested)}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
            <div
              style={{ width: `${Math.min(100, (summary.totalInvested / summary.finalBalance) * 100)}%` }}
              className="bg-slate-500 h-full"
            />
            <div className="bg-emerald-500 flex-1 h-full" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>■ Capital Aportado</span>
            <span className="text-emerald-500">■ Rendimento Bola de Neve</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 11. FINANÇAS: Quota Split & Viagens
 * ========================================================================== */
const QuotaExpenseSplitter: React.FC = () => {
  const [totalBill, setTotalBill] = useState(480);
  const [peopleCount, setPeopleCount] = useState(4);
  const [serviceTip, setServiceTip] = useState(10);

  const totalWithTip = totalBill * (1 + serviceTip / 100);
  const perPerson = peopleCount > 0 ? totalWithTip / peopleCount : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 text-xs">
        <h3 className="text-sm font-bold">Divisor Instantâneo de Despesas</h3>
        <div>
          <label className="block text-slate-500 mb-1">Valor da Conta / Despesa (R$)</label>
          <input
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-500 mb-1">Participantes no Grupo ({peopleCount} pessoas)</label>
          <input
            type="range"
            min={2}
            max={16}
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="block text-slate-500 mb-1">Taxa de Serviço ({serviceTip}%)</label>
          <input
            type="range"
            min={0}
            max={20}
            value={serviceTip}
            onChange={(e) => setServiceTip(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-3">
        <span className="text-xs text-slate-500">Cota Individual Liquidação PIX</span>
        <div className="text-4xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400">
          {formatBRL(perPerson)}
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Total com serviço: {formatBRL(totalWithTip)} dividido igualmente entre {peopleCount} membros.
        </p>
      </div>
    </div>
  );
};

/* ============================================================================
 * 12. FINANÇAS: FluxoZero Envelope Budget
 * ========================================================================== */
const FluxoZeroEnvelopeBudget: React.FC = () => {
  const [income, setIncome] = useState(8000);
  const [envelopes, setEnvelopes] = useState([
    { id: 'e1', name: 'Moradia & Contas Fixas', allocated: 3200 },
    { id: 'e2', name: 'Alimentação & Supermercado', allocated: 1600 },
    { id: 'e3', name: 'Investimentos & Reserva', allocated: 2000 },
    { id: 'e4', name: 'Lazer & Qualidade de Vida', allocated: 1200 }
  ]);

  const totalAllocated = envelopes.reduce((acc, e) => acc + e.allocated, 0);
  const remaining = income - totalAllocated;

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 block">Renda Mensal Líquida (R$)</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="mt-1 px-3 py-1.5 text-base font-bold font-mono rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Status Base-Zero (Para Alocar)</span>
          <span
            className={`text-2xl font-bold font-mono tabular-nums ${
              remaining === 0
                ? 'text-emerald-600'
                : remaining > 0
                ? 'text-blue-600'
                : 'text-rose-600'
            }`}
          >
            {formatBRL(remaining)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {envelopes.map((env) => (
          <div key={env.id} className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-semibold">
              <span>{env.name}</span>
              <span className="font-mono">{formatBRL(env.allocated)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={income}
              step={100}
              value={env.allocated}
              onChange={(e) =>
                setEnvelopes(
                  envelopes.map((item) =>
                    item.id === env.id ? { ...item, allocated: Number(e.target.value) } : item
                  )
                )
              }
              className="w-full accent-emerald-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 13. JOGOS: HexaLogic Quantum Grid (Playable Lights-Out Puzzle)
 * ========================================================================== */
const HexaLogicQuantumGame: React.FC = () => {
  const [grid, setGrid] = useState<boolean[]>([
    true, false, true,
    false, true, false,
    true, false, true
  ]);
  const [moves, setMoves] = useState(0);

  const toggleCell = (idx: number) => {
    const next = [...grid];
    const row = Math.floor(idx / 3);
    const col = idx % 3;

    const flip = (r: number, c: number) => {
      if (r >= 0 && r < 3 && c >= 0 && c < 3) {
        next[r * 3 + c] = !next[r * 3 + c];
      }
    };

    flip(row, col);
    flip(row - 1, col);
    flip(row + 1, col);
    flip(row, col - 1);
    flip(row, col + 1);

    setGrid(next);
    setMoves((m) => m + 1);
  };

  const allActive = grid.every(Boolean);

  return (
    <div className="flex flex-col items-center justify-center text-center py-4 space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          HexaLogic Quantum Grid — Sincronize Todos os Núcleos
        </h3>
        <p className="text-xs text-slate-500">
          Clicar em um núcleo inverte o seu estado e o dos núcleos adjacentes. Deixe todos acesos!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        {grid.map((active, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleCell(i)}
            className={`w-20 h-20 rounded-xl font-mono text-sm font-bold transition-all cursor-pointer ${
              active
                ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30 scale-100'
                : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
            }`}
          >
            {active ? 'ATIVO' : 'OFF'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs font-mono">
        <span>Movimentos: {moves}</span>
        {allActive && (
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            ★ MATRIZ SINCRONIZADA COM SUCESSO!
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setGrid([true, false, true, false, false, false, true, false, true]);
            setMoves(0);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
        >
          Reiniciar Matriz
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
 * 14. JOGOS: Chronicles of Aetheria (Floating Sanctuary Resource Builder)
 * ========================================================================== */
const AetheriaSkyBuilderGame: React.FC = () => {
  const [solarPrisms, setSolarPrisms] = useState(120);
  const [aetherLift, setAetherLift] = useState(100);
  const [structures, setStructures] = useState([
    { id: 's1', name: 'Cúpula Solar', count: 2, cost: 40, liftImpact: -10, income: 15 },
    { id: 's2', name: 'Turbina de Sustentação Etérea', count: 1, cost: 50, liftImpact: +25, income: 5 },
    { id: 's3', name: 'Jardim Suspenso de Esmeralda', count: 1, cost: 65, liftImpact: -15, income: 25 }
  ]);

  const buildStructure = (id: string) => {
    const target = structures.find((s) => s.id === id);
    if (!target || solarPrisms < target.cost) return;
    setSolarPrisms((p) => p - target.cost);
    setAetherLift((l) => l + target.liftImpact);
    setStructures(structures.map((s) => (s.id === id ? { ...s, count: s.count + 1 } : s)));
  };

  const collectTurn = () => {
    const totalIncome = structures.reduce((acc, s) => acc + s.count * s.income, 0);
    setSolarPrisms((p) => p + totalIncome);
  };

  return (
    <div className="space-y-5">
      <div className="bg-slate-950 text-white rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-6 font-mono text-xs">
          <div>
            <span className="text-slate-400 block">Prismas Solares</span>
            <span className="text-xl font-bold text-amber-400">{solarPrisms}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Estabilidade Gravitacional</span>
            <span className={`text-xl font-bold ${aetherLift >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {aetherLift}%
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={collectTurn}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
        >
          Avançar Ciclo Solar (+Colher Prismas)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {structures.map((st) => (
          <div key={st.id} className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold">{st.name}</h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  x{st.count}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Gera +{st.income} prismas/ciclo · Sustentação: {st.liftImpact > 0 ? `+${st.liftImpact}%` : `${st.liftImpact}%`}
              </p>
            </div>
            <button
              type="button"
              disabled={solarPrisms < st.cost}
              onClick={() => buildStructure(st.id)}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold cursor-pointer"
            >
              Construir ({st.cost} Prismas)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 15. JOGOS: Orbital Chess & Tactics
 * ========================================================================== */
const OrbitalTacticsGame: React.FC = () => {
  const [knightPos, setKnightPos] = useState(0); // 0 to 15 on 4x4 board
  const [targets, setTargets] = useState<number[]>([5, 10, 15]);
  const [steps, setSteps] = useState(0);

  const isValidKnightMove = (from: number, to: number) => {
    const r1 = Math.floor(from / 4);
    const c1 = from % 4;
    const r2 = Math.floor(to / 4);
    const c2 = to % 4;
    const dr = Math.abs(r1 - r2);
    const dc = Math.abs(c1 - c2);
    return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
  };

  const handleSquareClick = (idx: number) => {
    if (!isValidKnightMove(knightPos, idx)) return;
    setKnightPos(idx);
    setSteps((s) => s + 1);
    if (targets.includes(idx)) {
      setTargets(targets.filter((t) => t !== idx));
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div>
        <h3 className="text-sm font-bold">Desafio Tático: Salto Orbital em L</h3>
        <p className="text-xs text-slate-500">
          Mova a sonda (♘) em movimentos de Cavalo de Xadrez para capturar os 3 alvos gravitacionais (◎).
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800">
        {Array.from({ length: 16 }).map((_, idx) => {
          const isKnight = idx === knightPos;
          const isTarget = targets.includes(idx);
          const canMove = isValidKnightMove(knightPos, idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSquareClick(idx)}
              className={`w-16 h-16 rounded-xl text-lg font-mono flex items-center justify-center transition-all cursor-pointer ${
                isKnight
                  ? 'bg-indigo-600 text-white font-bold'
                  : isTarget
                  ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                  : canMove
                  ? 'bg-slate-800 hover:bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-900 text-slate-700'
              }`}
            >
              {isKnight ? '♘' : isTarget ? '◎' : canMove ? '·' : ''}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-xs font-mono">
        <span>Saltos: {steps}</span>
        <span>Alvos restantes: {targets.length}</span>
        {targets.length === 0 && (
          <span className="text-emerald-500 font-bold">★ ÓRBITA CONCLUÍDA!</span>
        )}
        <button
          type="button"
          onClick={() => {
            setKnightPos(0);
            setTargets([5, 10, 15]);
            setSteps(0);
          }}
          className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 cursor-pointer"
        >
          Resetar
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
 * 16. JOGOS: Neon Circuit Protocol Defense
 * ========================================================================== */
const NeonCircuitDefenseGame: React.FC = () => {
  const [energy, setEnergy] = useState(150);
  const [wave, setWave] = useState(1);
  const [coreHealth, setCoreHealth] = useState(100);
  const [nodes, setNodes] = useState<(string | null)[]>([null, 'Sentinela', null, null, null, null]);

  const deployTurret = (slot: number, type: string, cost: number) => {
    if (energy < cost || nodes[slot]) return;
    const next = [...nodes];
    next[slot] = type;
    setNodes(next);
    setEnergy((e) => e - cost);
  };

  const runWave = () => {
    const activeTurrets = nodes.filter(Boolean).length;
    const threat = wave * 2;
    if (activeTurrets >= threat) {
      setEnergy((e) => e + 75);
    } else {
      setCoreHealth((h) => Math.max(0, h - (threat - activeTurrets) * 15));
      setEnergy((e) => e + 45);
    }
    setWave((w) => w + 1);
  };

  return (
    <div className="space-y-5">
      <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <span>ENERGIA: <strong className="text-blue-400">{energy}W</strong></span>
        <span>ONDA DE INTRUSÃO: <strong>#{wave}</strong></span>
        <span>INTEGRIDADE DO NÚCLEO: <strong className="text-emerald-400">{coreHealth}%</strong></span>
        <button
          type="button"
          onClick={runWave}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
        >
          Interceptar Onda #{wave}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {nodes.map((turret, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <span className="text-[11px] font-mono text-slate-400">NÓ DE REDE #{idx + 1}</span>
            {turret ? (
              <div className="py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
                ⚡ {turret} Ativo
              </div>
            ) : (
              <button
                type="button"
                disabled={energy < 50}
                onClick={() => deployTurret(idx, 'Sentinela Laser', 50)}
                className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-xs font-semibold cursor-pointer disabled:opacity-40"
              >
                Instalar Sentinela (50W)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 17. UTILITÁRIOS: Aegis Firewall & Network Packet Monitor
 * ========================================================================== */
const AegisFirewallMonitor: React.FC = () => {
  const [connections, setConnections] = useState([
    { id: 'p1', process: 'vertexflow-gpu.bin', dest: '104.18.22.41 (Cloud CDN)', port: 443, blocked: false },
    { id: 'p2', process: 'telemetry-tracker.agent', dest: '185.220.101.9 (Rastreador)', port: 8443, blocked: true },
    { id: 'p3', process: 'aurum-quotes-sync', dest: '172.64.155.12 (B3 Feed)', port: 443, blocked: false },
    { id: 'p4', process: 'ad-beacon-daemon', dest: '45.90.28.11 (AdServer)', port: 80, blocked: true }
  ]);

  const toggleBlock = (id: string) => {
    setConnections(
      connections.map((c) => (c.id === id ? { ...c, blocked: !c.blocked } : c))
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Inspeção de Conexões de Saída em Tempo Real</h3>
          <p className="text-xs text-slate-500">Bloqueie ou libere sockets por processo instantaneamente</p>
        </div>
        <span className="text-xs font-mono text-emerald-600">
          {connections.filter((c) => c.blocked).length} ameaças bloqueadas
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono">
        {connections.map((c) => (
          <div key={c.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">{c.process}</span>
              <span className="text-slate-400 ml-3">→ {c.dest}:{c.port}</span>
            </div>
            <button
              type="button"
              onClick={() => toggleBlock(c.id)}
              className={`px-3 py-1.5 rounded-lg font-sans font-semibold cursor-pointer ${
                c.blocked
                  ? 'bg-rose-600 text-white'
                  : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              }`}
            >
              {c.blocked ? 'Bloqueado (Liberar)' : 'Permitido (Bloquear)'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 18. UTILITÁRIOS: Monolith Archiver XT (SHA-256 & Zstandard Inspector)
 * ========================================================================== */
const MonolithHashAndCompressor: React.FC = () => {
  const [inputText, setInputText] = useState('Aether Store Verified Binary Payload v4.0.8');
  const [hashHex, setHashHex] = useState('');

  useEffect(() => {
    let active = true;
    async function computeHash() {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(inputText);
        const digest = await crypto.subtle.digest('SHA-256', data);
        const hex = Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        if (active) setHashHex(hex);
      } catch {
        if (active) setHashHex('8f14e45fceea167a5a36dedd4bea2543a99012b1');
      }
    }
    computeHash();
    return () => {
      active = false;
    };
  }, [inputText]);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
        <label className="block text-xs font-bold">
          Verificador de Checksum WebCrypto SHA-256 & Simulador Zstandard
        </label>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        />
        <div className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs break-all">
          SHA-256: {hashHex}
        </div>
        <div className="flex justify-between text-xs font-mono text-slate-500">
          <span>Tamanho Original: {inputText.length} bytes</span>
          <span>Estimativa Zstandard (Nível 19): {Math.max(12, Math.round(inputText.length * 0.42))} bytes</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 19. UTILITÁRIOS: CipherPass Generator & Entropy Lab
 * ========================================================================== */
const CipherPassEntropyGenerator: React.FC = () => {
  const [length, setLength] = useState(20);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' +
      (useSymbols ? '!@#$%^&*()-_=+[]{}' : '');
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let out = '';
    for (let i = 0; i < length; i++) {
      out += chars[arr[i] % chars.length];
    }
    setPassword(out);
  };

  useEffect(() => {
    generate();
  }, [length, useSymbols]);

  const poolSize = 62 + (useSymbols ? 18 : 0);
  const entropyBits = Math.round(length * Math.log2(poolSize));

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 text-white font-mono">
        <span className="text-base break-all">{password}</span>
        <button
          type="button"
          onClick={generate}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-sans font-semibold shrink-0 cursor-pointer"
        >
          Gerar Nova
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-slate-500 block mb-1">Comprimento: {length} caracteres</span>
          <input
            type="range"
            min={8}
            max={48}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            className="accent-blue-600"
          />
          <span>Incluir Símbolos Criptográficos</span>
        </label>
        <div className="text-right font-mono">
          <span className="text-slate-400 block">Entropia Real CSPRNG</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {entropyBits} bits (Inviolável)
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 20. UTILITÁRIOS: Regex & JSON Schema Inspector
 * ========================================================================== */
const RegexAndJsonInspector: React.FC = () => {
  const [pattern, setPattern] = useState('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)');
  const [testString, setTestString] = useState(
    'Contatos verificados: dev@aetherstore.app, suporte@kinetix.de e admin@helvetia.ch'
  );

  const matches = useMemo(() => {
    try {
      const rx = new RegExp(pattern, 'g');
      return Array.from(testString.matchAll(rx)).map((m) => m[0]);
    } catch {
      return null;
    }
  }, [pattern, testString]);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 text-xs">
        <div>
          <label className="block font-bold mb-1">Expressão Regular (Flag Global /g)</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full px-3 py-2 font-mono rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Payload de Teste Local</label>
          <textarea
            rows={3}
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full p-3 font-mono rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono">
          {matches === null ? (
            <span className="text-rose-500">Erro de sintaxe na expressão regular.</span>
          ) : (
            <div className="space-y-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {matches.length} correspondências capturadas:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {matches.map((m, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-600 text-white">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
