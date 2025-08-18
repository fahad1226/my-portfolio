import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { Metadata } from "next";
import BlogHeroSection from "../components/blog-hero";
import { MyBlogList } from "../components/my-blogs";

export const metadata: Metadata = {
    title: "Blog | Fahad Bin Munir",
    description:
        "Fahad Bin Munir is a seasoned software engineer with expertise in TypeScript, NextJS, and React. He specializes in enhancing web user experience and performance.",
    metadataBase: new URL("https://fahadbinmunir.com"),
    keywords: [
        "Fahad Bin Munir",
        "Software Engineer",
        "Web Developer",
        "TypeScript Expert",
        "NextJS Expert",
        "React Developer",
        "Web UX & Performance Specialist",
        "Frontend Development",
        "Web Technologies",
        "Software Development",
        "Web Design",
    ],
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

export default function BlogPage() {
    return (
        <>
            <BlogHeroSection />
            <div className="relative container mx-auto w-full px-4 sm:px-6">
                <FloatingNav navItems={navItems} />

                <MyBlogList showTitle={false} />
            </div>
        </>
    );
}
