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
    category?: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    lastUpdated: number;
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
            lastUpdated: Date.now(),

            addItem: (product) => set((state) => {
                const existingItem = state.items.find((item) => item.id === product.id);

                // GA Tracking
                if (typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'add_to_cart', {
                        currency: 'INR',
                        value: product.priceValue,
                        items: [{
                            item_id: product.id,
                            item_name: product.name,
                            item_category: product.category,
                            price: product.priceValue,
                            quantity: 1
                        }]
                    });
                }

                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                        lastUpdated: Date.now(),
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
                        category: product.category,
                        quantity: 1
                    }],
                    isOpen: true,
                    lastUpdated: Date.now(),
                };
            }),


            removeItem: (variantId) => set((state) => ({
                items: state.items.filter((item) => item.variantId !== variantId),
                lastUpdated: Date.now(),
            })),

            updateQuantity: (variantId, update) => set((state) => ({
                items: state.items.map((item) => {
                    if (item.variantId === variantId) {
                        const newQuantity = update === 'increase' ? item.quantity + 1 : item.quantity - 1;
                        return { ...item, quantity: Math.max(0, newQuantity) };
                    }
                    return item;
                }).filter((item) => item.quantity > 0),
                lastUpdated: Date.now(),
            })),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            clearCart: () => set({ items: [], lastUpdated: Date.now() }),

        }),
        {
            name: 'smoke-signal-cart',
        }
    )
);
interface LocationStore {
    location: { lat: number; lng: number } | null;
    city: string | null;
    hasCheckedLocation: boolean;
    showLocationPrompt: boolean;
    setLocation: (loc: { lat: number; lng: number }, city: string) => void;
    setShowLocationPrompt: (show: boolean) => void;
    setHasCheckedLocation: (checked: boolean) => void;
}

export const useLocationStore = create<LocationStore>()(
    persist(
        (set) => ({
            location: null,
            city: null,
            hasCheckedLocation: false,
            showLocationPrompt: false,
            setLocation: (loc, city) => set({ location: loc, city, hasCheckedLocation: true, showLocationPrompt: false }),
            setShowLocationPrompt: (show) => set({ showLocationPrompt: show }),
            setHasCheckedLocation: (checked) => set({ hasCheckedLocation: checked }),
        }),
        {
            name: 'smoke-signal-location',
        }
    )
);
