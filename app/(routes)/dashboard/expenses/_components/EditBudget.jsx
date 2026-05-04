"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PenBox, Sparkles } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function EditBudget({ budgetInfo, refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);

    const { user } = useUser();

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo?.icon);
            setAmount(budgetInfo.amount);
            setName(budgetInfo.name);
        }
    }, [budgetInfo])

    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result) {
            refreshData();
            toast.success('Budget Protocols Updated');
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="flex gap-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 text-white transition-all rounded-xl">
                        <PenBox className="h-4 w-4" /> Edit
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-[#0f0f0f] border-white/10 text-white rounded-[2rem] sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-emerald-400" />
                            Refine Budget
                        </DialogTitle>
                        <DialogDescription className="text-white/40">
                            Adjust your financial targets and iconography.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='mt-6 space-y-6'>
                        {/* Emoji Selection Section */}
                        <div className='flex flex-col items-center justify-center space-y-3'>
                            <button
                                type="button"
                                className="text-5xl p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-emerald-400/50 transition-all active:scale-95"
                                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >
                                {emojiIcon}
                            </button>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">Update Icon</p>

                            {openEmojiPicker && (
                                <div className='absolute z-50 mt-20'>
                                    <EmojiPicker
                                        theme={Theme.DARK}
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Input Fields */}
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1'>Category Name</label>
                                <Input
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                                    placeholder="e.g. Executive Travel"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1'>Allocated Funds ($)</label>
                                <Input
                                    type="number"
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                                    placeholder="e.g. 5000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={() => onUpdateBudget()}
                                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black text-lg rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all"
                            >
                                Sync Changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget