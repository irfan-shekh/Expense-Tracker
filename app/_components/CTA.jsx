"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

function CTA() {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.9] mb-8"
                    >
                        Ready to take control <br/> 
                        <span className="italic font-serif bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">of your finances?</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/40 max-w-xl mx-auto mb-12 leading-relaxed"
                    >
                        Join thousands of smart users who are already mastering their spending habits with Nexa Ledger.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/sign-up">
                            <Button className="h-16 px-12 text-lg bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-full shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all">
                                Get Started Free
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        
                        <Link href="/pricing">
                            <Button variant="outline" className="h-16 px-12 text-lg border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-full transition-all">
                                View Pricing
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CTA
