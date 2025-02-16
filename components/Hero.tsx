"use client";

import Image from "next/image";

export default function MyHeroSection() {
    return (
        <>
            <div className="relative h-screen">
                {/* Background image */}
                <div className="absolute h-full w-full">
                    <Image
                        alt="Cast Hero Background"
                        src="/images/fahad-bin-munir-profile.png"
                        width={2000}
                        className="object-contain h-full w-full opacity-80"
                        height={1500}
                        quality={90}
                        priority
                    />
                </div>

                <div className="absolute z-20 h-full w-full">
                    <Image
                        alt="Cast Hero Background"
                        src="/images/fahad-bin-munir-profile.png"
                        width={2000}
                        className="object-contain h-full w-full"
                        height={1500}
                        quality={90}
                        priority
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b z-20 from-transparent via-transparent to-black-100" />

                <div className="mx-auto container absolute top-[15%] left-1/2 transform -translate-x-1/2">
                    <div className="w-full flex justify-center">
                        <h3 className="text-white text-[160px] pointer-events-auto font-extrabold text-nowrap uppercase">
                            Fahad{" "}
                            <span
                                style={{
                                    color: "transparent",
                                    WebkitTextStrokeWidth: "3px",
                                    WebkitTextStrokeColor: "#fff",
                                    fontStyle: "normal",
                                    fontWeight: "900",
                                    textTransform: "uppercase",
                                }}
                            >
                                Bin Munir
                            </span>
                        </h3>
                    </div>
                </div>

                <div className="absolute container mx-auto bottom-[10%] z-30 left-1/2 transform -translate-x-1/2">
                    <p className="text-white animate-bounce text-4xl tracking-wide font-extrabold text-center uppercase leading-10 mx-auto max-w-3xl">
                        Web performance Specialist ⚡
                    </p>
                    <p className="text-white text-xs tracking-wider font-semibold text-center leading-8">
                        A Computer Science Graduate
                    </p>
                </div>
            </div>
        </>
    );
}
