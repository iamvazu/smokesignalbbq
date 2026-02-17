'use client';

import { useEffect, useState } from 'react';
import {
    MapPin,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    XCircle,
    Phone,
    Trash2,
    MessageSquare,
    Loader2,
    TrendingUp,
    Building2,
    Briefcase,
    Mail
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

export default function FranchisePage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await api.get('/franchise');
            setInquiries(res.data);
        } catch (err) {
            console.error('Failed to fetch franchise inquiries', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await api.patch(`/franchise/${id}/status`, { status: newStatus });
            setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this franchise inquiry?')) return;
        try {
            await api.delete(`/franchise/${id}`);
            setInquiries(inquiries.filter(inq => inq.id !== id));
        } catch (err) {
            console.error('Failed to delete inquiry', err);
        }
    };

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch =
            (inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
            (inq.phone?.includes(searchTerm) || '') ||
            (inq.city?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
            (inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
        const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'approved': return { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
            case 'rejected': return { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle };
            case 'pending': return { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock };
            case 'contacted': return { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: MessageSquare };
            default: return { color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', icon: Clock };
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground italic flex items-center gap-4">
                        <TrendingUp className="text-primary w-10 h-10" />
                        Franchise Leads
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-[0.2em] font-medium">Manage BHARAT National Expansion Applications</p>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />

                <CardHeader className="pb-4 relative z-10">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search name, phone, city, email..."
                                className="pl-10 bg-background/50 border-white/5 rounded-xl h-12 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[200px] bg-background/50 border-white/5 rounded-xl h-12 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3 w-3 opacity-50 text-primary" />
                                        <SelectValue placeholder="Status Filter" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 rounded-xl">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="pending">Pending Review</SelectItem>
                                    <SelectItem value="contacted">Team Contacted</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 relative z-10">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Applicant Info</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location & Model</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Financial Capacity</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</TableHead>
                                <TableHead className="py-5 text-right pr-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground animate-pulse">
                                            <Loader2 className="animate-spin text-primary w-8 h-8" />
                                            <span className="text-xs font-black uppercase tracking-widest">Processing Leads...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredInquiries.length > 0 ? filteredInquiries.map((inq) => {
                                const statusConfig = getStatusConfig(inq.status);
                                return (
                                    <TableRow key={inq.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-6 pl-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-foreground text-sm flex items-center gap-2">
                                                    {inq.name}
                                                    {inq.netWorth?.includes('Cr') && <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[8px] px-1 py-0 h-4">HNI</Badge>}
                                                </span>
                                                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                                    <span className="flex items-center gap-1.5"><Mail size={12} className="text-primary/70" /> {inq.email}</span>
                                                    <span className="flex items-center gap-1.5"><Phone size={12} className="text-primary/70" /> {inq.phone}</span>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground/50 mt-1 flex items-center gap-1">
                                                    <Clock size={10} /> {format(new Date(inq.createdAt), 'MMM dd, yyyy • hh:mm a')}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={12} className="text-primary" />
                                                    <span className="text-xs font-bold text-foreground">{inq.city}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={12} className="text-muted-foreground" />
                                                    <Badge variant="outline" className="text-[9px] font-black tracking-widest uppercase border-white/10">{inq.businessOrg || 'Standard'}</Badge>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-tighter">Investment Cap</span>
                                                <span className="font-black text-primary">{inq.investmentRange}</span>
                                                <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                                                    <span className="opacity-50">Net Worth:</span>
                                                    <span className="text-foreground font-mono">{inq.netWorth || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="max-w-[180px]">
                                                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed italic">
                                                    "{inq.experience || 'No experience details provided.'}"
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 w-fit",
                                                statusConfig.color
                                            )}>
                                                <statusConfig.icon size={10} strokeWidth={3} />
                                                {inq.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-6 text-right pr-8">
                                            <div className="flex justify-end gap-3">
                                                <Select value={inq.status} onValueChange={(val) => handleUpdateStatus(inq.id, val)}>
                                                    <SelectTrigger className="w-[130px] h-9 text-[9px] font-black uppercase tracking-widest rounded-xl border-white/5 bg-background/50 hover:bg-white/5 transition-all">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-card border-white/10 rounded-xl">
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="contacted">Contacted</SelectItem>
                                                        <SelectItem value="approved">Approved</SelectItem>
                                                        <SelectItem value="rejected">Rejected</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    className="h-9 w-9 rounded-xl shadow-lg shadow-destructive/10 hover:shadow-destructive/30"
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
                                    <TableCell colSpan={6} className="h-80 text-center">
                                        <div className="flex flex-col items-center justify-center gap-6 text-muted-foreground bg-white/[0.01] rounded-3xl m-8 py-12">
                                            <TrendingUp size={64} className="opacity-5 text-primary" />
                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm font-black uppercase tracking-widest text-foreground">Zero Expansion Leads</p>
                                                <p className="text-xs opacity-50">Franchise inquiries will appear here as they arrive.</p>
                                            </div>
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
