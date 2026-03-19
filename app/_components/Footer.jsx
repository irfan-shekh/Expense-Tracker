import React from 'react'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

function Footer() {
    return (
        <footer id="footer-section" className="relative ">
            {/* Decorative Top Gradient Line */}
            <div className=" mt-4 absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-blue-600 to-transparent opacity-30"></div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

                    {/* Brand & Logo Section */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Expense Tracker
                            </span>
                        </div>
                        <p className="max-w-xs text-center md:text-left text-sm text-gray-500 leading-relaxed">
                            Take control of your finances with our smart budget tracking and detailed analytics.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-600">
                        <a href="#" className="hover:text-blue-600 transition-colors">Product</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                    </nav>

                    {/* Social Icons Section */}
                    <div className="flex gap-5 text-gray-400">
                        <a href="#" className="hover:text-gray-900 transition-transform hover:-translate-y-1">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-blue-400 transition-transform hover:-translate-y-1">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/Irfan-shekh" className="hover:text-blue-700 transition-transform hover:-translate-y-1">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-red-500 transition-transform hover:-translate-y-1">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Bottom Copyright & Credits Section */}
                <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Techshekh. All rights reserved.
                    </p>

                    <div className='flex items-center gap-1 text-xs text-gray-400'>
                        Made with <Heart className='h-3 w-3 text-red-400 fill-red-400' /> by
                        <span className='font-bold hover:text-blue-600 cursor-pointer transition-colors'>
                            Irfan Shekh
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer