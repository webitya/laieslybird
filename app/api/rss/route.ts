import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        const articles = await Article.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .limit(50)
            .populate('category')
            .populate('author');

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>LAIESLYBIRD - International News</title>
    <link>https://laieslybird.com</link>
    <description>Breaking international news and analysis</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://laieslybird.com/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://laieslybird.com/logo.png</url>
      <title>LAIESLYBIRD</title>
      <link>https://laieslybird.com</link>
    </image>
${articles
                .map(
                    (article: any) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://laieslybird.com/news/${article.slug}</link>
      <guid isPermaLink="true">https://laieslybird.com/news/${article.slug}</guid>
      <description><![CDATA[${article.content.replace(/<[^>]*>/g, '').substring(0, 300)}...]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <pubDate>${new Date(article.createdAt).toUTCString()}</pubDate>
      <dc:creator>${article.author?.name || 'LAIESLYBIRD'}</dc:creator>
      <category>${article.category?.name || 'News'}</category>
      ${article.featuredImage || article.images?.[0]
                            ? `<media:content url="${article.featuredImage || article.images[0]}" medium="image"/>`
                            : ''
                        }
    </item>`
                )
                .join('\n')}
  </channel>
</rss>`;

        return new NextResponse(rss, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('RSS generation error:', error);
        return NextResponse.json({ error: 'Failed to generate RSS feed' }, { status: 500 });
    }
}
