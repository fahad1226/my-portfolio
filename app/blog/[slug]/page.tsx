import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// Import the ArticleTypes interface
export interface ArticleTypes {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    author: string;
    duration: string;
    published_at: string;
    coverImage: string;
}

// Generate metadata dynamically based on the article
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const article = await getSingleArticle(params.slug);

    if (!article) {
        return {
            title: "Article Not Found | Fahad Bin Munir",
            description: "The requested article could not be found.",
        };
    }

    return {
        title: `${article.title} | Fahad Bin Munir - Software Engineer`,
        description: article.shortDescription,
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
            canonical: `https://fahadbinmunir.com/blog/${article.slug}`,
            languages: {
                "en-US": `https://fahadbinmunir.com/blog/${article.slug}`,
            },
        },
        publisher: "Fahad Bin Munir",
        authors: {
            name: "Fahad Bin Munir",
            url: "https://fahadbinmunir.com",
        },
    };
}

// Function to get a single article by slug
async function getSingleArticle(slug: string): Promise<ArticleTypes | null> {
    try {
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const doc = querySnapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
        } as ArticleTypes;
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
}

export default async function SingleBlogPage({
    params,
}: {
    params: { slug: string };
}) {
    const blogs = await getDocs(collection(db, "articles"));
    const allBlogs = blogs.docs.map(
        (doc) =>
            ({
                id: doc.id,
                ...doc.data(),
            } as ArticleTypes)
    );

    const article = await getSingleArticle(params.slug);

    // If article not found, show 404
    if (!article) {
        notFound();
    }

    // Filter out the current article to get related blogs
    const relatedBlogs = allBlogs.filter((blog) => blog.slug !== params.slug);

    // Format the published date
    const publishedDate = new Date(article.published_at).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <>
            <div className="relative w-full">
                {/* Hero Section with Cover Image */}
                <div className="relative h-[60vh] w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                            <p className="text-base font-semibold brand-color">
                                Introducing
                            </p>
                            <h1 className="mt-2 text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                {article.title}
                            </h1>
                            <p className="mt-6 mx-auto max-w-2xl text-xl text-gray-300">
                                {article.shortDescription}
                            </p>
                            <div className="mt-8 flex items-center justify-center space-x-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full overflow-hidden">
                                        <Image
                                            src="/images/fahad.jpeg"
                                            alt="Fahad Bin Munir"
                                            width={40}
                                            height={40}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 text-left">
                                        <p className="text-sm font-medium text-white">
                                            Fahad Bin Munir
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Published on {publishedDate}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-gray-500">•</span>
                                <p className="text-sm text-gray-400">
                                    {article.duration}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto w-full px-4 sm:px-6">
                    <FloatingNav navItems={navItems} />

                    <div className="lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <div>
                                {/* Article content */}
                                <div
                                    className="editor"
                                    dangerouslySetInnerHTML={{
                                        __html: article.content,
                                    }}
                                />
                            </div>

                            {/* Cover image if available */}
                            {article.coverImage && (
                                <figure className="mt-16">
                                    <div className="relative aspect-video overflow-hidden rounded-xl">
                                        <Image
                                            src={article.coverImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </figure>
                            )}
                        </div>

                        {/* Related Articles Section */}
                        {relatedBlogs.length > 0 && (
                            <div className="py-24 mx-auto max-w-6xl">
                                <h2 className="text-3xl font-bold mb-12 text-white text-center">
                                    Related Articles
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedBlogs.slice(0, 3).map((blog) => (
                                        <div
                                            key={blog.id}
                                            className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-800/50 hover:border-gray-700/50 hover:shadow-2xl hover:shadow-indigo-500/10"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={
                                                        blog.coverImage ||
                                                        "/images/default-blog-image.avif"
                                                    }
                                                    alt={blog.title}
                                                    width={1000}
                                                    height={1000}
                                                    unoptimized
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-semibold text-xl text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors duration-300">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                                    {blog.shortDescription}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        <span className="text-xs text-gray-500 font-medium">
                                                            {blog.duration}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors duration-300">
                                                        Read more
                                                        <svg
                                                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
