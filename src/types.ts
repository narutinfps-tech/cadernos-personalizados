export interface Plan {
  id: 'basic' | 'complete';
  name: string;
  subtitle: string;
  popular: boolean;
  originalPrice: string;
  price: string;
  features: string[];
  cta: string;
  badge?: string;
  notes?: string;
}

export interface Bonus {
  id: number;
  number: string;
  title: string;
  description: string;
  points: string[];
  originalPrice: string;
  finalPrice: string;
  image?: string;
}

export interface Review {
  id: number;
  text: string;
  author: string;
  role: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
