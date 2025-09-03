"use client";

import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogDataType {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    coverImage?: string;
    blogCategory: string;
    duration: string;
    published_at: string | { seconds: number; nanoseconds: number };
    createdAt?: any;
}

function EditBlog({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [blog, setBlog] = useState<BlogDataType | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        content: "",
        coverImage: "",
        duration: "",
        blogCategory: "",
        published_at: "",
    });

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError(null);

                // Query Firestore to find the blog by slug
                const blogsRef = collection(db, "articles");
                const q = query(blogsRef, where("slug", "==", params.slug));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError("Blog post not found");
                    return;
                }

                const blogDoc = querySnapshot.docs[0];
                const blogData = blogDoc.data() as BlogDataType;
                const blogWithId = { ...blogData, id: blogDoc.id };

                setBlog(blogWithId);
                setFormData({
                    title: blogData.title || "",
                    slug: blogData.slug || "",
                    shortDescription: blogData.shortDescription || "",
                    content: blogData.content || "",
                    coverImage: blogData.coverImage || "",
                    duration: blogData.duration || "",
                    blogCategory: blogData.blogCategory || "",
                    published_at: blogData.published_at
                        ? typeof blogData.published_at === "string"
                            ? blogData.published_at
                            : new Date(blogData.published_at.seconds * 1000)
                                  .toISOString()
                                  .split("T")[0]
                        : new Date().toISOString().split("T")[0],
                });

                if (blogData.coverImage) {
                    setImagePreview(blogData.coverImage);
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
                setError("Failed to fetch blog post");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [params.slug]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content: string) => {
        setFormData((prev) => ({ ...prev, content }));
    };

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-");
        setFormData((prev) => ({ ...prev, slug }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Clear the URL input when a file is selected
        setFormData((prev) => ({ ...prev, coverImage: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!blog) return;

        setSaving(true);
        try {
            const blogRef = doc(db, "articles", blog.id);

            const updateData = {
                title: formData.title,
                slug: formData.slug,
                shortDescription: formData.shortDescription,
                content: formData.content,
                coverImage: formData.coverImage,
                duration: formData.duration,
                published_at: formData.published_at,
                blogCategory: formData.blogCategory,
                updatedAt: new Date(),
            };

            await updateDoc(blogRef, updateData);

            alert("Blog post updated successfully!");
            router.push("/console/blog");
        } catch (error) {
            console.error("Error updating blog post:", error);
            alert(
                `Failed to update blog post: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">
                        Loading blog post...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Error
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {error || "Blog post not found"}
                    </p>
                    <button
                        onClick={() => router.push("/console/blog")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    >
                        Back to Blog List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 text-gray-600 hover:text-gray-800"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Blog Post
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Update your blog post content and settings
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-8">
                            {/* Title Section */}
                            <div className="space-y-4">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                >
                                    Blog Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-black"
                                    placeholder="Enter an engaging title for your blog post..."
                                />
                            </div>

                            {/* Slug and Duration Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label
                                        htmlFor="slug"
                                        className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                    >
                                        URL Slug
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="slug"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            required
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-l-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-black"
                                            placeholder="blog-post-url"
                                        />
                                        <button
                                            type="button"
                                            onClick={generateSlug}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-r-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label
                                        htmlFor="duration"
                                        className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                    >
                                        Reading Time
                                    </label>
                                    <input
                                        type="text"
                                        id="duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-black"
                                        placeholder="5 min read"
                                    />
                                </div>
                            </div>

                            {/* Publication Date */}
                            <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label
                                        htmlFor="published_at"
                                        className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                    >
                                        Publication Date
                                    </label>
                                    <input
                                        type="date"
                                        id="published_at"
                                        name="published_at"
                                        value={formData.published_at}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-black [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label
                                        htmlFor="published_at"
                                        className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                    >
                                        Blog Category
                                    </label>

                                    <input
                                        type="text"
                                        id="blogCategory"
                                        name="blogCategory"
                                        value={formData.blogCategory}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-black"
                                    />
                                </div>
                            </div>

                            {/* Cover Image Section */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Cover Image
                                </label>
                                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors duration-200">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                id="coverImage"
                                                name="coverImage"
                                                value={formData.coverImage}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white text-black"
                                                placeholder="https://example.com/image.jpg"
                                                disabled={!!imageFile}
                                            />
                                        </div>
                                    </div>

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="mt-6">
                                            <p className="text-sm font-medium text-gray-700 mb-3">
                                                Preview:
                                            </p>
                                            <div className="relative h-48 w-full max-w-md border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Cover image preview"
                                                    fill
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setImageFile(null);
                                                    if (fileInputRef.current)
                                                        fileInputRef.current.value =
                                                            "";
                                                }}
                                                className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                            >
                                                Remove image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Short Description */}
                            <div className="space-y-4">
                                <label
                                    htmlFor="shortDescription"
                                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                >
                                    Short Description
                                </label>
                                <textarea
                                    id="shortDescription"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-black"
                                    placeholder="Write a compelling summary that will make readers want to read your full post..."
                                />
                            </div>

                            {/* Content Editor */}
                            <div className="space-y-4">
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                >
                                    Blog Content
                                </label>
                                <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={handleContentChange}
                                        style={{ height: "600px" }}
                                        placeholder="Start writing your amazing blog content here..."
                                        className="min-h-[600px] text-gray-800"
                                        modules={{
                                            toolbar: [
                                                [
                                                    {
                                                        header: [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5,
                                                            6,
                                                            false,
                                                        ],
                                                    },
                                                ],
                                                [
                                                    "bold",
                                                    "italic",
                                                    "underline",
                                                    "strike",
                                                ],
                                                [
                                                    { list: "ordered" },
                                                    { list: "bullet" },
                                                ],
                                                ["blockquote", "code-block"],
                                                [
                                                    { color: [] },
                                                    { background: [] },
                                                ],
                                                ["link", "image"],
                                                ["clean"],
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 mt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                            >
                                {saving ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Blog Post"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditBlog;
