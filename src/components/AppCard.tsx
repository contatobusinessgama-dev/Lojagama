import React from 'react';
import { StoreApp } from '../types';
import { AppIconBadge } from './AppIconBadge';
import { Star, ShieldCheck, Check, ShoppingBag, Download } from 'lucide-react';

interface AppCardProps {
  app: StoreApp;
  isOwned: boolean;
  isInCart: boolean;
  onSelect: (app: StoreApp) => void;
  onPrimaryAction: (app: StoreApp, e: React.MouseEvent) => void;
}

export const formatBRL = (value: number): string => {
  if (value === 0) return 'Grátis';
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

export const AppCard: React.FC<AppCardProps> = ({
  app,
  isOwned,
  isInCart,
  onSelect,
  onPrimaryAction
}) => {
  return (
    <article
      onClick={() => onSelect(app)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md cursor-pointer flex flex-col justify-between gap-4"
    >
      {/* Top row: Icon + Title & Unboxed Metadata */}
      <div className="flex items-start gap-4">
        <AppIconBadge iconSymbol={app.iconSymbol} iconBg={app.iconBg} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {app.name}
            </h3>
            {app.verification.verified && (
              <ShieldCheck
                className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0"
                aria-label="App Verificado"
              />
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {app.developer}
          </p>
          {/* Zero-Pill Metadata Discipline: Clean unboxed text with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono tabular-nums">
            <span className="font-sans text-slate-600 dark:text-slate-300">{app.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-medium">
              <Star className="w-3 h-3 fill-current" />
              {app.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{app.verification.fileSize}</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
        {app.tagline}
      </p>

      {/* Footer row: Price & Action button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {app.price === 0 ? 'Licença Completa' : 'Compra Única'}
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            {formatBRL(app.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => onPrimaryAction(app, e)}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 ${
            isOwned
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70'
              : isInCart
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
              : app.price === 0
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
          }`}
        >
          {isOwned ? (
            <>
              <Download className="w-3.5 h-3.5" />
              Na Biblioteca
            </>
          ) : isInCart ? (
            <>
              <Check className="w-3.5 h-3.5" />
              No Carrinho
            </>
          ) : app.price === 0 ? (
            <>
              <Download className="w-3.5 h-3.5" />
              Instalar
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </article>
  );
};
