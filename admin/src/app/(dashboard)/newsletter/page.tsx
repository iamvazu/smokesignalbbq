'use client';

import {
    Mail,
    Search,
    Trash,
    Download,
    CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (token) {
            fetchSubscribers();
        }
    }, [token]);

    const fetchSubscribers = async () => {
        try {
            const res = await axios.get(`${API_URL}/newsletter/subscribers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubscribers(res.data);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this member from the BBQ briefing list?')) return;
        try {
            await axios.delete(`${API_URL}/newsletter/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubscribers(subscribers.filter(s => s.id !== id));
        } catch (error) {
            alert('Mission failed: Could not delete subscriber');
        }
    };

    const exportToCSV = () => {
        const headers = ['Email', 'Source', 'Date Joined'];
        const rows = subscribers.map(s => [s.email, s.source, new Date(s.createdAt).toLocaleDateString()]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `bbq-newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Tactical Mailing List</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Operatives awaiting BBQ Intel</p>
                </div>
                <Button
                    onClick={exportToCSV}
                    className="rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/20"
                    disabled={subscribers.length === 0}
                >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                <CardHeader className="pb-4 border-b border-white/5 bg-white/2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                        <Input
                            placeholder="Search by intelligence record (email)..."
                            className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Subscriber Intel</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Extraction Source</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Deployment Date</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-6 w-6 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Scanning frequencies...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : subscribers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-30">
                                        No operatives detected on the mailing grid.
                                    </TableCell>
                                </TableRow>
                            ) : subscribers.map((sub) => (
                                <TableRow key={sub.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all">
                                                <Mail size={16} />
                                            </div>
                                            <span className="font-bold text-foreground text-sm tracking-tight">{sub.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">{sub.source}</TableCell>
                                    <TableCell className="py-6 text-xs text-muted-foreground font-mono">{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="py-6">
                                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest">
                                            Active Operative
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(sub.id)}
                                            className="h-10 w-10 p-0 rounded-xl hover:bg-red-500 hover:text-white opacity-40 hover:opacity-100 transition-all"
                                        >
                                            <Trash size={16} />
                                        </Button>
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
