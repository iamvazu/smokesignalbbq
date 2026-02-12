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
        // Fetch stats and recent orders
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
        { title: 'Total Orders Today', value: stats?.today?.orders || 0, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
        { title: 'Total Revenue Today', value: `₹${stats?.today?.revenue || 0}`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'Total Orders Month', value: stats?.month?.orders || 0, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Pending Orders', value: stats?.status?.pending || 0, icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">Real-time metrics for Smoke Signal BBQ</p>
                </div>
                <Button className="rounded-xl px-6">
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Card key={card.title} className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-primary/20 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{card.title}</p>
                                    <h3 className="text-3xl font-bold text-foreground font-sans tracking-tight">{card.value}</h3>
                                </div>
                                <div className={card.bg + " p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110"}>
                                    <card.icon className={card.color + " w-6 h-6"} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-white/5 bg-card/50 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
                            <CardDescription>A list of the most recent transactions.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-white/5">
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5">
                                    <TableHead className="font-bold py-4">Order ID</TableHead>
                                    <TableHead className="font-bold py-4">Customer</TableHead>
                                    <TableHead className="font-bold py-4">Amount</TableHead>
                                    <TableHead className="font-bold py-4">Status</TableHead>
                                    <TableHead className="font-bold py-4 text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.length > 0 ? recentOrders.map((order) => (
                                    <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                        <TableCell className="font-mono text-xs py-5 pl-6">
                                            #{order.id.split('-')[0].toUpperCase()}
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.customer?.name || 'Guest'}</span>
                                                <span className="text-[10px] text-muted-foreground">{order.customer?.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold py-5">₹{order.totalAmount}</TableCell>
                                        <TableCell className="py-5">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                                                order.orderStatus === 'delivered' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    order.orderStatus === 'pending' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                        "bg-primary/10 text-primary border-primary/20"
                                            )}>
                                                {order.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-5 pr-6">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-48 text-center text-muted-foreground italic">
                                            No recent orders found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="border-white/5 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Quick Links</CardTitle>
                        <CardDescription>Shortcut to frequent tasks.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { label: 'Add New Product', icon: Package, href: '/products' },
                            { label: 'Create Discount Code', icon: Tag, href: '/discounts' },
                            { label: 'Inventory Alert', icon: AlertCircle, href: '/inventory', count: 3 },
                            { label: 'Delivery Settings', icon: Truck, href: '/settings' }
                        ].map((link) => (
                            <Button
                                key={link.label}
                                variant="outline"
                                className="w-full justify-between h-14 rounded-2xl border-white/5 bg-white/5 hover:border-primary/30 transition-all text-sm px-6"
                                asChild
                            >
                                <Link href={link.href}>
                                    <div className="flex items-center gap-3">
                                        <link.icon className="h-5 w-5 text-primary" />
                                        <span>{link.label}</span>
                                    </div>
                                    {link.count && (
                                        <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                            {link.count}
                                        </span>
                                    )}
                                </Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}



