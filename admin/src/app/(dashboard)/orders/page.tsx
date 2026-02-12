'use client';

import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    MapPin,
    Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const custName = order.customer?.name || 'Guest';
        const matchesSearch = custName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer?.phone?.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'delivered': return { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
            case 'cancelled': return { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle };
            case 'pending': return { color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock };
            case 'preparing': return { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Loader2 };
            case 'dispatched': return { color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: Truck };
            default: return { color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', icon: Clock };
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Orders</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">Monitor and process incoming BBQ orders</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-white/5 bg-card/50">
                        <Calendar className="mr-2 h-4 w-4 opacity-50" /> Last 30 Days
                    </Button>
                    <Button className="rounded-xl px-6">
                        <ShoppingBag className="mr-2 h-4 w-4" /> New Manual Order
                    </Button>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search order ID, customer, phone..."
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
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="preparing">Preparing</SelectItem>
                                    <SelectItem value="dispatched">Dispatched</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
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
                                <TableHead className="py-4 pl-6">Order Info</TableHead>
                                <TableHead className="py-4">Customer Details</TableHead>
                                <TableHead className="py-4">Delivery To</TableHead>
                                <TableHead className="py-4">Total Amount</TableHead>
                                <TableHead className="py-4">Status</TableHead>
                                <TableHead className="py-4 text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground animate-pulse">
                                            <Loader2 className="animate-spin" /> Processing order data...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredOrders.length > 0 ? filteredOrders.map((order) => {
                                const statusConfig = getStatusConfig(order.orderStatus);
                                return (
                                    <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                        <TableCell className="py-5 pl-6">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-xs font-bold text-primary mb-1">#{order.id.split('-')[0].toUpperCase()}</span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                    <Clock size={10} /> {format(new Date(order.createdAt), 'MMM dd, hh:mm a')}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{order.customer?.name || 'Guest'}</span>
                                                <span className="text-[10px] text-muted-foreground">{order.customer?.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5 max-w-[200px]">
                                            <div className="flex items-start gap-1 text-[10px] text-muted-foreground italic line-clamp-2">
                                                <MapPin size={10} className="mt-0.5 shrink-0 text-primary" />
                                                {order.address?.addressLine1}, {order.address?.city}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground">₹{order.totalAmount}</span>
                                                <span className={cn(
                                                    "text-[9px] font-bold uppercase",
                                                    order.paymentStatus === 'paid' ? "text-green-500" : "text-yellow-500"
                                                )}>
                                                    {order.paymentStatus} via {order.paymentMethod}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-5">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-fit",
                                                statusConfig.color
                                            )}>
                                                <statusConfig.icon size={10} />
                                                {order.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-5 text-right pr-6">
                                            <Button variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                                Manage <Eye size={12} className="ml-2" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                            <ShoppingBag size={48} className="opacity-10 mb-2" />
                                            <p>No orders found for this view.</p>
                                            <Button variant="link" className="text-primary mt-2" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>View all orders</Button>
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

import { Loader2 } from 'lucide-react';
