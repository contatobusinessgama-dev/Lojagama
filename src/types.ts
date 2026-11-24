export type AppCategory = 'Produtividade' | 'Jogos' | 'Finanças' | 'Utilitários' | 'Design';

export type PlatformType = 'iOS' | 'Android' | 'Web' | 'Desktop';

export interface AppPermission {
  id: string;
  name: string;
  description: string;
  criticality: 'Baixa' | 'Moderada' | 'Essencial';
}

export interface AppReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  version: string;
}

export interface AppScreenshot {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  aspectColor: string;
}

export interface StoreApp {
  id: string;
  name: string;
  tagline: string;
  developer: string;
  category: AppCategory;
  price: number; // 0 for Free
  rating: number;
  reviewCount: number;
  downloadsCount: string;
  isFeatured?: boolean;
  featuredHeadline?: string;
  iconBg: string;
  iconAccent: string;
  iconSymbol: string;
  heroImage: string;
  verification: {
    verified: boolean;
    signatureHash: string;
    fileSize: string;
    version: string;
    lastUpdated: string;
    platforms: PlatformType[];
    privacyScore: string;
    permissions: AppPermission[];
  };
  description: string;
  highlights: string[];
  screenshots: AppScreenshot[];
  reviews: AppReview[];
}

export interface Receipt {
  id: string;
  date: string;
  items: {
    appId: string;
    name: string;
    developer: string;
    price: number;
    version: string;
  }[];
  total: number;
  paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Licença Gratuita';
  transactionCode: string;
}
