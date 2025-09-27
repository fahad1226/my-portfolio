import Footer from "@/components/Footer";
import MagicButton from "@/components/MagicButton";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLocationArrow } from "react-icons/fa6";

// Import the ArticleTypes interface
export interface ArticleTypes {
    id: string;
    metaTitle: string;
    metaDescription: string;
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
        title: article.metaTitle,
        description: article.metaDescription,
        alternates: {
            canonical: `https://fahadbinmunir.com/blog/${article.slug}`,
            languages: {
                "en-US": `https://fahadbinmunir.com/blog/${article.slug}`,
            },
        },
        openGraph: {
            title: article.metaTitle,
            description: article.metaDescription,
            url: `https://fahadbinmunir.com/blog/${article.slug}`,
            countryName: "Bangladesh",
            emails: ["fahadbinmnr@gmail.com"],
            gender: "male",
            images: [
                {
                    url: article.coverImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            images: [
                {
                    url: article.coverImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
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
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  relative z-20">
                                    {relatedBlogs.map((blog) => (
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className="block"
                                            key={blog.id}
                                        >
                                            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20">
                                                {/* Background Image Container */}
                                                <div className="relative h-64 w-full overflow-hidden">
                                                    <Image
                                                        src={
                                                            blog.coverImage ||
                                                            "/images/default-blog-image.avif"
                                                        }
                                                        alt={`${blog.title} - Blog post cover image`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        priority={false}
                                                    />

                                                    {/* Overlay with better gradient */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                                    {/* Category/Tag Badge */}
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30 capitalize backdrop-blur-sm">
                                                            {blog.blogCategory ||
                                                                "Blog Post"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-6 space-y-4">
                                                    {/* Title */}
                                                    <h3 className="font-bold text-xl text-white leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                                                        {blog.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 opacity-90">
                                                        {blog.shortDescription}
                                                    </p>

                                                    {/* Author and Meta Info */}
                                                    <div className="flex items-center justify-between pt-2">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="relative">
                                                                <Image
                                                                    height="40"
                                                                    width="40"
                                                                    alt="Avatar"
                                                                    src="/images/fahad.jpeg"
                                                                    className="h-10 w-10 rounded-full border-2 border-white/20 object-cover shadow-lg"
                                                                />
                                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <p className="font-semibold text-sm text-white">
                                                                    Fahad Bin
                                                                    Munir
                                                                </p>
                                                                <p className="text-xs text-gray-400">
                                                                    {
                                                                        blog.duration
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Read More Button */}
                                                        <div className="flex items-center space-x-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                                                            <span className="text-sm font-medium">
                                                                Read
                                                            </span>
                                                            <svg
                                                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Hover Effect Border */}
                                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <div className="flex justify-center mt-12 relative z-20">
                                    <MagicButton
                                        title="View All Blogs"
                                        icon={<FaLocationArrow />}
                                        position="right"
                                        actionType="link"
                                        href="/blog"
                                    />
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
