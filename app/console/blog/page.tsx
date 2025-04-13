"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogManagementPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/blog/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    publishedAt: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                // Reset form and show success message
                setTitle("");
                setContent("");
                alert("Post created successfully!");
                router.refresh();
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="blog-management-page">
            <h1>Blog Management</h1>

            <form onSubmit={handleSubmit} className="blog-form">
                <div className="form-group">
                    <label htmlFor="title">Post Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Post Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}
