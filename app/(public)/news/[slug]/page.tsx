import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Share2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();

    const { slug } = await params;
    const article = await Article.findOne({ slug, status: 'published' })
        .populate('category')
        .populate('author');

    if (!article) notFound();

    return (
        <article className="container max-w-4xl py-6 space-y-6">
            <div className="space-y-3">
                <Link href={`/category/${article.category?.slug}`} className="text-xs font-bold text-primary uppercase">
                    {article.category?.name}
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center justify-between gap-4 py-3 border-y text-sm">
                    <div className="flex items-center gap-3">
                        {article.author?.avatar && (
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <p className="font-semibold">{article.author?.name}</p>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(new Date(article.createdAt), 'MMMM d, yyyy')}
                            </div>
                        </div>
                    </div>
                    <button className="p-2 border rounded-md hover:bg-muted">
                        <Share2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <Image
                    src={article.images[0] || 'https://via.placeholder.com/1200x675'}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div
                className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="pt-6 border-t mt-8">
                <h3 className="text-base font-bold mb-4">About the Author</h3>
                <div className="bg-muted/30 p-4 rounded-lg flex gap-4 items-start">
                    {article.author?.avatar && (
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            width={60}
                            height={60}
                            className="h-15 w-15 rounded-full object-cover"
                        />
                    )}
                    <div className="space-y-1">
                        <h4 className="text-lg font-bold">{article.author?.name}</h4>
                        <p className="text-sm text-muted-foreground">{article.author?.bio}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}
