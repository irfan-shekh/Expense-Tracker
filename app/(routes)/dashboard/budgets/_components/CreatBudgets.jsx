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
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

function CreatBudgets({ refreshData }) {
    // Initialized with empty strings to prevent "uncontrolled input" errors
    const [emojiIcon, setEmojiIcon] = useState('😀');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { user } = useUser();

    /**
     * Used to Create New Budget to Database
     */
    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshData();
            toast('New Budget Created!');
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md
                        items-center flex flex-col border-2 border-dashed
                        cursor-pointer hover:shadow-md transition-all'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to set up your new budget category.
                        </DialogDescription>
                    </DialogHeader>

                    {/* FORM CONTENT: Moved outside DialogDescription to avoid 
                        invalid HTML nesting (div inside p) 
                    */}
                    <div className='mt-5'>
                        <div className='relative'>
                            <Button 
                                variant="outline"
                                type="button"
                                className="text-lg"
                                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >
                                {emojiIcon}
                            </Button>
                            
                            {openEmojiPicker && (
                                <div className='absolute z-20 mt-2'>
                                    <EmojiPicker
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Budget Name</h2>
                            <Input 
                                placeholder="e.g. Home Decor"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>

                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                            <Input
                                type="number"
                                placeholder="e.g. 5000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)} 
                            />
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={onCreateBudget}
                                className="mt-5 w-full"
                            >
                                Create Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatBudgets