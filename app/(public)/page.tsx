import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    await dbConnect();

    const [featured, ...latest] = await Article.find({ status: 'published' })
        .sort({ createdAt: -1 })
        .limit(9)
        .populate('category')
        .populate('author');

    return (
        <div className="container py-6 space-y-8">
            {/* Featured Article */}
            {featured && (
                <section className="border rounded-lg overflow-hidden bg-card">
                    <div className="grid md:grid-cols-2 gap-4 p-4">
                        <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                            <Image
                                src={featured.images[0] || 'https://via.placeholder.com/800x450'}
                                alt={featured.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="flex flex-col justify-center space-y-3">
                            <Link href={`/category/${featured.category?.slug}`} className="text-xs font-bold text-primary uppercase">
                                {featured.category?.name}
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                                <Link href={`/news/${featured.slug}`} className="hover:text-primary transition-colors">
                                    {featured.title}
                                </Link>
                            </h1>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {featured.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                                <span className="font-medium">{featured.author?.name}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {format(new Date(featured.createdAt), 'MMM d, yyyy')}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Latest News Grid */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-bold">Latest News</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {latest.map((article: any) => (
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
                                <Link href={`/category/${article.category?.slug}`} className="text-[10px] font-bold text-primary uppercase">
                                    {article.category?.name}
                                </Link>
                                <h3 className="text-sm font-bold leading-tight line-clamp-2">
                                    <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
                                        {article.title}
                                    </Link>
                                </h3>
                                <div className="text-[10px] text-muted-foreground">
                                    {format(new Date(article.createdAt), 'MMM d, yyyy')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-primary text-primary-foreground rounded-lg p-6 text-center space-y-3">
                <h2 className="text-xl font-bold">Stay Informed</h2>
                <p className="text-sm opacity-90 max-w-md mx-auto">
                    Get the latest international news delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 text-sm rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/50"
                    />
                    <button className="bg-white text-primary px-6 py-2 rounded-md text-sm font-bold hover:bg-white/90 transition-colors">
                        Subscribe
                    </button>
                </div>
            </section>
        </div>
    );
}
