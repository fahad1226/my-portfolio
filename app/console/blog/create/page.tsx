import ConsoleNavigation from "../../components/ConsoleNavigation";
import CreateBlog from "../../components/CreateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Console Create Blog | Fahad Bin Munir",
    description: "Console Create Blog | Fahad Bin Munir",
    alternates: {
        canonical: "https://fahadbinmunir.com/console/blog/create",
        languages: {
            "en-US": "https://fahadbinmunir.com/console/blog/create",
        },
    },
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com/console/blog/create",
    },
};

export default function CreateBlogPage() {
    return (
        <>
            <ConsoleNavigation />
            <CreateBlog />
        </>
    );
}
