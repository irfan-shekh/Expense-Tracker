"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { 
    LayoutDashboard, 
    ShieldCheck, 
    Zap, 
    PieChart, 
    Smartphone, 
    Globe 
} from 'lucide-react'

const features = [
    {
        title: "Real-time Analytics",
        description: "Visualize your cash flow with cinematic charts and instant updates as you spend.",
        icon: LayoutDashboard,
        color: "emerald"
    },
    {
        title: "Enterprise Security",
        description: "Your data is encrypted with bank-grade protocols and decentralized storage.",
        icon: ShieldCheck,
        color: "blue"
    },
    {
        title: "Lightning Fast",
        description: "Optimized performance ensures your dashboard loads in under 100ms.",
        icon: Zap,
        color: "yellow"
    },
    {
        title: "Smart Budgeting",
        description: "AI-powered insights that help you save up to 30% more each month.",
        icon: PieChart,
        color: "purple"
    },
    {
        title: "Mobile First",
        description: "Manage your finances on the go with our fully responsive mobile experience.",
        icon: Smartphone,
        color: "rose"
    },
    {
        title: "Global Support",
        description: "Support for 150+ currencies and automatic exchange rate conversion.",
        icon: Globe,
        color: "cyan"
    }
]

function Features() {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4"
                    >
                        Features
                    </motion.h2>
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white tracking-tight"
                    >
                        Everything you need to <br/> 
                        <span className="text-white/40">master your money.</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:bg-white/[0.04]"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon className="h-6 w-6 text-emerald-400" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
