/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { STORE_APPS, CATEGORIES } from './data/apps';
import { StoreApp, AppCategory, Receipt, AppReview } from './types';
import { AppCard, formatBRL } from './components/AppCard';
import { AppIconBadge } from './components/AppIconBadge';
import { ResilientImage } from './components/ResilientImage';
import { AppDetailModal } from './components/AppDetailModal';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { UserLibraryView } from './components/UserLibraryView';
import { InteractiveAppRuntimeModal } from './components/InteractiveAppRuntimeModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType
} from './lib/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  query,
  where
} from 'firebase/firestore';
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  Star,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  X,
  SlidersHorizontal,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

const STORAGE_KEYS = {
  CART: 'aether_store_cart_v1',
  OWNED: 'aether_store_owned_v1',
  RECEIPTS: 'aether_store_receipts_v1',
  THEME: 'aether_store_theme_v1'
};

const CAROUSEL_CATEGORIES: AppCategory[] = [
  'Produtividade',
  'Design',
  'Finanças',
  'Jogos',
  'Utilitários'
];

function StorefrontContent() {
  // Theme state (Light / Dark)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  // Firebase Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  // Apps catalog state (supports real-time Firestore community reviews)
  const [appsCatalog, setAppsCatalog] = useState<StoreApp[]>(STORE_APPS);

  // Navigation & Active App Detail state
  const [activeView, setActiveView] = useState<'store' | 'library'>('store');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [runningApp, setRunningApp] = useState<StoreApp | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Real-time search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | AppCategory>('Todos');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [minRating, setMinRating] = useState<number>(0);

  // Persistent Cart, Owned Apps, and Receipts (localStorage + Cloud Firestore Sync)
  const [cartIds, setCartIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [ownedIds, setOwnedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.OWNED);
      return raw ? JSON.parse(raw) : ['krono-tasks'];
    } catch {
      return ['krono-tasks'];
    }
  });

  const [receipts, setReceipts] = useState<Receipt[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Keep localStorage synced as immediate fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartIds));
    } catch {
      // ignore
    }
  }, [cartIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OWNED, JSON.stringify(ownedIds));
    } catch {
      // ignore
    }
  }, [ownedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
    } catch {
      // ignore
    }
  }, [receipts]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Listen to user's Firestore UserVault and Receipts subcollection when authenticated
  useEffect(() => {
    if (!isAuthReady || !currentUser) return;

    const vaultPath = `user_vaults/${currentUser.uid}`;
    const vaultRef = doc(db, 'user_vaults', currentUser.uid);

    const unsubVault = onSnapshot(
      vaultRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data.cartIds)) {
            setCartIds(data.cartIds.slice(0, 30));
          }
          if (Array.isArray(data.ownedIds)) {
            setOwnedIds(data.ownedIds.slice(0, 50));
          }
        } else {
          // Initialize UserVault document in Firestore adhering strictly to firebase-blueprint.json
          try {
            const safeDisplayName = (currentUser.displayName || 'Usuário Aether').slice(0, 120);
            await setDoc(vaultRef, {
              uid: currentUser.uid,
              displayName: safeDisplayName,
              cartIds: cartIds.slice(0, 30),
              ownedIds: ownedIds.slice(0, 50),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          } catch (error) {
            handleFirestoreError(error, OperationType.CREATE, vaultPath);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, vaultPath);
      }
    );

    const receiptsPath = `user_vaults/${currentUser.uid}/receipts`;
    const receiptsQuery = query(
      collection(db, 'user_vaults', currentUser.uid, 'receipts'),
      where('uid', '==', currentUser.uid)
    );

    const unsubReceipts = onSnapshot(
      receiptsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudReceipts: Receipt[] = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            const itemIds: string[] = Array.isArray(d.itemIds) ? d.itemIds : [];
            const mappedItems = itemIds.map((id) => {
              const found = STORE_APPS.find((a) => a.id === id);
              return {
                appId: id,
                name: found ? found.name : id,
                developer: found ? found.developer : 'Desenvolvedor Verificado',
                price: found ? found.price : 0,
                version: found ? found.verification.version : '1.0.0'
              };
            });
            return {
              id: String(d.receiptCode || docSnap.id),
              date: String(d.dateLabel || ''),
              items: mappedItems,
              total: Number(d.total || 0),
              paymentMethod: (d.paymentMethod || 'PIX') as Receipt['paymentMethod'],
              transactionCode: String(d.transactionCode || '')
            };
          });
          setReceipts(cloudReceipts);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, receiptsPath);
      }
    );

    return () => {
      unsubVault();
      unsubReceipts();
    };
  }, [isAuthReady, currentUser]);

  // Listen to public community reviews from Firestore (`app_reviews`)
  useEffect(() => {
    if (!isAuthReady) return;

    const reviewsPath = 'app_reviews';
    const reviewsQuery = query(
      collection(db, 'app_reviews'),
      where('rating', '>=', 1)
    );

    const unsubReviews = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        if (snapshot.empty) return;
        const cloudReviewsByApp: Record<string, AppReview[]> = {};
        snapshot.docs.forEach((docSnap) => {
          const d = docSnap.data();
          const appId = String(d.appId || '');
          if (!cloudReviewsByApp[appId]) {
            cloudReviewsByApp[appId] = [];
          }
          cloudReviewsByApp[appId].push({
            id: docSnap.id,
            author: String(d.author || 'Usuário'),
            role: String(d.role || 'Membro Verificado'),
            rating: Number(d.rating || 5),
            date: String(d.dateLabel || 'Hoje'),
            comment: String(d.comment || ''),
            version: String(d.version || '1.0')
          });
        });

        setAppsCatalog(
          STORE_APPS.map((baseApp) => {
            const extra = cloudReviewsByApp[baseApp.id] || [];
            if (extra.length === 0) return baseApp;
            const combined = [...extra, ...baseApp.reviews];
            const totalScore =
              baseApp.rating * baseApp.reviewCount +
              extra.reduce((acc, r) => acc + r.rating, 0);
            const newCount = baseApp.reviewCount + extra.length;
            return {
              ...baseApp,
              rating: Number((totalScore / newCount).toFixed(1)),
              reviewCount: newCount,
              reviews: combined
            };
          })
        );
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, reviewsPath);
      }
    );

    return () => unsubReviews();
  }, [isAuthReady]);

  // Helper to sync cartIds & ownedIds to Firestore if authenticated
  const syncVaultToCloud = async (nextCartIds: string[], nextOwnedIds: string[]) => {
    if (!currentUser) return;
    const vaultPath = `user_vaults/${currentUser.uid}`;
    const vaultRef = doc(db, 'user_vaults', currentUser.uid);
    try {
      await updateDoc(vaultRef, {
        cartIds: nextCartIds.slice(0, 30),
        ownedIds: nextOwnedIds.slice(0, 50),
        displayName: (currentUser.displayName || 'Usuário Aether').slice(0, 120),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, vaultPath);
    }
  };

  // Sign in / Sign out handlers
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      triggerToast(`Bem-vindo(a), ${result.user.displayName || result.user.email}! Conta sincronizada.`);
    } catch (error) {
      console.error('Erro no login Google:', error);
      triggerToast('Não foi possível concluir o login com Google.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      triggerToast('Sessão encerrada.');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const featuredApp = useMemo(
    () => appsCatalog.find((a) => a.isFeatured) || appsCatalog[0],
    [appsCatalog]
  );

  const selectedApp = useMemo(
    () => appsCatalog.find((a) => a.id === selectedAppId) || null,
    [appsCatalog, selectedAppId]
  );

  const cartApps = useMemo(
    () => appsCatalog.filter((a) => cartIds.includes(a.id)),
    [appsCatalog, cartIds]
  );

  const ownedApps = useMemo(
    () => appsCatalog.filter((a) => ownedIds.includes(a.id)),
    [appsCatalog, ownedIds]
  );

  // Filtered apps for search / filter bar
  const isFilteringActive =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'Todos' ||
    priceFilter !== 'all' ||
    minRating > 0;

  const filteredApps = useMemo(() => {
    return appsCatalog.filter((app) => {
      const matchesQuery =
        searchQuery.trim() === '' ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todos' || app.category === selectedCategory;

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' && app.price === 0) ||
        (priceFilter === 'paid' && app.price > 0);

      const matchesRating = app.rating >= minRating;

      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });
  }, [appsCatalog, searchQuery, selectedCategory, priceFilter, minRating]);

  // Primary Action Handler (Install Free App, Add Paid App to Cart, or Open Cart/Library)
  const handlePrimaryAppAction = async (app: StoreApp, e: React.MouseEvent) => {
    e.stopPropagation();

    if (ownedIds.includes(app.id)) {
      setRunningApp(app);
      return;
    }

    if (app.price === 0) {
      // Immediate verified installation for free apps
      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const receiptCode = `FREE-${Math.floor(100000 + Math.random() * 900000)}`;
      const txCode = `SHA256-LIC-${app.id.toUpperCase().slice(0, 8)}`;

      const nextOwned = ownedIds.includes(app.id) ? ownedIds : [...ownedIds, app.id];
      const freeReceipt: Receipt = {
        id: receiptCode,
        date: dateStr,
        items: [
          {
            appId: app.id,
            name: app.name,
            developer: app.developer,
            price: 0,
            version: app.verification.version
          }
        ],
        total: 0,
        paymentMethod: 'Licença Gratuita',
        transactionCode: txCode
      };

      setOwnedIds(nextOwned);
      setReceipts((prev) => [freeReceipt, ...prev]);

      if (currentUser) {
        const batch = writeBatch(db);
        const vaultRef = doc(db, 'user_vaults', currentUser.uid);
        const recId = `rec_${Date.now()}`;
        const recRef = doc(db, 'user_vaults', currentUser.uid, 'receipts', recId);

        batch.update(vaultRef, {
          cartIds: cartIds.slice(0, 30),
          ownedIds: nextOwned.slice(0, 50),
          displayName: (currentUser.displayName || 'Usuário Aether').slice(0, 120),
          updatedAt: serverTimestamp()
        });

        batch.set(recRef, {
          uid: currentUser.uid,
          receiptCode: receiptCode.slice(0, 64),
          dateLabel: dateStr.slice(0, 64),
          itemsSummary: `${app.name} (v${app.verification.version})`.slice(0, 1000),
          itemIds: [app.id],
          total: 0,
          paymentMethod: 'Licença Gratuita',
          transactionCode: txCode.slice(0, 128),
          status: 'completed',
          createdAt: serverTimestamp()
        });

        try {
          await batch.commit();
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `user_vaults/${currentUser.uid}/receipts/${recId}`);
        }
      }

      triggerToast(`${app.name} instalado e adicionado em Meus Apps!`);
      return;
    }

    // Paid app -> Add to cart or open cart drawer if already in cart
    if (cartIds.includes(app.id)) {
      setIsCartOpen(true);
    } else {
      const nextCart = [...cartIds, app.id].slice(0, 30);
      setCartIds(nextCart);
      await syncVaultToCloud(nextCart, ownedIds);
      triggerToast(`${app.name} adicionado ao carrinho.`);
    }
  };

  const handleRemoveFromCart = async (appId: string) => {
    const nextCart = cartIds.filter((id) => id !== appId);
    setCartIds(nextCart);
    await syncVaultToCloud(nextCart, ownedIds);
  };

  const handleClearCart = async () => {
    setCartIds([]);
    await syncVaultToCloud([], ownedIds);
  };

  const handleCompletePurchase = async (
    paymentMethodLabel: 'PIX (Mercado Pago)' | 'Cartão (Stripe)',
    transactionCode: string
  ) => {
    if (cartApps.length === 0) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const receiptCode = `AETH-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalPaid = cartApps.reduce((acc, a) => acc + a.price, 0);
    const purchasedIds = cartApps.map((a) => a.id);
    const nextOwned = Array.from(new Set([...ownedIds, ...purchasedIds])).slice(0, 50);

    const newReceipt: Receipt = {
      id: receiptCode,
      date: dateStr,
      items: cartApps.map((app) => ({
        appId: app.id,
        name: app.name,
        developer: app.developer,
        price: app.price,
        version: app.verification.version
      })),
      total: totalPaid,
      paymentMethod: paymentMethodLabel === 'PIX (Mercado Pago)' ? 'PIX' : 'Cartão de Crédito',
      transactionCode
    };

    setOwnedIds(nextOwned);
    setReceipts((prev) => [newReceipt, ...prev]);
    setCartIds([]);

    if (currentUser) {
      const batch = writeBatch(db);
      const vaultRef = doc(db, 'user_vaults', currentUser.uid);
      const recId = `rec_${Date.now()}`;
      const recRef = doc(db, 'user_vaults', currentUser.uid, 'receipts', recId);

      batch.update(vaultRef, {
        cartIds: [],
        ownedIds: nextOwned,
        displayName: (currentUser.displayName || 'Usuário Aether').slice(0, 120),
        updatedAt: serverTimestamp()
      });

      batch.set(recRef, {
        uid: currentUser.uid,
        receiptCode: receiptCode.slice(0, 64),
        dateLabel: dateStr.slice(0, 64),
        itemsSummary: cartApps
          .map((a) => `${a.name} (v${a.verification.version})`)
          .join(', ')
          .slice(0, 1000),
        itemIds: purchasedIds.slice(0, 25),
        total: Number(totalPaid.toFixed(2)),
        paymentMethod: paymentMethodLabel.slice(0, 64),
        transactionCode: transactionCode.slice(0, 128),
        status: 'completed',
        createdAt: serverTimestamp()
      });

      try {
        await batch.commit();
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `user_vaults/${currentUser.uid}/receipts/${recId}`);
      }
    }

    triggerToast('Compra confirmada! Licenças sincronizadas em Meus Apps.');
  };

  // Add user review to an app (persisted in Firestore when signed in, plus local state)
  const handleAddReview = async (
    appId: string,
    author: string,
    role: string,
    rating: number,
    comment: string
  ) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const targetApp = appsCatalog.find((a) => a.id === appId);
    const versionStr = targetApp ? targetApp.verification.version : '1.0.0';

    if (currentUser) {
      const reviewId = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const reviewRef = doc(db, 'app_reviews', reviewId);
      try {
        await setDoc(reviewRef, {
          appId: appId.slice(0, 128),
          authorUid: currentUser.uid,
          author: author.slice(0, 80),
          role: (role || 'Usuário Verificado').slice(0, 80),
          rating: Math.min(5, Math.max(1, Number(rating))),
          comment: comment.slice(0, 1000),
          dateLabel: dateStr.slice(0, 40),
          version: versionStr.slice(0, 32),
          createdAt: serverTimestamp()
        });
        triggerToast('Avaliação publicada no banco de dados!');
        return;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `app_reviews/${reviewId}`);
      }
    }

    // Local preview update for unauthenticated visitors
    setAppsCatalog((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const newReview = {
          id: `rev-${Date.now()}`,
          author,
          role,
          rating,
          date: dateStr,
          comment,
          version: app.verification.version
        };
        const updatedReviews = [newReview, ...app.reviews];
        const totalRating = app.rating * app.reviewCount + rating;
        const newCount = app.reviewCount + 1;
        return {
          ...app,
          rating: Number((totalRating / newCount).toFixed(1)),
          reviewCount: newCount,
          reviews: updatedReviews
        };
      })
    );
    triggerToast('Avaliação publicada localmente! Faça login para salvar na nuvem.');
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setPriceFilter('all');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col">
      {/* Top Bar Contract: Strict 3-Zone Single Row Navigation */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand wordmark */}
          <a
            href="#vitrine"
            onClick={(e) => {
              e.preventDefault();
              setSelectedAppId(null);
              setActiveView('store');
              resetAllFilters();
            }}
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 font-display"
          >
            Aether Store
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a
              href="#vitrine"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAppId(null);
                setActiveView('store');
                setSelectedCategory('Todos');
              }}
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeView === 'store' && selectedCategory === 'Todos' && !selectedAppId
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : ''
              }`}
            >
              Vitrine
            </a>
            <a
              href="#produtividade"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAppId(null);
                setActiveView('store');
                setSelectedCategory('Produtividade');
              }}
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeView === 'store' && selectedCategory === 'Produtividade'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : ''
              }`}
            >
              Produtividade
            </a>
            <a
              href="#design"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAppId(null);
                setActiveView('store');
                setSelectedCategory('Design');
              }}
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeView === 'store' && selectedCategory === 'Design'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : ''
              }`}
            >
              Design
            </a>
            <a
              href="#jogos"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAppId(null);
                setActiveView('store');
                setSelectedCategory('Jogos');
              }}
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeView === 'store' && selectedCategory === 'Jogos'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : ''
              }`}
            >
              Jogos
            </a>
            <a
              href="#meus-apps"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAppId(null);
                setActiveView('library');
              }}
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeView === 'library'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : ''
              }`}
            >
              Meus Apps ({ownedIds.length})
            </a>
          </nav>

          {/* Zone 3: 1 primary action (Carrinho CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Carrinho ({cartIds.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedApp ? (
          <AppDetailModal
            app={selectedApp}
            isOwned={ownedIds.includes(selectedApp.id)}
            isInCart={cartIds.includes(selectedApp.id)}
            onClose={() => setSelectedAppId(null)}
            onPrimaryAction={handlePrimaryAppAction}
            onOpenLibrary={() => {
              setSelectedAppId(null);
              setActiveView('library');
            }}
            onLaunchApp={(appToRun) => setRunningApp(appToRun)}
            onAddReview={handleAddReview}
          />
        ) : activeView === 'library' ? (
          <UserLibraryView
            ownedApps={ownedApps}
            receipts={receipts}
            isAuthenticated={Boolean(currentUser)}
            userEmail={currentUser?.email}
            onSelectApp={(app) => setSelectedAppId(app.id)}
            onLaunchApp={(appToRun) => setRunningApp(appToRun)}
            onExploreStore={() => setActiveView('store')}
            onSignIn={handleGoogleSignIn}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Workspace Utility & Real-Time Search / Filter Toolbar */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Real-Time Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar aplicativos por nome, desenvolvedor, funcionalidade ou categoria..."
                    className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar busca"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Price, Minimum Rating, User Account & Theme Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Price Filter Segmented Control */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl">
                    {(
                      [
                        { id: 'all', label: 'Todos' },
                        { id: 'free', label: 'Grátis' },
                        { id: 'paid', label: 'Pagos' }
                      ] as const
                    ).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriceFilter(p.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          priceFilter === p.id
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Minimum Rating Selector */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl">
                    <span className="text-xs text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1 whitespace-nowrap">
                      <SlidersHorizontal className="w-3 h-3" />
                      Nota:
                    </span>
                    {[
                      { val: 0, label: 'Todas' },
                      { val: 4.7, label: '4.7+' },
                      { val: 4.9, label: '4.9' }
                    ].map((r) => (
                      <button
                        key={r.val}
                        type="button"
                        onClick={() => setMinRating(r.val)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono tabular-nums font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          minRating === r.val
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  {/* User Account Login / Logout Button */}
                  {currentUser ? (
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/50 dark:bg-emerald-950/30 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                      <UserCheck className="w-3.5 h-3.5 shrink-0" />
                      <span className="max-w-[110px] truncate">
                        {currentUser.displayName || currentUser.email}
                      </span>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        title="Sair da conta"
                        className="ml-1 p-0.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Entrar
                    </button>
                  )}

                  {/* Light / Dark Mode Switch */}
                  <button
                    type="button"
                    onClick={() => setIsDark(!isDark)}
                    aria-label="Alternar tema claro ou escuro"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Category Filter Bar + Mobile Library Quick Button */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveView('library')}
                  className="md:hidden px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Meus Apps ({ownedIds.length})
                </button>
              </div>
            </section>

            {/* Featured "App da Semana" Spotlight Banner (shown when not filtering) */}
            {!isFilteringActive && (
              <section
                onClick={() => setSelectedAppId(featuredApp.id)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md cursor-pointer grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Left Editorial Column (6 cols) */}
                <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                      <span>App da Semana</span>
                      <span aria-hidden="true">·</span>
                      <span>Auditoria de Segurança Nível AAA</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <AppIconBadge
                        iconSymbol={featuredApp.iconSymbol}
                        iconBg={featuredApp.iconBg}
                        size="lg"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            {featuredApp.name}
                          </h1>
                          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {featuredApp.developer} · {featuredApp.category}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-xl"
                      style={{ textWrap: 'balance' }}
                    >
                      {featuredApp.featuredHeadline || featuredApp.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed max-w-xl">
                      {featuredApp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-slate-300">
                      <span className="text-lg font-bold text-white">
                        {formatBRL(featuredApp.price)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {featuredApp.rating.toFixed(1)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>v{featuredApp.verification.version}</span>
                      <span aria-hidden="true">·</span>
                      <span>{featuredApp.verification.fileSize}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => handlePrimaryAppAction(featuredApp, e)}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
                      >
                        {ownedIds.includes(featuredApp.id) ? (
                          <>
                            <Download className="w-4 h-4" />
                            Abrir na Biblioteca
                          </>
                        ) : cartIds.includes(featuredApp.id) ? (
                          <>
                            <Check className="w-4 h-4" />
                            No Carrinho
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            Comprar · {formatBRL(featuredApp.price)}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right High-Fidelity Media Showcase Column (6 cols) */}
                <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[380px] bg-slate-950 overflow-hidden">
                  <ResilientImage
                    src={featuredApp.heroImage}
                    alt={featuredApp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
                </div>
              </section>
            )}

            {/* Filtered Grid Results OR Category Horizontal Carousels */}
            {isFilteringActive ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Resultados da Busca e Filtros
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono tabular-nums">
                      {filteredApps.length}{' '}
                      {filteredApps.length === 1
                        ? 'aplicativo verificado encontrado'
                        : 'aplicativos verificados encontrados'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Limpar filtros
                  </button>
                </div>

                {filteredApps.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      Nenhum aplicativo corresponde aos critérios selecionados
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Experimente remover o filtro de preço ou reduzir a nota mínima exigida.
                    </p>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Restaurar Catálogo Completo
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApps.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        isOwned={ownedIds.includes(app.id)}
                        isInCart={cartIds.includes(app.id)}
                        onSelect={(a) => setSelectedAppId(a.id)}
                        onPrimaryAction={handlePrimaryAppAction}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <div className="space-y-12">
                {CAROUSEL_CATEGORIES.map((category) => {
                  const categoryApps = appsCatalog.filter((a) => a.category === category);
                  if (categoryApps.length === 0) return null;

                  return (
                    <CategoryCarouselSection
                      key={category}
                      category={category}
                      apps={categoryApps}
                      ownedIds={ownedIds}
                      cartIds={cartIds}
                      onSelectApp={(app) => setSelectedAppId(app.id)}
                      onPrimaryAction={handlePrimaryAppAction}
                      onViewAllCategory={() => setSelectedCategory(category)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-display">
              Aether Store
            </span>
            <span aria-hidden="true">·</span>
            <span>Catálogo de Aplicativos Verificados com SHA-256 & Checkout Seguro</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setSelectedAppId(null);
                setActiveView('store');
                resetAllFilters();
              }}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Vitrine
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedAppId(null);
                setActiveView('library');
              }}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Meus Apps
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Carrinho ({cartIds.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Slide-Over Cart & Checkout Drawer */}
      <CartCheckoutDrawer
        isOpen={isCartOpen}
        cartApps={cartApps}
        userEmail={currentUser?.email}
        onClose={() => setIsCartOpen(false)}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCompletePurchase={handleCompletePurchase}
        onOpenLibrary={() => {
          setSelectedAppId(null);
          setActiveView('library');
        }}
      />

      {/* Interactive App Runtime Sandbox Modal */}
      {runningApp && (
        <InteractiveAppRuntimeModal
          app={runningApp}
          onClose={() => setRunningApp(null)}
        />
      )}

      {/* Non-intrusive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-lg border border-slate-700 dark:border-slate-300 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150">
          <ShieldCheck className="w-4 h-4 text-blue-400 dark:text-blue-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <StorefrontContent />
    </ErrorBoundary>
  );
}

interface CategoryCarouselSectionProps {
  category: AppCategory;
  apps: StoreApp[];
  ownedIds: string[];
  cartIds: string[];
  onSelectApp: (app: StoreApp) => void;
  onPrimaryAction: (app: StoreApp, e: React.MouseEvent) => void;
  onViewAllCategory: () => void;
}

const CategoryCarouselSection: React.FC<CategoryCarouselSectionProps> = ({
  category,
  apps,
  ownedIds,
  cartIds,
  onSelectApp,
  onPrimaryAction,
  onViewAllCategory
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const categoryDescriptions: Record<AppCategory, string> = {
    Produtividade: 'Gestão executiva de tempo, escrita Markdown e foco profundo sem distrações.',
    Design: 'Modelagem vetorial paramétrica, calibração perceptual de cores e tipografia.',
    Finanças: 'Controle patrimonial com criptografia local e divisão multimoeda.',
    Jogos: 'Experiências táticas e arquitetônicas completas sem microtransações.',
    Utilitários: 'Segurança de rede, firewall auditado e compressão Zstandard.'
  };

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {category}
            </h2>
            <span className="text-xs font-mono tabular-nums text-slate-400">
              {apps.length} {apps.length === 1 ? 'app' : 'apps'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {categoryDescriptions[category]}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onViewAllCategory}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mr-2 cursor-pointer"
          >
            Ver categoria
          </button>
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label={`Rolar ${category} para a esquerda`}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label={`Rolar ${category} para a direita`}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
      >
        {apps.map((app) => (
          <div
            key={app.id}
            className="w-[330px] sm:w-[370px] shrink-0 snap-start flex flex-col"
          >
            <AppCard
              app={app}
              isOwned={ownedIds.includes(app.id)}
              isInCart={cartIds.includes(app.id)}
              onSelect={onSelectApp}
              onPrimaryAction={onPrimaryAction}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
