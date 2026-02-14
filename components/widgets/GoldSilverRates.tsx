'use client';

import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';

interface RateData {
    metal: string;
    price: number;
    change: number;
    changePercent: number;
    unit: string;
}

export default function GoldSilverRates() {
    const [rates, setRates] = useState<RateData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRates();
        // Refresh every 10 minutes
        const interval = setInterval(fetchRates, 600000);
        return () => clearInterval(interval);
    }, []);

    const fetchRates = async () => {
        try {
            const res = await fetch('/api/widgets/gold-silver');
            if (res.ok) {
                const data = await res.json();
                setRates(data);
            }
        } catch (error) {
            console.error('Failed to fetch rates:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 dark:from-yellow-600 dark:to-yellow-800 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                    <Coins className="h-6 w-6" />
                    <h3 className="text-lg font-black">Precious Metals</h3>
                </div>
                <div className="space-y-3">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="h-16 bg-white/20 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 dark:from-yellow-600 dark:to-yellow-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
                <Coins className="h-6 w-6" />
                <h3 className="text-lg font-black">Precious Metals</h3>
            </div>

            <div className="space-y-3">
                {rates.map((rate) => (
                    <div
                        key={rate.metal}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm"
                    >
                        <div>
                            <p className="font-black text-lg">{rate.metal}</p>
                            <p className="text-xs text-yellow-100">per {rate.unit}</p>
                        </div>

                        <div className="text-right">
                            <p className="font-black text-xl">${rate.price.toLocaleString()}</p>
                            <p
                                className={`text-sm font-bold ${rate.change >= 0 ? 'text-green-300' : 'text-red-300'
                                    }`}
                            >
                                {rate.change >= 0 ? '+' : ''}
                                {rate.changePercent.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-yellow-100 mt-4 text-center">
                Updated every 10 minutes
            </p>
        </div>
    );
}
