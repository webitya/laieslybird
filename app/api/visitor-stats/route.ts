import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import VisitorStats from '@/models/VisitorStats';

export const dynamic = 'force-dynamic';

// GET visitor stats
export async function GET() {
    try {
        await dbConnect();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let stats = await VisitorStats.findOne({ date: today });

        if (!stats) {
            stats = await VisitorStats.create({
                date: today,
                totalVisitors: 0,
                currentOnline: 0,
                pageViews: 0,
            });
        }

        // Get all-time total
        const allStats = await VisitorStats.aggregate([
            {
                $group: {
                    _id: null,
                    totalVisitors: { $sum: '$totalVisitors' },
                },
            },
        ]);

        const totalVisitors = allStats[0]?.totalVisitors || 0;

        return NextResponse.json({
            totalVisitors,
            currentOnline: stats.currentOnline,
        });
    } catch (error) {
        console.error('Visitor stats fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch visitor stats' },
            { status: 500 }
        );
    }
}

// POST to track a visit
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let stats = await VisitorStats.findOne({ date: today });

        if (!stats) {
            stats = await VisitorStats.create({
                date: today,
                totalVisitors: 1,
                currentOnline: 1,
                pageViews: 1,
            });
        } else {
            stats.totalVisitors += 1;
            stats.currentOnline += 1;
            stats.pageViews += 1;
            await stats.save();
        }

        // Simulate online user decay (reduce after 5 minutes)
        setTimeout(async () => {
            const currentStats = await VisitorStats.findOne({ date: today });
            if (currentStats && currentStats.currentOnline > 0) {
                currentStats.currentOnline -= 1;
                await currentStats.save();
            }
        }, 300000); // 5 minutes

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Visitor tracking error:', error);
        return NextResponse.json(
            { error: 'Failed to track visitor' },
            { status: 500 }
        );
    }
}
