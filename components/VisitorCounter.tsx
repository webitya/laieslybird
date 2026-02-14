'use client';

import { useEffect, useState } from 'react';
import { Users, Eye } from 'lucide-react';

export default function VisitorCounter() {
    const [stats, setStats] = useState({
        totalVisitors: 0,
        currentOnline: 0,
    });

    useEffect(() => {
        // Track page view
        trackVisit();

        // Fetch stats
        fetchStats();

        // Update stats every 30 seconds
        const interval = setInterval(fetchStats, 30000);

        return () => clearInterval(interval);
    }, []);

    const trackVisit = async () => {
        try {
            await fetch('/api/visitor-stats', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Failed to track visit:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/visitor-stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return (
        <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600 dark:text-sky-400" />
                <span className="text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">
                        {formatNumber(stats.totalVisitors)}
                    </span>{' '}
                    Total Visitors
                </span>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">
                        {stats.currentOnline}
                    </span>{' '}
                    Online Now
                </span>
            </div>
        </div>
    );
}
