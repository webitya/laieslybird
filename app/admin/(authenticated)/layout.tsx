import AdminSidebar from '@/components/admin/Sidebar';
import MobileNav from '@/components/admin/MobileNav';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Desktop Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <MobileNav />

                {/* Main Content */}
                <main className="flex-1 p-[10px] overflow-y-auto">
                    {children}
                </main>
                <Toaster position="top-right" />
            </div>
        </div>
    );
}
