'use client';

import {
    Star,
    Search,
    Trash,
    CheckCircle,
    XCircle,
    MessageSquare,
    Clock,
    Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (token) {
            fetchReviews();
        }
    }, [token]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${API_URL}/reviews/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await axios.patch(`${API_URL}/reviews/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
        } catch (error) {
            alert('Mission failed: Could not update review status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminate this intelligence report (delete review)?')) return;
        try {
            await axios.delete(`${API_URL}/reviews/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(reviews.filter(r => r.id !== id));
        } catch (error) {
            alert('Mission failed: Could not delete review');
        }
    };

    const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter);

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    className={cn(
                        i < rating ? "text-primary fill-primary" : "text-muted-foreground opacity-20"
                    )}
                />
            ))}
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Operative Feedback</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Monitor BBQ satisfaction levels</p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                    {['all', 'pending', 'approved', 'rejected'].map((f) => (
                        <Button
                            key={f}
                            variant="ghost"
                            onClick={() => setFilter(f)}
                            className={cn(
                                "rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest transition-all",
                                filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {f}
                        </Button>
                    ))}
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                <CardHeader className="pb-4 border-b border-white/5 bg-white/2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                        <Input
                            placeholder="Filter by operative name or product..."
                            className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Operative & Intel</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Target Product</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Mission Date</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Command</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-6 w-6 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Decrypting feedback...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredReviews.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-30">
                                        No intelligence reports found in this sector.
                                    </TableCell>
                                </TableRow>
                            ) : filteredReviews.map((review) => (
                                <TableRow key={review.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-foreground italic uppercase tracking-tighter">{review.customerName}</span>
                                                <StarRating rating={review.rating} />
                                            </div>
                                            <p className="text-xs text-muted-foreground italic line-clamp-2 max-w-xs">"{review.comment}"</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 font-bold uppercase text-[10px] tracking-widest text-primary">
                                        {review.product?.name || review.combo?.name || 'Bulk Inquiry'}
                                    </TableCell>
                                    <TableCell className="py-6 text-xs text-muted-foreground font-mono">{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="py-6">
                                        <Badge className={cn(
                                            "rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest",
                                            review.status === 'approved' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                review.status === 'rejected' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                        )}>
                                            {review.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <div className="flex justify-end gap-2">
                                            {review.status !== 'approved' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateStatus(review.id, 'approved')}
                                                    className="h-9 px-4 rounded-xl hover:bg-green-500 hover:text-white transition-all text-green-500 text-[9px] font-bold"
                                                >
                                                    <CheckCircle size={14} className="mr-2" /> Approve
                                                </Button>
                                            )}
                                            {review.status !== 'rejected' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateStatus(review.id, 'rejected')}
                                                    className="h-9 px-4 rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-500 text-[9px] font-bold"
                                                >
                                                    <XCircle size={14} className="mr-2" /> Reject
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(review.id)}
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-destructive hover:text-white opacity-40 hover:opacity-100 transition-all"
                                            >
                                                <Trash size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
