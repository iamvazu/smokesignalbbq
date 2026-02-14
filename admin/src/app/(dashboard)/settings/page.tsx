'use client';

import {
    Settings,
    Save,
    Shield,
    Bell,
    Globe,
    Mail,
    Smartphone,
    Database,
    Palette,
    Truck,
    Clock,
    Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Command Settings</h1>
                    <p className="text-muted-foreground mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Configure your BBQ empire parameters</p>
                </div>
                <Button className="rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/20 gap-2">
                    <Save size={16} /> Deploy Configuration
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Column */}
                <div className="space-y-2">
                    {[
                        { label: 'General Info', icon: Globe, active: true },
                        { label: 'Security & Access', icon: Shield },
                        { label: 'Logistics Settings', icon: Truck },
                        { label: 'Order Notifications', icon: Bell },
                        { label: 'Database & Logs', icon: Database },
                        { label: 'Visual Interface', icon: Palette }
                    ].map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start h-14 rounded-2xl px-6 gap-4 border border-transparent transition-all",
                                item.active ? "bg-primary/10 text-primary border-primary/10 font-black italic uppercase tracking-tighter" : "text-muted-foreground hover:bg-white/5"
                            )}
                        >
                            <item.icon size={18} className={item.active ? "text-primary" : "text-muted-foreground/50"} />
                            <span className="text-sm">{item.label}</span>
                        </Button>
                    ))}
                </div>

                {/* Content Column */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl border-t border-t-primary/10 overflow-hidden">
                        <CardHeader className="p-8 pb-4 border-b border-white/5 bg-white/2">
                            <CardTitle className="text-xl font-black italic uppercase tracking-tight">General Command Parameters</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Core business identity configurations</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Command Name</Label>
                                    <Input defaultValue="Smoke Signal BBQ" className="bg-background/50 border-white/10 rounded-xl h-12 font-bold uppercase tracking-tight" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Operations Center (Address)</Label>
                                    <Input defaultValue="RS Palaya, Kammanahalli, Bangalore" className="bg-background/50 border-white/10 rounded-xl h-12 font-medium" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Command Phone</Label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                                            <Input defaultValue="+91 78998 70957" className="pl-12 bg-background/50 border-white/10 rounded-xl h-12 font-mono" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Admin Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                                            <Input defaultValue="admin@smokesignalbbq.in" className="pl-12 bg-background/50 border-white/10 rounded-xl h-12 font-medium" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm shadow-xl">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-black italic uppercase tracking-tight text-primary">Operational Hours</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">When the fires are burnin'</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                            <div className="flex items-center justify-between p-6 bg-white/2 rounded-3xl border border-white/5 group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="text-primary" size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black uppercase italic tracking-tighter">Accepting Orders</span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Global customer ordering status</span>
                                    </div>
                                </div>
                                <Switch className="data-[state=checked]:bg-primary" defaultChecked />
                            </div>

                            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground/50 italic px-4">
                                * Disabling this will prevent customers from placing new orders via the frontend website. Useful for private events or peak maintenance intervals.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
