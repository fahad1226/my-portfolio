import {
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";

function BlogHeroSection() {
    return (
        <>
            <div className="relative isolate pt-14">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1
                                title="Software Development Blog and Articles"
                                className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl"
                            >
                                Let&apos;s Learn{" "}
                                <span className="brand-color">Together</span>
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                                Discover comprehensive tutorials and in-depth articles about modern web development, 
                                including TypeScript, Next.js, React, Laravel, DSA (Data Structures and Algorithms) and more. Get expert insights, coding best practices, and real-world solutions.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-4">
                                <Link
                                    target="_blank"
                                    href="https://www.linkedin.com/in/fahad-bin-munir-9a17b2183/"
                                >
                                    <IconBrandLinkedin className="text-white size-8" />
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://www.facebook.com/fahad.bin.munir.2024/"
                                >
                                    <IconBrandFacebook className="text-white size-8" />
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://x.com/FahadBinMunir2"
                                >
                                    <IconBrandX className="text-white size-8" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </>
    );
}

export default BlogHeroSection;
