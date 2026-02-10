import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm mt-auto">
            <div className="px-4 md:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs">
                                L
                            </div>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">LAIESLYBIRD</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                            Delivering swift, accurate, and unbiased international news coverage. Your trusted source for global events and analysis.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
                            <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
                            <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
                            <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Categories</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <FooterLink href="/category/world">World</FooterLink>
                            <FooterLink href="/category/politics">Politics</FooterLink>
                            <FooterLink href="/category/business">Business</FooterLink>
                            <FooterLink href="/category/tech">Technology</FooterLink>
                            <FooterLink href="/category/sports">Sports</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/terms">Terms of Service</FooterLink>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                            <button className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} LAIESLYBIRD. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <li>
        <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
    <a
        href={href}
        aria-label={label}
        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
    >
        {icon}
    </a>
);

export default Footer;
