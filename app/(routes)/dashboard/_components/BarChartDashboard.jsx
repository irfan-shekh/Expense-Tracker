"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

function BarChartDashboard({ budgetList }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-7 shadow-2xl"
        >
            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-white">Activity Analysis</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Monthly spending vs budget</p>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-[10px] font-bold">
                    LIVE DATA
                </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={budgetList}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    barGap={8}
                >
                    <defs>
                        {/* Emerald Gradient for Spend */}
                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                        </linearGradient>

                        {/* Muted White/Glass Gradient for Total Amount */}
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
                        </linearGradient>

                        {/* Subtle Glow Filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}
                        dy={10}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                    />

                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        contentStyle={{
                            backgroundColor: '#111',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            padding: '12px'
                        }}
                        itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                    />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '30px', fontSize: '12px', opacity: 0.7 }}
                    />

                    {/* Background Bar (Total Budget) */}
                    <Bar
                        dataKey="amount"
                        name="Budget Limit"
                        fill="url(#colorAmount)"
                        radius={[8, 8, 8, 8]}
                        barSize={25}
                    />

                    {/* Foreground Bar (Actual Spend) */}
                    <Bar
                        dataKey="totalSpend"
                        name="Actual Spend"
                        fill="url(#colorSpend)"
                        radius={[8, 8, 8, 8]}
                        barSize={25}
                        // This filter adds a slight neon glow to the emerald bars
                        filter="url(#glow)"
                        animationBegin={300}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}

export default BarChartDashboard;