'use client';

import {
    Tag,
    Plus,
    Search,
    Filter,
    Edit,
    Trash,
    Flame,
    Zap,
    Users,
    Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function DiscountsPage() {
    const [loading] = useState(false);
    // Mock data for discounts
    const mockDiscounts = [
        { code: 'SMOKEY10', type: 'Percentage', value: '10%', usage: 45, status: 'active', expiry: '2026-12-31' },
        { code: 'FIRSTBURN', type: 'Fixed', value: '₹100', usage: 128, status: 'active', expiry: '2026-06-30' },
        { code: 'WELCOMESMOKE', type: 'Percentage', value: '15%', usage: 12, status: 'expired', expiry: '2025-01-01' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Tactical Coupons</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Manage your BBQ arsenal discounts</p>
                </div>
                <Button className="rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Create New Code
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Campaigns</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">5</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-wider">
                            <Flame size={14} /> Live Deals
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Redemption</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">1.2k</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-wider">
                            <Users size={14} /> Happy Operatives
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Avg. Savings</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">₹124</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-wider">
                            <Zap size={14} /> Per Mission
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl border-t border-t-primary/10">
                <CardHeader className="pb-4 border-b border-white/5 bg-white/2">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                            <Input
                                placeholder="Search coupon code..."
                                className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20"
                            />
                        </div>
                        <Button variant="outline" className="rounded-2xl border-white/5 bg-background/50 h-12 px-6 text-[10px] font-black uppercase tracking-widest">
                            <Filter className="mr-2 h-4 w-4 opacity-50" /> Active Only
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Code</TableHead>
                                <TableHead className="py-5 text-[10px) font-black uppercase tracking-[0.2em] text-muted-foreground">Strategy</TableHead>
                                <TableHead className="py-5 text-[10px) font-black uppercase tracking-[0.2em] text-muted-foreground">Value</TableHead>
                                <TableHead className="py-5 text-[10px) font-black uppercase tracking-[0.2em] text-muted-foreground">Usage</TableHead>
                                <TableHead className="py-5 text-[10px) font-black uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Intel</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockDiscounts.map((d) => (
                                <TableRow key={d.code} className="border-white/5 hover:bg-white/2 transition-all group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-2 w-fit">
                                            <span className="font-black text-primary font-mono tracking-widest">{d.code}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 font-bold text-foreground opacity-60 uppercase text-[10px] tracking-widest">{d.type}</TableCell>
                                    <TableCell className="py-6 font-black italic text-xl text-foreground">{d.value}</TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-black italic text-foreground">{d.usage}</span>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-40 tracking-wider">Redeemed</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className={cn(
                                            "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest",
                                            d.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {d.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-white/5">
                                                <Edit size={16} className="text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-red-500/10 text-red-500 opacity-40 hover:opacity-100">
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
