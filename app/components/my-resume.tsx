"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";

function MyResume() {
    return (
        <div id="resume">
            <BackgroundLines className="flex items-center pointer-events-none justify-center w-full flex-col px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 capitalize dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    Take a look at my{" "}
                    <span className="brand-color">resume</span>
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                    Explore my professional journey, skills, and accomplishments
                    in detail through my resume
                </p>

                <div className="w-full max-w-4xl mt-12 relative overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        src="/images/Fahad_Bin_Munir_Software_Engineer_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        width="100%"
                        height="600px"
                        className="pointer-events-auto border-0"
                        style={{
                            overflow: "hidden",
                        }}
                        title="Fahad Bin Munir's Resume"
                    />
                </div>

                <div className="cursor-pointer pointer-events-auto mt-6">
                    <Link
                        className="relative inline-flex h-14 w-full md:w-60 md:mt-10 overflow-hidden common-border-radius p-[1px] focus:outline-none"
                        href="/images/Fahad_Bin_Munir_Software_Engineer_Resume.pdf"
                        target="_blank"
                    >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center common-border-radius bg-slate-950 px-8 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                            Click To View Resume
                        </span>
                    </Link>
                </div>
            </BackgroundLines>
        </div>
    );
}

export default MyResume;
