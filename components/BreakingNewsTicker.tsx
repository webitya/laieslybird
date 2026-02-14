'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface BreakingNews {
    _id: string;
    title: string;
    slug: string;
}

export default function BreakingNewsTicker() {
    const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        fetchBreakingNews();
        // Refresh every 2 minutes
        const interval = setInterval(fetchBreakingNews, 120000);
        return () => clearInterval(interval);
    }, []);

    const fetchBreakingNews = async () => {
        try {
            const res = await fetch('/api/breaking-news');
            if (res.ok) {
                const data = await res.json();
                setBreakingNews(data);
            }
        } catch (error) {
            console.error('Failed to fetch breaking news:', error);
        }
    };

    if (!isVisible || breakingNews.length === 0) return null;

    return (
        <div className="bg-red-600 dark:bg-red-700 text-white py-2 relative overflow-hidden">
            <div className="container mx-auto px-4 flex items-center gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 animate-pulse" />
                    <span className="font-black text-sm uppercase tracking-wider">Breaking</span>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="animate-scroll whitespace-nowrap">
                        {breakingNews.map((news, index) => (
                            <span key={news._id} className="inline-block">
                                <Link
                                    href={`/news/${news.slug}`}
                                    className="hover:underline font-medium"
                                >
                                    {news.title}
                                </Link>
                                {index < breakingNews.length - 1 && (
                                    <span className="mx-4 text-red-300">•</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 hover:bg-red-700 dark:hover:bg-red-800 p-1 rounded transition-colors"
                    aria-label="Close breaking news"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: inline-block;
          animation: scroll 30s linear infinite;
        }
      `}</style>
        </div>
    );
}
