"use client"
import React from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

function SideNav() {
    const menuList = [
        { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
        { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
        { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expenses' },
        { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard/upgrade' },
    ]

    const path = usePathname();

    return (
        <div className='h-screen p-6 bg-[#0a0a0a] border-r border-white/5 flex flex-col'>
            {/* Logo Section */}
            <div className='px-4 py-8 mb-4'>
                <Link href={'/'} className="block w-full">
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-white hover:text-emerald-400 transition-all rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95">
                        <Home className="h-4 w-4" /> Home
                    </button>
                </Link>
            </div>

            <nav className='flex-1 space-y-2'>
                {menuList.map((menu) => {
                    const isActive = path === menu.path;

                    return (
                        <Link href={menu.path} key={menu.id} className="relative block group">
                            <div
                                className={`flex gap-4 items-center font-medium px-4 py-4 cursor-pointer rounded-xl transition-all duration-300 relative z-10
                                ${isActive
                                        ? 'text-emerald-400'
                                        : 'text-white/40 hover:text-white hover:bg-white/[0.03]'}`}
                            >
                                {/* Icon with subtle glow when active */}
                                <menu.icon size={22} className={`${isActive ? 'drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : ''}`} />
                                <span className="tracking-tight text-[15px]">{menu.name}</span>

                                {/* Active Tab Glow Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-emerald-500/5 border-r-2 border-emerald-500 rounded-xl z-[-1]"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>


        </div>
    )
}

export default SideNav