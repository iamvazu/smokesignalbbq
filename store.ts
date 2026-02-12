import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './types';

export interface CartItem {
    id: string;
    variantId: string; // Keep as unique identifier
    name: string;
    price: string;
    priceValue: number;
    quantity: number;
    image: string;
    variant?: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (variantId: string) => void;
    updateQuantity: (variantId: string, update: 'increase' | 'decrease') => void;
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
                        variantId: product.id,
                        name: product.name,
                        price: product.price,
                        priceValue: product.priceValue,
                        image: product.image,
                        quantity: 1
                    }],
                    isOpen: true,
                };
            }),


            removeItem: (variantId) => set((state) => ({
                items: state.items.filter((item) => item.variantId !== variantId),
            })),

            updateQuantity: (variantId, update) => set((state) => ({
                items: state.items.map((item) => {
                    if (item.variantId === variantId) {
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
