import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogList, { BlogDataType } from "../components/BlogList";
import ConsoleNavigation from "../components/ConsoleNavigation";

async function getBlogs() {
    const blogs = await getDocs(collection(db, "articles"));
    return blogs.docs.map((doc) => doc.data() as BlogDataType);
}

async function BlogListPage() {
    const blogs = await getBlogs();

    return (
        <>
            <ConsoleNavigation />
            <BlogList blogs={blogs} />
        </>
    );
}

export default BlogListPage;
