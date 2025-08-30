import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
    const baseUrl = "https://fahadbinmunir.com";

    try {
        // Get all blog articles from Firebase
        const blogs = await getDocs(collection(db, "articles"));
        const articles = blogs.docs.map((doc) => doc.data());

        // Generate XML sitemap
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        
            <url>
                <loc>${baseUrl}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>${baseUrl}/blog</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            
            ${articles
                .map(
                    (article: any) => `
                    <url>
                        <loc>${baseUrl}/blog/${article.slug}</loc>
                        <lastmod>${new Date(
                            article.published_at
                        ).toISOString()}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>0.6</priority>
                    </url>
                `
                )
                .join("")}
            </urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}
