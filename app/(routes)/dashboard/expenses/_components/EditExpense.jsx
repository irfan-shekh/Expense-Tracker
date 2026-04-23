"use client"
import { Button } from '@/components/ui/button'
import { Edit3, Info } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function EditExpense({ expense, refreshData }) {
    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount);

    const onUpdateExpense = async () => {
        const result = await db.update(Expenses).set({
            name: name,
            amount: amount,
        }).where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast.success('Transaction record updated');
            refreshData();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Edit3 className='text-white/40 cursor-pointer h-4 w-4 hover:text-emerald-400 transition-colors' />
                </motion.div>
            </DialogTrigger>

            <DialogContent className="bg-[#0f0f0f] border-white/10 text-white rounded-[2rem] sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Info className="h-4 w-4 text-emerald-500" />
                        Adjust Transaction
                    </DialogTitle>
                </DialogHeader>

                <div className='mt-4 space-y-5'>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1'>
                            Description
                        </label>
                        <Input
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1'>
                            Revised Amount ($)
                        </label>
                        <Input
                            type="number"
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-8">
                    <DialogClose asChild>
                        <Button
                            onClick={() => onUpdateExpense()}
                            disabled={!name || !amount}
                            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all"
                        >
                            Sync Transaction
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditExpense