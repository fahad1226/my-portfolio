import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";

import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";

const firaSans = Fira_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Fahad Bin Munir | Another Software Engineer",
    description:
        "I am a passionate software engineer with a strong background in web development. I love to learn and explore new technologies.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="google-tag-manager"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TVTG8GR3');`,
                    }}
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={firaSans.className}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-TVTG8GR3"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
