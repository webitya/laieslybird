'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
    const [categories, setCategories] = useState<{ _id: string, name: string, slug: string }[]>([]);

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => { });
    }, []);

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm mt-auto">
            <div className="px-4 md:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <Link href="/" className="group">
                            <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase">
                                LAIESLYBIRD
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                            Delivering swift, accurate, and unbiased international news coverage. Your trusted source for global events and analysis.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
                            <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
                            <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
                            <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 dark:text-white mb-5 text-[10px] uppercase tracking-[0.2em]">Explore</h4>
                        <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                            {categories.slice(0, 5).map(c => (
                                <FooterLink key={c._id} href={`/category/${c.slug}`}>{c.name}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 dark:text-white mb-5 text-[10px] uppercase tracking-[0.2em]">Company</h4>
                        <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                            <FooterLink href="/e-paper">E-Paper</FooterLink>
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/terms">Terms of Service</FooterLink>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-black text-slate-900 dark:text-white mb-5 text-[10px] uppercase tracking-[0.2em]">Newsletter</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Get the latest news delivered to your inbox
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                <div className="mb-8">
                    <VisitorCounter />
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} LAIESLYBIRD. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <li>
        <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
    <a
        href={href}
        aria-label={label}
        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
    >
        {icon}
    </a>
);

export default Footer;
