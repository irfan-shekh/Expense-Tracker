"use client"
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

function CreatBudgets({ refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState('💰');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { user } = useUser();

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({ insertedId: Budgets.id })

        if (result) {
            setName('');
            setAmount('');
            setEmojiIcon('💰');
            refreshData();
            toast.success('New Budget Created Successfully!');
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='p-10 h-[180px] rounded-[2rem] items-center justify-center flex flex-col 
                        border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-emerald-500/[0.05] 
                        hover:border-emerald-500/50 cursor-pointer transition-all group relative overflow-hidden'
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className='bg-white/5 p-3 rounded-full mb-3 group-hover:bg-emerald-500 group-hover:text-black transition-all'>
                            <Plus className='h-8 w-8' />
                        </div>
                        <h2 className='font-bold text-white/70 group-hover:text-white'>Create New Budget</h2>
                    </motion.div>
                </DialogTrigger>

                <DialogContent className="bg-[#0f0f0f] border-white/10 text-white rounded-[2rem] sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tight">Create Budget</DialogTitle>
                        <DialogDescription className="text-white/40">
                            Give your budget a name and a limit to start tracking.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='mt-5 space-y-6'>
                        {/* Emoji Selection */}
                        <div className='flex flex-col items-center justify-center space-y-3'>
                            <button
                                type="button"
                                className="text-5xl p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all active:scale-95"
                                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >
                                {emojiIcon}
                            </button>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Select Icon</p>

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
                                <label className='text-xs font-bold uppercase tracking-widest text-white/40 ml-1'>Budget Name</label>
                                <Input
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="e.g. Monthly Groceries"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-xs font-bold uppercase tracking-widest text-white/40 ml-1'>Monthly Limit</label>
                                <Input
                                    type="number"
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="e.g. 500"
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
                                onClick={onCreateBudget}
                                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black text-lg rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all"
                            >
                                Launch Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatBudgets