import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Category from '@/models/Category';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();

    const { slug } = await params;
    const category = await Category.findOne({ slug });
    if (!category) notFound();

    const articles = await Article.find({ category: category._id, status: 'published' })
        .sort({ createdAt: -1 })
        .populate('author');

    return (
        <div className="container py-6 space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">Latest stories from {category.name.toLowerCase()}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article: any) => (
                    <div key={article._id} className="group space-y-2">
                        <Link href={`/news/${article.slug}`}>
                            <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
                                <Image
                                    src={article.images[0] || 'https://via.placeholder.com/400x225'}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold leading-tight line-clamp-2">
                                <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
                                    {article.title}
                                </Link>
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {article.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                                <span>{article.author?.name}</span>
                                <span>•</span>
                                <span>{format(new Date(article.createdAt), 'MMM d')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-sm text-muted-foreground">No articles found in this category.</p>
                </div>
            )}
        </div>
    );
}
