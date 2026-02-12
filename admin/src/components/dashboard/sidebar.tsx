'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Box,
    Users,
    CreditCard,
    Truck,
    Tag,
    BarChart3,
    Settings,
    Flame,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Combo Packs', href: '/combos', icon: Box },
    { name: 'Inventory', href: '/inventory', icon: Truck },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Discounts', href: '/discounts', icon: Tag },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    return (
        <div className="flex flex-col w-72 h-screen bg-card border-r border-white/5 sticky top-0 overflow-y-auto">
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Flame className="text-primary w-6 h-6" />
                </div>
                <span className="font-display text-xl tracking-tight text-foreground uppercase italic">Smoke Signal</span>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
                                isActive
                                    ? 'bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            )}
                        >
                            <item.icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{user?.name || 'Admin'}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{user?.role || 'Staff'}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all group"
                >
                    <LogOut className="w-5 h-5 group-hover:animate-pulse" />
                    Logout
                </button>
            </div>
        </div>
    );
}
