'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Tag as TagIcon, X } from 'lucide-react';

export default function TagsPage() {
    const [tags, setTags] = useState([]);
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const res = await fetch('/api/tags');
            const data = await res.json();
            setTags(data);
        } catch (err) {
            console.error('Failed to fetch tags');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName }),
            });
            if (res.ok) {
                setNewName('');
                fetchTags();
            }
        } catch (err) {
            console.error('Failed to create tag');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this tag?')) return;
        try {
            const res = await fetch(`/api/tags/${id}`, { method: 'DELETE' });
            if (res.ok) fetchTags();
        } catch (err) {
            console.error('Failed to delete tag');
        }
    };

    const filteredTags = tags.filter((tag: any) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-slate-500 text-sm">Loading tags...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tags</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage keywords and topics.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Create & Search */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Add New Tag</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter tag name..."
                                    className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm disabled:opacity-50"
                            >
                                <Plus className="h-4 w-4" />
                                Create Tag
                            </button>
                        </form>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filter tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 w-full h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                {/* Tags List */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-4">
                        <div className="flex flex-wrap gap-2">
                            {filteredTags.map((tag: any) => (
                                <div
                                    key={tag._id}
                                    className="group flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                                >
                                    <TagIcon className="h-3 w-3 text-slate-400 group-hover:text-blue-500" />
                                    <span>{tag.name}</span>
                                    <button
                                        onClick={() => handleDelete(tag._id)}
                                        className="ml-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                            {filteredTags.length === 0 && (
                                <p className="text-sm text-slate-500 italic w-full text-center py-8">
                                    No tags found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
