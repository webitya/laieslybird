import { Metadata } from 'next';

export interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
}

export function generateMetadata(config: SEOConfig): Metadata {
    const {
        title,
        description,
        keywords = [],
        image = '/og-default.jpg',
        url = 'https://laieslybird.com',
        type = 'website',
        publishedTime,
        modifiedTime,
        author,
        section,
        tags = [],
    } = config;

    const fullTitle = `${title} | LAIESLYBIRD`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: author ? [{ name: author }] : undefined,
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: 'LAIESLYBIRD',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: type === 'article' ? 'article' : 'website',
            ...(type === 'article' && publishedTime
                ? {
                    publishedTime,
                    modifiedTime,
                    authors: author ? [author] : undefined,
                    section,
                    tags,
                }
                : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
            creator: '@laieslybird',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: url,
        },
    };
}

export function generateArticleSchema(article: {
    title: string;
    description: string;
    image: string;
    url: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    authorUrl?: string;
    categoryName?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.description,
        image: [article.image],
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: {
            '@type': 'Person',
            name: article.authorName,
            url: article.authorUrl || 'https://laieslybird.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'LAIESLYBIRD',
            logo: {
                '@type': 'ImageObject',
                url: 'https://laieslybird.com/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url,
        },
        articleSection: article.categoryName,
    };
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'LAIESLYBIRD',
        url: 'https://laieslybird.com',
        logo: 'https://laieslybird.com/logo.png',
        description: 'Breaking international news and analysis',
        sameAs: [
            'https://twitter.com/laieslybird',
            'https://facebook.com/laieslybird',
            'https://instagram.com/laieslybird',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contact@laieslybird.com',
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
