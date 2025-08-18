"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth"; // Assuming Firebase auth
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// If using a different auth provider, import appropriate libraries

export default function ConsolePage() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setAuthenticated(true);
            } else {
                // User is not signed in, redirect to login
                router.push("/console/login");
            }
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="console-container">
            <h1>Admin Console</h1>
            <div className="console-content">
                {/* Your console content here */}
                <p>Welcome to the protected console page!</p>

                {/* Blog management section */}
                <div className="blog-management">
                    <h2>Blog Management</h2>
                    <button>Create New Post</button>
                    <div className="posts-list">
                        {/* List of blog posts would go here */}
                        <p>Your blog posts will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
