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
            const res = await api.get('/products'); // Inventory is currently part of products table
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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Inventory</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">Track stock levels and supply movements</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-white/5 bg-card/50">
                        <History className="mr-2 h-4 w-4 opacity-50" /> View Logs
                    </Button>
                    <Button className="rounded-xl px-6">
                        <ArrowUp className="mr-2 h-4 w-4" /> Bulk Stock Update
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-white/5 bg-yellow-500/[0.03] border-yellow-500/10">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Low Stock Items</p>
                            <h3 className="text-2xl font-bold text-foreground">05</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-red-500/[0.03] border-red-500/10">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Out of Stock</p>
                            <h3 className="text-2xl font-bold text-foreground">02</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-green-500/[0.03] border-green-500/10">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
                            <Truck size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Restock</p>
                            <h3 className="text-2xl font-bold text-foreground">12</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inventory items..."
                            className="pl-10 bg-background/50 border-white/5 rounded-xl h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-4 pl-6">Product Item</TableHead>
                                <TableHead className="py-4">Current Stock</TableHead>
                                <TableHead className="py-4">Unit Weight/Vol</TableHead>
                                <TableHead className="py-4">Stock Status</TableHead>
                                <TableHead className="py-4 text-right pr-6">Manual Adjust</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center text-muted-foreground animate-pulse">
                                        Loading inventory data...
                                    </TableCell>
                                </TableRow>
                            ) : filteredInventory.length > 0 ? filteredInventory.map((item) => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 overflow-hidden">
                                                <img src={item.images?.[0]?.imageUrl || 'https://via.placeholder.com/40'} className="w-full h-full object-cover" alt={item.name} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{item.name}</span>
                                                <span className="text-[10px] text-muted-foreground font-mono">{item.sku}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold">{item.stock}</span>
                                            <span className="text-[9px] text-muted-foreground uppercase">Units Available</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground">
                                        {item.weight || item.volume || 'N/A'}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge className={cn(
                                            "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                                            item.stock > 10 ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                item.stock > 0 ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                                    "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4 text-right pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 hover:bg-white/5">
                                                <ArrowDown size={14} className="text-red-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 hover:bg-white/5">
                                                <ArrowUp size={14} className="text-green-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 hover:bg-white/5">
                                                <Info size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center text-muted-foreground italic">
                                        No inventory items found.
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
