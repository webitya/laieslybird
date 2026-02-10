import { ArrowRight, Globe, Shield, Target, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] pointer-events-none" />
                <div className="container px-4 md:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                            Our Mission
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.95] uppercase italic">
                            Redefining the <span className="text-blue-600">Pulse</span> of Global News
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                            LAIESLYBIRD delivers swift, accurate, and unbiased international news coverage for a world that never sleeps.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800">
                <div className="container px-4 md:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <ValueCard
                            icon={<Shield className="w-8 h-8 text-blue-600" />}
                            title="Unbiased Integrity"
                            description="We strip away the noise to deliver raw, factual intelligence from the heart of the event."
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8 text-blue-600" />}
                            title="Global Precision"
                            description="Our network spans continents, providing hyper-local context on a global scale."
                        />
                        <ValueCard
                            icon={<Globe className="w-8 h-8 text-blue-600" />}
                            title="Real-time Vision"
                            description="Information moves at light speed; our platform ensures you stay ahead of the curve."
                        />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="container px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                                Excellence in <br /><span className="text-blue-600 italic">Journalism</span>
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                <p>
                                    Founded in 2026, LAIESLYBIRD was born from a simple realization: the global information landscape was fragmented, often delayed, and increasingly filtered through narrow perspectives.
                                </p>
                                <p>
                                    Our team of elite analysts and decentralized contributors work around the clock to synthesize complex global shifts into readable, actionable, and visually stunning news experiences.
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">50k+</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">Readers</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">120+</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">Regions</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">24/7</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">Coverage</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group">
                            <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay group-hover:bg-transparent transition-all duration-700" />
                            <img
                                src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop"
                                alt="Newsroom"
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="space-y-4 group">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:shadow-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500 group-hover:-translate-y-1">
                {icon}
            </div>
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {description}
            </p>
        </div>
    );
}
