"use client";

import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CreateBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        content: "",
        coverImage: "",
        duration: "",
        published_at: new Date().toISOString().split("T")[0],
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add handler for Quill content changes
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
        setLoading(true);

        try {
            // Store access the firebase storage we need to purchase their pro plan
            const docRef = await addDoc(collection(db, "articles"), {
                title: formData.title,
                slug: formData.slug,
                shortDescription: formData.shortDescription,
                content: formData.content,
                coverImage: formData.coverImage,
                duration: formData.duration,
                published_at: formData.published_at,
                createdAt: new Date(),
            });
            console.log("Document written with ID: ", docRef.id);

            // After successful submission
            alert("Blog post created successfully!");
            router.push("/console/blog");
        } catch (error) {
            console.error("Error creating blog post:", error);
            alert(
                `Failed to create blog post: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            setLoading(false);
        }
    };

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
                            Create New Blog Post
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Share your thoughts and insights with the world
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
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white max-w-xs text-black"
                                />
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
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-black"
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
                                        style={{ height: "400px" }} 
                                        placeholder="Start writing your amazing blog content here..."
                                        className="min-h-[400px] text-gray-800"
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
                                disabled={loading}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating...
                                    </div>
                                ) : (
                                    "Create Blog Post"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog;
