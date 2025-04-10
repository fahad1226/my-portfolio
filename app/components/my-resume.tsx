"use client";

import MagicButton from "@/components/MagicButton";
import { BackgroundLines } from "@/components/ui/background-lines";
import { IconFileFilled } from "@tabler/icons-react";
import Link from "next/link";

function MyResume() {
    return (
        <>
            <BackgroundLines className="flex items-center pointer-events-none justify-center w-full flex-col px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 capitalize dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    Let&apos;s Look at my{" "}
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

                <Link
                    href="/images/Fahad_Bin_Munir_Software_Engineer_Resume.pdf"
                    target="_blank"
                    className="cursor-pointer pointer-events-auto mt-6"
                >
                    <MagicButton
                        title="Click To View Resume"
                        icon={<IconFileFilled className="size-4" />}
                        position="right"
                    />
                </Link>
            </BackgroundLines>
        </>
    );
}

export default MyResume;
