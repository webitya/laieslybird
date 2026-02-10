import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { generateSlug } from '@/utils/slugify';

export async function GET() {
    try {
        await dbConnect();
        const tags = await Tag.find({}).sort({ name: 1 });
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name } = await req.json();
        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        await dbConnect();
        const slug = generateSlug(name);
        const tag = await Tag.create({ name, slug });
        return NextResponse.json(tag, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) return NextResponse.json({ error: 'Tag already exists' }, { status: 400 });
        return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
    }
}
