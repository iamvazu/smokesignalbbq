export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number; // For calculations
  variants?: { name: string; price: number }[];
  image: string;
  tag?: string;
  category?: 'burgers' | 'steaks' | 'wings' | 'ribs' | 'sides';
  isVeg?: boolean;
  alt?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number; // For calculations
  image: string;
  type: 'sauce' | 'rub';
  alt?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}