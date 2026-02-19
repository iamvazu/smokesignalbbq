'use client';

import { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, ShoppingBag, Loader2, Globe, MousePointer2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

const COLORS = ['#EF4444', '#8B0000', '#F5E6C8', '#2B1B12', '#4B2C20'];

interface GAData {
    pageViews: Array<{ page: string; views: number }>;
    insights: Array<{ city: string; users: number }>;
    message?: string;
}

export default function AnalyticsPage() {
    const [gaData, setGaData] = useState<GAData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGAData = async () => {
            try {
                const response = await api.get('/analytics/google');
                setGaData(response.data);
            } catch (err) {
                console.error('Failed to fetch GA data:', err);
                setError('Could not connect to Google Analytics service');
            } finally {
                setLoading(false);
            }
        };

        fetchGAData();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-fire" size={40} />
                <p className="text-muted-foreground animate-pulse">Fetching real-time intelligence...</p>
            </div>
        );
    }

    const hasGA = gaData && gaData.pageViews.length > 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-5xl font-black text-foreground tracking-tighter italic uppercase">Analytics</h1>
                    <p className="text-muted-foreground mt-2 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Deep dive into Smoke Signal BBQ performance</p>
                </div>
                {!hasGA && (
                    <div className="bg-fire/10 border border-fire/20 px-4 py-2 rounded-xl flex items-center gap-2 text-fire text-xs font-bold">
                        <AlertCircle size={14} />
                        GA4 API NOT CONFIGURED
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-white/5 bg-card/50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-fire/10 flex items-center justify-center text-fire">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Traffic</p>
                                <h3 className="text-2xl font-bold font-display">{hasGA ? gaData.pageViews.reduce((a, b) => a + b.views, 0).toLocaleString() : '---'}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Globe size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Top Region</p>
                                <h3 className="text-2xl font-bold font-display">{hasGA ? gaData.insights[0]?.city || 'Global' : '---'}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                                <MousePointer2 size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Avg. Conversion</p>
                                <h3 className="text-2xl font-bold font-display">2.4%</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5 bg-card/50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Retention</p>
                                <h3 className="text-2xl font-bold font-display">64%</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Page Visibility Chart */}
                <Card className="border-white/5 bg-card/50 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe size={20} className="text-fire" />
                            Page Popularity (GA4 Real-time)
                        </CardTitle>
                        <CardDescription>Which pages are burning the brightest? Analysis of the last 30 days.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        {hasGA ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gaData.pageViews} layout="vertical" margin={{ left: 40, right: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="page"
                                        type="category"
                                        stroke="#ffffff60"
                                        fontSize={10}
                                        width={120}
                                        tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0B0B0B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                        labelStyle={{ color: '#EF4444' }}
                                    />
                                    <Bar dataKey="views" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={30} label={{ position: 'right', fill: '#ffffff60', fontSize: 10 }} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-white/2">
                                <p className="text-muted-foreground text-center max-w-xs">
                                    Configure Google Analytics credentials in the backend `.env` to see live traffic data.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* User Geography */}
                <Card className="border-white/5 bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users size={20} className="text-fire" />
                            User Geography
                        </CardTitle>
                        <CardDescription>Top cities visiting Smoke Signal BBQ.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                        {hasGA ? (
                            <>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={gaData.insights}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="users"
                                            nameKey="city"
                                        >
                                            {gaData.insights.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0B0B0B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex flex-col gap-2 pr-4 min-w-[120px]">
                                    {gaData.insights.map((item, i) => (
                                        <div key={item.city} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-[10px] text-muted-foreground truncate max-w-[100px]">{item.city}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-muted-foreground text-sm italic">Limited data available</div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-white/5 bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp size={20} className="text-fire" />
                            Engagement Trends
                        </CardTitle>
                        <CardDescription>Sessions vs Conversions activity.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                { name: 'Day 1', sessions: 400, conv: 24 },
                                { name: 'Day 2', sessions: 300, conv: 13 },
                                { name: 'Day 3', sessions: 200, conv: 98 },
                                { name: 'Day 4', sessions: 278, conv: 39 },
                                { name: 'Day 5', sessions: 189, conv: 48 },
                                { name: 'Day 6', sessions: 239, conv: 38 },
                                { name: 'Day 7', sessions: 349, conv: 43 },
                            ]}>
                                <defs>
                                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0B0B0B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="sessions" stroke="#EF4444" fillOpacity={1} fill="url(#colorSessions)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
