import MagicButton from "@/components/MagicButton";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import { ArticleTypes } from "../page";

export function MyBlogList({
    articles,
    showTitle = true,
    showMoreButton = true,
}: {
    articles: ArticleTypes[];
    showTitle?: boolean;
    showMoreButton?: boolean;
}) {
    return (
        <>
            <div className="py-16">
                {showTitle && (
                    <h2 className="page-sub-heading">
                        Explore My{" "}
                        <span className="brand-color">Written Works</span>
                    </h2>
                )}

                <div className="max-w-7xl mx-auto mt-12">
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        role="list"
                        aria-label="Blog articles"
                    >
                        {articles.map((item) => (
                            <CardDemo key={item.id} article={item} />
                        ))}
                    </div>

                    {showMoreButton && (
                        <div className="flex justify-center mt-12 relative z-20">
                            <MagicButton
                                title="View All Blogs"
                                icon={<FaLocationArrow />}
                                position="right"
                                actionType="link"
                                href="/blog"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export function CardDemo({ article }: { article: ArticleTypes }) {
    return (
        <article className="group relative z-20" role="listitem">
            <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20">
                    {/* Background Image Container */}
                    <div className="relative h-72 w-full overflow-hidden">
                        <Image
                            src={
                                article.coverImage ||
                                "/images/default-blog-image.avif"
                            }
                            alt={`${article.title} - Blog post cover image`}
                            width={500}
                            height={500}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Overlay with better gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        {/* Category/Tag Badge */}
                        <div className="absolute top-4 right-4 z-20">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30 capitalize backdrop-blur-sm">
                                {article.blogCategory || "Blog Post"}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                        {/* Title */}
                        <h3 className="font-bold text-xl text-white leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                            {article.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 opacity-90">
                            {article.shortDescription}
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
                                        Fahad Bin Munir
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {article.duration}
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
                                        strokeWidth={2}
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
        </article>
    );
}
