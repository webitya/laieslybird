'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

interface Popup {
    _id: string;
    title: string;
    image: string;
    link?: string;
    displayFrequency: 'once' | 'daily' | 'always';
}

export default function PopupManager() {
    const [popup, setPopup] = useState<Popup | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        checkAndShowPopup();
    }, []);

    const checkAndShowPopup = async () => {
        try {
            const res = await fetch('/api/popup');
            if (res.ok) {
                const data = await res.json();
                if (data && shouldShowPopup(data)) {
                    setPopup(data);
                    setTimeout(() => setIsVisible(true), 1000); // Show after 1 second
                }
            }
        } catch (error) {
            console.error('Failed to fetch popup:', error);
        }
    };

    const shouldShowPopup = (popupData: Popup): boolean => {
        const storageKey = `popup_${popupData._id}`;
        const lastShown = localStorage.getItem(storageKey);

        if (popupData.displayFrequency === 'always') {
            return true;
        }

        if (popupData.displayFrequency === 'once' && lastShown) {
            return false;
        }

        if (popupData.displayFrequency === 'daily' && lastShown) {
            const lastShownDate = new Date(lastShown);
            const today = new Date();
            if (
                lastShownDate.getDate() === today.getDate() &&
                lastShownDate.getMonth() === today.getMonth() &&
                lastShownDate.getFullYear() === today.getFullYear()
            ) {
                return false;
            }
        }

        return true;
    };

    const handleClose = () => {
        if (popup) {
            const storageKey = `popup_${popup._id}`;
            localStorage.setItem(storageKey, new Date().toISOString());
        }
        setIsVisible(false);
    };

    if (!isVisible || !popup) return null;

    const PopupContent = (
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                aria-label="Close popup"
            >
                <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/9] w-full">
                <Image
                    src={popup.image}
                    alt={popup.title}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            {popup.link ? (
                <Link href={popup.link} onClick={handleClose}>
                    {PopupContent}
                </Link>
            ) : (
                PopupContent
            )}

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
