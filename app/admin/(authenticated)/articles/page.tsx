'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/articles');
            const data = await res.json();
            setArticles(data);
        } catch (err) {
            console.error('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        try {
            const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
            if (res.ok) fetchArticles();
        } catch (err) {
            console.error('Failed to delete article');
        }
    };

    const filteredArticles = articles.filter((article: any) =>
        article?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    );

    if (loading) return <div className="p-8 text-center text-slate-500">Loading articles...</div>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Articles</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage and publish your stories.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 h-9 w-full sm:w-64 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                    <Link
                        href="/admin/articles/create"
                        className="h-9 px-3 flex items-center gap-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        New
                    </Link>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3 w-32">Status</th>
                                <th className="px-4 py-3 w-40">Category</th>
                                <th className="px-4 py-3 w-40">Author</th>
                                <th className="px-4 py-3 w-32">Date</th>
                                <th className="px-4 py-3 w-28 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredArticles.map((article: any) => (
                                <tr key={article._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-white max-w-md truncate">
                                        {article.title || 'Untitled'}
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${article.status === 'published'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30'
                                            : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                                            }`}>
                                            <span className={`w-1 h-1 rounded-full mr-1.5 ${article.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                            {(article.status || 'draft').charAt(0).toUpperCase() + (article.status || 'draft').slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                                        {article.category?.name || '-'}
                                    </td>
                                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-500">
                                                {article.author?.name?.charAt(0) || 'A'}
                                            </div>
                                            <span className="truncate max-w-[100px]">{article.author?.name || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap">
                                        {article.createdAt ? format(new Date(article.createdAt), 'MMM d, yyyy') : '-'}
                                    </td>
                                    <td className="px-4 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/news/${article.slug}`} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded" title="View">
                                                <Eye className="h-3.5 w-3.5" />
                                            </Link>
                                            <Link href={`/admin/articles/${article._id}`} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded" title="Edit">
                                                <Edit className="h-3.5 w-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article._id)}
                                                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredArticles.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500 text-sm">
                                        No articles found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
