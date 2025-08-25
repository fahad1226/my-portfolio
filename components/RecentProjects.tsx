"use client";

import { projects } from "@/data";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";
import Link from "next/link";

const RecentProjects = () => {
    return (
        <div className="sm:py-20 py-6">
            <h2 className="page-sub-heading">
                A small selection of{" "}
                <span className="text-purple">recent projects</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center p-4 gap-4 lg:gap-16 mt-10">
                {projects.map((item) => (
                    <div
                        className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
                        key={item.id}
                    >
                        <PinContainer
                            title="Fahad Bin Munir Completed Projects"
                            href="https://github.com/fahad1226"
                        >
                            <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                                <div
                                    className="relative w-full h-full overflow-hidden lg:common-border-radius"
                                    style={{ backgroundColor: "#13162D" }}
                                >
                                    <Image
                                        src="/bg.png"
                                        alt="bgimg"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                                <Image
                                    src={item.img}
                                    alt="cover"
                                    width={1000}
                                    height={1000}
                                    className="z-10 absolute bottom-0 rotate-6"
                                />
                            </div>

                            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                                {item.title}
                            </h1>

                            <p
                                title={item.des}
                                className="font-light text-sm line-clamp-3"
                                style={{
                                    color: "#BEC1DD",
                                    margin: "1vh 0",
                                }}
                            >
                                {item.des}
                            </p>

                            <div className="flex items-center justify-between mt-7 mb-3">
                                <div className="flex items-center">
                                    {item.iconLists.map((icon, index) => (
                                        <div
                                            key={index}
                                            className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                                            style={{
                                                transform: `translateX(-${
                                                    5 * index + 2
                                                }px)`,
                                            }}
                                        >
                                            <Image
                                                src={icon}
                                                alt="icon5"
                                                width={1000}
                                                height={1000}
                                                className="p-2"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className="flex justify-center items-center cursor-pointer"
                                >
                                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                                        Check Live Site
                                    </p>
                                    <FaLocationArrow
                                        className="ms-3"
                                        color="#CBACF9"
                                    />
                                </Link>
                            </div>
                        </PinContainer>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentProjects;
