import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Author from '@/models/Author';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        await dbConnect();
        const authors = await Author.find({}).sort({ name: 1 });
        return NextResponse.json(authors);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, bio, avatar } = await req.json();
        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        await dbConnect();
        const author = await Author.create({ name, bio, avatar });
        return NextResponse.json(author, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create author' }, { status: 500 });
    }
}
