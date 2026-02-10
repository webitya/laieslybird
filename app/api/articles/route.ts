import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { generateSlug } from '@/utils/slugify';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '20');

        let query: any = {};
        if (category) query.category = category;
        if (status) query.status = status;

        const articles = await Article.find(query)
            .populate('category author tags')
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { title, content, category, author, tags, images, featuredImage, status } = data;

        if (!title || !content || !category || !author) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();
        const slug = generateSlug(title) + '-' + Math.floor(Math.random() * 1000);

        const article = await Article.create({
            title,
            slug,
            content,
            category,
            author,
            tags,
            images,
            featuredImage,
            status: status || 'draft',
            publishedAt: status === 'published' ? new Date() : null,
            views: 0
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
