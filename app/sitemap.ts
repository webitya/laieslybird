import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Category from '@/models/Category';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await dbConnect();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://laieslybird.com';

    const [articles, categories] = await Promise.all([
        Article.find({ status: 'published' }),
        Category.find({}),
    ]);

    const articleUrls = articles.map((article: any) => ({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified: article.updatedAt || article.createdAt,
        changeFrequency: 'daily' as const,
        priority: 0.8,
        images: article.featuredImage || article.images?.[0]
            ? [article.featuredImage || article.images[0]]
            : undefined,
    }));

    const categoryUrls = categories.map((category: any) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/e-paper`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        ...articleUrls,
        ...categoryUrls,
    ];
}
