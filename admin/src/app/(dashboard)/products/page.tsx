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
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Failed to fetch products', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error('Failed to delete product', err);
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Products</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">Manage your BBQ menu and inventory</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingProduct(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-xl px-6 py-6 text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2">
                            <Plus size={18} strokeWidth={3} /> Add New Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-card border-white/10">
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                            <DialogDescription>
                                Fill in the details for your BBQ masterpiece.
                            </DialogDescription>
                        </DialogHeader>
                        <ProductForm product={editingProduct} onSuccess={handleSuccess} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products, SKU..."
                                className="pl-10 bg-background/50 border-white/5 rounded-xl h-11"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[180px] bg-background/50 border-white/5 rounded-xl h-11">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 opacity-50" />
                                        <SelectValue placeholder="Category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 rounded-xl">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="wings">Wings</SelectItem>
                                    <SelectItem value="chicken">Chicken</SelectItem>
                                    <SelectItem value="beef">Beef</SelectItem>
                                    <SelectItem value="pork">Pork</SelectItem>
                                    <SelectItem value="sauces">Sauces</SelectItem>
                                    <SelectItem value="combos">Combos</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" className="h-11 rounded-xl border-white/5 bg-background/50 flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4 opacity-50" /> Sort
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-4 pl-6">Product Image</TableHead>
                                <TableHead className="py-4">Product Name</TableHead>
                                <TableHead className="py-4">Category</TableHead>
                                <TableHead className="py-4">Price</TableHead>
                                <TableHead className="py-4">Stock</TableHead>
                                <TableHead className="py-4">Status</TableHead>
                                <TableHead className="py-4 text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-64 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground animate-pulse">
                                            <Package className="animate-bounce" /> Loading products...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                <TableRow key={product.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                    <TableCell className="py-4 pl-6">
                                        <div className="w-16 h-12 rounded-lg bg-white/5 border border-white/5 overflow-hidden ring-1 ring-white/5 group-hover:ring-primary/30 transition-all">
                                            <img
                                                src={product.images?.[0]?.imageUrl || 'https://via.placeholder.com/80'}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                                alt={product.name}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-foreground">{product.name}</span>
                                            <span className="text-[10px] text-muted-foreground font-mono">{product.sku || 'NO SKU'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant="outline" className="capitalize rounded-full border-white/10 bg-white/5 text-[10px] font-bold px-3">
                                            {product.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4 font-bold text-foreground">₹{product.price}</TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "w-2 h-2 rounded-full",
                                                product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-orange-500" : "bg-red-500"
                                            )} />
                                            <span className="text-sm">{product.stock} in stock</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge className={cn(
                                            "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                                            product.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {product.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4 text-right pr-6">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5 hover:text-primary">
                                                <Eye size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-xl hover:bg-white/5 hover:text-blue-500"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-xl hover:bg-white/5 hover:text-red-500"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (

                                <TableRow>
                                    <TableCell colSpan={7} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                            <Package size={48} className="opacity-10 mb-2" />
                                            <p>No products found matching your criteria.</p>
                                            <Button variant="link" className="text-primary mt-2" onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}>Clear all filters</Button>
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
