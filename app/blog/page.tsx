import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Metadata } from "next";
import Script from "next/script";
import BlogHeroSection from "../components/blog-hero";
import { MyBlogList } from "../components/my-blogs";
import { ArticleTypes } from "../page";

// Enable static generation with revalidation for better SEO
export const dynamic = "force-static";
export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata: Metadata = {
    title: "Blog | Fahad Bin Munir - Software Engineer | 4+ Years Experience",
    description:
        "Explore insightful articles on software development, web technologies, and best practices. Learn about TypeScript, Next.js, React, Laravel, and more from an experienced software engineer.",
    metadataBase: new URL("https://fahadbinmunir.com"),
    keywords: [
        "Software Development Blog",
        "Web Development Articles",
        "Programming Tutorials",
        "TypeScript Tips",
        "Next.js Guides",
        "React Best Practices",
        "Laravel Development",
        "Web Performance Tips",
        "Frontend Development Blog",
        "Software Engineering Insights",
        "Coding Best Practices",
        "Web Development Tips",
        "Tech Blog",
        "Developer Blog",
        "Modern Web Development",
        "JavaScript Tutorials",
    ],
    openGraph: {
        type: "website",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 300,
                alt: "Fahad Bin Munir | Software Engineer | 4+ Years Experience",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: "/twitter-image.png",
                width: 1200,
                height: 300,
                alt: "Fahad Bin Munir | Software Engineer | 4+ Years Experience",
                type: "image/png",
            },
        ],
    },
    alternates: {
        canonical: "https://fahadbinmunir.com/blog",
        languages: {
            "en-US": "https://fahadbinmunir.com/blog",
        },
    },
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com",
    },
};

export default async function BlogPage() {
    const blogs = await getDocs(collection(db, "articles"));
    const articles = blogs.docs.map((doc) => doc.data() as ArticleTypes);

    // Structured data for the blog page
    const blogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Fahad Bin Munir - Software Development Blog",
        description:
            "Explore insightful articles on software development, web technologies, and best practices. Learn about TypeScript, Next.js, React, Laravel, and more from an experienced software engineer.",
        url: "https://fahadbinmunir.com/blog",
        author: {
            "@type": "Person",
            name: "Fahad Bin Munir",
            url: "https://fahadbinmunir.com",
        },
        publisher: {
            "@type": "Person",
            name: "Fahad Bin Munir",
            url: "https://fahadbinmunir.com",
        },

        blogPost: articles.map((article) => ({
            "@type": "BlogPosting",
            headline: article.title,
            description: article.shortDescription,
            url: `https://fahadbinmunir.com/blog/${article.slug}`,
            datePublished: article.published_at,
            author: {
                "@type": "Person",
                name: "Fahad Bin Munir",
            },
            image:
                article.coverImage ||
                "https://fahadbinmunir.com/images/default-blog-image.avif",
        })),
    };

    return (
        <>
            <Script
                id="blog-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogStructuredData),
                }}
            />
            <BlogHeroSection />
            <div className="relative container mx-auto w-full px-4 sm:px-6">
                <FloatingNav navItems={navItems} />

                <MyBlogList
                    showTitle={false}
                    articles={articles}
                    showMoreButton={false}
                />

                <Footer />
            </div>
        </>
    );
}
