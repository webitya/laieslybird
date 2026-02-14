import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Popup from '@/models/Popup';

export const dynamic = 'force-dynamic';

// GET active popup
export async function GET() {
    try {
        await dbConnect();

        const now = new Date();

        const popup = await Popup.findOne({
            isActive: true,
            $and: [
                {
                    $or: [
                        { startDate: { $exists: false } },
                        { startDate: { $lte: now } },
                    ],
                },
                {
                    $or: [
                        { endDate: { $exists: false } },
                        { endDate: { $gte: now } },
                    ],
                },
            ],
        }).sort({ createdAt: -1 });

        if (!popup) {
            return NextResponse.json(null);
        }

        return NextResponse.json(popup);
    } catch (error) {
        console.error('Popup fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch popup' }, { status: 500 });
    }
}

// POST create popup (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const popup = await Popup.create(body);

        return NextResponse.json(popup, { status: 201 });
    } catch (error) {
        console.error('Popup creation error:', error);
        return NextResponse.json({ error: 'Failed to create popup' }, { status: 500 });
    }
}

// PUT update popup (admin only)
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { _id, ...updateData } = body;

        const popup = await Popup.findByIdAndUpdate(_id, updateData, { new: true });

        if (!popup) {
            return NextResponse.json({ error: 'Popup not found' }, { status: 404 });
        }

        return NextResponse.json(popup);
    } catch (error) {
        console.error('Popup update error:', error);
        return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 });
    }
}

// DELETE popup (admin only)
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Popup ID required' }, { status: 400 });
        }

        await Popup.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Popup deletion error:', error);
        return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 });
    }
}
