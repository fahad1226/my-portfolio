import { cn, show_data } from "@/lib/utils";
import Image from "next/image";
import { Article } from "../page";

export function MyBlogList({
    articles,
    showTitle = true,
}: {
    articles: Article[];
    showTitle?: boolean;
}) {
    return (
        <>
            <div className="py-24">
                {showTitle && (
                    <h2 className="page-sub-heading">
                        Explore My{" "}
                        <span className="brand-color">Written Works</span>
                    </h2>
                )}

                <pre className="text-white-100 text-3xl">{show_data(articles)}</pre>

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

export function CardDemo({ article }: { article: Article }) {
    return (
        <div className="max-w-full w-full group/card z-40">
            <div
                className={cn(
                    "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl backgroundImage flex flex-col justify-between p-4",
                    "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
                )}
            >
                <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
                <div className="flex flex-row items-center space-x-4 z-10">
                    <Image
                        height="100"
                        width="100"
                        alt="Avatar"
                        src="/images/fahad.jpeg"
                        className="h-10 w-10 rounded-full border-2 object-cover"
                    />
                    <div className="flex flex-col">
                        <p className="font-normal text-base text-gray-50 relative z-10">
                            Fahad Bin Munir
                        </p>
                        <p className="text-sm text-gray-400">
                            {article.duration} minutes read
                        </p>
                    </div>
                </div>
                <div className="text content">
                    <h3 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                        {article.title}
                    </h3>
                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                        {article.shortDescription}
                    </p>
                </div>
            </div>
        </div>
    );
}
