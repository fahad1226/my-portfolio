import { show_data } from "@/lib/utils";
import Image from "next/image";
import {
    IconEye,
    IconCalendar,
    IconClock,
    IconEdit,
    IconTrash,
    IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Blog Posts
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Manage and view all your published articles
                            </p>
                        </div>
                        <Link
                            href="/console/blog/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <IconPlus className="w-5 h-5" />
                            Create New Post
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Posts
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {blogs.length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <IconEye className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Published
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {blogs.length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <IconCalendar className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Avg. Read Time
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    5 min
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <IconClock className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    This Month
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        blogs.filter((blog) => {
                                            const blogDate = new Date(
                                                blog.published_at
                                            );
                                            const now = new Date();
                                            return (
                                                blogDate.getMonth() ===
                                                    now.getMonth() &&
                                                blogDate.getFullYear() ===
                                                    now.getFullYear()
                                            );
                                        }).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <IconCalendar className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {blogs.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconEye className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No blog posts yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start creating your first blog post to share
                                your thoughts with the world.
                            </p>
                            <Link
                                href="/console/blog/create"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <IconPlus className="w-5 h-5" />
                                Create Your First Post
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={
                                            blog.coverImage ||
                                            "/images/default-blog-image.avif"
                                        }
                                        unoptimized
                                        width={1000}
                                        height={1000}
                                        alt={`Cover for ${blog.title}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                                        {blog.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                        {blog.shortDescription}
                                    </p>

                                    {/* Meta Information */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <IconCalendar className="w-4 h-4" />
                                            <span>
                                                {new Date(
                                                    blog.published_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IconClock className="w-4 h-4" />
                                            <span>{blog.duration}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                        <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                            Read More
                                        </button>
                                        <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                                            <IconEdit className="w-5 h-5" />
                                        </button>
                                        <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                                            <IconTrash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
