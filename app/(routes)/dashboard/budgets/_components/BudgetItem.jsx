"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

function BudgetItem({ budget }) {

    // Logic to calculate progress percentage
    const calculateProgressPerc = () => {
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc > 100 ? 100 : perc.toFixed(2);
    }

    const percentage = calculateProgressPerc();
    // Dynamic color: emerald if safe, amber if over 80%
    const barColor = percentage > 80 ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-emerald-600';

    return (
        <Link href={'/dashboard/expenses/' + budget?.id} className="block group">
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='p-6 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem]
                hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] 
                cursor-pointer h-[180px] flex flex-col justify-between transition-all duration-300 relative overflow-hidden'
            >
                {/* Subtle internal glow */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full" />

                {/* TOP SECTION */}
                <div className='flex gap-2 items-start justify-between relative z-10'>
                    <div className='flex gap-4 items-center'>
                        <div className='text-3xl p-4 bg-white/[0.05] border border-white/5 rounded-2xl group-hover:scale-110 transition-transform'>
                            {budget?.icon}
                        </div>
                        <div>
                            <h2 className='font-bold text-lg text-white group-hover:text-emerald-400 transition-colors'>
                                {budget.name}
                            </h2>
                            <h2 className='text-xs uppercase tracking-widest text-white/40 font-semibold'>
                                {budget.totalItem} {budget.totalItem === 1 ? 'Transaction' : 'Transactions'}
                            </h2>
                        </div>
                    </div>
                    <div className='text-right'>
                        <h2 className='font-black text-xl text-white'>${budget.amount}</h2>
                        <p className='text-[10px] text-white/30 uppercase tracking-tighter'>Limit</p>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className='mt-5 relative z-10'>
                    <div className='flex items-center justify-between mb-3'>
                        <h2 className='text-xs font-medium text-white/60'>
                            <span className='text-emerald-400'>${budget.totalSpend || 0}</span>
                            <span className='opacity-40'> / ${budget.amount} Spent</span>
                        </h2>
                        <h2 className='text-[10px] font-bold text-white/30 uppercase'>
                            {100 - percentage}% Left
                        </h2>
                    </div>

                    {/* Premium Progress Bar */}
                    <div className='w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5'>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${barColor} relative shadow-[0_0_15px_rgba(52,211,153,0.3)]`}
                        >
                            {/* Animated "shine" effect on the bar */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default BudgetItem