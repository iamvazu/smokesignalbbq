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

import { OrderDetailsDialog } from '@/components/dashboard/order-details-dialog';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isManageOpen, setIsManageOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await api.get('/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    };

    const handleManage = (order: any) => {
        setSelectedOrder(order);
        setIsManageOpen(true);
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase">Orders</h1>
                    <p className="text-muted-foreground mt-2 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Monitor and process incoming BBQ orders</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-white/5 bg-card/50 hover:bg-white/10 transition-all px-6 py-6 h-auto group">
                        <Calendar className="mr-2 h-4 w-4 opacity-50 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-widest">Last 30 Days</span>
                    </Button>
                    <Button className="rounded-xl px-10 py-6 h-auto text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                        <ShoppingBag className="mr-2 h-4 w-4" /> New Manual Order
                    </Button>
                </div>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                <CardHeader className="pb-4 border-b border-white/5 bg-white/5">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search order ID, customer, phone..."
                                className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[200px] bg-background/50 border-white/5 rounded-2xl h-12 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3.5 w-3.5 opacity-50" />
                                        <SelectValue placeholder="Status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 rounded-2xl">
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
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-white/2">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="py-5 pl-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">Order Info</TableHead>
                                    <TableHead className="py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Customer</TableHead>
                                    <TableHead className="py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery To</TableHead>
                                    <TableHead className="py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Amount</TableHead>
                                    <TableHead className="py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
                                    <TableHead className="py-5 text-right pr-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-80 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                                <Loader2 className="animate-spin text-primary h-8 w-8" />
                                                <p className="text-sm font-medium animate-pulse">Processing order data...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredOrders.length > 0 ? filteredOrders.map((order) => {
                                    const statusConfig = getStatusConfig(order.orderStatus);
                                    return (
                                        <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-all group">
                                            <TableCell className="py-6 pl-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-mono text-sm font-black text-primary select-all">#{order.id.split('-')[0].toUpperCase()}</span>
                                                    <span className="text-[10px] text-muted-foreground/80 flex items-center gap-1.5 font-medium">
                                                        <Clock size={12} className="text-primary/50" /> {format(new Date(order.createdAt), 'MMM dd, hh:mm a')}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">{order.customer?.name || 'Guest'}</span>
                                                    <span className="text-[10px] text-muted-foreground font-mono bg-white/5 w-fit px-1.5 rounded">{order.customer?.phone}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-6 max-w-[220px]">
                                                <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground/90 italic leading-relaxed line-clamp-2">
                                                    <MapPin size={12} className="mt-0.5 shrink-0 text-primary/70" />
                                                    {order.address?.addressLine1}, {order.address?.city}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-lg font-black text-foreground italic">₹{order.totalAmount}</span>
                                                    <span className={cn(
                                                        "text-[9px] font-bold uppercase tracking-wider",
                                                        order.paymentStatus === 'paid' ? "text-green-500" : "text-yellow-500"
                                                    )}>
                                                        {order.paymentStatus} · {order.paymentMethod}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <Badge className={cn(
                                                    "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit border shadow-sm",
                                                    statusConfig.color
                                                )}>
                                                    <statusConfig.icon size={12} strokeWidth={3} />
                                                    {order.orderStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="py-6 text-right pr-8">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleManage(order)}
                                                    className="rounded-2xl border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all px-5 h-9 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-transparent hover:shadow-primary/20"
                                                >
                                                    Manage <Eye size={14} className="ml-2 group-hover:scale-110 transition-transform" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-80 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                                                    <ShoppingBag size={40} className="opacity-20" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-lg font-bold text-foreground">No orders found</p>
                                                    <p className="text-sm">Try adjusting your filters or search terms.</p>
                                                </div>
                                                <Button variant="link" className="text-primary font-bold uppercase text-[10px] tracking-widest" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>View all orders</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {selectedOrder && (
                <OrderDetailsDialog
                    order={selectedOrder}
                    isOpen={isManageOpen}
                    onClose={() => setIsManageOpen(false)}
                    onUpdate={fetchOrders}
                />
            )}
        </div>
    );
}

import { Loader2 } from 'lucide-react';
