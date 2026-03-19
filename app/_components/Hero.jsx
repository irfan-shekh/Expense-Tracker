"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"  
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

function Hero() {
    const { user, isSignedIn } = useUser();

    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-7xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manager Your Expense
                        <strong className="font-extrabold text-purple-700 sm:block">
                            control your money
                        </strong>
                    </h1>

                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Start Creating your budget and save ton of money
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href={isSignedIn ? '/dashboard' : '/sign-in'}>
                            <Button className="px-10 py-6 text-lg">Get Started</Button>
                        </Link>

                     
                        <Button
                            variant="outline"
                            className="px-10 py-6 text-lg"
                            onClick={() => {
                                const footer = document.getElementById('footer-section');
                                footer?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>

            {/* Dashboard Image Preview */}
            <Image
                src={'/dashboards.png'}
                alt='dashboard'
                width={1000}
                height={700}
                className='-mt-9 rounded-xl border-2'
            />
        </section>
    )
}

export default Hero