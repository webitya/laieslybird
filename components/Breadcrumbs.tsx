'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo-config';

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const allItems = [{ name: 'Home', url: '/' }, ...items];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema(allItems)),
                }}
            />
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-sm flex-wrap">
                    {allItems.map((item, index) => {
                        const isLast = index === allItems.length - 1;
                        return (
                            <li key={item.url} className="flex items-center gap-2">
                                {index === 0 ? (
                                    <Link
                                        href={item.url}
                                        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
                                    >
                                        <Home className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                ) : isLast ? (
                                    <span className="text-slate-900 dark:text-white font-medium">
                                        {item.name}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.url}
                                        className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                                {!isLast && (
                                    <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
