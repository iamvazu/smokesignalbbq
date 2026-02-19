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
    LogOut,
    Calendar,
    BookOpen,
    TrendingUp,
    Star,
    Mail,
    MessageSquare,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';


import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

const menuNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Combo Packs', href: '/combos', icon: Box },
    { name: 'Inventory', href: '/inventory', icon: Truck },
];

const managementNavigation = [
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Contacts', href: '/contacts', icon: MessageSquare },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Franchise', href: '/franchise', icon: TrendingUp },
    { name: 'Discounts', href: '/discounts', icon: Tag },
    { name: 'Reviews', href: '/reviews', icon: Star },
    { name: 'Newsletter', href: '/newsletter', icon: Mail },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Inquiries', href: '/events', icon: Calendar },
    { name: 'Blog Content', href: '/blog', icon: BookOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
];


interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const NavIcon = ({ icon: Icon, active, collapsed }: { icon: any, active: boolean, collapsed?: boolean }) => (
        <div className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-500 shrink-0",
            active ? "bg-primary text-white shadow-lg shadow-primary/20 rotate-3" : "bg-white/5 text-muted-foreground group-hover:bg-white/10 group-hover:text-primary",
            collapsed && active && "rotate-0"
        )}>
            <Icon size={18} strokeWidth={active ? 3 : 2} />
        </div>
    );

    const NavLink = ({ item }: { item: any }) => {
        const isActive = pathname === item.href ||
            pathname === `/admin${item.href}` ||
            (item.href !== '/' && pathname.startsWith(`/admin${item.href}`));
        return (
            <Link
                key={item.name}
                href={item.href}
                className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all group overflow-hidden',
                    isActive
                        ? 'bg-primary/5 text-primary shadow-[inset_0_0_20px_rgba(239,68,68,0.02)] border border-primary/10'
                        : 'text-muted-foreground hover:bg-white/2 hover:text-foreground border border-transparent',
                    isCollapsed && "px-3 justify-center"
                )}
                title={isCollapsed ? item.name : ''}
            >
                <NavIcon icon={item.icon} active={isActive} collapsed={isCollapsed} />
                {!isCollapsed && (
                    <>
                        <span className="flex-1 transition-all group-hover:translate-x-1 truncate">{item.name}</span>
                        {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#ef4444]" />
                        )}
                    </>
                )}
            </Link>
        );
    };

    return (
        <div
            className={cn(
                "flex flex-col h-screen bg-card border-r border-white/5 sticky top-0 overflow-y-auto custom-scrollbar shadow-2xl z-50 transition-all duration-300",
                isCollapsed ? "w-24" : "w-80"
            )}
        >
            <div className={cn("p-8 relative", isCollapsed && "px-6 py-8 flex justify-center")}>
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:rotate-12 transition-all duration-500 shrink-0">
                        <Flame className="text-white w-7 h-7" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter text-foreground uppercase italic leading-none">Smoke Signal</span>
                            <span className="text-[9px] font-bold text-primary tracking-[0.4em] uppercase mt-1">Command Center</span>
                        </div>
                    )}
                </Link>

                <button
                    onClick={onToggle}
                    className="absolute -right-3 top-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all border-4 border-card z-50"
                >
                    {isCollapsed ? <ChevronRight size={12} strokeWidth={4} /> : <ChevronLeft size={12} strokeWidth={4} />}
                </button>
            </div>

            <nav className={cn("flex-1 space-y-10", isCollapsed ? "px-4" : "px-6")}>
                <div className="space-y-3">
                    {!isCollapsed && <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-30">The Smoker</h3>}
                    <div className="space-y-1">
                        {menuNavigation.map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    {!isCollapsed && <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-30">Management</h3>}
                    <div className="space-y-1">
                        {managementNavigation.map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                    </div>
                </div>
            </nav>

            <div className={cn("p-6 mt-10", isCollapsed && "p-4 flex flex-col items-center")}>
                <div className={cn(
                    "rounded-[2.5rem] bg-white/2 border border-white/5 group hover:border-primary/20 transition-all cursor-default overflow-hidden relative",
                    isCollapsed ? "w-12 h-12 p-0 rounded-2xl mb-4" : "px-5 py-4 mb-6"
                )}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
                    <div className="flex items-center gap-4 relative z-10 h-full justify-center">
                        <div className={cn(
                            "rounded-2xl bg-primary flex items-center justify-center text-xs font-black text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-all shrink-0",
                            isCollapsed ? "w-full h-full text-[10px]" : "w-10 h-10"
                        )}>
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-foreground truncate uppercase italic tracking-tighter">{user?.name || 'Admin Operative'}</p>
                                <p className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">{user?.role || 'Senior Staff'}</p>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={logout}
                    className={cn(
                        "flex items-center gap-4 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-destructive shadow-none hover:shadow-2xl hover:shadow-destructive/20 hover:text-white transition-all group scale-[0.98] hover:scale-100",
                        isCollapsed ? "w-12 h-12 p-0 justify-center rounded-2xl" : "w-full px-6 py-4"
                    )}
                    title={isCollapsed ? 'Logout Session' : ''}
                >
                    <LogOut className={cn("w-5 h-5 transition-transform", !isCollapsed && "group-hover:-translate-x-1")} />
                    {!isCollapsed && <span>Logout Session</span>}
                </button>
            </div>
        </div>
    );
}
