export default function PrivacyPage() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            {/* Header */}
            <header className="pt-24 pb-16 border-b border-slate-100 dark:border-slate-800">
                <div className="container px-4 md:px-8">
                    <div className="max-w-4xl space-y-6">
                        <div className="inline-flex px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            Legal Document
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
                            Privacy <br /><span className="text-blue-600">Protocol</span>
                        </h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Effective Date: February 10, 2026</p>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="py-20">
                <div className="container px-4 md:px-8 grid lg:grid-cols-12 gap-16">
                    {/* Sticky TOC (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sections</h4>
                            <nav className="flex flex-col space-y-3">
                                <TOCLink href="#overview">Overview</TOCLink>
                                <TOCLink href="#data-collection">Data Collection</TOCLink>
                                <TOCLink href="#usage">Usage Rights</TOCLink>
                                <TOCLink href="#security">Security Core</TOCLink>
                                <TOCLink href="#cookies">Tracking & Cookies</TOCLink>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-7 space-y-16">
                        <Section id="overview" title="01. Information Overview">
                            <p>
                                At LAIESLYBIRD, we respect the integrity of your digital footprint. This Privacy Protocol outlines our rigorous standards for data handling, ensuring that your interaction with our global news feed remains secure and transparent.
                            </p>
                            <p>
                                By accessing our platform, you acknowledge the collection and use of information in accordance with this protocol.
                            </p>
                        </Section>

                        <Section id="data-collection" title="02. Data Acquisition">
                            <p>
                                We collect minimal information necessary to deliver a high-performance news experience:
                            </p>
                            <ul className="list-disc pl-5 space-y-3">
                                <li><strong>Device Specs:</strong> IP address, browser type, and version to optimize layout rendering.</li>
                                <li><strong>Behavioral Pulse:</strong> Pages visited, time spent, and interaction points for content relevance.</li>
                                <li><strong>Identity (Optional):</strong> Email address if you explicitly register for authenticated access or media credentials.</li>
                            </ul>
                        </Section>

                        <Section id="usage" title="03. Usage Disclosure">
                            <p>
                                Your data is processed for specific, elite operational purposes:
                            </p>
                            <ul className="list-disc pl-5 space-y-3">
                                <li>Maintenance and optimization of the News Engine.</li>
                                <li>Personalization of the article grid based on read history.</li>
                                <li>High-priority dispatch of news alerts (if opted-in).</li>
                                <li>Fraud detection and security auditing.</li>
                            </ul>
                            <p className="italic text-blue-600 font-bold">
                                We do not sell your behavioral pulse to third-party data brokers.
                            </p>
                        </Section>

                        <Section id="security" title="04. Security Architecture">
                            <p>
                                Every bit of data is protected by industry-standard encryption protocols. However, the nature of the internet means no transmission is 100% immune. We maintain a robust security core to mitigate risks and respond to threats in real-time.
                            </p>
                        </Section>

                        <Section id="cookies" title="05. Tracking Technologies">
                            <p>
                                We use cookies and similar beacons to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </Section>

                        <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-sm text-slate-500 font-medium">Questions regarding this document can be directed to our legal operations via the <a href="/contact" className="text-blue-600 hover:underline">Contact Portal</a>.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Section({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-32 space-y-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">{title}</h2>
            <div className="text-base text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 font-medium">
                {children}
            </div>
        </section>
    );
}

function TOCLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest block"
        >
            {children}
        </a>
    );
}
