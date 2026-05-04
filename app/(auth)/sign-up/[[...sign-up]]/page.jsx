"use client";
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { motion } from 'framer-motion';

export default function Page() {
    const barHeights = [40, 70, 45, 90, 65, 100, 80, 95, 55, 85];

    return (
        <div className="flex min-h-screen w-full font-sans bg-[#050505] text-white selection:bg-emerald-500/30 overflow-hidden">

            {/* Section 1: The Interactive 3D Showcase 
          Visible only on Large Screens 
      */}
            <div className="relative flex-1 hidden lg:flex flex-col items-center justify-center p-16 overflow-hidden">

                {/* Cinematic Background Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-2xl space-y-16">

                    {/* Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            New: AI Insights 2.0
                        </div>
                        <h1 className="text-7xl font-black tracking-tight leading-[0.9] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                            Elevate Your <br />Financial Flow.
                        </h1>
                    </motion.div>

                    {/* Premium 3D Glass Card */}
                    <motion.div
                        whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative group cursor-default"
                    >
                        <div className="relative aspect-[16/10] bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] transition-all duration-500 group-hover:border-emerald-500/30">

                            <div className="flex justify-between items-end mb-12">
                                <div className="space-y-1">
                                    <p className="text-emerald-500 font-mono text-sm tracking-tighter">TOTAL_BALANCE</p>
                                    <h3 className="text-4xl font-bold font-mono">$124,092.44</h3>
                                </div>
                                <div className="h-12 w-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-2xl">
                                    ✨
                                </div>
                            </div>

                            {/* Dynamic Animated Bars */}
                            <div className="flex h-40 items-end gap-2.5">
                                {barHeights.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: 0.5 + (i * 0.05), duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="flex-1 bg-gradient-to-t from-emerald-600/80 via-emerald-400 to-emerald-300 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating 3D Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 px-6 py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.4)]"
                        >
                            +24% Growth
                        </motion.div>
                    </motion.div>

                    {/* Minimal Features List */}
                    <div className="flex gap-8 text-sm font-medium text-white/40">
                        {["Next-Gen Security", "Zero Latency", "AI Predictions"].map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 2: The Sign Up Form Container 
      */}
            <div className="flex-1 lg:max-w-[600px] flex flex-col items-center justify-center p-8 bg-[#0a0a0a] border-l border-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-center z-10"
                >
                    {/* Clerk Appearance Overrides for a Seamless Dark Look */}
                    <SignUp appearance={{
                        baseTheme: dark,
                        variables: {
                            colorPrimary: '#10b981',
                            colorText: '#ffffff',
                            colorTextSecondary: '#a1a1aa',
                            colorBackground: '#0a0a0a',
                            colorInputBackground: '#111111',
                            colorInputText: '#ffffff',
                        },
                        elements: {
                            card: "bg-transparent shadow-none border-none",
                            headerTitle: "text-white text-3xl font-black tracking-tight",
                            headerSubtitle: "text-zinc-400 text-base",
                            socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all",
                            socialButtonsBlockButtonText: "font-bold text-white",
                            formButtonPrimary: "bg-emerald-600 hover:bg-emerald-500 text-black font-black py-4 rounded-xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all",
                            formFieldLabel: "text-white font-black uppercase tracking-widest text-[10px] mb-2 opacity-100",
                            formFieldInput: "bg-white/[0.1] border-white/20 text-white h-12 focus:border-emerald-500/50 focus:bg-white/[0.15] transition-all",
                            footerActionLink: "text-emerald-400 hover:text-emerald-300 font-bold transition-colors",
                            footerActionText: "text-zinc-400",
                            dividerLine: "bg-white/20",
                            dividerText: "text-white/50",
                            formFieldInputShowPasswordButton: "text-zinc-400 hover:text-white"
                        }
                    }} />
                </motion.div>

                {/* Brand Footer */}
                <div className="mt-12 text-white/20 text-[10px] tracking-[0.2em] uppercase font-bold z-10">
                    Powered by Nexa Ledger Systems
                </div>
            </div>
        </div>
    );
}