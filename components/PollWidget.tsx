'use client';

import { useEffect, useState } from 'react';
import { BarChart3, CheckCircle } from 'lucide-react';

interface Poll {
    _id: string;
    question: string;
    options: {
        _id: string;
        text: string;
        votes: number;
    }[];
    totalVotes: number;
}

export default function PollWidget() {
    const [poll, setPoll] = useState<Poll | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        fetchActivePoll();
    }, []);

    const fetchActivePoll = async () => {
        try {
            const res = await fetch('/api/polls');
            if (res.ok) {
                const data = await res.json();
                setPoll(data);

                // Check if user has already voted
                if (data) {
                    const voted = localStorage.getItem(`poll_${data._id}`);
                    if (voted) {
                        setHasVoted(true);
                        setSelectedOption(voted);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch poll:', error);
        }
    };

    const handleVote = async (optionId: string) => {
        if (!poll || hasVoted) return;

        try {
            const res = await fetch('/api/polls/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pollId: poll._id,
                    optionId,
                }),
            });

            if (res.ok) {
                const updatedPoll = await res.json();
                setPoll(updatedPoll);
                setSelectedOption(optionId);
                setHasVoted(true);
                localStorage.setItem(`poll_${poll._id}`, optionId);
            }
        } catch (error) {
            console.error('Failed to vote:', error);
        }
    };

    if (!poll) return null;

    const getPercentage = (votes: number) => {
        if (poll.totalVotes === 0) return 0;
        return Math.round((votes / poll.totalVotes) * 100);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="font-black text-lg text-slate-900 dark:text-white">
                        Quick Poll
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
                    </p>
                </div>
            </div>

            <p className="text-slate-900 dark:text-white font-bold mb-4">
                {poll.question}
            </p>

            <div className="space-y-3">
                {poll.options.map((option) => {
                    const percentage = getPercentage(option.votes);
                    const isSelected = selectedOption === option._id;

                    return (
                        <button
                            key={option._id}
                            onClick={() => handleVote(option._id)}
                            disabled={hasVoted}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${hasVoted
                                    ? 'cursor-default'
                                    : 'hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer'
                                } ${isSelected
                                    ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                    {option.text}
                                    {isSelected && hasVoted && (
                                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    )}
                                </span>
                                {hasVoted && (
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                        {percentage}%
                                    </span>
                                )}
                            </div>

                            {hasVoted && (
                                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
