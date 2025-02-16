import { navItems } from "@/data";

import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import MyHeroSection from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import MyApproach from "./components/my-approach";
import MyResume from "./components/my-resume";

export default function HomePage() {
    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <FloatingNav navItems={navItems} />
                <MyHeroSection />
                <Grid />
                <MyApproach />
                <RecentProjects />
                <MyResume />
                <Clients />
                <Experience />
                <Approach />
                <Footer />
            </div>
        </main>
    );
}
