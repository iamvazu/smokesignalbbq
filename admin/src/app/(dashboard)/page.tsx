'use client';

import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    Users,
    TrendingUp,
    Clock,
    AlertCircle,
    ChevronRight,
    ArrowUpRight,
    Package,
    Tag,
    Truck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import Link from 'next/link';


export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    api.get('/analytics/stats'),
                    api.get('/orders?limit=5')
                ]);
                setStats(statsRes.data);
                setRecentOrders(ordersRes.data.slice(0, 5));
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            }
        };
        fetchData();
    }, []);

    const cards = [
        {
            title: 'Daily Orders',
            subtitle: 'New orders today',
            value: stats?.today?.orders || 0,
            icon: ShoppingBag,
            color: 'text-primary',
            bg: 'bg-primary/10',
            trend: '+12% from yesterday'
        },
        {
            title: 'Daily Revenue',
            subtitle: 'Earnings today',
            value: `₹${stats?.today?.revenue || 0}`,
            icon: TrendingUp,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            trend: '+8% from average'
        },
        {
            title: 'Monthly Volume',
            subtitle: 'Orders this month',
            value: stats?.month?.orders || 0,
            icon: Clock,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            trend: 'Projected: 450+'
        },
        {
            title: 'Active Tasks',
            subtitle: 'Pending processing',
            value: stats?.status?.pending || 0,
            icon: AlertCircle,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
            trend: 'Attention needed'
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-1000 slide-in-from-bottom-2 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase">The Control Room</h1>
                    <p className="text-muted-foreground mt-2 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Real-time metrics for Smoke Signal BBQ Empire</p>
                </div>
                <Button className="rounded-2xl px-10 py-7 h-auto bg-primary text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                    <ArrowUpRight className="mr-3 h-5 w-5" /> Export Intelligence
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card, idx) => (
                    <Card key={card.title} className={cn(
                        "border-white/5 bg-card shadow-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500 relative",
                        `animate-in fade-in slide-in-from-bottom-4 delay-[${idx * 100}ms]`
                    )}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
                        <CardContent className="p-8 relative z-10">
                            <div className="flex items-start justify-between">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">{card.title}</p>
                                        <h3 className="text-4xl font-black text-foreground tracking-tighter">{card.value}</h3>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-muted-foreground font-medium italic">{card.subtitle}</span>
                                        <span className={cn("text-[9px] font-black uppercase tracking-widest", card.color)}>{card.trend}</span>
                                    </div>
                                </div>
                                <div className={cn(card.bg, "p-4 rounded-3xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-transparent group-hover:shadow-current/5")}>
                                    <card.icon className={cn(card.color, "w-7 h-7")} strokeWidth={2.5} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 border-white/5 bg-card shadow-2xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-white/5 bg-white/2">
                        <div>
                            <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Recent Heat</CardTitle>
                            <CardDescription className="text-xs font-medium uppercase tracking-[0.1em] opacity-40">The latest smoked transactions arriving now</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-2xl border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all px-6 py-5 h-auto font-black text-[10px] uppercase tracking-widest" asChild>
                            <Link href="/orders">Manage Logs <ChevronRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="font-black py-5 pl-8 text-[10px] uppercase tracking-widest text-muted-foreground/50">Signature</TableHead>
                                    <TableHead className="font-black py-5 text-[10px] uppercase tracking-widest text-muted-foreground/50">Operative</TableHead>
                                    <TableHead className="font-black py-5 text-[10px] uppercase tracking_widest text-muted-foreground/50">Bounty</TableHead>
                                    <TableHead className="font-black py-5 text-[10px] uppercase tracking-widest text-muted-foreground/50">Status</TableHead>
                                    <TableHead className="font-black py-5 text-right pr-8 text-[10px] uppercase tracking-widest text-muted-foreground/50">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.length > 0 ? recentOrders.map((order) => (
                                    <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-all group">
                                        <TableCell className="font-mono text-sm py-6 pl-8 font-black text-primary select-all">
                                            #{order.id.split('-')[0].toUpperCase()}
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-foreground group-hover:text-primary transition-colors">{order.customer?.name || 'Guest'}</span>
                                                <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter">{order.customer?.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-black py-6 italic text-lg">₹{order.totalAmount}</TableCell>
                                        <TableCell className="py-6">
                                            <Badge className={cn(
                                                "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border shadow-sm",
                                                order.orderStatus === 'delivered' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    order.orderStatus === 'pending' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                        "bg-primary/10 text-primary border-primary/20"
                                            )}>
                                                {order.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-6 pr-8">
                                            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all group-hover:scale-110" asChild>
                                                <Link href="/orders"><ChevronRight className="h-5 w-5" /></Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground opacity-30">
                                                <ShoppingBag size={48} />
                                                <p className="text-sm font-bold uppercase tracking-widest italic">The smoker is empty...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="space-y-10">
                    <Card className="border-white/5 bg-card shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-all" />
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-black italic uppercase tracking-tight">Rapid Access</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Tactical dashboard shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-4">
                            {[
                                { label: 'New Product', icon: Package, href: '/products', desc: 'Add to the BBQ arsenal' },
                                { label: 'Discounts', icon: Tag, href: '/discounts', desc: 'Deploy tactical coupons' },
                                { label: 'Inventory', icon: AlertCircle, href: '/inventory', count: 3, desc: 'Ammo check needed' },
                                { label: 'Logistics', icon: Truck, href: '/settings', desc: 'Route & Fee command' }
                            ].map((link) => (
                                <Button
                                    key={link.label}
                                    variant="outline"
                                    className="w-full justify-between h-20 rounded-3xl border-white/5 bg-white/2 hover:border-primary/40 hover:bg-primary/5 transition-all p-6 group/btn shadow-xl shadow-transparent hover:shadow-primary/5"
                                    asChild
                                >
                                    <Link href={link.href}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover/btn:bg-primary/20 group-hover/btn:scale-110 transition-all">
                                                <link.icon className="h-5 w-5 text-primary group-hover/btn:animate-pulse" />
                                            </div>
                                            <div className="flex flex-col items-start gap-0.5">
                                                <span className="font-black text-sm uppercase italic tracking-tighter">{link.label}</span>
                                                <span className="text-[9px] text-muted-foreground opacity-60 font-medium group-hover/btn:text-primary transition-colors">{link.desc}</span>
                                            </div>
                                        </div>
                                        {link.count && (
                                            <span className="bg-primary text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full shadow-lg shadow-primary/40 animate-bounce">
                                                {link.count}
                                            </span>
                                        )}
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-primary/5 shadow-2xl overflow-hidden relative group p-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                        <div className="relative z-10 flex flex-col gap-4">
                            <h3 className="text-xl font-black italic uppercase text-primary">System Status</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                <span className="text-xs font-bold uppercase tracking-widest text-green-500">Live & Smokin'</span>
                            </div>
                            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground/60 italic">
                                "If you're looking, you're not cooking. But at least you're lookin' good with this dashboard."
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}



