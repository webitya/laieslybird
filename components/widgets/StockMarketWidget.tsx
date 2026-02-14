'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}

export default function StockMarketWidget() {
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStocks();
        // Refresh every 5 minutes
        const interval = setInterval(fetchStocks, 300000);
        return () => clearInterval(interval);
    }, []);

    const fetchStocks = async () => {
        try {
            const res = await fetch('/api/widgets/stocks');
            if (res.ok) {
                const data = await res.json();
                setStocks(data);
            }
        } catch (error) {
            console.error('Failed to fetch stocks:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
                    Market Indices
                </h3>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
                Market Indices
            </h3>

            <div className="space-y-3">
                {stocks.map((stock) => (
                    <div
                        key={stock.symbol}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900"
                    >
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                                {stock.symbol}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {stock.name}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-slate-900 dark:text-white">
                                ${stock.price.toLocaleString()}
                            </p>
                            <div
                                className={`flex items-center gap-1 text-sm font-bold ${stock.change >= 0
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                    }`}
                            >
                                {stock.change >= 0 ? (
                                    <TrendingUp className="h-4 w-4" />
                                ) : (
                                    <TrendingDown className="h-4 w-4" />
                                )}
                                <span>
                                    {stock.change >= 0 ? '+' : ''}
                                    {stock.changePercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
                Updated every 5 minutes
            </p>
        </div>
    );
}
