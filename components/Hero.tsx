import Image from "next/image";

export default function MyHeroSection() {
    return (
        <>
            <div className="relative h-screen overflow-hidden">
                {/* Background image */}

                <div className="absolute z-20 h-full w-full">
                    <Image
                        src="/images/fahad_bin_munir_profile.webp"
                        alt="Fahad Bin Munir | Web Performance Specialist | NextJS, ReactJS, TypeScript"
                        className="object-contain h-full w-full"
                        fill
                        quality={90}
                        priority
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b z-20 from-transparent via-transparent to-black-100" />

                {/* Name heading - responsive text sizes */}
                <div className="absolute top-[15%] w-full px-4">
                    <div className="w-full flex justify-center">
                        <h1 className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[140px] font-extrabold uppercase text-center">
                            Fahad{" "}
                            <span
                                style={{
                                    color: "transparent",
                                    WebkitTextStrokeWidth: "1px",
                                    WebkitTextStrokeColor: "#fff",
                                    fontStyle: "normal",
                                    fontWeight: "900",
                                    textTransform: "uppercase",
                                }}
                            >
                                Bin Munir
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Bottom text section */}
                <div className="absolute bottom-[10%] z-30 w-full px-4 sm:px-6 md:px-8">
                    <p className="text-white animate-bounce text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide font-extrabold text-center uppercase leading-tight mx-auto max-w-3xl">
                        Web performance Specialist ⚡
                    </p>
                    <p className="text-white text-xs sm:text-sm tracking-wider font-semibold text-center leading-relaxed mt-2">
                        A Computer Science Graduate | NextJS, ReactJS,
                        TypeScript
                    </p>
                </div>
            </div>
        </>
    );
}
