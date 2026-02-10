import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-8">
            <div className="space-y-4">
                <h1 className="text-9xl font-black tracking-tighter text-blue-100 dark:text-blue-900">404</h1>
                <h2 className="text-4xl font-bold -mt-16 text-gray-900 dark:text-white">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                    The international headlines you are looking for seem to have shifted.
                    Let's get you back to the main desk.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:scale-105 transition-transform"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Homepage
                </Link>
                <Link
                    href="/search"
                    className="flex items-center gap-2 px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <Search className="h-5 w-5" />
                    Search News
                </Link>
            </div>
        </div>
    );
}
