'use client';

import { useEffect, useState } from 'react';
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Phone,
    Mail,
    Calendar,
    ShoppingBag,
    TrendingUp,
    MapPin,
    ArrowUpRight,
    ArrowDownRight,
    Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/customers');
            setCustomers(res.data);
        } catch (err) {
            console.error('Failed to fetch customers', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const name = customer.name || 'Guest';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone?.includes(searchTerm) ||
            customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    // Simple stats for the top cards
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
    const avgOrderValue = totalCustomers > 0 ? totalRevenue / customers.reduce((sum, c) => sum + (c.totalOrders || 1), 0) : 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Customer Base</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Intelligence on your BBQ commandos</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-white/5 bg-card/50 hover:bg-white/10 transition-all px-6 h-12 group">
                        <TrendingUp className="mr-2 h-4 w-4 opacity-50 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Growth Intelligence</span>
                    </Button>
                    <Button className="rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/20">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Export Data
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Operatives</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">{totalCustomers}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-wider">
                            <TrendingUp size={14} /> +12% this month
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Command Value (CLV)</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">₹{totalRevenue.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-wider">
                            <TrendingUp size={14} /> Market Leader
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Avg Mission Cost</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">₹{Math.round(avgOrderValue).toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-wider">
                            <Filter size={14} /> Per Deployment
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Table Card */}
            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl border-t border-t-primary/10">
                <CardHeader className="pb-4 border-b border-white/5 bg-white/2">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                            <Input
                                placeholder="Target identity or phone..."
                                className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-2xl border-white/5 bg-background/50 h-12 px-6 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
                                <Filter className="mr-2 h-4 w-4 opacity-50" /> Filter View
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Operative Profile</TableHead>
                                    <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Comms Detail</TableHead>
                                    <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Missions</TableHead>
                                    <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Last Breach</TableHead>
                                    <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Valor</TableHead>
                                    <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Intelligence</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-80 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                                <Loader2 className="animate-spin text-primary h-8 w-8" />
                                                <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">Extracting Operative Logs...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                        <TableCell className="py-6 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-black text-xl italic border border-white/5 shadow-inner">
                                                    {(customer.name || 'G').charAt(0)}
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-black text-foreground group-hover:text-primary transition-colors tracking-tight uppercase italic">{customer.name || 'Guest Operative'}</span>
                                                    <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                                                        <Calendar size={10} className="text-primary/50" /> Joined {format(new Date(customer.createdAt), 'MMM yyyy')}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-xs font-bold text-foreground/80">
                                                    <Phone size={12} className="text-primary/70" /> {customer.phone}
                                                </div>
                                                {customer.email && (
                                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium lowercase italic">
                                                        <Mail size={12} className="text-primary/50" /> {customer.email}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-black italic tracking-tighter text-foreground">{customer.totalOrders}</span>
                                                    <ShoppingBag size={14} className="text-primary/40" />
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground opacity-50">Deployments</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <span className="text-xs font-bold text-foreground/80 lowercase italic tracking-tight">
                                                {customer.lastOrderDate ? format(new Date(customer.lastOrderDate), 'MMM dd, yyyy') : 'No Field History'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-black italic tracking-tighter text-foreground text-primary">₹{customer.totalSpent.toLocaleString()}</span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground opacity-50">Lifetime Value</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 text-right pr-8">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="rounded-xl border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all px-5 h-10 group"
                                            >
                                                <Eye size={16} className="text-primary group-hover:scale-110 transition-transform" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-80 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                                    <Users size={32} className="opacity-10" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-lg font-black text-foreground uppercase italic underline decoration-primary decoration-4 underline-offset-8">No Operatives Detected</p>
                                                    <p className="text-xs font-bold uppercase tracking-widest pt-4 opacity-50">Scan parameters yielded zero results</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
