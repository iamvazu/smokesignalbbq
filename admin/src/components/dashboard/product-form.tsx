'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import api from '@/lib/api';

interface ProductFormProps {
    product?: any;
    onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        category: product?.category || 'bbq',
        subCategory: product?.subCategory || 'wings',
        sku: product?.sku || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        status: product?.status || 'active',
        images: product?.images?.map((img: any) => img.imageUrl) || []
    });


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

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={formData.category}
                        onValueChange={(val) => setFormData({ ...formData, category: val })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bbq">Ready to Heat (BBQ)</SelectItem>
                            <SelectItem value="sauce">Sauces</SelectItem>
                            <SelectItem value="combo">Combos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subCategory">Sub Category</Label>
                    <Select
                        value={formData.subCategory}
                        onValueChange={(val) => setFormData({ ...formData, subCategory: val })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Sub Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="wings">Wings</SelectItem>
                            <SelectItem value="chicken">Chicken</SelectItem>
                            <SelectItem value="beef">Beef</SelectItem>
                            <SelectItem value="pork">Pork</SelectItem>
                            <SelectItem value="sauces">Sauces</SelectItem>
                            <SelectItem value="combos">Combos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="images">Image URL (comma separated)</Label>
                <Input
                    id="images"
                    placeholder="https://..."
                    value={formData.images.join(', ')}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(s => s.trim()) })}
                />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
                </Button>
            </DialogFooter>
        </form>
    );
}
