import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const apiKey = process.env.STOCK_API_KEY;

        if (!apiKey) {
            // Return mock data if API key not configured
            return NextResponse.json([
                {
                    symbol: 'S&P 500',
                    name: 'S&P 500 Index',
                    price: 5234.18,
                    change: 12.45,
                    changePercent: 0.24,
                },
                {
                    symbol: 'NASDAQ',
                    name: 'NASDAQ Composite',
                    price: 16274.94,
                    change: -23.67,
                    changePercent: -0.15,
                },
                {
                    symbol: 'DOW',
                    name: 'Dow Jones',
                    price: 38789.51,
                    change: 45.89,
                    changePercent: 0.12,
                },
            ]);
        }

        // TODO: Implement actual API call to stock market data provider
        // Example: Alpha Vantage, Yahoo Finance, etc.
        // const response = await fetch(`https://api.example.com/stocks?apikey=${apiKey}`);

        return NextResponse.json([]);
    } catch (error) {
        console.error('Stock API error:', error);
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    }
}
