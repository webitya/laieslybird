import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/SessionProvider";
import { generateOrganizationSchema } from "@/lib/seo-config";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LAIESLYBIRD - International News",
    description: "Breaking international news and analysis",
    keywords: "international news, breaking news, world news, analysis, journalism",
    authors: [{ name: "LAIESLYBIRD" }],
    creator: "LAIESLYBIRD",
    publisher: "LAIESLYBIRD",
    metadataBase: new URL('https://laieslybird.com'),
    openGraph: {
        title: "LAIESLYBIRD - International News",
        description: "Breaking international news and analysis",
        url: "https://laieslybird.com",
        siteName: "LAIESLYBIRD",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "LAIESLYBIRD - International News",
        description: "Breaking international news and analysis",
        creator: "@laieslybird",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Analytics */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
                    `}
                </Script>
            </head>
            <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white`}>
                {/* Organization Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateOrganizationSchema()),
                    }}
                />
                <SessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
