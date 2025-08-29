"use client";

import {
    IconChartBar,
    IconHome,
    IconLogout,
    IconMenu,
    IconSettings,
    IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";

const navItems = [
    { name: "Dashboard", href: "/console", icon: IconHome },
    { name: "Analytics", href: "/console/analytics", icon: IconChartBar },
    { name: "Settings", href: "/console/settings", icon: IconSettings },
];

function ConsoleNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await signOut(auth);
            // Redirect to login page after successful logout
            router.push("/console/login");
        } catch (error) {
            console.error("Error logging out:", error);
            // You might want to show a toast notification here
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Don't render navigation if still loading
    if (loading) {
        return null;
    }

    return (
        <nav className="bg-gray-800 text-white">
            {/* Desktop Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold">Console</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/console" &&
                                            pathname.startsWith(item.href));
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                                                isActive
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                            }`}
                                        >
                                            <item.icon
                                                className="h-5 w-5 mr-2"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                {/* Logout Button - Only show when user is logged in */}
                                {user && (
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <IconLogout
                                            className={`h-5 w-5 mr-2 ${
                                                isLoggingOut
                                                    ? "animate-spin"
                                                    : ""
                                            }`}
                                            aria-hidden="true"
                                        />
                                        {isLoggingOut
                                            ? "Logging out..."
                                            : "Logout"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <IconX
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            ) : (
                                <IconMenu
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div
                className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/console" &&
                                pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 rounded-md text-base font-medium flex items-center ${
                                    isActive
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <item.icon
                                    className="h-5 w-5 mr-2"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Mobile Logout Button - Only show when user is logged in */}
                    {user && (
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full px-3 py-2 rounded-md text-base font-medium flex items-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <IconLogout
                                className={`h-5 w-5 mr-2 ${
                                    isLoggingOut ? "animate-spin" : ""
                                }`}
                                aria-hidden="true"
                            />
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default ConsoleNavigation;
