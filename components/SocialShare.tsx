'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = encodeURIComponent(url);
    const shareTitle = encodeURIComponent(title);
    const shareDescription = encodeURIComponent(description || '');

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
        telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleShare = (platform: string) => {
        // Track share event (optional analytics)
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'share', {
                method: platform,
                content_type: 'article',
                item_id: url,
            });
        }
    };

    return (
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Share:
            </span>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleShare('facebook')}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110"
                aria-label="Share on Facebook"
            >
                <Facebook className="h-4 w-4" fill="currentColor" />
            </a>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-all hover:scale-110"
                aria-label="Share on Twitter"
            >
                <Twitter className="h-4 w-4" fill="currentColor" />
            </a>

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleShare('linkedin')}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-all hover:scale-110"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="h-4 w-4" fill="currentColor" />
            </a>

            <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleShare('telegram')}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-all hover:scale-110"
                aria-label="Share on Telegram"
            >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
            </a>

            <button
                onClick={handleCopyLink}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-all hover:scale-110"
                aria-label="Copy link"
            >
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            </button>
        </div>
    );
}
