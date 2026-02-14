'use client';

import { useEffect, useState } from 'react';
import {
    Truck,
    Search,
    ArrowUp,
    ArrowDown,
    AlertTriangle,
    History,
    Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

export default function InventoryPage() {
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await api.get('/products');
            setInventory(res.data);
        } catch (err) {
            console.error('Failed to fetch inventory', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Low Stock Risk', value: inventory.filter(i => i.stock > 0 && i.stock <= 10).length, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
        { label: 'Critical Depletion', value: inventory.filter(i => i.stock === 0).length, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
        { label: 'Supply Pipeline', value: inventory.length, icon: Truck, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase">Stock Control</h1>
                    <p className="text-muted-foreground mt-2 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Logistics & Asset Depletion Monitoring</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl px-8 py-7 h-auto border-white/5 bg-white/2 hover:bg-white/5 font-black uppercase tracking-widest text-[10px] transition-all">
                        <History className="mr-3 h-4 w-4 opacity-50" /> Movement Logs
                    </Button>
                    <Button className="rounded-2xl px-10 py-7 h-auto bg-primary text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all">
                        <ArrowUp className="mr-3 h-5 w-5" /> Bulk Deployment
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, idx) => (
                    <Card key={stat.label} className={cn("border-white/5 bg-card shadow-2xl overflow-hidden group hover:border-white/10 transition-all duration-500", stat.border)}>
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className={cn("p-5 rounded-[2rem] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6", stat.bg)}>
                                <stat.icon className={cn("w-8 h-8", stat.color)} strokeWidth={2.5} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">{stat.label}</p>
                                <h3 className="text-4xl font-black text-foreground tracking-tighter italic">
                                    {stat.value.toString().padStart(2, '0')}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
                <CardHeader className="pb-8 pt-8 px-8 border-b border-white/5 bg-white/2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Identify stock signature..."
                            className="pl-12 bg-background/50 border-white/5 rounded-2xl h-14 text-sm focus:ring-primary/20 transition-all shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Asset Signature</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Loadout (Stock)</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Payload Metrics</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Deployment Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Tactical Adjustments</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground animate-pulse">
                                            <History size={48} className="animate-spin text-primary/20" />
                                            <span className="text-xs font-black uppercase tracking-widest opacity-50">Syncing stockpile...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredInventory.length > 0 ? filteredInventory.map((item) => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-xl relative">
                                                <img src={item.images?.[0]?.imageUrl || 'https://via.placeholder.com/40'} className="w-full h-full object-cover" alt={item.name} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-foreground text-lg italic tracking-tight uppercase group-hover:text-primary transition-colors">{item.name}</span>
                                                <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter bg-white/5 w-fit px-2 py-0.5 rounded-full mt-1">SKU: {item.sku}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-3xl font-black italic tracking-tighter">{item.stock}</span>
                                            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Units Ready</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/5 w-fit">
                                            <span className="text-xs font-black text-primary uppercase italic tracking-tighter">{item.weight || item.volume || 'Infinite'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full animate-pulse",
                                                item.stock > 10 ? "bg-green-500 shadow-[0_0_10px_#22c55e]" :
                                                    item.stock > 0 ? "bg-orange-500 shadow-[0_0_10px_#f97316]" :
                                                        "bg-red-500 shadow-[0_0_10px_#ef4444]"
                                            )} />
                                            <Badge className={cn(
                                                "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border shadow-sm",
                                                item.stock > 10 ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    item.stock > 0 ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                                        "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                {item.stock > 10 ? 'Operational' : item.stock > 0 ? 'Low Payload' : 'Depleted'}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <div className="flex items-center justify-end gap-3">
                                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-white/2 border border-white/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/btn shadow-xl hover:shadow-red-500/20">
                                                <ArrowDown size={18} strokeWidth={3} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-white/2 border border-white/10 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all group/btn shadow-xl hover:shadow-green-500/20">
                                                <ArrowUp size={18} strokeWidth={3} className="group-hover/btn:translate-y-0.5 transition-transform" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-white/2 border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn shadow-xl hover:shadow-primary/20">
                                                <Info size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center opacity-20">
                                                <Truck size={40} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-bold text-foreground">Stockpiles empty</p>
                                                <p className="text-xs uppercase tracking-widest opacity-50">No inventory assets identified in the registry.</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
