export default function TermsPage() {
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
                            Terms of <br /><span className="text-blue-600">Service</span>
                        </h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Last Updated: February 10, 2026</p>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="py-20">
                <div className="container px-4 md:px-8 grid lg:grid-cols-12 gap-16">
                    {/* Sticky TOC (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Governance</h4>
                            <nav className="flex flex-col space-y-3">
                                <TOCLink href="#acceptance">Acceptance</TOCLink>
                                <TOCLink href="#conduct">User Conduct</TOCLink>
                                <TOCLink href="#property">Intellectual Property</TOCLink>
                                <TOCLink href="#disclaimer">Disclaimers</TOCLink>
                                <TOCLink href="#liability">Liability Core</TOCLink>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-7 space-y-16">
                        <Section id="acceptance" title="01. Acceptance of Terms">
                            <p>
                                By accessing and using the LAIESLYBIRD platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </Section>

                        <Section id="conduct" title="02. User Conduct Core">
                            <p>
                                Readers are expected to interact with our content with integrity. You agree not to:
                            </p>
                            <ul className="list-disc pl-5 space-y-3">
                                <li>Use the service for any illegal purpose or to promote illegal activities.</li>
                                <li>Attempt to hack, destabilize, or interfere with the News Engine operations.</li>
                                <li>Scrape content using automated bots without explicit media credentials.</li>
                                <li>Impersonate LAIESLYBIRD staff or authors.</li>
                            </ul>
                        </Section>

                        <Section id="property" title="03. Intellectual Property">
                            <p>
                                All content, including but not limited to text, graphics, logos, and software, is the exclusive property of LAIESLYBIRD or its content suppliers and is protected by international copyright laws.
                            </p>
                            <p className="italic text-blue-600 font-bold">
                                Unauthorized redistribution of our "Pulse" data feeds is strictly prohibited.
                            </p>
                        </Section>

                        <Section id="disclaimer" title="04. Journalistic Disclaimer">
                            <p>
                                The materials on LAIESLYBIRD are provided on an 'as is' basis. While we strive for absolute accuracy in our reporting, we make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
                            </p>
                        </Section>

                        <Section id="liability" title="05. Liability Limitations">
                            <p>
                                In no event shall LAIESLYBIRD or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.
                            </p>
                        </Section>

                        <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-sm text-slate-500 font-medium italic">These terms are subject to change at any time without notice. Continued use of the platform constitutes acceptance of the updated terms.</p>
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
