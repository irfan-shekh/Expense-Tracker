"use client";
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function CardInfo({ budgetList }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        budgetList && CalculateCardInfo();
    }, [budgetList]);

    const CalculateCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;

        budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpend_ = totalSpend_ + element.totalSpend;
        });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
    };

    // Animation Variants for the staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="mt-8">
            {budgetList?.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    {/* Total Budget Card */}
                    <motion.div variants={cardVariants} className='relative group'>
                        <div className='absolute inset-0 bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-all rounded-3xl' />
                        <div className='relative p-7 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between hover:border-emerald-500/50 transition-colors'>
                            <div>
                                <h2 className='text-xs uppercase tracking-widest text-white/50 font-medium'>Total Budget</h2>
                                <h2 className='font-bold text-3xl text-white mt-1'>${totalBudget.toLocaleString()}</h2>
                            </div>
                            <div className='h-14 w-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center'>
                                <PiggyBank className='h-7 w-7 text-emerald-400' />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Spend Card */}
                    <motion.div variants={cardVariants} className='relative group'>
                        <div className='absolute inset-0 bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all rounded-3xl' />
                        <div className='relative p-7 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-colors'>
                            <div>
                                <h2 className='text-xs uppercase tracking-widest text-white/50 font-medium'>Total Spend</h2>
                                <h2 className='font-bold text-3xl text-white mt-1'>${totalSpend.toLocaleString()}</h2>
                            </div>
                            <div className='h-14 w-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center'>
                                <ReceiptText className='h-7 w-7 text-blue-400' />
                            </div>
                        </div>
                    </motion.div>

                    {/* No. of Budgets Card */}
                    <motion.div variants={cardVariants} className='relative group'>
                        <div className='absolute inset-0 bg-purple-500/10 blur-xl group-hover:bg-purple-500/20 transition-all rounded-3xl' />
                        <div className='relative p-7 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between hover:border-purple-500/50 transition-colors'>
                            <div>
                                <h2 className='text-xs uppercase tracking-widest text-white/50 font-medium'>Active Budgets</h2>
                                <h2 className='font-bold text-3xl text-white mt-1'>{budgetList?.length}</h2>
                            </div>
                            <div className='h-14 w-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center'>
                                <Wallet className='h-7 w-7 text-purple-400' />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[1, 2, 3].map((item, index) => (
                        <div
                            key={index}
                            className='h-32 w-full bg-white/[0.05] border border-white/5 animate-pulse rounded-2xl relative overflow-hidden'
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardInfo;