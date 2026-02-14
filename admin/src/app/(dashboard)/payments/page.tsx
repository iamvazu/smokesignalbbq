'use client';

import {
    CreditCard,
    ArrowUpRight,
    TrendingUp,
    Filter,
    Search,
    Clock,
    CheckCircle2,
    DollarSign,
    Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function PaymentsPage() {
    const [loading] = useState(false);

    // Mock data for now to ensure the page works
    const mockPayments = [
        { id: 'PAY-101', customer: 'John Doe', amount: 1250, method: 'WhatsApp/UPI', status: 'completed', date: new Date() },
        { id: 'PAY-102', customer: 'Jane Smith', amount: 890, method: 'COD', status: 'pending', date: new Date() },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Financial Records</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Command your revenue streams</p>
                </div>
                <Button className="rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/20">
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Settlement Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Cashflow</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">₹45,200</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-wider">
                            <TrendingUp size={14} /> +15% vs Last Week
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Pending Payouts</CardDescription>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">₹2,840</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-yellow-500 font-black text-[10px] uppercase tracking-wider">
                            <Clock size={14} /> 3 Orders Pending
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Success Rate</CardTitle>
                        <CardTitle className="text-4xl font-black italic tracking-tighter text-foreground">98.2%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-wider">
                            <CheckCircle2 size={14} /> High Fidelity
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
                                placeholder="Search transaction ID..."
                                className="pl-12 bg-background/50 border-white/5 rounded-2xl h-12 text-sm focus:ring-primary/20"
                            />
                        </div>
                        <Button variant="outline" className="rounded-2xl border-white/5 bg-background/50 h-12 px-6 text-[10px] font-black uppercase tracking-widest">
                            <Filter className="mr-2 h-4 w-4 opacity-50" /> All Methods
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5">
                                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Txn ID</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Operative</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Value</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Method</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPayments.map((p) => (
                                <TableRow key={p.id} className="border-white/5 hover:bg-white/2 transition-all group">
                                    <TableCell className="py-6 pl-8 font-black text-primary italic font-mono uppercase">{p.id}</TableCell>
                                    <TableCell className="py-6 font-bold text-foreground">{p.customer}</TableCell>
                                    <TableCell className="py-6 font-black italic text-lg text-foreground">₹{p.amount}</TableCell>
                                    <TableCell className="py-6">
                                        <Badge variant="outline" className="rounded-full border-white/10 uppercase text-[9px] font-black tracking-widest px-3">
                                            {p.method}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className={cn(
                                            "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest",
                                            p.status === 'completed' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                        )}>
                                            {p.status}
                                        </Badge>
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
