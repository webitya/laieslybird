'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Successfully subscribed! Check your email for confirmation.');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to subscribe. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again later.');
        }

        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };

    return (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-2xl font-black">Stay Informed</h3>
                    <p className="text-blue-100 text-sm">Get the latest news in your inbox</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>

                {message && (
                    <div
                        className={`flex items-center gap-2 p-3 rounded-lg ${status === 'success'
                                ? 'bg-green-500/20 border border-green-400/30'
                                : 'bg-red-500/20 border border-red-400/30'
                            }`}
                    >
                        {status === 'success' ? (
                            <Check className="h-5 w-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        )}
                        <p className="text-sm">{message}</p>
                    </div>
                )}
            </form>

            <p className="text-xs text-blue-100 mt-4">
                We respect your privacy. Unsubscribe at any time.
            </p>
        </div>
    );
}
