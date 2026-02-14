import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Poll from '@/models/Poll';

export const dynamic = 'force-dynamic';

// GET active poll
export async function GET() {
    try {
        await dbConnect();

        const now = new Date();

        const poll = await Poll.findOne({
            isActive: true,
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: { $gte: now } },
            ],
        }).sort({ createdAt: -1 });

        if (!poll) {
            return NextResponse.json(null);
        }

        return NextResponse.json(poll);
    } catch (error) {
        console.error('Poll fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch poll' }, { status: 500 });
    }
}

// POST create poll (admin only)
export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const poll = await Poll.create(body);

        return NextResponse.json(poll, { status: 201 });
    } catch (error) {
        console.error('Poll creation error:', error);
        return NextResponse.json({ error: 'Failed to create poll' }, { status: 500 });
    }
}
