'use client';

import { useEffect, useState } from 'react';
import {
    Calendar,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    XCircle,
    Phone,
    Trash2,
    MessageSquare,
    Loader2
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

export default function EventsPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await api.get('/events');
            setInquiries(res.data);
        } catch (err) {
            console.error('Failed to fetch event inquiries', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await api.patch(`/events/${id}/status`, { status: newStatus });
            setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            await api.delete(`/events/${id}`);
            setInquiries(inquiries.filter(inq => inq.id !== id));
        } catch (err) {
            console.error('Failed to delete inquiry', err);
        }
    };

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch = inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.phoneNumber.includes(searchTerm) ||
            inq.eventType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'booked': return { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
            case 'cancelled': return { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle };
            case 'pending': return { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock };
            case 'contacted': return { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: MessageSquare };
            default: return { color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', icon: Clock };
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Event Inquiries</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">Manage catering leads and event bookings</p>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search name, phone, event type..."
                                className="pl-10 bg-background/50 border-white/5 rounded-xl h-11"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px] bg-background/50 border-white/5 rounded-xl h-11 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3 w-3 opacity-50" />
                                        <SelectValue placeholder="Status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 rounded-xl">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="booked">Booked</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-4 pl-6">Inquiry Info</TableHead>
                                <TableHead className="py-4">Event Details</TableHead>
                                <TableHead className="py-4">Contact Info</TableHead>
                                <TableHead className="py-4">Guests</TableHead>
                                <TableHead className="py-4">Status</TableHead>
                                <TableHead className="py-4 text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground animate-pulse">
                                            <Loader2 className="animate-spin" /> Fetching event leads...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredInquiries.length > 0 ? filteredInquiries.map((inq) => {
                                const statusConfig = getStatusConfig(inq.status);
                                return (
                                    <TableRow key={inq.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                        <TableCell className="py-5 pl-6">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-xs font-bold text-primary mb-1">#{inq.id.split('-')[0].toUpperCase()}</span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <Clock size={10} /> {format(new Date(inq.createdAt), 'MMM dd, hh:mm a')}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{inq.eventType}</span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <Calendar size={10} /> {inq.eventDate}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{inq.fullName}</span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <Phone size={10} /> {inq.phoneNumber}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <span className="font-bold text-foreground">{inq.guestCount}</span>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-fit",
                                                statusConfig.color
                                            )}>
                                                <statusConfig.icon size={10} />
                                                {inq.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-5 text-right pr-6">
                                            <div className="flex justify-end gap-2">
                                                <Select value={inq.status} onValueChange={(val) => handleUpdateStatus(inq.id, val)}>
                                                    <SelectTrigger className="w-[120px] h-8 text-[10px] font-bold uppercase rounded-lg">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-card border-white/10 rounded-xl">
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="contacted">Contacted</SelectItem>
                                                        <SelectItem value="booked">Booked</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button size="icon" variant="destructive" className="h-8 w-8 rounded-lg" onClick={() => handleDelete(inq.id)}>
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            }) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                            <Calendar size={48} className="opacity-10 mb-2" />
                                            <p>No event inquiries found.</p>
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
