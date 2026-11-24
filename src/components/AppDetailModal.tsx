import React, { useState } from 'react';
import { StoreApp } from '../types';
import { AppIconBadge } from './AppIconBadge';
import { ResilientImage } from './ResilientImage';
import { formatBRL } from './AppCard';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  Download,
  ShoppingBag,
  Check,
  Lock,
  HardDrive,
  RefreshCw,
  Monitor,
  Smartphone,
  Globe,
  Maximize2,
  X,
  MessageSquarePlus,
  CheckCircle2
} from 'lucide-react';

interface AppDetailModalProps {
  app: StoreApp;
  isOwned: boolean;
  isInCart: boolean;
  onClose: () => void;
  onPrimaryAction: (app: StoreApp, e: React.MouseEvent) => void;
  onOpenLibrary: () => void;
  onAddReview: (appId: string, author: string, role: string, rating: number, comment: string) => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  isOwned,
  isInCart,
  onClose,
  onPrimaryAction,
  onOpenLibrary,
  onAddReview
}) => {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // New review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRole, setReviewRole] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const activeScreenshot = app.screenshots[selectedScreenshotIndex] || app.screenshots[0];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    onAddReview(
      app.id,
      reviewAuthor.trim(),
      reviewRole.trim() || 'Usuário Verificado',
      reviewRating,
      reviewComment.trim()
    );
    setReviewAuthor('');
    setReviewRole('');
    setReviewRating(5);
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-150">
      {/* Top Breadcrumb / Back Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Vitrine
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
          <span>{app.category}</span>
          <span aria-hidden="true">/</span>
          <span>v{app.verification.version}</span>
          <span aria-hidden="true">/</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Assinatura Verificada</span>
        </div>
      </div>

      {/* Main 2-Column Contiguous PDP Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Header Summary, Screenshot Gallery, Description & Reviews */}
        <div className="lg:col-span-7 space-y-8">
          {/* App Identity Block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <AppIconBadge iconSymbol={app.iconSymbol} iconBg={app.iconBg} size="xl" />
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    {app.name}
                  </h1>
                  {app.verification.verified && (
                    <span
                      title="Binário assinado e auditado pela Aether Store"
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      App Verificado
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Desenvolvido por <span className="text-slate-800 dark:text-slate-200">{app.developer}</span>
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {app.tagline}
                </p>

                {/* Unboxed key stats row */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                  <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {app.rating.toFixed(1)} ({app.reviewCount} avaliações)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{app.downloadsCount} instalações</span>
                  <span aria-hidden="true">·</span>
                  <span>{app.verification.fileSize}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Screenshot Gallery */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Galeria de Capturas de Tela
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Clique na imagem principal para inspecionar em tela cheia
                </p>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {selectedScreenshotIndex + 1} / {app.screenshots.length}
              </span>
            </div>

            {/* Active Screenshot Viewport */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-zoom-in"
            >
              <ResilientImage
                src={activeScreenshot.imageUrl}
                alt={activeScreenshot.title}
                fallbackGradient={activeScreenshot.aspectColor}
                fallbackTitle={activeScreenshot.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {activeScreenshot.title}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {activeScreenshot.caption}
                    </p>
                  </div>
                  <span className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-white hover:bg-white/20 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Clickable Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {app.screenshots.map((shot, idx) => (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => setSelectedScreenshotIndex(idx)}
                  className={`group relative aspect-video rounded-lg overflow-hidden border text-left transition-all cursor-pointer ${
                    idx === selectedScreenshotIndex
                      ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={shot.imageUrl}
                    alt={shot.title}
                    fallbackGradient={shot.aspectColor}
                    fallbackTitle={shot.title}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute bottom-1.5 left-2 right-2 text-[11px] font-medium text-white truncate drop-shadow-xs">
                    {shot.title}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Complete Description & Highlights */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Sobre este Aplicativo
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {app.description}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Principais Funcionalidades e Arquitetura
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {app.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Reviews & Ratings Section */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-5">
                <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  {app.rating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.round(app.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono tabular-nums">
                    Média baseada em {app.reviewCount} avaliações verificadas
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                {showReviewForm ? 'Cancelar Avaliação' : 'Escrever Avaliação'}
              </button>
            </div>

            {/* Interactive Add Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-4"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Publicar Avaliação de Usuário
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder="Ex: Rodrigo Almeida"
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Cargo ou Especialidade
                    </label>
                    <input
                      type="text"
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                      placeholder="Ex: Product Designer"
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Nota (1 a 5 estrelas)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-slate-500 ml-2">
                      {reviewRating}.0 / 5.0
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Comentário Técnico *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Compartilhe sua experiência com desempenho, segurança e usabilidade..."
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Enviar Avaliação
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {app.reviews.map((rev) => (
                <div key={rev.id} className="py-5 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {rev.author}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                        · {rev.role}
                      </span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {rev.date} · v{rev.version}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rev.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Sticky Purchase & Security Verification Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          {/* Primary Purchase / Install Module */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {app.price === 0 ? 'Licença Gratuita Verificada' : 'Licença Vitalícia (Sem Assinatura)'}
                </span>
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums mt-1 block">
                  {formatBRL(app.price)}
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Download Imediato
              </span>
            </div>

            {isOwned ? (
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={onOpenLibrary}
                  className="w-full py-3.5 px-5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Disponível em Meus Apps (Baixar)
                </button>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  Você já possui a licença deste aplicativo em sua biblioteca.
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => onPrimaryAction(app, e)}
                className={`w-full py-3.5 px-5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isInCart
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    No Carrinho — Abrir Checkout
                  </>
                ) : app.price === 0 ? (
                  <>
                    <Download className="w-4 h-4" />
                    Instalar Gratuitamente Agora
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Comprar Aplicativo · {formatBRL(app.price)}
                  </>
                )}
              </button>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Atualizações incluídas para a série v{app.verification.version.split('.')[0]}.x</span>
              <span>Recibo Fiscal</span>
            </div>
          </div>

          {/* Dedicated Security & Technical Verification Panel (Painel de Verificação) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Painel de Verificação e Segurança
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Pacote inspecionado em sandbox isolado contra malware, keyloggers e SDKs de rastreamento ocultos.
                </p>
                <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1.5 break-all">
                  {app.verification.signatureHash}
                </p>
              </div>
            </div>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5" />
                  Tamanho do Arquivo
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  {app.verification.fileSize}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Versão Atual
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  v{app.verification.version}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400 dark:text-slate-500">Última Atualização</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  {app.verification.lastUpdated}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400 dark:text-slate-500">Garantia de Privacidade</span>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {app.verification.privacyScore}
                </p>
              </div>
            </div>

            {/* Compatibility List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Compatibilidade de Plataformas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Desktop', 'Web', 'iOS', 'Android'] as const).map((plat) => {
                  const isSupported = app.verification.platforms.includes(plat);
                  return (
                    <div
                      key={plat}
                      className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 ${
                        isSupported
                          ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 text-slate-900 dark:text-slate-100'
                          : 'border-slate-100 dark:border-slate-800/40 text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      {plat === 'Desktop' && <Monitor className="w-4 h-4" />}
                      {plat === 'Web' && <Globe className="w-4 h-4" />}
                      {(plat === 'iOS' || plat === 'Android') && <Smartphone className="w-4 h-4" />}
                      <span className="text-xs font-medium">{plat}</span>
                      <span className="text-[10px] text-slate-400">
                        {isSupported ? 'Compatível' : 'Indisponível'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Permissions Audit Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  Permissões Exigidas pelo Aplicativo
                </h3>
                <span className="text-xs font-mono tabular-nums text-slate-400">
                  {app.verification.permissions.length} {app.verification.permissions.length === 1 ? 'escopo' : 'escopos'}
                </span>
              </div>

              <div className="space-y-2.5">
                {app.verification.permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {perm.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Requisito: {perm.criticality}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {perm.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Screenshot Inspection */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {activeScreenshot.title}
                </h3>
                <p className="text-xs text-slate-400">{activeScreenshot.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <ResilientImage
                src={activeScreenshot.imageUrl}
                alt={activeScreenshot.title}
                fallbackGradient={activeScreenshot.aspectColor}
                fallbackTitle={activeScreenshot.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
