import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, ProductItem } from './types';

export interface CartItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: MenuItem | ProductItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, update: 'increase' | 'decrease') => void;
    toggleCart: () => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,

            addItem: (product) => set((state) => {
                const existingItem = state.items.find((item) => item.id === product.id);

                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    };
                }

                return {
                    items: [...state.items, {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    }],
                    isOpen: true,
                };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),

            updateQuantity: (id, update) => set((state) => ({
                items: state.items.map((item) => {
                    if (item.id === id) {
                        const newQuantity = update === 'increase' ? item.quantity + 1 : item.quantity - 1;
                        return { ...item, quantity: Math.max(0, newQuantity) };
                    }
                    return item;
                }).filter((item) => item.quantity > 0),
            })),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'smoke-signal-cart',
        }
    )
);
