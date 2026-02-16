'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Box } from 'lucide-react';
import api from '@/lib/api';

interface ComboFormProps {
    combo?: any;
    onSuccess: () => void;
}

export function ComboForm({ combo, onSuccess }: ComboFormProps) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        longDescription: '',
        heatingInstructions: '',
        ingredients: '',
        storageInstructions: '',
        price: '',
        originalPrice: '',
        image: '',
        isMostPopular: false,
        isBestValue: false,
        status: 'active',
        items: [] as { productId: string; quantity: number }[]
    });

    useEffect(() => {
        fetchProducts();
        if (combo) {
            setFormData({
                name: combo.name || '',
                description: combo.description || '',
                longDescription: combo.longDescription || '',
                heatingInstructions: combo.heatingInstructions || '',
                ingredients: combo.ingredients || '',
                storageInstructions: combo.storageInstructions || '',
                price: combo.price?.toString() || '',
                originalPrice: combo.originalPrice?.toString() || '',
                image: combo.image || '',
                isMostPopular: combo.isMostPopular || false,
                isBestValue: combo.isBestValue || false,
                status: combo.status || 'active',
                items: combo.items?.map((item: any) => ({
                    productId: item.productId,
                    quantity: item.quantity
                })) || []
            });
        }
    }, [combo]);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { productId: '', quantity: 1 }]
        }));
    };

    const handleRemoveItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const handleItemChange = (index: number, field: 'productId' | 'quantity', value: any) => {
        const newItems = [...formData.items];
        if (field === 'quantity') {
            newItems[index].quantity = parseInt(value) || 1;
        } else {
            newItems[index].productId = value;
        }
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Filter out incomplete items
            const validItems = formData.items.filter(i => i.productId && i.quantity > 0);
            const payload = { ...formData, items: validItems };

            if (combo) {
                await api.put(`/combos/${combo.id}`, payload);
            } else {
                await api.post('/combos', payload);
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save combo', error);
            alert('Failed to save combo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Combo Name</Label>
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background/50 border-white/10"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(val) => setFormData({ ...formData, status: val })}
                    >
                        <SelectTrigger className="bg-background/50 border-white/10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-sm">Most Popular</Label>
                        <p className="text-[10px] text-muted-foreground italic">Add a highlighted badge</p>
                    </div>
                    <Switch
                        checked={formData.isMostPopular}
                        onCheckedChange={(checked) => setFormData({ ...formData, isMostPopular: checked })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-sm">Best Value</Label>
                        <p className="text-[10px] text-muted-foreground italic">Highlight as top savings</p>
                    </div>
                    <Switch
                        checked={formData.isBestValue}
                        onCheckedChange={(checked) => setFormData({ ...formData, isBestValue: checked })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background/50 border-white/10 h-20"
                    placeholder="Brief summary for catalog cards"
                />
            </div>

            <div className="space-y-2">
                <Label>Long Description (Product Page)</Label>
                <Textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    className="bg-background/50 border-white/10 h-32"
                    placeholder="Detailed description for the individual product page"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Heating Instructions</Label>
                    <Input
                        value={formData.heatingInstructions}
                        onChange={(e) => setFormData({ ...formData, heatingInstructions: e.target.value })}
                        className="bg-background/50 border-white/10"
                        placeholder="e.g. Microwave for 2 mins"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Storage Instructions</Label>
                    <Input
                        value={formData.storageInstructions}
                        onChange={(e) => setFormData({ ...formData, storageInstructions: e.target.value })}
                        className="bg-background/50 border-white/10"
                        placeholder="e.g. Keep refrigerated"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Ingredients</Label>
                <Input
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="List main ingredients for transparency"
                />
            </div>

            <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Selling Price (₹)</Label>
                    <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="bg-background/50 border-white/10"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Original Price (₹)</Label>
                    <Input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        className="bg-background/50 border-white/10"
                    />
                </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                    <Label className="text-lg font-bold flex items-center gap-2">
                        <Box size={16} className="text-primary" /> Combo Items
                    </Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                        <Plus size={14} className="mr-2" /> Add Item
                    </Button>
                </div>

                {formData.items.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground bg-white/5 rounded-xl border border-dashed border-white/10">
                        No items added to this combo yet.
                    </div>
                )}

                {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="flex-1 space-y-2">
                            <Label className="text-xs text-muted-foreground">Product</Label>
                            <Select
                                value={item.productId}
                                onValueChange={(val) => handleItemChange(index, 'productId', val)}
                            >
                                <SelectTrigger className="bg-background/50 border-white/10 h-9">
                                    <SelectValue placeholder="Select Product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-24 space-y-2">
                            <Label className="text-xs text-muted-foreground">Qty</Label>
                            <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                className="bg-background/50 border-white/10 h-9"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(index)}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? 'Saving...' : combo ? 'Update Combo' : 'Create Combo'}
                </Button>
            </div>
        </form>
    );
}
