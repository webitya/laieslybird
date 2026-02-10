import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { generateSlug } from '@/utils/slugify';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { id } = await params;
        await dbConnect();

        if (data.name) {
            data.slug = generateSlug(data.name);
        }

        const tag = await Tag.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(tag);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 });
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
        await Tag.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Tag deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
    }
}

