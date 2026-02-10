'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SidebarContent } from './Sidebar';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                    LAIESLYBIRD Admin
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-64 max-w-xs h-full bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-white/50 dark:bg-black/20 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="h-full overflow-y-auto">
                            <SidebarContent onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
