import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Category from '@/models/Category';
import Author from '@/models/Author';
import Tag from '@/models/Tag';
import {
    FileText,
    Layers,
    Users,
    TrendingUp,
    Clock,
    Activity,
    Eye,
    Calendar,
    ArrowRight,
    Tag as TagIcon
} from 'lucide-react';
import Link from 'next/link';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    await dbConnect();

    // Calculate Date Ranges
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = subDays(today, 6 - i);
        return {
            date: d,
            label: format(d, 'MMM d'),
            start: startOfDay(d),
            end: endOfDay(d)
        };
    });

    // Parallel data fetching for performance
    const [
        totalArticles,
        publishedArticles,
        draftArticles,
        totalCategories,
        totalAuthors,
        recentArticles,
        categoryDistribution,
        topAuthors,
        totalViewsData,
        tagsData,
        trendsData
    ] = await Promise.all([
        Article.countDocuments(),
        Article.countDocuments({ status: 'published' }),
        Article.countDocuments({ status: 'draft' }),
        Category.countDocuments(),
        Author.countDocuments(),
        Article.find().sort({ createdAt: -1 }).limit(7).populate('author', 'name').populate('category', 'name'),
        Article.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "categoryInfo" } },
            { $unwind: "$categoryInfo" },
            { $project: { name: "$categoryInfo.name", count: 1 } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]),
        Article.aggregate([
            { $group: { _id: "$author", count: { $sum: 1 }, totalViews: { $sum: "$views" } } },
            { $lookup: { from: "authors", localField: "_id", foreignField: "_id", as: "authorInfo" } },
            { $unwind: "$authorInfo" },
            { $project: { name: "$authorInfo.name", avatar: "$authorInfo.avatar", count: 1, totalViews: 1 } },
            { $sort: { totalViews: -1 } },
            { $limit: 5 }
        ]),
        Article.aggregate([
            { $group: { _id: null, total: { $sum: "$views" } } }
        ]),
        Article.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $lookup: { from: "tags", localField: "_id", foreignField: "_id", as: "tagInfo" } },
            { $unwind: "$tagInfo" },
            { $project: { name: "$tagInfo.name", count: 1 } }
        ]),
        // Simulating trends aggregation (MongoDB equivalent would be complex with dates)
        // We'll calculate this manually in JS for simplicity/speed with small datasets, 
        // or effectively by separate queries if dataset was huge (but normally one Agg pipeline)
        // For now, let's do a simple map over days
        Promise.all(last7Days.map(day =>
            Article.countDocuments({
                createdAt: { $gte: day.start, $lte: day.end }
            })
        ))
    ]);

    const totalViewCount = totalViewsData[0]?.total || 0;
    const weeklyActivity = last7Days.map((day, i) => ({
        label: day.label,
        count: trendsData[i]
    }));
    const maxDaily = Math.max(...trendsData as number[], 1);

    const stats = [
        { label: 'Total Articles', value: totalArticles, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Published', value: publishedArticles, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { label: 'Drafts', value: draftArticles, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { label: 'Categories', value: totalCategories, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Authors', value: totalAuthors, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        { label: 'Total Views', value: totalViewCount.toLocaleString(), icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Deep dive into platform performance and content trends.</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                            <div className={`p-1.5 rounded-md ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-3.5 w-3.5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Publishing Trends Chart */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-slate-400" />
                            Publishing Trends (Last 7 Days)
                        </h3>
                        <div className="flex items-end justify-between h-40 gap-2">
                            {weeklyActivity.map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                    <div className="relative w-full flex items-end justify-center h-full">
                                        <div
                                            className="w-full max-w-[24px] bg-blue-100 dark:bg-blue-900/30 rounded-t-sm group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors relative"
                                            style={{ height: `${(day.count as number / maxDaily) * 100}%` }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                {day.count as number} articles
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">{day.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Activity className="h-4 w-4 text-slate-400" />
                                Recent Activity
                            </h3>
                            <Link href="/admin/articles" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                View Full Log <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-3">Article Title</th>
                                        <th className="px-6 py-3">Details</th>
                                        <th className="px-6 py-3 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {recentArticles.map((article: any) => (
                                        <tr key={article._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-3">
                                                <div className="font-medium text-slate-900 dark:text-white max-w-xs truncate mb-0.5">
                                                    {article.title}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${article.status === 'published'
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30'
                                                            : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                                                        }`}>
                                                        {article.status.toUpperCase()}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">{article.category?.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">
                                                        {article.author?.name?.charAt(0)}
                                                    </div>
                                                    {article.author?.name || 'Unknown'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-slate-400 text-xs text-right whitespace-nowrap">
                                                {format(new Date(article.createdAt), 'MMM d')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="space-y-6">
                    {/* Trending Topics (Tags) */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <TagIcon className="h-4 w-4 text-slate-400" />
                            Trending Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tagsData.map((tag: any, i: number) => (
                                <div key={i} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                    <span>#{tag.name}</span>
                                    <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-1 rounded text-[9px] min-w-[16px] text-center">
                                        {tag.count}
                                    </span>
                                </div>
                            ))}
                            {tagsData.length === 0 && <p className="text-xs text-slate-500">No tag data available.</p>}
                        </div>
                    </div>

                    {/* Top Authors */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            Author Performance
                        </h3>
                        <div className="space-y-4">
                            {topAuthors.map((author: any, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 shadow-inner">
                                        {author.avatar ? <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" /> : author.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{author.name}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                            <span>{author.count} articles</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>{Math.round(author.totalViews / Math.max(author.count, 1))} avg views</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">{author.totalViews.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Layers className="h-4 w-4 text-slate-400" />
                            Content Distribution
                        </h3>
                        <div className="space-y-3">
                            {categoryDistribution.map((cat: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{cat.name}</span>
                                        <span className="text-slate-500">{Math.round((cat.count / totalArticles) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                                        <div
                                            className="bg-indigo-600 h-1.5 rounded-full"
                                            style={{ width: `${(cat.count / totalArticles) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
