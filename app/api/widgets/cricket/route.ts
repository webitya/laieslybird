import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const apiKey = process.env.CRICKET_API_KEY;

        if (!apiKey) {
            // Return mock data if API key not configured
            return NextResponse.json([
                {
                    id: '1',
                    title: 'India vs Australia - 3rd Test',
                    status: 'Live',
                    score: 'India 324/5 (78 ov)',
                    teams: {
                        team1: 'India',
                        team2: 'Australia',
                    },
                },
                {
                    id: '2',
                    title: 'England vs New Zealand - T20',
                    status: 'Upcoming',
                    score: 'Match starts in 2 hours',
                    teams: {
                        team1: 'England',
                        team2: 'New Zealand',
                    },
                },
            ]);
        }

        // TODO: Implement actual API call to cricket data provider
        // Example: CricAPI, Cricbuzz API, etc.
        // const response = await fetch(`https://api.example.com/cricket?apikey=${apiKey}`);

        return NextResponse.json([]);
    } catch (error) {
        console.error('Cricket API error:', error);
        return NextResponse.json({ error: 'Failed to fetch cricket scores' }, { status: 500 });
    }
}
