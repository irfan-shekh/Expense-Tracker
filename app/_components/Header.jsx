"use client"
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='sticky top-0 z-50 p-5 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-8 lg:px-12'
        >
            {/* Logo Section with hover scale */}
            <Link href={'/'} className="hover:scale-105 transition-transform active:scale-95 flex items-center">
                <span className="text-2xl font-black tracking-tighter text-white">
                    NEXA<span className="text-emerald-500">_</span>LEDGER
                </span>
            </Link>

            <div className='flex items-center gap-6'>
                {isSignedIn ? (
                    <div className='flex items-center gap-4'>
                        {/* Desktop Navigation Shortcut */}
                        <nav className='hidden md:flex items-center gap-6 mr-4'>
                            <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">
                                Dashboard
                            </Link>
                            <div className="h-4 w-[1px] bg-white/10" />
                        </nav>

                        {/* User Profile with a premium glow wrap */}
                        <div className='p-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]'>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Link href={'/sign-in'}>
                            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 font-bold">
                                Login
                            </Button>
                        </Link>
                        <Link href={'/sign-up'}>
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-black px-8 rounded-full shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all active:scale-95">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Header