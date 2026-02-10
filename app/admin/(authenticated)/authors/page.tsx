'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, User, Mail, Link as LinkIcon, Edit3, Image as ImageIcon, Upload } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

export default function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const [formData, setFormData] = useState({ name: '', bio: '', avatar: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [imageInputMode, setImageInputMode] = useState<'link' | 'upload'>('link');

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const res = await fetch('/api/authors');
            const data = await res.json();
            setAuthors(data);
        } catch (err) {
            console.error('Failed to fetch authors');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this author profile?')) return;
        try {
            const res = await fetch(`/api/authors/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAuthors();
        } catch (err) {
            console.error('Failed to delete author');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ name: '', bio: '', avatar: '', email: '' });
                setImageInputMode('link');
                fetchAuthors();
                setShowForm(false);
            }
        } catch (err) {
            console.error('Failed to create author');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500 text-sm">Loading authors...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Authors</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage contributors and their profiles.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm ${showForm
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    {showForm ? 'Cancel' : (
                        <>
                            <Plus className="h-4 w-4" />
                            New Author
                        </>
                    )}
                </button>
            </div>

            {/* Create Form - Collapsible */}
            {showForm && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 animate-in slide-in-from-top-2 duration-200">
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    required
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email (Optional)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Avatar</label>
                                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md">
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('link')}
                                        className={`px-2 py-1 text-[8px] font-black uppercase tracking-tighter rounded-sm transition-all ${imageInputMode === 'link' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-500'}`}
                                    >
                                        Link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('upload')}
                                        className={`px-2 py-1 text-[8px] font-black uppercase tracking-tighter rounded-sm transition-all ${imageInputMode === 'upload' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-500'}`}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>

                            {imageInputMode === 'link' ? (
                                <input
                                    type="text"
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            ) : (
                                <CldUploadWidget
                                    signatureEndpoint="/api/cloudinary-signature"
                                    onSuccess={(result: any) => {
                                        if (result?.info?.secure_url) {
                                            setFormData({ ...formData, avatar: result.info.secure_url });
                                        }
                                    }}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="w-full py-2 px-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-slate-800 dark:hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2"
                                        >
                                            <Upload className="h-3.5 w-3.5" />
                                            <span>Upload Avatar</span>
                                        </button>
                                    )}
                                </CldUploadWidget>
                            )}

                            {formData.avatar && (
                                <div className="mt-2 flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <img src={formData.avatar} alt="Preview" className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-slate-500 truncate">{formData.avatar}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, avatar: '' })}
                                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                rows={3}
                                placeholder="Short biography..."
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {submitting ? 'Saving...' : 'Save Author'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Authors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {authors.map((author: any) => (
                    <div key={author._id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden">

                        <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                                {author.avatar ? (
                                    <img src={author.avatar} alt={author.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <User className="h-6 w-6" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{author.name}</h3>
                                {(author.email || author.bio) && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                        {author.bio || author.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions Overlay */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded p-1">
                            <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                                <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => handleDelete(author._id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                            <span>0 Articles</span>
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                Active
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
