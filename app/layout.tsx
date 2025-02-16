import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const firaSans = Fira_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Adrian's Portfolio",
    description: "Modern & Minimal JS Mastery Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/jsm-logo.png" sizes="any" />
            </head>
            <body className={firaSans.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
