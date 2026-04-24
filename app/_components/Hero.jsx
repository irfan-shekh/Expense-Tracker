"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles, Play, Shield, TrendingUp } from 'lucide-react'

function Hero() {
    const { user, isSignedIn } = useUser();

    return (
        <section className="relative bg-[#050505] flex items-center flex-col overflow-hidden pt-20 pb-32">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-4xl text-center"
                >
                    {/* High-End Badge */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase mb-10 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    >
                        <Sparkles className="h-3 w-3" />
                        Next-Gen Intelligence
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] text-white mb-8">
                        The Future of <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-200 bg-clip-text text-transparent italic font-serif">
                            Personal Finance.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-12">
                        Stop guessing where your money goes. Experience cinematic financial tracking
                        with AI-driven insights and enterprise-grade security.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-20">
                        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                            <Button className="h-16 px-10 text-lg bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-full shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all group active:scale-95">
                                Start Your Journey
                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            className="h-16 px-10 text-lg border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Play className="h-3 w-3 fill-white" />
                            </div>
                            Watch Demo
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white">
                            <Shield className="h-4 w-4" /> SECURE_PROTOCOL
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white">
                            <TrendingUp className="h-4 w-4" /> REAL_TIME_SYNC
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white uppercase">
                            Global Coverage
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Dashboard Preview Section */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-20 w-full max-w-6xl px-6 mt-24"
            >
                {/* Outer Glow/Gradient Border */}
                <div className="relative group p-2 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">

                    {/* Main Container: Removed aspect-video to allow full image height */}
                    <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/10 w-full">

                        <img
                            src="dashboard.png"
                            alt="Dashboard Preview"
                            /* w-full and h-auto ensures the image takes its natural height 
                               without being cropped by a 16:9 aspect ratio.
                            */
                            className="w-full h-auto block opacity-70 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        />

                        {/* Bottom Gradient Overlay: Makes the image blend into the dark background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero