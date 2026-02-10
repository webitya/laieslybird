"use client";

import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* Header Section */}
            <section className="pt-24 pb-12">
                <div className="container px-4 md:px-8">
                    <div className="max-w-4xl space-y-4">
                        <div className="inline-flex px-3 py-1 rounded-md bg-blue-600/10 text-blue-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest">
                            Connect
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-[0.85]">
                            Get in <br /><span className="text-blue-600">Touch</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                            Have a scoop, feedback, or a partnership inquiry? Our global operations center is ready to listen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Interaction Section */}
            <section className="pb-24">
                <div className="container px-4 md:px-8">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Form Column */}
                        <div className="lg:col-span-7 space-y-12">
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-4 px-0 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@agency.com"
                                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-4 px-0 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</label>
                                    <select className="w-full bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-4 px-0 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors font-medium appearance-none">
                                        <option>News Tip / Scoop</option>
                                        <option>Partnership Inquiry</option>
                                        <option>Advertising</option>
                                        <option>General Feedback</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we help you stay ahead?"
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-4 px-0 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors font-medium resize-none"
                                    />
                                </div>
                                <button className="inline-flex items-center gap-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
                                    Direct Dispatch <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="p-10 rounded-[2.5rem] bg-slate-950 text-white space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] -mr-32 -mt-32" />

                                <div className="space-y-6 relative z-10">
                                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">Global HQ</h2>
                                    <div className="space-y-6">
                                        <ContactInfo
                                            icon={<MapPin className="w-5 h-5 text-blue-400" />}
                                            label="Location"
                                            value="Pulse Tower, 11th Floor, New York, NY"
                                        />
                                        <ContactInfo
                                            icon={<Phone className="w-5 h-5 text-blue-400" />}
                                            label="Operations"
                                            value="+1 (555) 785-7000"
                                        />
                                        <ContactInfo
                                            icon={<Mail className="w-5 h-5 text-blue-400" />}
                                            label="Support"
                                            value="press@laieslybird.com"
                                        />
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 space-y-4 relative z-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Status</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 text-slate-100">Average response: 12 mins</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-6">
                                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Press Access</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                    Are you a fellow journalist or agency? Register for our High-Priority Media Feed for raw assets and pre-release briefings.
                                </p>
                                <button className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-sky-400 flex items-center gap-2 hover:gap-3 transition-all">
                                    Apply for Credentials →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1">{icon}</div>
            <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
                <div className="text-sm font-bold text-slate-100">{value}</div>
            </div>
        </div>
    );
}
