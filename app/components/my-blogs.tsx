import { cn, show_data } from "@/lib/utils";
import Image from "next/image";
import { ArticleTypes } from "../page";
import Link from "next/link";

export function MyBlogList({
    articles,
    showTitle = true,
}: {
    articles: ArticleTypes[];
    showTitle?: boolean;
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map((item) => (
                            <CardDemo key={item.id} article={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export function CardDemo({ article }: { article: ArticleTypes }) {
    return (
        <div className="max-w-full w-full group/card relative">
            <div
                className={cn(
                    "cursor-pointer overflow-hidden relative card h-96 rounded-xl shadow-2xl flex flex-col justify-between p-6",
                    "bg-[url(/images/default-blog-image.avif)] bg-cover bg-center transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-3xl"
                )}
            >
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                {/* Author section */}
                <div className="flex flex-row items-center space-x-4 relative z-20">
                    <Image
                        height="100"
                        width="100"
                        alt="Avatar"
                        src="/images/fahad.jpeg"
                        className="h-12 w-12 rounded-full border-2 border-white/20 object-cover shadow-lg"
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-base text-white">
                            Fahad Bin Munir
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                            {article.duration} minutes read
                        </p>
                    </div>
                </div>

                {/* Content section */}
                <Link
                    href={`/blog/${article.slug}`}
                    className="relative z-20 space-y-4 block"
                >
                    <h3 className="font-bold text-xl md:text-2xl text-white leading-tight line-clamp-1">
                        {article.title}
                    </h3>
                    <p className="font-normal text-sm text-gray-200 leading-relaxed line-clamp-2">
                        {article.shortDescription}
                    </p>

                    <div className="flex items-center space-x-2 pt-2">
                        <span className="brand-color font-medium text-sm">
                            Read more
                        </span>
                        <svg
                            className="w-4 h-4 brand-color transition-transform group-hover/card:translate-x-1"
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
                </Link>
            </div>
        </div>
    );
}
