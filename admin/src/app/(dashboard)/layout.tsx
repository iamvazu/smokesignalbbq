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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [isInternalRedirecting, setIsInternalRedirecting] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load preference
        const saved = localStorage.getItem('admin_sidebar_collapsed');
        if (saved === 'true') setIsSidebarCollapsed(true);

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

    const toggleSidebar = () => {
        const newState = !isSidebarCollapsed;
        setIsSidebarCollapsed(newState);
        localStorage.setItem('admin_sidebar_collapsed', newState.toString());
    };

    useEffect(() => {
        if (mounted && hydrated && !token && !isInternalRedirecting) {
            setIsInternalRedirecting(true);
            router.replace('/login');
        }
    }, [mounted, hydrated, token, isInternalRedirecting, router]);

    if (!mounted || !hydrated) {
        return <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>;
    }

    // While redirecting, show nothing to avoid mounting children that might trigger API calls
    if (!token || isInternalRedirecting) return null;


    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
            <main className="flex-1 p-8 overflow-y-auto transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
