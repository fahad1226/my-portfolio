import { navItems } from "@/data";

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
    </main>
  );
}
