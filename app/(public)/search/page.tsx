'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Search, Loader2 } from 'lucide-react';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`/api/search?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setLoading(false);
                });
        }
    }, [query]);

    if (!query) return (
        <div className="container py-16 text-center space-y-4">
            <Search className="h-12 w-12 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold">Search News</h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">Enter a search term to find articles.</p>
        </div>
    );

    return (
        <div className="container py-6 space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-2xl font-bold">Search Results</h1>
                <p className="text-sm text-muted-foreground">Showing results for "{query}"</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Searching...</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((article: any) => (
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
                                <span className="text-[10px] font-bold text-primary uppercase">{article.category?.name}</span>
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
                    {results.length === 0 && (
                        <div className="col-span-full py-12 text-center border rounded-lg bg-muted/20">
                            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">No articles found for "{query}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="container py-16 flex justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
