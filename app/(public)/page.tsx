import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Category from '@/models/Category';
import Author from '@/models/Author';
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
        <div className="bg-white dark:bg-black min-h-screen">
            <div className="container px-4 md:px-8 py-10 space-y-20">
                {/* Hero Feature */}
                {featured && (
                    <section className="relative group">
                        <div className="grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all duration-700 hover:shadow-blue-500/5">
                            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                                <Image
                                    src={featured.featuredImage || featured.images[0] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                                    alt={featured.title}
                                    fill
                                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                            </div>
                            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-6 relative">
                                <Link
                                    href={`/category/${featured.category?.slug}`}
                                    className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest w-fit hover:bg-blue-500/20 transition-all"
                                >
                                    {featured.category?.name}
                                </Link>
                                <h1 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
                                    <Link href={`/news/${featured.slug}`} className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                                        {featured.title}
                                    </Link>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base line-clamp-3 font-medium">
                                    {featured.content.replace(/<[^>]*>/g, '').substring(0, 180)}...
                                </p>
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-2 ring-white dark:ring-slate-900 transition-transform group-hover:scale-110">
                                        {featured.author?.avatar ? (
                                            <img src={featured.author.avatar} alt={featured.author.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                                                {featured.author?.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{featured.author?.name}</span>
                                        <span className="text-[10px] text-slate-400 font-medium">{format(new Date(featured.createdAt), 'MMMM d, yyyy')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Latest Stories Grid */}
                <section className="space-y-10">
                    <div className="flex items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Latest Pulse</h2>
                            <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Global events occurring right now</p>
                        </div>
                        <Link href="/news" className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-sky-400 hover:gap-2 transition-all flex items-center gap-1.5">
                            View Archive <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {latest.map((article: any) => (
                            <article key={article._id} className="group flex flex-col space-y-5">
                                <Link href={`/news/${article.slug}`} className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-none">
                                    <Image
                                        src={article.featuredImage || article.images[0] || 'https://images.unsplash.com/photo-1585829365234-784c05a0833b?q=80&w=2070&auto=format&fit=crop'}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-2 py-1 rounded-md bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-widest shadow-sm">
                                            {article.category?.name}
                                        </span>
                                    </div>
                                </Link>
                                <div className="space-y-3 flex-1">
                                    <h3 className="text-xl font-black leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                                        <Link href={`/news/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 font-medium leading-relaxed">
                                        {article.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                            {article.author?.avatar && <img src={article.author.avatar} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">{article.author?.name}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{format(new Date(article.createdAt), 'MMM d')}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>


            </div>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
    );
}
