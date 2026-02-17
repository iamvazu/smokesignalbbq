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
    Clock,
    X,
    Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function DiscountsPage() {
    const [discounts, setDiscounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState<any>(null);
    const token = useAuthStore((state) => state.token);

    // Form state
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: 10,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        usageLimit: '',
        isFirstOrderOnly: false,
        isActive: true
    });

    useEffect(() => {
        if (token) fetchDiscounts();
    }, [token]);

    const fetchDiscounts = async () => {
        try {
            const res = await axios.get(`${API_URL}/discounts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDiscounts(res.data);
        } catch (error) {
            console.error('Error fetching discounts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingDiscount) {
                await axios.put(`${API_URL}/discounts/${editingDiscount.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/discounts`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchDiscounts();
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            alert('Mission failed: Could not save discount code');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminate this tactical code?')) return;
        try {
            await axios.delete(`${API_URL}/discounts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDiscounts(discounts.filter(d => d.id !== id));
        } catch (error) {
            alert('Failed to delete discount');
        }
    };

    const resetForm = () => {
        setFormData({
            code: '',
            discountType: 'percentage',
            discountValue: 10,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            usageLimit: '',
            isFirstOrderOnly: false,
            isActive: true
        });
        setEditingDiscount(null);
    };

    const openEdit = (discount: any) => {
        setEditingDiscount(discount);
        setFormData({
            code: discount.code,
            discountType: discount.discountType,
            discountValue: discount.discountValue,
            expiryDate: new Date(discount.expiryDate).toISOString().split('T')[0],
            usageLimit: discount.usageLimit || '',
            isFirstOrderOnly: discount.isFirstOrderOnly,
            isActive: discount.isActive
        });
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Tactical Coupons</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Manage your BBQ arsenal discounts</p>
                </div>
                <Button
                    onClick={() => { resetForm(); setIsDialogOpen(true); }}
                    className="rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Create New Code
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Campaigns</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">
                            {discounts.filter(d => d.isActive).length}
                        </CardTitle>
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
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">
                            {discounts.reduce((acc, curr) => acc + (curr.usedCount || 0), 0)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-wider">
                            <Users size={14} /> Happy Operatives
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">First Order Specials</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">
                            {discounts.filter(d => d.isFirstOrderOnly).length}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-wider">
                            <Zap size={14} /> Rookie Perks
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
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Strategy</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Value</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Usage</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Target</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Intel</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-20 text-[10px] font-black uppercase tracking-widest opacity-50">Scanning encryption...</TableCell>
                                </TableRow>
                            ) : discounts.map((d) => (
                                <TableRow key={d.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-2 w-fit">
                                            <span className="font-black text-primary font-mono tracking-widest">{d.code}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 font-bold text-foreground opacity-60 uppercase text-[10px] tracking-widest">{d.discountType}</TableCell>
                                    <TableCell className="py-6 font-black italic text-xl text-foreground">
                                        {d.discountType === 'percentage' ? `${d.discountValue}%` : `₹${d.discountValue}`}
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-black italic text-foreground">{d.usedCount || 0} / {d.usageLimit || '∞'}</span>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-40 tracking-wider">Redeemed</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        {d.isFirstOrderOnly ? (
                                            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 rounded-full text-[8px] font-black uppercase tracking-widest">First Order</Badge>
                                        ) : (
                                            <Badge className="bg-white/5 text-muted-foreground border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest">All Hands</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className={cn(
                                            "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest",
                                            d.isActive ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {d.isActive ? 'active' : 'disabled'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEdit(d)}
                                                className="h-10 w-10 p-0 rounded-xl hover:bg-white/5"
                                            >
                                                <Edit size={16} className="text-muted-foreground" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(d.id)}
                                                className="h-10 w-10 p-0 rounded-xl hover:bg-red-500/10 text-red-500 opacity-40 hover:opacity-100"
                                            >
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

            {/* Tactical Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsDialogOpen(false)} />
                    <Card className="relative w-full max-w-lg bg-card border-white/10 shadow-2xl overflow-hidden rounded-[3rem]">
                        <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">{editingDiscount ? 'Update Intel' : 'New Strategic Code'}</CardTitle>
                                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Configure your discount payload</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)} className="rounded-full">
                                    <X size={20} />
                                </Button>
                            </div>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Strategy Code</label>
                                        <Input
                                            required
                                            placeholder="WELCOMESMOKE"
                                            value={formData.code}
                                            onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                            className="bg-white/5 border-white/10 rounded-2xl h-12 uppercase font-mono tracking-widest"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payload Type</label>
                                        <select
                                            className="w-full bg-white/5 border-white/10 border rounded-2xl h-12 px-4 text-sm focus:ring-primary/20 focus:border-primary outline-none"
                                            value={formData.discountType}
                                            onChange={e => setFormData({ ...formData, discountType: e.target.value })}
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed (₹)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payload Value</label>
                                        <Input
                                            type="number"
                                            required
                                            value={formData.discountValue}
                                            onChange={e => setFormData({ ...formData, discountValue: parseInt(e.target.value) })}
                                            className="bg-white/5 border-white/10 rounded-2xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Expiration Date</label>
                                        <Input
                                            type="date"
                                            required
                                            value={formData.expiryDate}
                                            onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                                            className="bg-white/5 border-white/10 rounded-2xl h-12"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Usage Limit (Leave empty for ∞)</label>
                                    <Input
                                        type="number"
                                        value={formData.usageLimit}
                                        onChange={e => setFormData({ ...formData, usageLimit: e.target.value })}
                                        className="bg-white/5 border-white/10 rounded-2xl h-12"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isFirstOrderOnly: !formData.isFirstOrderOnly })}
                                        className={cn(
                                            "flex-1 h-12 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                            formData.isFirstOrderOnly ? "bg-blue-500/10 border-blue-500/50 text-blue-500" : "bg-white/5 border-white/10 text-muted-foreground"
                                        )}
                                    >
                                        {formData.isFirstOrderOnly ? <Check size={14} /> : <div className="w-3.5" />}
                                        First Order Only
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                        className={cn(
                                            "flex-1 h-12 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                            formData.isActive ? "bg-green-500/10 border-green-500/50 text-green-500" : "bg-red-500/10 border-red-500/50 text-red-500"
                                        )}
                                    >
                                        {formData.isActive ? <Check size={14} /> : <X size={14} />}
                                        {formData.isActive ? 'Active' : 'Disabled'}
                                    </button>
                                </div>
                            </CardContent>
                            <div className="p-8 pt-0">
                                <Button type="submit" className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary/20">
                                    {editingDiscount ? 'Update Strategy' : 'Deploy Strategic Code'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
