import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Category from '@/models/Category';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await dbConnect();

    const [articles, categories] = await Promise.all([
        Article.find({ status: 'published' }),
        Category.find({}),
    ]);

    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${process.env.NEXTAUTH_URL}/news/${article.slug}`,
        lastModified: article.updatedAt,
    }));

    const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${process.env.NEXTAUTH_URL}/category/${cat.slug}`,
        lastModified: new Date(),
    }));

    return [
        {
            url: process.env.NEXTAUTH_URL!,
            lastModified: new Date(),
        },
        ...articleEntries,
        ...categoryEntries,
    ];
}
