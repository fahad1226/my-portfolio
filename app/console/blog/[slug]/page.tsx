import { Metadata } from "next";
import EditBlog from "../../components/EditBlog";
import ConsoleNavigation from "../../components/ConsoleNavigation";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Console Blog Edit | Fahad Bin Munir",
    description: "Console Blog Edit | Fahad Bin Munir",
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com/console",
    },
    robots: {
        index: false,
        follow: false,
    },
};

async function BlogListPage({ params }: { params: { slug: string } }) {
    return (
        <>
            <ConsoleNavigation />
            <EditBlog params={params} />
        </>
    );
}

export default BlogListPage;
