import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { Metadata } from "next";
import BlogHeroSection from "../components/blog-hero";
import { MyBlogList } from "../components/my-blogs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArticleTypes } from "../page";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Blog | Fahad Bin Munir - Software Engineer",
    description:
        "Fahad Bin Munir - Software Engineer skilled in TypeScript, Next.js & React. Expert in building fast, user-friendly, high-performance web apps",
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

export default async function BlogPage() {
    const blogs = await getDocs(collection(db, "articles"));
    const articles = blogs.docs.map((doc) => doc.data() as ArticleTypes);
    return (
        <>
            <BlogHeroSection />
            <div className="relative container mx-auto w-full px-4 sm:px-6">
                <FloatingNav navItems={navItems} />

                <MyBlogList showTitle={false} articles={articles} />

                <Footer />
            </div>
        </>
    );
}
