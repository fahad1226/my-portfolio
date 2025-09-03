import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Metadata } from "next";
import BlogList, { BlogDataType } from "../components/BlogList";
import ConsoleNavigation from "../components/ConsoleNavigation";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    return blogs.docs.map((doc) => {
        const data = doc.data();

        // Convert Firestore Timestamps to plain objects
        const convertedData = { ...data };
        if (data.createdAt) {
            convertedData.createdAt = {
                seconds: data.createdAt.seconds,
                nanoseconds: data.createdAt.nanoseconds,
            };
        }
        if (data.published_at) {
            convertedData.published_at = {
                seconds: data.published_at.seconds,
                nanoseconds: data.published_at.nanoseconds,
            };
        }

        return {
            ...convertedData,
            id: doc.id,
        } as BlogDataType;
    });
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
