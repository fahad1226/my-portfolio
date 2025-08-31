import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogList, { BlogDataType } from "../components/BlogList";
import ConsoleNavigation from "../components/ConsoleNavigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Console Blog List | Fahad Bin Munir",
    description: "Console Blog List | Fahad Bin Munir",
    alternates: {
        canonical: "https://fahadbinmunir.com/console/blog",
        languages: {
            "en-US": "https://fahadbinmunir.com/console/blog",
        },
    },
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com/console",
    },
};

async function getBlogs() {
    const blogs = await getDocs(collection(db, "articles"));
    return blogs.docs.map(
        (doc) =>
            ({
                ...doc.data(),
                id: doc.id,
            } as BlogDataType)
    );
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
