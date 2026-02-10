'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Eye, Upload, Image as ImageIcon, Calendar, Tag, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Dynamic import for the Editor to avoid SSR issues
const Editor = dynamic(() => import('@/components/admin/Editor'), { ssr: false });
import { CldUploadWidget } from 'next-cloudinary';

export default function CreateArticlePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('draft');
    const [featuredImage, setFeaturedImage] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [imageInputMode, setImageInputMode] = useState<'link' | 'upload'>('link');

    // Data Loading
    const [categories, setCategories] = useState<any[]>([]);
    const [authors, setAuthors] = useState<any[]>([]);
    const [availableTags, setAvailableTags] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, authRes, tagRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/authors'),
                    fetch('/api/tags')
                ]);
                const catData = await catRes.json();
                const authData = await authRes.json();
                const tagData = await tagRes.json();

                setCategories(Array.isArray(catData) ? catData : []);
                setAuthors(Array.isArray(authData) ? authData : []);
                setAvailableTags(Array.isArray(tagData) ? tagData : []);
            } catch (err) {
                console.error("Failed to load metadata", err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    author,
                    status,
                    featuredImage,
                    tags,
                    publishedAt: status === 'published' ? new Date() : null
                }),
            });

            if (res.ok) {
                router.push('/admin/articles');
            }
        } catch (err) {
            console.error('Failed to create article');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleTag = (tagId: string) => {
        setTags(prev =>
            prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="h-[calc(100vh-20px)] flex flex-col bg-white dark:bg-slate-950 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl">
            {/* Compact Header / Toolbar */}
            <div className="flex-none bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/articles" className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Create</span>
                            <ChevronRight className="h-3 w-3 text-slate-300 flex-none" />
                            <h1 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px] md:max-w-xs">
                                {title || 'Untitled Draft'}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end border-r border-slate-200 dark:border-slate-800 pr-3">
                            <span className="text-[9px] uppercase font-bold tracking-tighter text-slate-400">Status</span>
                            <span className="text-[10px] font-bold text-blue-500">{status.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                className="px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all flex items-center gap-1.5"
                            >
                                <Eye className="h-3.5 w-3.5" />
                                <span>Preview</span>
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-1.5 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                            >
                                <Save className="h-3.5 w-3.5" />
                                {isSubmitting ? 'SAVING...' : (status === 'published' ? 'PUBLISH' : 'SAVE')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Two Scrollable Panes */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Writing Area - Scrollable */}
                <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-white dark:bg-slate-950 px-6 md:px-12 py-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Article Title..."
                                rows={1}
                                className="w-full text-3xl md:text-4xl font-black bg-transparent border-none placeholder-slate-200 dark:placeholder-slate-800 text-slate-900 dark:text-white focus:ring-0 px-0 resize-none overflow-hidden leading-tight"
                                style={{ height: 'auto' }}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                                required
                            />
                            <div className="h-1 w-12 bg-blue-600 rounded-full" />
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-serif">
                            <Editor content={content} onChange={setContent} />
                        </div>
                    </div>
                </div>

                {/* Sidebar - Scrollable & Compact */}
                <div className="w-full md:w-80 h-full overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50 border-l border-slate-200 dark:border-slate-800 p-5 space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Settings</h2>
                        <div className="h-0.5 w-6 bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <div className="space-y-5">
                        {/* Visibility */}
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-all hover:shadow-md">
                            <label className="text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                <Calendar className="h-3 w-3" />
                                Visibility
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[12px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Publish</option>
                                <option value="archived">Archive</option>
                            </select>
                        </div>

                        {/* Taxonomy */}
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-all hover:shadow-md">
                            <label className="text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                <Tag className="h-3 w-3" />
                                Taxonomy
                            </label>

                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Category</span>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[12px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((c: any) => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Author</span>
                                    <select
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[12px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    >
                                        <option value="">Select Author</option>
                                        {authors.map((a: any) => (
                                            <option key={a._id} value={a._id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <span className="text-[9px] font-bold text-slate-400 block uppercase">Tags</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {Array.isArray(availableTags) && availableTags.map((t: any) => (
                                        <button
                                            key={t._id}
                                            type="button"
                                            onClick={() => toggleTag(t._id)}
                                            className={`px-2 py-1 text-[10px] font-bold rounded-md border transition-all ${tags.includes(t._id)
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:border-slate-300'
                                                }`}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Featured Image Section */}
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                    <ImageIcon className="h-3 w-3" />
                                    Cover
                                </label>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-md">
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('link')}
                                        className={`px-2 py-1 text-[8px] font-black uppercase tracking-tighter rounded-sm transition-all ${imageInputMode === 'link' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('upload')}
                                        className={`px-2 py-1 text-[8px] font-black uppercase tracking-tighter rounded-sm transition-all ${imageInputMode === 'upload' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>

                            {imageInputMode === 'link' ? (
                                <input
                                    type="text"
                                    value={featuredImage}
                                    onChange={(e) => setFeaturedImage(e.target.value)}
                                    placeholder="Image URL..."
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            ) : (
                                <CldUploadWidget
                                    signatureEndpoint="/api/cloudinary-signature"
                                    onSuccess={(result: any) => {
                                        if (result?.info?.secure_url) {
                                            setFeaturedImage(result.info.secure_url);
                                        }
                                    }}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Upload className="h-3.5 w-3.5" />
                                            <span>Open Upload Manager</span>
                                        </button>
                                    )}
                                </CldUploadWidget>
                            )}

                            {featuredImage ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-lg">
                                    <img src={featuredImage} alt="Cover" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <button
                                        type="button"
                                        onClick={() => setFeaturedImage('')}
                                        className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Upload className="h-3 w-3 rotate-45" />
                                    </button>
                                </div>
                            ) : (
                                <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                                    <ImageIcon className="h-5 w-5 opacity-40" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
