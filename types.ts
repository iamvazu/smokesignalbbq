export type Category = 'bbq' | 'sauce';
export type SubCategory = 'wings' | 'chicken' | 'beef' | 'pork' | 'sauces' | 'all';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: string;
  priceValue: number;
  image: string;
  category: Category;
  subCategory: SubCategory;
  weight?: string;
  volume?: string;
  badges: string[];
  heatingInstructions?: string;
  ingredients?: string;
  storageInstructions?: string;
  relatedProductIds?: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}