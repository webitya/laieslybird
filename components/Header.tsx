'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [categories, setCategories] = useState<{ _id: string, name: string, slug: string }[]>([]);
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        fetchCategories();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Failed to fetch categories');
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    const navLinks = categories.slice(0, 6).map(c => ({ href: `/category/${c.slug}`, label: c.name }));

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${scrolled
                ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_-5px_rgba(0,0,0,0.3)]'
                : 'bg-white dark:bg-black border-transparent'
                }`}
        >
            <div className="px-4 md:px-8 h-14 flex items-center justify-between">
                {/* Logo & Desktop Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="group flex items-center">
                        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase leading-none pb-0.5">
                            LAIESLYBIRD
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:transition-all hover:after:w-full"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 md:gap-3 h-full">
                    <form onSubmit={handleSearch} className="relative hidden md:block">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 dark:border-gray-800 rounded-full bg-gray-100/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all w-32 focus:w-56"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                    </form>

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300 flex items-center justify-center"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </button>

                    <button
                        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 h-[100dvh] w-full max-w-sm !bg-white dark:!bg-black border-l border-gray-200 dark:border-gray-800 z-[100] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col overflow-x-hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ backgroundColor: theme === 'dark' ? '#000000' : undefined }}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                        MENU
                    </span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>

                    <nav className="flex flex-col space-y-1">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors flex items-center justify-between group"
                        >
                            Home
                            <span className="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
                        </Link>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors flex items-center justify-between group"
                            >
                                {link.label}
                                <span className="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col space-y-3">
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">About Us</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">Contact</Link>
                            <Link href="/e-paper" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">E-Paper</Link>
                            <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
