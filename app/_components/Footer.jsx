"use client"
import React from 'react'
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

function Footer() {
    return (
        <footer id="footer-section" className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
            {/* 1. Cinematic Background Glows */}
            <div className="absolute top-0 left-1/4 w-64 h-24 bg-emerald-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-24 bg-blue-500/10 blur-[100px] pointer-events-none" />

            {/* 2. Top Animated Gradient Line */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-30 shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:items-start">

                    {/* Brand & Mission */}
                    <div className="flex flex-col items-center lg:items-start gap-6 max-w-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                                NEXA_LEDGER
                            </span>
                        </div>
                        <p className="text-center lg:text-left text-sm text-white/40 leading-relaxed font-medium">
                            Engineering the future of personal wealth management with real-time analytics and decentralized security.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-center lg:text-left">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">Platform</h3>
                            <nav className="flex flex-col gap-3 text-sm font-medium text-white/50">
                                {['Analytics', 'Security', 'Pricing', 'API'].map((link) => (
                                    <a key={link} href="#" className="hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-1 group">
                                        {link} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">Legal</h3>
                            <nav className="flex flex-col gap-3 text-sm font-medium text-white/50">
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms</a>
                            </nav>
                        </div>
                    </div>

                    {/* Social & Contact Section */}
                    <div className="flex flex-col items-center lg:items-end gap-6">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">Connect</h3>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, color: 'hover:text-white', path: '#' },
                                { icon: Twitter, color: 'hover:text-blue-400', path: '#' },
                                { icon: Linkedin, color: 'hover:text-emerald-400', path: 'https://www.linkedin.com/in/Irfan-shekh' },
                                { icon: Mail, color: 'hover:text-red-400', path: '#' },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.path}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className={`p-3 bg-white/[0.03] border border-white/5 rounded-2xl text-white/40 ${social.color} transition-all shadow-xl`}
                                >
                                    <social.icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Strip */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-white/20">
                        © {new Date().getFullYear()} NEXA_LEDGER // ALL_RIGHTS_RESERVED
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[11px] font-bold text-white/50'
                    >
                        <span>MADE WITH</span>
                        <Heart className='h-3 w-3 text-emerald-500 fill-emerald-500 animate-pulse' />
                        <span>BY</span>
                        <span className='text-white hover:text-emerald-400 cursor-pointer transition-colors uppercase tracking-tighter'>
                            Irfan Shekh
                        </span>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}

export default Footer