export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'lipgloss' | 'lipstick' | 'skincare' | 'treatment' | 'bundle';
  price: number;
  originalPrice?: number;
  volume: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  badge?: string;
  shade?: string;
  finish?: string;
  keyIngredients: string[];
  lipProfile?: {
    finish: string;
    shade: string;
    formula: string;
    texture: string;
  };
  notes?: {
    top: string;
    heart: string;
    base: string;
  };
  benefits: string[];
  usage: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Ingredient {
  id: string;
  name: string;
  action: string;
  iconName: string;
  origin: string;
  description: string;
  benefits: string[];
  featuredIn: string[];
  color: string;
}
