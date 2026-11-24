import React, { useState, useEffect } from 'react';
import { StoreApp } from '../types';
import { AppIconBadge } from './AppIconBadge';
import { formatBRL } from './AppCard';
import {
  X,
  Trash2,
  ShoppingBag,
  CreditCard,
  QrCode,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  cartApps: StoreApp[];
  userEmail?: string | null;
  onClose: () => void;
  onRemoveFromCart: (appId: string) => void;
  onClearCart: () => void;
  onCompletePurchase: (
    paymentMethodLabel: 'PIX (Mercado Pago)' | 'Cartão (Stripe)',
    transactionCode: string
  ) => Promise<void>;
  onOpenLibrary: () => void;
}

export const CartCheckoutDrawer: React.FC<CartCheckoutDrawerProps> = ({
  isOpen,
  cartApps,
  userEmail,
  onClose,
  onRemoveFromCart,
  onClearCart,
  onCompletePurchase,
  onOpenLibrary
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [gateway, setGateway] = useState<'MercadoPagoPIX' | 'StripeCard'>('MercadoPagoPIX');
  const [copiedPix, setCopiedPix] = useState(false);

  // Backend gateway state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastTransactionId, setLastTransactionId] = useState<string>('');
  const [lastProviderLabel, setLastProviderLabel] = useState<string>('');
  const [pixPayload, setPixPayload] = useState<string>('');

  // Stripe card fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const totalAmount = cartApps.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep('cart');
        setErrorMsg(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Pre-generate Mercado Pago PIX code when entering checkout with PIX selected
  useEffect(() => {
    if (step === 'checkout' && gateway === 'MercadoPagoPIX' && cartApps.length > 0 && !pixPayload) {
      const fallbackPix = `00020126580014BR.GOV.BCB.PIX0136mercadopago-aether-pix-${Date.now()}5204000053039865405${totalAmount.toFixed(
        2
      )}5802BR5912AETHER STORE6009SAO PAULO62070503***6304E2A1`;
      setPixPayload(fallbackPix);
    }
  }, [step, gateway, cartApps.length, pixPayload, totalAmount]);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    if (navigator.clipboard && pixPayload) {
      navigator.clipboard.writeText(pixPayload);
    }
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartApps.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setErrorMsg(null);

    const payloadItems = cartApps.map((app) => ({
      id: app.id,
      name: app.name,
      developer: app.developer,
      price: app.price,
      version: app.verification.version
    }));

    try {
      if (gateway === 'StripeCard') {
        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: payloadItems,
            customerEmail: userEmail || undefined,
            cardLast4: cardNumber.replace(/\D/g, '').slice(-4) || '4242'
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Erro ao processar pagamento via Stripe.');
        }

        setLastTransactionId(data.transactionId);
        setLastProviderLabel(data.provider || 'Stripe API');
        await onCompletePurchase('Cartão (Stripe)', data.transactionId);
        setStep('success');
      } else {
        const res = await fetch('/api/checkout/mercadopago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: payloadItems,
            payerEmail: userEmail || undefined
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Erro ao processar PIX via Mercado Pago.');
        }

        if (data.pixCopiaECola) {
          setPixPayload(data.pixCopiaECola);
        }
        setLastTransactionId(data.transactionId);
        setLastProviderLabel(data.provider || 'Mercado Pago PIX API');
        await onCompletePurchase('PIX (Mercado Pago)', data.transactionId);
        setStep('success');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado no checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {step === 'cart' && 'Carrinho de Aplicativos'}
              {step === 'checkout' && 'Checkout Stripe & Mercado Pago'}
              {step === 'success' && 'Transação Confirmada'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <>
              {cartApps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    Explore a vitrine para adicionar aplicativos verificados com licença vitalícia.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {cartApps.length} {cartApps.length === 1 ? 'aplicativo selecionado' : 'aplicativos selecionados'}
                    </span>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                    >
                      Limpar tudo
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border-y border-slate-100 dark:border-slate-800">
                    {cartApps.map((app) => (
                      <div key={app.id} className="py-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <AppIconBadge
                            iconSymbol={app.iconSymbol}
                            iconBg={app.iconBg}
                            size="sm"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {app.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {app.developer} · v{app.verification.version}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                            {formatBRL(app.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveFromCart(app.id)}
                            aria-label={`Remover ${app.name}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Processamento integrado com <strong>Stripe</strong> e <strong>Mercado Pago</strong>. Suas licenças ficam salvas na sua conta na nuvem.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-6">
              {/* Order Summary Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Resumo do Pedido ({cartApps.length} {cartApps.length === 1 ? 'item' : 'itens'})</span>
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Editar
                  </button>
                </div>
                <div className="space-y-1">
                  {cartApps.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
                      <span className="truncate pr-4">{item.name}</span>
                      <span className="font-mono tabular-nums shrink-0">{formatBRL(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Total a Pagar</span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                    {formatBRL(totalAmount)}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                  {errorMsg}
                </div>
              )}

              {/* Payment Gateway Selector: Mercado Pago PIX vs Stripe Card */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Selecione o Gateway de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGateway('MercadoPagoPIX')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
                      gateway === 'MercadoPagoPIX'
                        ? 'border-blue-600 dark:border-blue-400 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Mercado Pago · PIX
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Liberação instantânea
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGateway('StripeCard')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
                      gateway === 'StripeCard'
                        ? 'border-blue-600 dark:border-blue-400 bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Stripe · Cartão
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Crédito 1x sem juros
                    </span>
                  </button>
                </div>
              </div>

              {/* Conditional Payment Details */}
              {gateway === 'MercadoPagoPIX' ? (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4 text-center">
                  <div className="mx-auto w-36 h-36 rounded-xl bg-white p-3 border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                    <QrCode className="w-24 h-24 text-slate-900" />
                    <span className="text-[10px] font-mono text-slate-500 mt-1">MERCADO PAGO PIX</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Escaneie o QR Code ou copie o código PIX
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Ao clicar em Confirmar abaixo, a API do Mercado Pago registrará a liquidação imediata.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Código PIX Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar Código PIX Copia e Cola
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Nome Impresso no Cartão *
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Ex: MARINA VASCONCELOS"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Número do Cartão (Stripe Checkout) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Validade *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/29"
                        className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="842"
                        className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Licenças Liberadas com Sucesso
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  O pagamento foi confirmado via <strong>{lastProviderLabel}</strong> e os instaladores verificados já estão disponíveis na sua biblioteca.
                </p>
              </div>
              {lastTransactionId && (
                <div className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
                  ID da Transação: {lastTransactionId}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLibrary();
                }}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
              >
                Acessar Meus Apps e Recibos
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step !== 'success' && cartApps.length > 0 && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Subtotal de Licenças</span>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                {formatBRL(totalAmount)}
              </span>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Prosseguir para o Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-3.5 px-5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processando com {gateway === 'StripeCard' ? 'Stripe' : 'Mercado Pago'}...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirmar {gateway === 'StripeCard' ? 'Cartão via Stripe' : 'PIX via Mercado Pago'} · {formatBRL(totalAmount)}
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
