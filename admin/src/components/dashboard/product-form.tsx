'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';

import { Image as ImageIcon, Plus, Trash2, Info, Package, IndianRupee, BarChart3, Layers, Sparkles, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFormProps {
    product?: any;
    onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: product?.name || '',
        slug: product?.slug || '',
        description: product?.description || '',
        longDescription: product?.longDescription || '',
        category: product?.category || 'bbq',
        subCategory: product?.subCategory || 'wings',
        sku: product?.sku || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        status: product?.status || 'active',
        weight: product?.weight || '',
        volume: product?.volume || '',
        isMostPopular: product?.isMostPopular || false,
        isBestValue: product?.isBestValue || false,
        badges: product?.badges || [],
        heatingInstructions: product?.heatingInstructions || '',
        ingredients: product?.ingredients || '',
        storageInstructions: product?.storageInstructions || '',
        images: product?.images?.map((img: any) => img.imageUrl) || []
    });

    const [newBadge, setNewBadge] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (product?.id) {
                await api.put(`/products/${product.id}`, formData);
            } else {
                await api.post('/products', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save product', error);
        } finally {
            setLoading(false);
        }
    };

    const addImage = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const updateImage = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const removeImage = (index: number) => {
        setFormData({ ...formData, images: formData.images.filter((_: string, i: number) => i !== index) });
    };

    const addBadge = () => {
        if (newBadge.trim()) {
            setFormData({ ...formData, badges: [...formData.badges, newBadge.trim()] });
            setNewBadge('');
        }
    };

    const removeBadge = (badgeToRemove: string) => {
        setFormData({ ...formData, badges: formData.badges.filter((b: string) => b !== badgeToRemove) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-4 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
            {/* General Information */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    <Info size={14} /> General Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Product Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Texas Style Saucy Wings"
                            className="bg-background/50 border-white/10 rounded-2xl h-12 focus:ring-primary/20 focus:border-primary/30"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">URL Slug</Label>
                        <Input
                            id="slug"
                            placeholder="texas-style-saucy-wings"
                            className="bg-background/50 border-white/10 rounded-2xl h-12 focus:ring-primary/20 focus:border-primary/30"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Short Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief summary for product cards..."
                            className="bg-background/50 border-white/10 rounded-2xl min-h-[80px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="longDescription" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Long Description</Label>
                        <Textarea
                            id="longDescription"
                            placeholder="Full story and details for the product page..."
                            className="bg-background/50 border-white/10 rounded-2xl min-h-[120px]"
                            value={formData.longDescription}
                            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Categorization & Highlights */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    <Layers size={14} /> Categorization & Highlights
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Primary Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(val) => setFormData({ ...formData, category: val })}
                        >
                            <SelectTrigger className="bg-background/50 border-white/10 rounded-2xl h-12">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-white/10">
                                <SelectItem value="bbq">Ready to Heat (BBQ)</SelectItem>
                                <SelectItem value="sauce">Sauces</SelectItem>
                                <SelectItem value="combo">Combos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Sub Category</Label>
                        <Select
                            value={formData.subCategory}
                            onValueChange={(val) => setFormData({ ...formData, subCategory: val })}
                        >
                            <SelectTrigger className="bg-background/50 border-white/10 rounded-2xl h-12">
                                <SelectValue placeholder="Select Sub Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-white/10">
                                <SelectItem value="wings">Wings</SelectItem>
                                <SelectItem value="chicken">Chicken</SelectItem>
                                <SelectItem value="beef">Beef</SelectItem>
                                <SelectItem value="pork">Pork</SelectItem>
                                <SelectItem value="sauces">Sauces</SelectItem>
                                <SelectItem value="combos">Combos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-black/20 rounded-xl">
                        <div className="space-y-0.5">
                            <Label className="text-sm">Most Popular</Label>
                            <p className="text-[10px] text-muted-foreground italic tracking-tight">Show in Pitmaster Favorites</p>
                        </div>
                        <Switch
                            checked={formData.isMostPopular}
                            onCheckedChange={(checked) => setFormData({ ...formData, isMostPopular: checked })}
                        />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-black/20 rounded-xl">
                        <div className="space-y-0.5">
                            <Label className="text-sm">Best Value</Label>
                            <p className="text-[10px] text-muted-foreground italic tracking-tight">Highlight savings</p>
                        </div>
                        <Switch
                            checked={formData.isBestValue}
                            onCheckedChange={(checked) => setFormData({ ...formData, isBestValue: checked })}
                        />
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    <Sparkles size={14} /> Marketing Badges
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. Best Seller, Slow Smoked..."
                            className="bg-background/50 border-white/10 rounded-xl h-10 text-xs"
                            value={newBadge}
                            onChange={(e) => setNewBadge(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
                        />
                        <Button type="button" onClick={addBadge} variant="outline" className="rounded-xl border-primary/30 text-primary h-10 px-4">
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.badges.map((badge: string) => (
                            <span key={badge} className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                {badge}
                                <button type="button" onClick={() => removeBadge(badge)} className="hover:text-white transition-colors">
                                    <Trash2 size={10} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Prep & Storage */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    <Utensils size={14} /> Preparation & Storage
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                    <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Heating Instructions</Label>
                        <Input
                            placeholder="e.g. Microwave for 2 mins or oven bake at 180°C..."
                            className="bg-background/50 border-white/10 rounded-2xl h-12"
                            value={formData.heatingInstructions}
                            onChange={(e) => setFormData({ ...formData, heatingInstructions: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Ingredients</Label>
                        <Textarea
                            placeholder="List of allergens and ingredients..."
                            className="bg-background/50 border-white/10 rounded-2xl min-h-[80px]"
                            value={formData.ingredients}
                            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Storage Instructions</Label>
                        <Textarea
                            placeholder="How to keep it fresh..."
                            className="bg-background/50 border-white/10 rounded-2xl min-h-[80px]"
                            value={formData.storageInstructions}
                            onChange={(e) => setFormData({ ...formData, storageInstructions: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    <BarChart3 size={14} /> Pricing & Inventory
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                    <div className="space-y-2">
                        <Label htmlFor="price" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                            <IndianRupee size={10} /> Price (₹)
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            className="bg-background/50 border-white/10 rounded-2xl h-12"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                            <Package size={10} /> Stock
                        </Label>
                        <Input
                            id="stock"
                            type="number"
                            className="bg-background/50 border-white/10 rounded-2xl h-12"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Weight (e.g. 200g, 8pcs)</Label>
                        <Input
                            className="bg-background/50 border-white/10 rounded-2xl h-12"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">SKU</Label>
                        <Input
                            className="bg-background/50 border-white/10 rounded-2xl h-12 font-mono"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
                        <ImageIcon size={14} /> Product Images
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={addImage} className="h-8 rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10">
                        <Plus size={14} className="mr-1" /> Add Image
                    </Button>
                </div>

                <div className="space-y-3">
                    {formData.images.map((url: string, index: number) => (
                        <div key={index} className="flex gap-4 items-start bg-white/5 p-4 rounded-3xl border border-white/5 group transition-all hover:border-white/10">
                            <div className="w-20 h-20 rounded-2xl bg-background/50 border border-white/5 overflow-hidden flex-shrink-0 group-hover:ring-2 ring-primary/20 transition-all">
                                {url ? (
                                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                                        <ImageIcon size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-tighter">Image URL {index + 1}</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={url}
                                        placeholder="https://images.unsplash.com/..."
                                        onChange={(e) => updateImage(index, e.target.value)}
                                        className="bg-background/50 border-white/10 rounded-xl h-10 flex-1 text-xs"
                                    />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)} className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DialogFooter className="sticky bottom-0 bg-card pt-4 pb-2 mt-4 z-10">
                <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                    {loading ? 'Processing...' : product?.id ? 'Update BBQ Piece' : 'Create New Masterpiece'}
                </Button>
            </DialogFooter>
        </form>
    );
}
