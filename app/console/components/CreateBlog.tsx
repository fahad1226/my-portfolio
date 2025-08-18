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
        <div className="container mx-auto">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg w-full">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b pb-4">
                    Create New Blog Post
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="col-span-2">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                placeholder="Enter blog title"
                            />
                        </div>

                        {/* Slug */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="slug"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Slug
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                    placeholder="blog-post-url"
                                />
                                <button
                                    type="button"
                                    onClick={generateSlug}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="duration"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Duration (minutes)
                            </label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                placeholder="5 min read"
                            />
                        </div>

                        {/* Published Date */}
                        <div className="col-span-2">
                            <label
                                htmlFor="published_at"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Cover Image */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Cover Image
                            </label>
                            <div>
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Option 1: Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="coverImage"
                                        name="coverImage"
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                        placeholder="https://example.com/image.jpg"
                                        disabled={!!imageFile}
                                    />
                                </div>
                                {/* <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Option 2: Upload Image
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                        >
                                            Choose File
                                        </button>
                                        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                                            {imageFile
                                                ? imageFile.name
                                                : "No file chosen"}
                                        </span>
                                    </div>
                                </div> */}
                            </div>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Preview:
                                    </p>
                                    <div className="relative h-48 w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                                        <Image
                                            src={imagePreview}
                                            alt="Cover image preview"
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setImageFile(null);
                                            if (fileInputRef.current)
                                                fileInputRef.current.value = "";
                                        }}
                                        className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Remove image
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Short Description */}
                        <div className="col-span-2">
                            <label
                                htmlFor="shortDescription"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Short Description
                            </label>
                            <textarea
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                placeholder="Brief summary of the blog post"
                            />
                        </div>

                        {/* Content */}
                        <div className="col-span-2">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Content
                            </label>
                            <div className="border text-white border-gray-300 dark:border-gray-600 rounded-md overflow-hidden w-full">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    placeholder="Write your blog content here..."
                                    className="h-[30rem] w-full bg-gray-700 text-white placeholder:text-gray-200"
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
                                            [{ color: [] }, { background: [] }],
                                            ["link", "image"],
                                            ["clean"],
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Creating..." : "Create Blog Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;
