import React, { useState } from 'react';
import { StoreApp, Receipt } from '../types';
import { AppIconBadge } from './AppIconBadge';
import { formatBRL } from './AppCard';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  Receipt as ReceiptIcon,
  FolderOpen,
  ArrowUpRight,
  HardDrive,
  CloudCheck,
  LogIn,
  Play
} from 'lucide-react';

interface UserLibraryViewProps {
  ownedApps: StoreApp[];
  receipts: Receipt[];
  isAuthenticated: boolean;
  userEmail?: string | null;
  onSelectApp: (app: StoreApp) => void;
  onLaunchApp: (app: StoreApp) => void;
  onExploreStore: () => void;
  onSignIn: () => void;
}

export const UserLibraryView: React.FC<UserLibraryViewProps> = ({
  ownedApps,
  receipts,
  isAuthenticated,
  userEmail,
  onSelectApp,
  onLaunchApp,
  onExploreStore,
  onSignIn
}) => {
  const [activeTab, setActiveTab] = useState<'apps' | 'receipts'>('apps');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleTriggerDownload = (app: StoreApp) => {
    setDownloadingId(app.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => (prev.includes(app.id) ? prev : [...prev, app.id]));
      // Generate a real verified license & manifest file download
      const manifestContent = JSON.stringify(
        {
          store: 'Aether Store Verified Package',
          appId: app.id,
          name: app.name,
          developer: app.developer,
          version: app.verification.version,
          signatureHash: app.verification.signatureHash,
          platforms: app.verification.platforms,
          licensedTo: userEmail || 'Licença Local Verificada',
          issuedAt: new Date().toISOString()
        },
        null,
        2
      );
      const blob = new Blob([manifestContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${app.id}-v${app.verification.version}-verified-package.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Cloud Sync Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Meus Aplicativos e Licenças
            </h1>
            {isAuthenticated && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CloudCheck className="w-4 h-4" />
                Sincronizado na Nuvem
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAuthenticated
              ? `Conta conectada (${userEmail}). Execute seus aplicativos diretamente no navegador ou baixe os pacotes verificados.`
              : 'Execute seus aplicativos verificados imediatamente no navegador ou entre com sua conta para sincronizar na nuvem.'}
          </p>
        </div>

        {/* Interactive Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('apps')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'apps'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Biblioteca ({ownedApps.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('receipts')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'receipts'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Histórico de Recibos ({receipts.length})
          </button>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Sincronize suas compras e licenças no banco de dados em nuvem
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Faça login com sua conta Google para vincular seus aplicativos adquiridos e recibos de pagamento em qualquer dispositivo.
            </p>
          </div>
          <button
            type="button"
            onClick={onSignIn}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            Entrar com Conta Google
          </button>
        </div>
      )}

      {/* Tab 1: Purchased / Installed Apps */}
      {activeTab === 'apps' && (
        <>
          {ownedApps.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <FolderOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Nenhum aplicativo instalado ou adquirido ainda
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Quando você instalar aplicativos gratuitos ou adquirir licenças pagas via Stripe ou Mercado Pago, eles aparecerão aqui prontos para execução e download.
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreStore}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
              >
                Explorar Vitrine de Aplicativos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ownedApps.map((app) => {
                const isDownloading = downloadingId === app.id;
                const isDownloaded = downloadedIds.includes(app.id);

                return (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-5"
                  >
                    <div className="flex items-start gap-4">
                      <AppIconBadge
                        iconSymbol={app.iconSymbol}
                        iconBg={app.iconBg}
                        size="lg"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <h3
                              onClick={() => onSelectApp(app)}
                              className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                            >
                              {app.name}
                            </h3>
                            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          </div>
                          <button
                            type="button"
                            onClick={() => onSelectApp(app)}
                            className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 inline-flex items-center gap-0.5 shrink-0 cursor-pointer"
                          >
                            Detalhes
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {app.developer}
                        </p>

                        {/* Unboxed technical metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums pt-1">
                          <span>v{app.verification.version}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <HardDrive className="w-3 h-3" />
                            {app.verification.fileSize}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{app.verification.platforms.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onLaunchApp(app)}
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Abrir / Executar App
                      </button>

                      <button
                        type="button"
                        disabled={isDownloading}
                        onClick={() => handleTriggerDownload(app)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer ${
                          isDownloaded
                            ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {isDownloading ? (
                          <span>Gerando Pacote...</span>
                        ) : isDownloaded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Pacote Baixado
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            Baixar ({app.verification.fileSize})
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Tab 2: Receipts History */}
      {activeTab === 'receipts' && (
        <>
          {receipts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <ReceiptIcon className="w-6 h-6" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Nenhum recibo emitido ainda
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Todas as aquisições e instalações geram um comprovante com código de transação auditável.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {receipts.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                          Recibo #{rec.id}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          Autenticado
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                        Emitido em {rec.date} · Método: {rec.paymentMethod} · Hash: {rec.transactionCode}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Total Liquidado</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                        {formatBRL(rec.total)}
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {rec.items.map((item) => (
                      <div
                        key={item.appId}
                        className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {item.name}
                          </span>
                          <span className="text-slate-400 ml-2 font-mono">
                            {item.developer} · v{item.version}
                          </span>
                        </div>
                        <span className="font-mono tabular-nums font-medium text-slate-700 dark:text-slate-300">
                          {formatBRL(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
