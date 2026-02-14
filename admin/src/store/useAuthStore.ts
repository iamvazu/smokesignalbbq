import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoggingOut: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoggingOut: false,
            setAuth: (user, token) => {
                set({ user, token, isLoggingOut: false });
            },
            logout: () => {
                const state = useAuthStore.getState();
                if (state.isLoggingOut) return;

                set({ user: null, token: null, isLoggingOut: true });
                if (typeof window !== 'undefined') {
                    // Force a hard reload to the login page to break all React loops
                    window.location.href = '/admin/login';
                }
            },

        }),
        {
            name: 'auth-storage',
        }
    )
);
