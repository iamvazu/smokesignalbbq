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
import { useToast } from "@/components/ui/use-toast";

export default function CombosPage() {
    const [combos, setCombos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCombo, setEditingCombo] = useState<any>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchCombos();
    }, []);

    const fetchCombos = async () => {
        setLoading(true);
        try {
            const res = await api.get('/combos'); // Make sure backend route matches
            setCombos(res.data);
        } catch (err) {
            console.error('Failed to fetch combos', err);
            toast({
                title: "Error",
                description: "Failed to load combo packs.",
                variant: "destructive",
            });
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
                toast({
                    title: "Success",
                    description: "Combo pack deleted.",
                });
            } catch (err) {
                console.error('Failed to delete combo', err);
                toast({
                    title: "Error",
                    description: "Failed to delete combo pack.",
                    variant: "destructive",
                });
            }
        }
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        setEditingCombo(null);
        fetchCombos();
        toast({
            title: "Success",
            description: editingCombo ? "Combo updated successfully." : "Combo created successfully.",
        });
    };

    const filteredCombos = combos.filter(combo =>
        combo.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Combo Packs</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">Manage special bundles & offers</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingCombo(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-xl px-6 py-6 text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2">
                            <Plus size={18} strokeWidth={3} /> Create New Combo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-card border-white/10 max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingCombo ? 'Edit Combo Pack' : 'Create New Combo'}</DialogTitle>
                            <DialogDescription>
                                Bundle your best products into an irresistible offer.
                            </DialogDescription>
                        </DialogHeader>
                        <ComboForm combo={editingCombo} onSuccess={handleSuccess} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search combos..."
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
                                <TableHead className="py-4 pl-6">Collection Name</TableHead>
                                <TableHead className="py-4">Items Included</TableHead>
                                <TableHead className="py-4">Price</TableHead>
                                <TableHead className="py-4">Status</TableHead>
                                <TableHead className="py-4 text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                        Loading combos...
                                    </TableCell>
                                </TableRow>
                            ) : filteredCombos.length > 0 ? filteredCombos.map((combo) => (
                                <TableRow key={combo.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                    <TableCell className="py-4 pl-6 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <Box size={20} />
                                            </div>
                                            <span className="text-foreground">{combo.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {combo.items?.map((item: any) => (
                                                <Badge key={item.id} variant="secondary" className="text-[10px] bg-white/5 hover:bg-white/10 border-white/5">
                                                    {item.product?.name} x{item.quantity}
                                                </Badge>
                                            ))}
                                            {(!combo.items || combo.items.length === 0) && <span className="text-muted-foreground text-xs">No items</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground">₹{combo.price}</span>
                                            {combo.originalPrice && (
                                                <span className="text-xs text-muted-foreground line-through">₹{combo.originalPrice}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge className={cn(
                                            "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                                            combo.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted text-muted-foreground"
                                        )}>
                                            {combo.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4 text-right pr-6">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:text-blue-500"
                                                onClick={() => handleEdit(combo)}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:text-red-500"
                                                onClick={() => handleDelete(combo.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                        No combos found. Create one to get started.
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
