import { show_data } from "@/lib/utils";

export interface BlogDataType {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    coverImage?: string;
    duration: string;
    published_at: string;
}

export default function BlogList({ blogs }: { blogs: BlogDataType[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-full"
                    >
                        {blog.coverImage && (
                            <img
                                src={blog.coverImage}
                                alt={`Cover for ${blog.title}`}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl text-black font-semibold mb-2">
                                {blog.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {blog.shortDescription}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    <span className="mr-3">
                                        {new Date(
                                            blog.published_at
                                        ).toLocaleDateString()}
                                    </span>
                                    <span>{blog.duration}</span>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
