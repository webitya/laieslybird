import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Author from '@/models/Author';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { id } = await params;
        await dbConnect();
        const author = await Author.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(author);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update author' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();
        await Author.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Author deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 });
    }
}

