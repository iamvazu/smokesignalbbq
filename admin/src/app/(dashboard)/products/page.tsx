'use client';

import { useEffect, useState } from 'react';
import {
    Package,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    ArrowUpDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from '@/components/dashboard/product-form';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const [productsRes, combosRes] = await Promise.all([
                api.get('/products'),
                api.get('/combos')
            ]);

            const mappedCombos = combosRes.data.map((c: any) => ({
                ...c,
                category: 'combos',
                sku: 'COMBO-' + c.id.split('-')[0].toUpperCase(),
                stock: '-', // Combos don't have separate stock, they depend on items
                images: [{ imageUrl: c.image || '/combo_pack.jpg' }]
            }));

            setProducts([...productsRes.data, ...mappedCombos]);
        } catch (err) {
            console.error('Failed to fetch products', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: any) => {
        if (item.category === 'combos') {
            window.location.href = '/combos';
            return;
        }
        setEditingProduct(item);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string, category: string) => {
        const type = category === 'combos' ? 'combo' : 'product';
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
            try {
                const endpoint = category === 'combos' ? `/combos/${id}` : `/products/${id}`;
                await api.delete(endpoint);
                fetchProducts();
            } catch (err) {
                console.error(`Failed to delete ${type}`, err);
            }
        }
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
        fetchProducts();
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-[0.2em] font-medium opacity-70">Manage your BBQ menu and inventory</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingProduct(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-2xl px-8 py-7 h-auto text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-3 hover:scale-[1.02] active:scale-95">
                            <Plus size={20} strokeWidth={3} /> Add New Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-card border-white/10 p-0 overflow-hidden shadow-2xl">
                        <div className="bg-primary/5 p-8 border-b border-white/5">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    {editingProduct ? (
                                        <>
                                            <Edit className="text-primary" size={24} /> Edit BBQ Piece
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="text-primary" size={24} /> New BBQ Masterpiece
                                        </>
                                    )}
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground/60 font-medium uppercase tracking-widest text-[10px] mt-2">
                                    Craft the details for your legendary smoked goodness.
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                        <div className="p-8">
                            <ProductForm product={editingProduct} onSuccess={handleSuccess} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                <CardHeader className="pb-6 border-b border-white/5 bg-white/5">
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products, SKU..."
                                className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[200px] bg-background/50 border-white/5 rounded-2xl h-12 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 opacity-50" />
                                        <SelectValue placeholder="Category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 rounded-2xl">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="wings">Wings</SelectItem>
                                    <SelectItem value="chicken">Chicken</SelectItem>
                                    <SelectItem value="beef">Beef</SelectItem>
                                    <SelectItem value="pork">Pork</SelectItem>
                                    <SelectItem value="sauces">Sauces</SelectItem>
                                    <SelectItem value="combos">Combos</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/5 bg-background/50 flex items-center gap-3 hover:bg-white/5 transition-all group">
                                <ArrowUpDown className="h-4 w-4 opacity-50 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-bold uppercase tracking-widest">Sort</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-white/2">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="py-5 pl-8 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Product Image</TableHead>
                                    <TableHead className="py-5 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Details</TableHead>
                                    <TableHead className="py-5 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Category</TableHead>
                                    <TableHead className="py-5 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Price</TableHead>
                                    <TableHead className="py-5 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Inventory</TableHead>
                                    <TableHead className="py-5 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Status</TableHead>
                                    <TableHead className="py-5 text-right pr-8 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-80 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground animate-pulse">
                                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <Package className="text-primary animate-bounce" size={24} />
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-widest opacity-50">Stoking the fire...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="border-white/5 hover:bg-white/5 transition-all group">
                                        <TableCell className="py-6 pl-8">
                                            <div className="w-20 h-16 rounded-2xl bg-white/5 border border-white/5 overflow-hidden ring-1 ring-white/5 group-hover:ring-primary/40 transition-all duration-500 group-hover:scale-105 shadow-xl shadow-transparent group-hover:shadow-primary/10">
                                                <img
                                                    src={product.images?.[0]?.imageUrl || '/product_fallback.jpg'}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                                                    alt={product.name}
                                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-foreground group-hover:text-primary transition-colors text-base">{product.name}</span>
                                                <span className="text-[10px] text-muted-foreground/70 font-mono tracking-tighter bg-white/5 w-fit px-2 py-0.5 rounded-full">{product.sku || 'NO SKU'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge variant="outline" className="capitalize rounded-full border-white/10 bg-white/5 text-[9px] font-black tracking-[0.1em] px-3 py-1 text-muted-foreground group-hover:text-foreground transition-colors group-hover:border-white/20">
                                                {product.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-6 font-black text-foreground italic text-lg">₹{product.price}</TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full ring-4 shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                                                        product.stock > 10 ? "bg-green-500 ring-green-500/10" : product.stock > 0 ? "bg-orange-500 ring-orange-500/10" : "bg-red-500 ring-red-500/10"
                                                    )} />
                                                    <span className="text-xs font-bold">{product.stock} units</span>
                                                </div>
                                                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-orange-500" : "bg-red-500"
                                                        )}
                                                        style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge className={cn(
                                                "rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-sm border",
                                                product.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                {product.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-6 text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
                                                    <Eye size={18} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-10 w-10 rounded-2xl hover:bg-blue-500/10 hover:text-blue-500 transition-all"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <Edit size={18} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-10 w-10 rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-all"
                                                    onClick={() => handleDelete(product.id, product.category)}
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (

                                    <TableRow className="hover:bg-transparent">
                                        <TableCell colSpan={7} className="h-80 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center opacity-20">
                                                    <Package size={48} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-lg font-bold text-foreground">No masterpieces found</p>
                                                    <p className="text-sm">Try adjusting your filters or search terms.</p>
                                                </div>
                                                <Button variant="link" className="text-primary font-bold uppercase text-[10px] tracking-widest" onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}>Clear all filters</Button>
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
