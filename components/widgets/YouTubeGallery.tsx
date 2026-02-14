'use client';

import { useEffect, useState } from 'react';
import { Youtube, Play } from 'lucide-react';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
}

interface YouTubeGalleryProps {
    channelId?: string;
    maxResults?: number;
}

export default function YouTubeGallery({
    channelId,
    maxResults = 6,
}: YouTubeGalleryProps) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (channelId) {
            fetchVideos();
        }
    }, [channelId]);

    const fetchVideos = async () => {
        try {
            const res = await fetch(`/api/widgets/youtube?channelId=${channelId}&maxResults=${maxResults}`);
            if (res.ok) {
                const data = await res.json();
                setVideos(data);
            }
        } catch (error) {
            console.error('Failed to fetch YouTube videos:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!channelId) return null;

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                    <Youtube className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Latest Videos
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                    <Youtube className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Latest Videos
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video.id)}
                            className="group relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 hover:ring-2 hover:ring-red-600 transition-all"
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-sm font-bold line-clamp-2">
                                    {video.title}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-12 right-0 text-white hover:text-red-600 transition-colors"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
