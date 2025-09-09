import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Import the ArticleTypes interface
export interface ArticleTypes {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    blogCategory: string;
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
        title: `${article.title} | Fahad Bin Munir - Software Developer`,
        description: article.shortDescription,
        metadataBase: new URL("https://fahadbinmunir.com"),
        keywords: [
            "Fahad Bin Munir",
            "Software Developer",
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
            <div className="w-full pt-16 md:pt-0">
                {/* Hero Section with Cover Image Background */}
                <div className="relative h-[70vh] w-full overflow-hidden">
                    {/* Background Cover Image */}
                    {article.coverImage && (
                        <div className="absolute inset-0 opacity-70">
                            <Image
                                src={
                                    article.coverImage ||
                                    "/images/default-blog-image.avif"
                                }
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority={true}
                            />
                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                        </div>
                    )}

                    {/* Fallback background if no cover image */}
                    {!article.coverImage && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90" />
                    )}

                    {/* Hero Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                            {/* Category Badge */}
                            <h3 className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 capitalize backdrop-blur-sm mb-6">
                                {article.blogCategory || "Blog Post"}
                            </h3>

                            {/* Title */}
                            <h1 className="text-pretty text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl leading-tight">
                                {article.title}
                            </h1>

                            {/* Description */}
                            <p className="mt-6 mx-auto max-w-3xl text-lg sm:text-xl text-gray-200 leading-relaxed">
                                {article.shortDescription}
                            </p>

                            {/* Author and Meta Info */}
                            <div className="mt-4 sm:mt-8 flex items-center justify-center space-x-6">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <div className="size-10 sm:size-12 rounded-full overflow-hidden ring-2 ring-white/20">
                                            <Image
                                                src="/images/fahad.jpeg"
                                                alt="Fahad Bin Munir"
                                                width={48}
                                                height={48}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="ml-4 text-left">
                                        <p className="text-base font-semibold text-white">
                                            Fahad Bin Munir
                                        </p>
                                        <p className="sm:text-sm text-xs text-gray-300">
                                            Published on {publishedDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-px h-12 bg-white/20"></div>

                                <div className="text-center">
                                    <p className="sm:text-sm text-xs text-gray-300">
                                        Reading time
                                    </p>
                                    <p className="sm:text-lg text-base font-semibold text-white">
                                        {article.duration}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-0 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-sm text-white/60">
                                Scroll to read
                            </span>
                            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
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
                        </div>

                        {/* Related Articles Section */}
                        {relatedBlogs.length > 0 && (
                            <div className="py-24 mx-auto max-w-6xl">
                                <h2 className="text-3xl font-bold mb-12 text-white text-center">
                                    Related Articles
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedBlogs.slice(0, 3).map((blog) => (
                                        <Link
                                            key={blog.id}
                                            href={`/blog/${blog.slug}`}
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
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto w-full px-4 sm:px-6 mt-16">
                <div className="relative">
                    <Footer />
                </div>
            </div>
        </>
    );
}
