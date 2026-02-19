'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Clock,
    CheckCircle2,
    XCircle,
    Phone,
    Trash2,
    MessageSquare,
    Loader2,
    Mail,
    User
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function ContactsPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await api.get('/contacts');
            setInquiries(res.data);
        } catch (err) {
            console.error('Failed to fetch contact inquiries', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await api.patch(`/contacts/${id}/status`, { status: newStatus });
            setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            await api.delete(`/contacts/${id}`);
            setInquiries(inquiries.filter(inq => inq.id !== id));
        } catch (err) {
            console.error('Failed to delete inquiry', err);
        }
    };

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch = inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.phoneNumber.includes(searchTerm) ||
            inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.subjectCategory.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'contacted': return { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
            case 'rejected': return { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle };
            case 'pending': return { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock };
            case 'closed': return { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: MessageSquare };
            default: return { color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', icon: Clock };
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase">Contact Enquiries</h1>
                    <p className="text-muted-foreground mt-2 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Manage general queries and business transmissions</p>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-md group">
                            <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search transmissions..."
                                className="pl-12 bg-white/2 border-white/5 rounded-2xl h-14 text-sm focus:border-primary transition-all shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[200px] bg-white/2 border-white/5 rounded-2xl h-14 text-[10px] font-black uppercase tracking-[0.2em] focus:ring-primary/20">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 opacity-30" />
                                        <SelectValue placeholder="STATUS FILTER" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 rounded-2xl backdrop-blur-xl">
                                    <SelectItem value="all" className="text-[10px] font-black uppercase tracking-widest">All Statuses</SelectItem>
                                    <SelectItem value="pending" className="text-[10px] font-black uppercase tracking-widest">Pending</SelectItem>
                                    <SelectItem value="contacted" className="text-[10px] font-black uppercase tracking-widest">Contacted</SelectItem>
                                    <SelectItem value="closed" className="text-[10px] font-black uppercase tracking-widest">Closed</SelectItem>
                                    <SelectItem value="rejected" className="text-[10px] font-black uppercase tracking-widest">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/[0.02]">
                            <TableRow className="border-white/5">
                                <TableHead className="py-6 pl-8 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">ID & Received</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sender & Category</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Transmission Details</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Status</TableHead>
                                <TableHead className="py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-96 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                                                <Loader2 className="animate-spin h-10 w-10 text-primary relative z-10" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Decrypting Transmissions...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredInquiries.length > 0 ? filteredInquiries.map((inq) => {
                                const statusConfig = getStatusConfig(inq.status);
                                return (
                                    <TableRow key={inq.id} className="border-white/2 hover:bg-white/[0.03] transition-all group">
                                        <TableCell className="py-8 pl-8">
                                            <div className="flex flex-col gap-2">
                                                <span className="font-mono text-[10px] font-black text-primary bg-primary/5 w-fit px-2 py-1 rounded-md border border-primary/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                                    #{inq.id.split('-')[0].toUpperCase()}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-2 opacity-50">
                                                    <Clock size={12} className="text-primary" /> {format(new Date(inq.createdAt), 'MMM dd, hh:mm a')}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                                        <User size={14} className="text-primary" />
                                                    </div>
                                                    <span className="font-bold text-sm text-foreground italic font-display">{inq.fullName}</span>
                                                </div>
                                                <div className="flex flex-col gap-1 pl-10 opacity-60">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                        <Mail size={10} className="text-primary/50" /> {inq.email}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                        <Phone size={10} className="text-primary/50" /> {inq.phoneNumber}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8">
                                            <div className="flex flex-col gap-3 max-w-md">
                                                <Badge className="w-fit bg-primary/10 text-primary border-primary/20 text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md">
                                                    {inq.subjectCategory}
                                                </Badge>
                                                <p className="text-xs text-muted-foreground leading-relaxed font-medium line-clamp-3 italic">
                                                    "{inq.message}"
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8 text-center">
                                            <div className="flex justify-center">
                                                <Badge className={cn(
                                                    "rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm border",
                                                    statusConfig.color
                                                )}>
                                                    <statusConfig.icon size={12} strokeWidth={3} />
                                                    {inq.status}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8 text-right pr-8">
                                            <div className="flex justify-end gap-3 translate-x-2 group-hover:translate-x-0 transition-transform opacity-0 group-hover:opacity-100">
                                                <Select value={inq.status} onValueChange={(val) => handleUpdateStatus(inq.id, val)} >
                                                    <SelectTrigger className="w-[140px] h-10 text-[9px] font-black uppercase tracking-widest rounded-xl bg-white/5 border-white/10 hover:border-primary/50 transition-all">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-card border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
                                                        <SelectItem value="pending" className="text-[9px] font-black uppercase tracking-widest">Pending</SelectItem>
                                                        <SelectItem value="contacted" className="text-[9px] font-black uppercase tracking-widest">Contacted</SelectItem>
                                                        <SelectItem value="closed" className="text-[9px] font-black uppercase tracking-widest">Closed</SelectItem>
                                                        <SelectItem value="rejected" className="text-[9px] font-black uppercase tracking-widest text-destructive">Rejected</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 hover:bg-destructive hover:text-white transition-all shadow-lg"
                                                    onClick={() => handleDelete(inq.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            }) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-96 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground italic">
                                            <div className="w-24 h-24 rounded-full bg-white/2 flex items-center justify-center mb-4 border border-white/5 relative">
                                                <Mail size={40} className="text-muted-foreground opacity-10" />
                                                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Zero Transmissions Detected</p>
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
