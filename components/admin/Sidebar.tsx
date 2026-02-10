'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Grid,
    Hash,
    Users,
    LogOut,
    ChevronRight,
    Search
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Articles', href: '/admin/articles', icon: FileText },
        { label: 'Categories', href: '/admin/categories', icon: Grid },
        { label: 'Tags', href: '/admin/tags', icon: Hash },
        { label: 'Authors', href: '/admin/authors', icon: Users },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-gray-100">
            {/* Header */}
            <div className="h-14 flex items-center px-4 border-b border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900">
                <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
                    <div className="bg-blue-600 w-6 h-6 rounded flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        L
                    </div>
                    <span className="font-bold tracking-tight text-sm">
                        LAIESLYBIRD <span className="text-slate-400 font-normal">Admin</span>
                    </span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-2">
                    Main Menu
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 group ${isActive
                                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <item.icon className={`h-4 w-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                <div className="flex items-center gap-3 px-2 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Administrator</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-500 truncate">admin@laieslybird.com</p>
                    </div>
                </div>

                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

const AdminSidebar = () => {
    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 hidden md:block min-h-screen sticky top-0 h-screen overflow-hidden">
            <SidebarContent />
        </aside>
    );
};

export default AdminSidebar;
