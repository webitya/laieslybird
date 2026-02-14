import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const channelId = searchParams.get('channelId');
        const maxResults = searchParams.get('maxResults') || '6';

        if (!channelId) {
            return NextResponse.json({ error: 'Channel ID required' }, { status: 400 });
        }

        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
        }

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}&type=video`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error('YouTube API request failed');
        }

        const data = await response.json();

        const videos = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
        }));

        return NextResponse.json(videos);
    } catch (error) {
        console.error('YouTube API error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
