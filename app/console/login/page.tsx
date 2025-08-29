"use client";

import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { auth } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConsoleNavigation from "../components/ConsoleNavigation";

function ConsoleLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/console"); // Redirect to dashboard after login
        } catch (err: any) {
            setError(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setResetLoading(true);

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setSuccess("Password reset email sent! Check your inbox.");
            setResetEmail("");
            setTimeout(() => {
                setShowForgotPassword(false);
                setSuccess("");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Failed to send reset email");
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <>
            <ConsoleNavigation />
            <div className="min-h-screen relative flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                <div className="relative z-10 w-full max-w-md mx-auto p-6">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-300 text-sm">
                                Sign in to access your console
                            </p>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-200 rounded-lg text-sm">
                                {success}
                            </div>
                        )}

                        {/* Login Form */}
                        {!showForgotPassword ? (
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowForgotPassword(true)
                                        }
                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Signing in...
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>
                        ) : (
                            /* Forgot Password Form */
                            <form
                                className="space-y-6"
                                onSubmit={handleForgotPassword}
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Reset Password
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        Enter your email address and we&apos;ll
                                        send you a link to reset your password.
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor="reset-email"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="reset-email"
                                        name="reset-email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email"
                                        value={resetEmail}
                                        onChange={(e) =>
                                            setResetEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForgotPassword(false);
                                            setError("");
                                            setSuccess("");
                                        }}
                                        className="flex-1 py-3 px-4 bg-gray-600/50 text-white font-medium rounded-lg hover:bg-gray-600/70 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
                                    >
                                        Back to Login
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={resetLoading}
                                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {resetLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            "Send Reset Link"
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConsoleLogin;
