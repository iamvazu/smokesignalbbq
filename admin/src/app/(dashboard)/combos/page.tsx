'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ComboForm } from '@/components/dashboard/combo-form';
import { cn } from '@/lib/utils';

export default function CombosPage() {
    const [combos, setCombos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCombo, setEditingCombo] = useState<any>(null);

    useEffect(() => {
        fetchCombos();
    }, []);

    const fetchCombos = async () => {
        setLoading(true);
        try {
            const res = await api.get('/combos');
            setCombos(res.data);
        } catch (err) {
            console.error('Failed to fetch combos', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (combo: any) => {
        setEditingCombo(combo);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this combo?')) {
            try {
                await api.delete(`/combos/${id}`);
                fetchCombos();
            } catch (err) {
                console.error('Failed to delete combo', err);
                alert("Failed to delete combo pack.");
            }
        }
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        setEditingCombo(null);
        fetchCombos();
    };

    const filteredCombos = combos.filter(combo =>
        combo.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase">Smoke Bundles</h1>
                    <p className="text-muted-foreground mt-2 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Strategic value packs & legendary combos</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingCombo(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-2xl px-10 py-7 h-auto bg-primary text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                            <Plus size={20} strokeWidth={3} className="mr-3" /> Forge New Combo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-card border-white/10 p-0 overflow-hidden shadow-2xl max-h-[90vh]">
                        <div className="bg-primary/5 p-8 border-b border-white/5">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    {editingCombo ? (
                                        <>
                                            <Edit className="text-primary" size={24} /> Edit Bundle
                                        </>
                                    ) : (
                                        <>
                                            <Box className="text-primary" size={24} /> New Irresistible Offer
                                        </>
                                    )}
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground/60 font-medium uppercase tracking-widest text-[10px] mt-2">
                                    Assemble the ultimate BBQ collection for your customers.
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                        <div className="p-8">
                            <ComboForm combo={editingCombo} onSuccess={handleSuccess} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
                <CardHeader className="pb-8 pt-8 px-8 border-b border-white/5 bg-white/2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search bundle signatures..."
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
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Collection</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Arsenal Included</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Bounty (Price)</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Command</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground animate-pulse">
                                            <Box size={48} className="animate-bounce text-primary/20" />
                                            <span className="text-xs font-black uppercase tracking-widest opacity-50">Loading manifest...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredCombos.length > 0 ? filteredCombos.map((combo) => (
                                <TableRow key={combo.id} className="border-white/5 hover:bg-white/5 transition-all group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary/20 overflow-hidden relative">
                                                {combo.image ? (
                                                    <img src={combo.image} className="w-full h-full object-cover" alt={combo.name} />
                                                ) : (
                                                    <Box size={24} />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-foreground text-lg italic tracking-tight uppercase group-hover:text-primary transition-colors">{combo.name}</span>
                                                <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter bg-white/5 w-fit px-2 py-0.5 rounded-full mt-1">UUID: {combo.id.split('-')[0].toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-wrap gap-2 max-w-sm">
                                            {combo.items?.map((item: any) => (
                                                <div key={item.id} className="flex items-center gap-2 bg-white/2 border border-white/5 rounded-xl px-3 py-1.5 group/badge hover:border-primary/30 transition-all">
                                                    <span className="text-[10px] font-black text-foreground/80">{item.product?.name}</span>
                                                    <span className="h-4 w-px bg-white/10" />
                                                    <span className="text-[10px] font-mono text-primary font-bold">x{item.quantity}</span>
                                                </div>
                                            ))}
                                            {(!combo.items || combo.items.length === 0) && (
                                                <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-30 italic">No assets assigned</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-foreground italic text-xl">₹{combo.price}</span>
                                            {combo.originalPrice && (
                                                <span className="text-[10px] text-muted-foreground line-through opacity-50 font-bold">₹{combo.originalPrice}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className={cn(
                                            "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border shadow-sm",
                                            combo.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-white/5 text-muted-foreground/50 border-white/10"
                                        )}>
                                            {combo.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 rounded-2xl hover:bg-blue-500/10 hover:text-blue-500 transition-all group-hover:scale-110"
                                                onClick={() => handleEdit(combo)}
                                            >
                                                <Edit size={18} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-all group-hover:scale-110"
                                                onClick={() => handleDelete(combo.id)}
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center opacity-20">
                                                <Box size={40} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-bold text-foreground">No bundles discovered</p>
                                                <p className="text-xs uppercase tracking-widest opacity-50">Launch a new collection to dominate the pit.</p>
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
