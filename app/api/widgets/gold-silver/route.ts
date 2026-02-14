import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const apiKey = process.env.METALS_API_KEY;

        if (!apiKey) {
            // Return mock data if API key not configured
            return NextResponse.json([
                {
                    metal: 'Gold',
                    price: 2034.50,
                    change: 12.30,
                    changePercent: 0.61,
                    unit: 'oz',
                },
                {
                    metal: 'Silver',
                    price: 23.45,
                    change: -0.15,
                    changePercent: -0.64,
                    unit: 'oz',
                },
            ]);
        }

        // TODO: Implement actual API call to metals price provider
        // Example: Metals-API, GoldAPI, etc.
        // const response = await fetch(`https://api.example.com/metals?apikey=${apiKey}`);

        return NextResponse.json([]);
    } catch (error) {
        console.error('Metals API error:', error);
        return NextResponse.json({ error: 'Failed to fetch metal prices' }, { status: 500 });
    }
}
