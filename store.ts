import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, ProductItem } from './types';

export interface CartItem {
    id: string;
    variantId: string; // Composite: id + variant name
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
    addItem: (item: MenuItem | ProductItem, variant?: { name: string; price: number }) => void;
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

            addItem: (product, variant) => set((state) => {
                const priceValue = variant ? variant.price : product.priceValue;
                const priceDisplay = variant ? `₹${variant.price}` : product.price;
                const variantName = variant ? variant.name : undefined;
                const variantId = variant ? `${product.id}-${variant.name}` : product.id;

                const existingItem = state.items.find((item) => item.variantId === variantId);

                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.variantId === variantId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    };
                }

                return {
                    items: [...state.items, {
                        id: product.id,
                        variantId: variantId,
                        name: product.name,
                        price: priceDisplay,
                        priceValue: priceValue,
                        image: product.image,
                        quantity: 1,
                        variant: variantName
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
