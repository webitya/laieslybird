import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EPaper from '@/models/EPaper';

export const dynamic = 'force-dynamic';

// GET all e-papers
export async function GET() {
    try {
        await dbConnect();

        const ePapers = await EPaper.find({ isActive: true })
            .sort({ date: -1 })
            .limit(50);

        return NextResponse.json(ePapers);
    } catch (error) {
        console.error('E-Paper fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch e-papers' }, { status: 500 });
    }
}

// POST create e-paper (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const ePaper = await EPaper.create(body);

        return NextResponse.json(ePaper, { status: 201 });
    } catch (error) {
        console.error('E-Paper creation error:', error);
        return NextResponse.json({ error: 'Failed to create e-paper' }, { status: 500 });
    }
}

// DELETE e-paper (admin only)
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'E-Paper ID required' }, { status: 400 });
        }

        await EPaper.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('E-Paper deletion error:', error);
        return NextResponse.json({ error: 'Failed to delete e-paper' }, { status: 500 });
    }
}
