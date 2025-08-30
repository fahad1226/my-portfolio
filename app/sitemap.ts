import { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://fahadbinmunir.com";

    try {
        // Get all blog articles from Firebase
        const blogs = await getDocs(collection(db, "articles"));
        const articles = blogs.docs.map((doc) => doc.data());

        // Static pages with different priorities
        const staticPages = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 1,
            },
            {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            },
            // Add more static pages as needed
            // {
            //   url: `${baseUrl}/about`,
            //   lastModified: new Date(),
            //   changeFrequency: 'monthly' as const,
            //   priority: 0.7,
            // },
        ];

        // Dynamic blog pages
        const blogPages = articles.map((article: any) => ({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: new Date(article.published_at),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));

        return [...staticPages, ...blogPages];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        // Return basic sitemap even if Firebase fails
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 1,
            },
            {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            },
        ];
    }
}
