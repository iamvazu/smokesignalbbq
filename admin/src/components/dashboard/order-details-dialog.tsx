'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    MapPin,
    Phone,
    User,
    Package,
    Receipt,
    CreditCard,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import api from '@/lib/api';

interface OrderDetailsDialogProps {
    order: any;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export function OrderDetailsDialog({ order, isOpen, onClose, onUpdate }: OrderDetailsDialogProps) {
    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus || 'pending');
    const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus || 'pending');

    if (!order) return null;

    const handleUpdateStatus = async () => {
        setLoading(true);
        try {
            await api.put(`/orders/${order.id}`, {
                orderStatus,
                paymentStatus
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Failed to update order status', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'cancelled': return <XCircle size={16} className="text-red-500" />;
            case 'pending': return <Clock size={16} className="text-yellow-500" />;
            case 'preparing': return <Loader2 size={16} className="text-blue-500 animate-spin" />;
            case 'dispatched': return <Truck size={16} className="text-purple-500" />;
            default: return <Clock size={16} className="text-gray-500" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] bg-zinc-950/95 backdrop-blur-2xl border-white/10 p-0 overflow-hidden max-h-[90vh] flex flex-col shadow-2xl">
                <div className="bg-primary/5 p-6 border-b border-white/5">
                    <DialogHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    <span className="text-primary font-mono select-all">#{order.id.split('-')[0].toUpperCase()}</span>
                                    <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 text-primary px-3 py-1">
                                        {order.orderStatus.toUpperCase()}
                                    </Badge>
                                </DialogTitle>
                                <DialogDescription className="mt-2 flex items-center gap-2">
                                    <Clock size={14} /> Ordered on {format(new Date(order.createdAt), 'PPPP p')}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {/* Customer & Shipping Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <User size={14} className="text-primary" /> Customer Details
                            </h3>
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/5 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground font-medium">Name</span>
                                    <span className="text-sm font-bold text-foreground">{order.customer?.name || 'Guest'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground font-medium">Phone</span>
                                    <span className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <Phone size={12} className="text-primary" /> {order.customer?.phone}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <MapPin size={14} className="text-primary" /> Delivery Address
                            </h3>
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/5 min-h-[84px] flex items-center">
                                <p className="text-sm leading-relaxed text-foreground/80 italic font-medium">
                                    {order.address?.addressLine1}, {order.address?.city}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Package size={14} className="text-primary" /> Order Items ({order.items?.length || 0})
                        </h3>
                        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase text-[10px]">Item</th>
                                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase text-[10px] text-center">Qty</th>
                                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase text-[10px] text-right">Price</th>
                                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase text-[10px] text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {order.items?.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="font-bold text-foreground">{item.product?.name || item.combo?.name || 'Unknown Item'}</div>
                                                <div className="text-[10px] text-muted-foreground font-mono">{item.product?.sku || 'COMBO'}</div>
                                            </td>
                                            <td className="px-4 py-4 text-center font-mono">x{item.quantity}</td>
                                            <td className="px-4 py-4 text-right font-mono">₹{item.price}</td>
                                            <td className="px-4 py-4 text-right font-bold text-primary font-mono">₹{item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary & Payment Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <CreditCard size={14} className="text-primary" /> Payment Info
                            </h3>
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/5 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Method</span>
                                    <Badge variant="secondary" className="bg-white/10 uppercase tracking-widest text-[10px]">
                                        {order.paymentMethod}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Update Payment Status</label>
                                    <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                                        <SelectTrigger className="bg-background/50 border-white/5 h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-white/10">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Receipt size={14} className="text-primary" /> Order Summary
                            </h3>
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/5 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span className="text-foreground">₹{order.deliveryFee}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">GST (18%)</span>
                                    <span className="text-foreground">₹{order.taxAmount}</span>
                                </div>
                                <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-sm font-bold text-foreground">Total Amount</span>
                                    <span className="text-xl font-black text-primary italic">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Update Section */}
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                {getStatusIcon(orderStatus)}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground">Update Order Status</h4>
                                <p className="text-[10px] text-muted-foreground uppercase">Current: {order.orderStatus}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {['pending', 'preparing', 'dispatched', 'delivered', 'cancelled'].map((status) => (
                                <Button
                                    key={status}
                                    variant={orderStatus === status ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setOrderStatus(status)}
                                    className={cn(
                                        "h-9 rounded-xl text-[10px] font-bold uppercase transition-all",
                                        orderStatus === status
                                            ? "bg-primary shadow-lg shadow-primary/20 scale-105"
                                            : "border-white/5 hover:bg-white/10"
                                    )}
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl w-full">
                    <Button variant="ghost" onClick={onClose} disabled={loading} className="rounded-xl px-6">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdateStatus}
                        disabled={loading || (orderStatus === order.orderStatus && paymentStatus === order.paymentStatus)}
                        className="rounded-xl px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
