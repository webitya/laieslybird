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
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
                            L
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
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
                <div className="flex items-center gap-3">
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
                        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </button>

                    <button
                        className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-x-0 top-14 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="p-4 space-y-4">
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
                </div>
            </div>
        </header>
    );
};

export default Header;
