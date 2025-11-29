import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import MyHeroSection from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Metadata } from "next";
import JsonLd from "./components/JsonLd";
import MyApproach from "./components/my-approach";
import { MyBlogList } from "./components/my-blogs";
import MyResume from "./components/my-resume";

export const metadata: Metadata = {
    title: "Fahad Bin Munir | Software Engineer | 4+ Years Experience",
    description:
        "Fahad Bin Munir — Software Engineer with 4+ years of experience specializing in TypeScript, Next.js, React, and Laravel. I build high-performance, scalable, SEO-optimized, and user-focused web applications with clean architecture and modern frontend engineering practices.",
    keywords: [
        "Fahad Bin Munir",
        "Software Developer",
        "Blog Writer",
        "Software Engineer",
        "Web Developer",
        "TypeScript Expert",
        "Performance Optimization",
        "NextJS Expert",
        "React Developer",
        "Web UX & Performance Specialist",
        "Frontend Development",
        "Laravel Developer",
        "Web Technologies",
        "Software Development",
        "Modern Web Design",
    ],
    alternates: {
        canonical: "https://fahadbinmunir.com",
        languages: {
            "en-US": "https://fahadbinmunir.com",
        },
    },
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com",
    },
};
export interface ArticleTypes {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    blogCategory: string;
    content: string;
    author: string;
    duration: string;
    published_at: string;
    coverImage: string;
}

export const revalidate = 3600; // invalidate every hour

export default async function HomePage() {
    const blogs = await getDocs(collection(db, "articles"));
    const articles = blogs.docs.map((doc) => doc.data() as ArticleTypes);

    // Sort articles by published date (newest first) and take the first 3
    const sortedArticles = articles
        .sort(
            (a, b) =>
                new Date(b.published_at).getTime() -
                new Date(a.published_at).getTime()
        )
        .slice(0, 3);
    return (
        <div className="relative flex justify-center items-center flex-col scroll-smooth overflow-hidden">
            <FloatingNav navItems={navItems} />
            <MyHeroSection />
            <div className="container mx-auto w-full px-4 sm:px-6">
                <Grid />
                <MyApproach />
                <RecentProjects />
                <MyResume />
                <Experience />
                <Approach />
                <MyBlogList articles={sortedArticles} />
                <Footer />
            </div>
            <JsonLd />
        </div>
    );
}
