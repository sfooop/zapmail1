export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  image?: string;
  excerpt?: string;
}

export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  stripePriceId?: string;
}

export interface User {
  email: string;
  isPremium: boolean;
}
