import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blog | Fahad Bin Munir",
    description:
        "Fahad Bin Munir is a seasoned software engineer with expertise in TypeScript, NextJS, and React. He specializes in enhancing web user experience and performance.",
    metadataBase: new URL("https://fahadbinmunir.com"),
    keywords: [
        "Fahad Bin Munir",
        "Software Engineer",
        "Web Developer",
        "TypeScript Expert",
        "NextJS Expert",
        "React Developer",
        "Web UX & Performance Specialist",
        "Frontend Development",
        "Web Technologies",
        "Software Development",
        "Web Design",
    ],
    alternates: {
        canonical: "https://fahadbinmunir.com/blog",
        languages: {
            "en-US": "https://fahadbinmunir.com/blog",
        },
    },
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com",
    },
};

export default function SingleBlogPage() {
    return (
        <>
            <div className="relative w-full">
                {/* Hero Section with Cover Image */}
                <div className="relative h-[60vh] w-full">
                    <Image
                        src="/images/blog-cover.jpg" // Replace with your actual image path
                        alt="JavaScript for beginners"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="container mx-auto px-4 sm:px-6 text-center">
                            <p className="text-base font-semibold text-indigo-400">
                                Introducing
                            </p>
                            <h1 className="mt-2 text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                JavaScript for beginners
                            </h1>
                            <p className="mt-6 mx-auto max-w-2xl text-xl text-gray-300">
                                Aliquet nec orci mattis amet quisque ullamcorper
                                neque, nibh sem. At arcu, sit dui mi, nibh dui,
                                diam eget aliquam.
                            </p>
                            <div className="mt-8 flex items-center justify-center space-x-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full overflow-hidden">
                                        <Image
                                            src="/images/avatar.jpg" // Replace with author avatar
                                            alt="Fahad Bin Munir"
                                            width={40}
                                            height={40}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 text-left">
                                        <p className="text-sm font-medium text-white">
                                            Fahad Bin Munir
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Published on May 15, 2023
                                        </p>
                                    </div>
                                </div>
                                <span className="text-gray-500">•</span>
                                <p className="text-sm text-gray-400">
                                    5 min read
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto w-full px-4 sm:px-6">
                    <FloatingNav navItems={navItems} />

                    <div className="py-16 lg:px-8">
                        <div className="mx-auto max-w-3xl text-base/7 text-white">
                            <div className="mt-10 max-w-2xl">
                                <p>
                                    Faucibus commodo massa rhoncus, volutpat.
                                    Dignissim sed eget risus enim. Mattis mauris
                                    semper sed amet vitae sed turpis id. Id
                                    dolor praesent donec est. Odio penatibus
                                    risus viverra tellus varius sit neque erat
                                    velit. Faucibus commodo massa rhoncus,
                                    volutpat. Dignissim sed eget risus enim.
                                    Mattis mauris semper sed amet vitae sed
                                    turpis id.
                                </p>
                                <ul
                                    role="list"
                                    className="mt-8 max-w-xl space-y-8"
                                >
                                    <li className="flex gap-x-3">
                                        <span>
                                            <strong className="font-semibold">
                                                Data types.
                                            </strong>{" "}
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit.
                                            Maiores impedit perferendis suscipit
                                            eaque, iste dolor cupiditate
                                            blanditiis ratione.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <span>
                                            <strong className="font-semibold">
                                                Loops.
                                            </strong>{" "}
                                            Anim aute id magna aliqua ad ad non
                                            deserunt sunt. Qui irure qui lorem
                                            cupidatat commodo.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <span>
                                            <strong className="font-semibold">
                                                Events.
                                            </strong>{" "}
                                            Ac tincidunt sapien vehicula erat
                                            auctor pellentesque rhoncus. Et
                                            magna sit morbi lobortis.
                                        </span>
                                    </li>
                                </ul>
                                <p className="mt-8">
                                    Et vitae blandit facilisi magna lacus
                                    commodo. Vitae sapien duis odio id et. Id
                                    blandit molestie auctor fermentum dignissim.
                                    Lacus diam tincidunt ac cursus in vel.
                                    Mauris varius vulputate et ultrices hac
                                    adipiscing egestas. Iaculis convallis ac
                                    tempor et ut. Ac lorem vel integer orci.
                                </p>
                                <h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight">
                                    From beginner to expert in 3 hours
                                </h2>
                                <p className="mt-6">
                                    Id orci tellus laoreet id ac. Dolor, aenean
                                    leo, ac etiam consequat in. Convallis arcu
                                    ipsum urna nibh. Pharetra, euismod vitae
                                    interdum mauris enim, consequat vulputate
                                    nibh. Maecenas pellentesque id sed tellus
                                    mauris, ultrices mauris. Tincidunt enim
                                    cursus ridiculus mi. Pellentesque nam sed
                                    nullam sed diam turpis ipsum eu a sed
                                    convallis diam.
                                </p>
                                <figure className="mt-10 border-l border-indigo-600 pl-9">
                                    <blockquote className="font-semibold">
                                        <p>
                                            "Vel ultricies morbi odio facilisi
                                            ultrices accumsan donec lacus purus.
                                            Lectus nibh ullamcorper ac dictum
                                            justo in euismod. Risus aenean ut
                                            elit massa. In amet aliquet eget
                                            cras. Sem volutpat enim tristique."
                                        </p>
                                    </blockquote>
                                </figure>
                                <p className="mt-10">
                                    Faucibus commodo massa rhoncus, volutpat.
                                    Dignissim sed eget risus enim. Mattis mauris
                                    semper sed amet vitae sed turpis id. Id
                                    dolor praesent donec est. Odio penatibus
                                    risus viverra tellus varius sit neque erat
                                    velit.
                                </p>
                            </div>
                            <figure className="mt-16">
                                <div className="relative aspect-video overflow-hidden rounded-xl">
                                    <Image
                                        src="/images/code-example.jpg" // Replace with relevant image
                                        alt="JavaScript code example"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-400">
                                    Faucibus commodo massa rhoncus, volutpat.
                                </figcaption>
                            </figure>
                            <div className="mt-16 max-w-2xl">
                                <h2 className="text-pretty text-3xl font-semibold tracking-tight">
                                    Everything you need to get up and running
                                </h2>
                                <p className="mt-6">
                                    Purus morbi dignissim senectus mattis
                                    adipiscing. Amet, massa quam varius orci
                                    dapibus volutpat cras. In amet eu ridiculus
                                    leo sodales cursus tristique. Tincidunt sed
                                    tempus ut viverra ridiculus non molestie.
                                    Gravida quis fringilla amet eget dui tempor
                                    dignissim. Facilisis auctor venenatis varius
                                    nunc, congue erat ac. Cras fermentum
                                    convallis quam.
                                </p>
                                <p className="mt-8">
                                    Faucibus commodo massa rhoncus, volutpat.
                                    Dignissim sed eget risus enim. Mattis mauris
                                    semper sed amet vitae sed turpis id. Id
                                    dolor praesent donec est. Odio penatibus
                                    risus viverra tellus varius sit neque erat
                                    velit.
                                </p>
                            </div>
                        </div>

                        {/* Related Articles Section */}
                        <div className="mt-24 mx-auto max-w-5xl">
                            <h2 className="text-2xl font-semibold mb-8 text-white">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800/80 transition"
                                    >
                                        <div className="relative h-48">
                                            <Image
                                                src={`/images/related-${item}.jpg`} // Replace with actual images
                                                alt={`Related article ${item}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-medium text-lg text-white mb-2">
                                                Another JavaScript Article
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </p>
                                            <p className="mt-4 text-indigo-400 text-sm font-medium">
                                                Read more →
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
