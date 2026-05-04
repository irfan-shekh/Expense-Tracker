"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Upgrade() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-10 bg-[#050505] min-h-screen text-white relative overflow-hidden'
        >
            {/* Ambient Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Header Section */}
            <div className='flex items-center gap-2 mb-2'>
                <div className='h-1 w-8 bg-emerald-500 rounded-full' />
                <span className='text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/80'>
                    Access Pro Features
                </span>
            </div>
            <h2 className='text-4xl font-black tracking-tighter mb-2'>Upgrade Your Vault</h2>
            <p className='text-sm text-white/40 mb-10 font-medium max-w-xl'>
                Unlock advanced real-time analytics, unlimited budget parameters, and premium security protocols.
            </p>

            <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl'>
                {/* Free Plan */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className='p-8 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all flex flex-col'
                >
                    <h3 className='text-xs font-bold uppercase tracking-widest text-white/40 mb-2'>Basic License</h3>
                    <div className='flex items-baseline gap-2 mb-8'>
                        <p className='text-5xl font-black text-white'>$0</p>
                        <span className='text-xs font-medium text-white/30 uppercase tracking-widest'>/ forever</span>
                    </div>

                    <div className='flex-1 space-y-4 mb-8'>
                        {['Up to 5 Active Budgets', 'Basic Expense Tracking', 'Standard Encryption', 'Community Support'].map((feature, i) => (
                            <div key={i} className='flex items-center gap-3'>
                                <CheckCircle2 className='h-5 w-5 text-white/20' />
                                <span className='text-sm font-medium text-white/60'>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Button disabled className="w-full h-14 bg-white/5 text-white/40 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-xs">
                        Current Active Plan
                    </Button>
                </motion.div>

                {/* Pro Plan */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className='relative p-8 bg-white/[0.03] backdrop-blur-xl border border-emerald-500/30 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-all flex flex-col overflow-hidden group'
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none transition-all group-hover:bg-emerald-500/20" />

                    <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2'>
                            <Sparkles className='h-4 w-4' /> Pro License
                        </h3>
                        <div className='px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase'>
                            Recommended
                        </div>
                    </div>

                    <div className='flex items-baseline gap-2 mb-8 relative z-10'>
                        <p className='text-5xl font-black text-white'>$4.99</p>
                        <span className='text-xs font-medium text-white/40 uppercase tracking-widest'>/ month</span>
                    </div>

                    <div className='flex-1 space-y-4 mb-8 relative z-10'>
                        {['Unlimited Budget Vaults', 'Real-time Advanced Analytics', 'AI-Driven Predictions 2.0', 'Export Log to CSV/PDF', 'Priority 24/7 Support'].map((feature, i) => (
                            <div key={i} className='flex items-center gap-3'>
                                <CheckCircle2 className='h-5 w-5 text-emerald-400' />
                                <span className='text-sm font-medium text-white/80'>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Button className="relative w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 z-10 overflow-hidden">
                        <span>Upgrade Protocol</span>
                        <Zap className="h-5 w-5" />
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                        />
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Upgrade
