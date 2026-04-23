"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { Loader2, PlusCircle, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true);
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: new Date()
            }).returning({ insertedId: Expenses.id });

            if (result) {
                setAmount('');
                setName('');
                refreshData();
                toast.success('Transaction Logged Successfully');
            }
        } catch (error) {
            toast.error('Failed to log expense');
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden'
        >
            {/* Background Decorative Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />

            <div className='flex items-center gap-2 mb-6'>
                <div className='p-2 bg-emerald-500/10 rounded-lg'>
                    <PlusCircle className='h-5 w-5 text-emerald-400' />
                </div>
                <h2 className='font-black text-xl tracking-tight text-white'>Add Transaction</h2>
            </div>

            <div className='space-y-5'>
                {/* Input: Name */}
                <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1'>
                        Item Description
                    </label>
                    <div className="relative group">
                        <Input
                            placeholder="e.g. Server Hosting"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all pl-4"
                        />
                    </div>
                </div>

                {/* Input: Amount */}
                <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1'>
                        Amount ($)
                    </label>
                    <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all pl-4"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    disabled={!(name && amount) || loading}
                    onClick={() => addNewExpense()}
                    className="group relative mt-4 h-14 w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all active:scale-95 overflow-hidden"
                >
                    {loading ? (
                        <Loader2 className='animate-spin h-5 w-5' />
                    ) : (
                        <span className="flex items-center gap-2">
                            Log Expense <Sparkles className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </span>
                    )}

                    {/* Subtle hover shine animation */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2"
                    />
                </Button>
            </div>

            <p className="text-center mt-6 text-[10px] text-white/20 font-bold tracking-widest uppercase">
                Secure Encryption Active
            </p>
        </motion.div>
    )
}

export default AddExpense