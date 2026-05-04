"use client";
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { motion } from 'framer-motion';

export default function Page() {
    const barHeights = [32, 48, 24, 56, 36, 64, 40, 52, 28, 60];

    return (
        <div className="flex min-h-screen w-full font-sans bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
            {/* ===========================================================
          1. Left Side: 3D Animated Illustration
          =========================================================== */}
            <div className="relative flex-1 hidden lg:flex flex-col items-center justify-center p-12 overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black">

                {/* Animated Background Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px] animate-bounce-slow" />

                <div className="relative z-10 flex flex-col gap-12 max-w-xl">
                    {/* Main Illustration Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left space-y-4"
                    >
                        <h1 className="text-6xl font-black tracking-tight leading-none bg-gradient-to-br from-white to-emerald-500 bg-clip-text text-transparent">
                            Track Smart.<br />Spend Wiser.
                        </h1>
                        <p className="text-lg text-emerald-100/50 max-w-md border-l-2 border-emerald-500/30 pl-4">
                            Experience the next generation of wealth management with real-time 3D analytics and AI-driven insights.
                        </p>
                    </motion.div>

                    {/* 3D Glassmorphism Graphic */}
                    <motion.div
                        initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
                        animate={{ rotateY: 0, rotateX: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ perspective: "1200px" }}
                        className="relative group"
                    >
                        <div className="relative aspect-[12/8] bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transform-gpu transition-transform duration-500 hover:scale-[1.02]">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-1">Portfolio</div>
                                    <div className="text-3xl font-bold text-white leading-none">$42,650.00</div>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                    +12.5%
                                </div>
                            </div>

                            {/* Visualizing Data Bars with staggered animation */}
                            <div className="flex h-48 items-end gap-3">
                                {barHeights.map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                                        className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-125 transition-all"
                                    />
                                ))}
                            </div>

                            {/* Context Floating Icons (3D parallax effect) */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/40 border border-white/20"
                            >
                                📈
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Key Features List - Clean & Minimal */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-emerald-50/70 font-light">
                        {["Automated Categorization", "Real-time Analytics", "Smart Budgeting", "Detailed Reports"].map((feat, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-default">
                                <span className="w-5 h-5 rounded-full border border-emerald-500/50 flex items-center justify-center text-[10px] group-hover:bg-emerald-500 group-hover:text-black transition-all">✓</span>
                                <span className="group-hover:text-emerald-400 transition-colors">{feat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===========================================================
          2. Right Side: Dark Mode Clerk Form
          =========================================================== */}
            <div className="flex-1 lg:max-w-[550px] flex flex-col items-center justify-center p-8 bg-[#0a0a0a] border-l border-white/5 relative">
                <div className="absolute top-0 right-0 p-8 text-xs font-mono text-white/20">
                    SECURE_V3.1.0
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex justify-center py-10"
                >
                    <SignIn appearance={{
                        variables: {
                            colorPrimary: '#10b981',
                            colorText: '#ffffff',
                            colorBackground: '#0a0a0a',
                            colorInputBackground: '#111111',
                            colorInputText: '#ffffff',
                        }
                    }} />
                </motion.div>
            </div>
        </div>
    );
}