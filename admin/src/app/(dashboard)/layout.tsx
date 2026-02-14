'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Wait for store to hydrate
        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });

        // If it already hydrated before we added listener
        if (useAuthStore.persist.hasHydrated()) {
            setHydrated(true);
        }

        return () => unsub();
    }, []);

    useEffect(() => {
        if (mounted && hydrated && !token) {
            router.replace('/login');
        }
    }, [mounted, hydrated, token, router]);

    if (!mounted || !hydrated) {
        return <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>;
    }

    if (!token) return null;


    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
