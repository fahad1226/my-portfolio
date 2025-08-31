"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    IconArticle,
    IconUsers,
    IconChartBar,
    IconSettings,
    IconPlus,
    IconEye,
    IconEdit,
    IconTrash,
    IconCalendar,
    IconClock,
    IconTrendingUp,
    IconActivity,
} from "@tabler/icons-react";
import Link from "next/link";
import ConsoleNavigation from "../console/components/ConsoleNavigation";

export default function ConsoleDashboard() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                router.push("/console/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    // Mock data for demonstration
    const stats = [
        {
            name: "Total Posts",
            value: "24",
            icon: IconArticle,
            change: "+12%",
            changeType: "positive",
            href: "/console/blog",
        },
        {
            name: "Active Users",
            value: "1,234",
            icon: IconUsers,
            change: "+8%",
            changeType: "positive",
            href: "/console/users",
        },
        {
            name: "Page Views",
            value: "45.2K",
            icon: IconEye,
            change: "+23%",
            changeType: "positive",
            href: "/console/analytics",
        },
        {
            name: "Engagement Rate",
            value: "12.5%",
            icon: IconTrendingUp,
            change: "+5%",
            changeType: "positive",
            href: "/console/settings",
        },
    ];

    const recentPosts = [
        {
            id: 1,
            title: "Getting Started with Next.js 14",
            status: "Published",
            date: "2024-01-15",
            views: 1234,
        },
        {
            id: 2,
            title: "Advanced TypeScript Patterns",
            status: "Draft",
            date: "2024-01-14",
            views: 0,
        },
        {
            id: 3,
            title: "Building Responsive UIs",
            status: "Published",
            date: "2024-01-13",
            views: 856,
        },
        {
            id: 4,
            title: "State Management Best Practices",
            status: "Scheduled",
            date: "2024-01-12",
            views: 0,
        },
    ];

    const quickActions = [
        {
            name: "Create New Post",
            icon: IconPlus,
            href: "/console/blog/create",
            color: "bg-blue-500 hover:bg-blue-600",
        },
        {
            name: "View Analytics",
            icon: IconChartBar,
            href: "/console/analytics",
            color: "bg-green-500 hover:bg-green-600",
        },
        {
            name: "Manage Users",
            icon: IconUsers,
            href: "/console/users",
            color: "bg-purple-500 hover:bg-purple-600",
        },
        {
            name: "Settings",
            icon: IconSettings,
            href: "/console/settings",
            color: "bg-gray-500 hover:bg-gray-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <ConsoleNavigation />

            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Welcome back! Here&apos;s what&apos;s happening with
                        your blog.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.name}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        {stat.name}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <Link
                                    href={stat.href}
                                    className={`p-3 rounded-full block ${
                                        stat.changeType === "positive"
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    <stat.icon
                                        className={`h-6 w-6 ${
                                            stat.changeType === "positive"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    />
                                </Link>
                            </div>
                            <div className="mt-4">
                                <span
                                    className={`text-sm font-medium ${
                                        stat.changeType === "positive"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">
                                    from last month
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Posts */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Recent Posts
                                    </h2>
                                    <button
                                        onClick={() =>
                                            router.push("/console/blog/create")
                                        }
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <IconPlus className="h-4 w-4 mr-1" />
                                        New Post
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                                    <IconCalendar className="h-4 w-4 mr-1" />
                                                    {new Date(
                                                        post.date
                                                    ).toLocaleDateString()}
                                                    <IconEye className="h-4 w-4 ml-3 mr-1" />
                                                    {post.views} views
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        post.status ===
                                                        "Published"
                                                            ? "bg-green-100 text-green-800"
                                                            : post.status ===
                                                              "Draft"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}
                                                >
                                                    {post.status}
                                                </span>
                                                <div className="flex space-x-1">
                                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                                        <IconEye className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                                        <IconEdit className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-1 text-gray-400 hover:text-red-600">
                                                        <IconTrash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & Activity */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Quick Actions
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action.name}
                                            onClick={() =>
                                                router.push(action.href)
                                            }
                                            className={`${action.color} text-white p-4 rounded-lg text-center transition-colors`}
                                        >
                                            <action.icon className="h-6 w-6 mx-auto mb-2" />
                                            <span className="text-sm font-medium">
                                                {action.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Activity
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <IconArticle className="h-4 w-4 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                New post published
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                &quot;Getting Started with
                                                Next.js 14&quot; was published
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <IconUsers className="h-4 w-4 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                New user registered
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                John Doe joined the platform
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                4 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <IconActivity className="h-4 w-4 text-purple-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                High traffic alert
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Your blog received 1,000+ views
                                                today
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                6 hours ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
