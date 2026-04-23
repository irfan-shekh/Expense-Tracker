"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { Budgets } from '../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { db } from '../../../utils/dbConfig'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

function DashboardLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            checkUserBudgets();
        }
    }, [user])

    const checkUserBudgets = async () => {
        try {
            const result = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

            if (result?.length === 0) {
                router.replace('/dashboard/budgets');
            }
        } catch (error) {
            console.error("Database query failed:", error);
        }
    }

    return (
        <div className='min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30'>
            {/* 1. Sidebar: Fixed Glassmorphism Container */}
            <aside className='fixed md:w-72 hidden md:block h-screen z-50 border-r border-white/5 bg-[#0a0a0a] shadow-[10px_0_30px_rgba(0,0,0,0.5)]'>
                <SideNav />
            </aside>

            {/* 2. Main Viewport */}
            <div className='md:ml-72 relative min-h-screen flex flex-col'>

                {/* Background Ambient Spotlight */}
                <div className='absolute top-0 right-0 w-full h-[600px] bg-emerald-500/5 blur-[120px] pointer-events-none -z-10' />

                {/* 3. Dashboard Header: Floating Glass Effect */}
                <header className='sticky top-0 z-40 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5'>
                    <DashboardHeader />
                </header>

                {/* 4. Content Area: Staggered Fade-in */}
                <main className='flex-1 p-4 lg:p-8 relative z-10'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={user?.id} // Forces re-animation on user load
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Optional: Subtle Bottom Brand Label */}
                <footer className='p-6 text-center opacity-20 pointer-events-none'>
                    <span className='text-[10px] font-black uppercase tracking-[0.4em]'>
                        Nexa_Ledger_v1.0.4 // secure_node_active
                    </span>
                </footer>
            </div>
        </div>
    )
}

export default DashboardLayout