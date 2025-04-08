import { navItems } from "@/data";
import { Metadata } from "next";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import MyHeroSection from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import MyApproach from "./components/my-approach";
import { MyBlogList } from "./components/my-blogs";
import MyResume from "./components/my-resume";
import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
    title: "Fahad Bin Munir | Another Software Engineer",
    description:
        "I am a passionate software engineer with a strong background in web development. I love to learn and explore new technologies.",
    metadataBase: new URL("https://fahadbinmunir.com"),
    keywords: [
        "Fahad Bin Munir",
        "Software Engineer",
        "Web Developer",
        "Software Developer",
        "Software Engineer",
        "Web Developer",
        "Software Developer",
    ],
    alternates: {
        canonical: "https://fahadbinmunir.com",
        languages: {
            "en-US": "https://fahadbinmunir.com",
        },
    },
    publisher: "Fahad Bin Munir",
};

export default function HomePage() {
    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col scroll-smooth overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full px-4 sm:px-0">
                <FloatingNav navItems={navItems} />
                <MyHeroSection />
                <Grid />
                <MyApproach />
                <RecentProjects />
                <MyResume />
                <Experience />
                <Approach />
                <MyBlogList />
                <Footer />
            </div>
            <JsonLd />
        </main>
    );
}
