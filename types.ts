export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string; // e.g., "Best Seller", "New"
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  type: 'sauce' | 'rub';
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}