import { MenuItem, ProductItem, Testimonial } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Menu', href: '#menu' },
  { name: 'Sauces', href: '#sauces' },
  { name: 'Story', href: '#story' },
  { name: 'Contact', href: '#contact' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'brisket',
    name: 'Smoked Brisket',
    description: 'Slow-smoked for 14 hours over oak charcoal. Tender, juicy, and packed with authentic flavor.',
    price: 'Market Price',
    priceValue: 0,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    tag: 'Signature',
    category: 'steaks',
    isVeg: false
  },
  {
    id: 'ribs',
    name: 'Smoked Pork Ribs',
    description: 'Fall-off-the-bone pork ribs glazed with our signature sticky BBQ sauce.',
    price: '₹450 Onwards',
    priceValue: 450,
    image: '/pork_ribs_menu.jpg',
    tag: 'Best Seller',
    category: 'ribs',
    isVeg: false
  },
  {
    id: 'burger-steak',
    name: 'Pepper Garlic Steak Burger',
    description: 'Juicy charcoal-grilled patty topped with pepper garlic sauce, fresh lettuce, and tomatoes.',
    price: '₹250 / ₹350',
    priceValue: 250,
    variants: [
      { name: 'Single', price: 250 },
      { name: 'Regular', price: 350 }
    ],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'burgers',
    isVeg: false
  },
  {
    id: 'wings',
    name: 'Texas Style Saucy Wings',
    description: 'Crispy smoked wings tossed in your choice of BBQ, Buffalo, or Peri Peri sauce.',
    price: '₹180',
    priceValue: 180,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    category: 'wings',
    isVeg: false
  },
  {
    id: 'strips-beef',
    name: 'BBQ Beef Strips',
    description: 'Tender strips of marinated beef, grilled to perfection over open coals.',
    price: '₹300',
    priceValue: 300,
    image: '/beef_strips_menu.jpg',
    category: 'steaks',
    isVeg: false
  },
  {
    id: 'peri-burger',
    name: 'Peri Peri Steak Burger',
    description: 'A spicy kick! Charcoal grilled patty with our house-made spicy Peri Peri sauce.',
    price: '₹250 / ₹350',
    priceValue: 250,
    variants: [
      { name: 'Single', price: 250 },
      { name: 'Regular', price: 350 }
    ],
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    category: 'burgers',
    isVeg: false
  },
];

export const SAUCES: ProductItem[] = [
  {
    id: 'texas-sauce',
    name: 'Classic Texas Sauce',
    description: 'Our signature tangy and smoky blend. The perfect all-rounder.',
    price: '₹350',
    priceValue: 350,
    image: '/Texas_Sauce.jpg',
    type: 'sauce'
  },
  {
    id: 'brisket-sauce',
    name: 'Brisket Master Blend',
    description: 'Deep, rich flavors crafted specifically to enhance smoked beef.',
    price: '₹380',
    priceValue: 380,
    image: '/brisket_sauce.jpg',
    type: 'sauce'
  },
  {
    id: 'rib-glaze',
    name: 'Sticky Rib Glaze',
    description: 'Sweet and sticky finish that gives ribs that perfect shine.',
    price: '₹350',
    priceValue: 350,
    image: '/Pork_Ribs.jpg', // Using user provided image
    type: 'sauce'
  },
  {
    id: 'wing-sauce',
    name: 'Spicy Wing Coating',
    description: 'A fiery blend for coating wings or dipping fried treats.',
    price: '₹320',
    priceValue: 320,
    image: '/Saucy_Wings.jpg', // Using user provided image
    type: 'sauce'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Rahul K.', text: 'Best brisket in Bangalore, hands down. The smoky flavor is authentic Texas style.', rating: 5 },
  { id: 2, name: 'Sarah J.', text: 'The ribs literally fell off the bone. And that spicy sauce? Incredible.', rating: 5 },
  { id: 3, name: 'Arun M.', text: 'Been coming here since the food truck days in 2011. Quality never drops.', rating: 5 },
];

export const CONTACT_INFO = {
  phone: '8147093243',
  location: 'RS Palaya, Kammanahalli, Bangalore',
  gpay: '9886328867',
  whatsapp: 'https://wa.me/918147093243',
};