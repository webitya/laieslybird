import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Poll from '@/models/Poll';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { pollId, optionId } = await request.json();

        if (!pollId || !optionId) {
            return NextResponse.json(
                { error: 'Poll ID and option ID required' },
                { status: 400 }
            );
        }

        const poll = await Poll.findById(pollId);

        if (!poll) {
            return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
        }

        if (!poll.isActive) {
            return NextResponse.json({ error: 'Poll is not active' }, { status: 400 });
        }

        if (poll.expiresAt && new Date() > poll.expiresAt) {
            return NextResponse.json({ error: 'Poll has expired' }, { status: 400 });
        }

        // Find and increment the option votes
        const option = poll.options.find((opt: any) => opt._id.toString() === optionId);

        if (!option) {
            return NextResponse.json({ error: 'Option not found' }, { status: 404 });
        }

        option.votes += 1;
        poll.totalVotes += 1;

        await poll.save();

        return NextResponse.json(poll);
    } catch (error) {
        console.error('Vote submission error:', error);
        return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 });
    }
}
