"use client"
import React from 'react'
import { motion } from 'framer-motion'

const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Tracked Expenses", value: "$2.5B" },
    { label: "User Rating", value: "4.9/5" },
    { label: "Security Level", value: "99.9%" }
]

function Stats() {
    return (
        <section className="py-20 bg-[#050505] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center lg:border-r border-white/5 last:border-0"
                        >
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500/60">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Stats
