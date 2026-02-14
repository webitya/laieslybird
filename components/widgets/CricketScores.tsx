'use client';

import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface Match {
    id: string;
    title: string;
    status: string;
    score: string;
    teams: {
        team1: string;
        team2: string;
    };
}

export default function CricketScores() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScores();
        // Refresh every 2 minutes for live matches
        const interval = setInterval(fetchScores, 120000);
        return () => clearInterval(interval);
    }, []);

    const fetchScores = async () => {
        try {
            const res = await fetch('/api/widgets/cricket');
            if (res.ok) {
                const data = await res.json();
                setMatches(data);
            }
        } catch (error) {
            console.error('Failed to fetch cricket scores:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        Live Cricket
                    </h3>
                </div>
                <div className="space-y-3">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        Live Cricket
                    </h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                    No live matches at the moment
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Live Cricket
                </h3>
            </div>

            <div className="space-y-4">
                {matches.map((match) => (
                    <div
                        key={match.id}
                        className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">
                                {match.status}
                            </p>
                            {match.status === 'Live' && (
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-red-500 font-bold">LIVE</span>
                                </span>
                            )}
                        </div>

                        <p className="font-bold text-slate-900 dark:text-white mb-2">
                            {match.title}
                        </p>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    {match.teams.team1}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    {match.teams.team2}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                            {match.score}
                        </p>
                    </div>
                ))}
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
                Updated every 2 minutes
            </p>
        </div>
    );
}
