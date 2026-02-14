import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        const breakingNews = await Article.find({
            status: 'published',
            isBreaking: true,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title slug');

        return NextResponse.json(breakingNews);
    } catch (error) {
        console.error('Breaking news fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch breaking news' }, { status: 500 });
    }
}
