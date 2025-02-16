import { Cover } from "@/components/ui/cover";
import { cn } from "@/lib/utils";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconDeviceMobile,
    IconEaseInOut,
    IconHeart,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";

const features = [
    {
        title: "Performance-Driven Development",
        description:
            "I specialize in optimizing web applications for speed, ensuring fast load times and smooth interactions.",
        icon: <IconTerminal2 />,
    },
    {
        title: "Effortless and Engaging User Experience",
        description:
            "I craft user-friendly interfaces with precision, ensuring smooth navigation and seamless interactions across all devices.",
        icon: <IconEaseInOut />,
    },
    {
        title: "Responsive Design",
        description:
            "I create seamless, adaptive experiences across all devices, ensuring your web application looks stunning and functions flawlessly on desktops, tablets, and smartphones.",
        icon: <IconDeviceMobile />,
    },
    {
        title: "Reliable & Scalable Infrastructure",
        description:
            "Achieve 99.99% uptime with the latest technology, ensuring your web applications run smoothly and efficiently.",
        icon: <IconCloud />,
    },
    {
        title: "Boost Performance by Up to 80%",
        description:
            "Optimize for speed with advanced frontend techniques, improved Core Web Vitals, and reduced render-blocking resources.",
        icon: <IconRouteAltLeft />,
    },
    {
        title: "Maximize Value, Minimize Cost",
        description:
            "Delivering high-performance, cost-efficient solutions to optimize your web applications without breaking the bank.",
        icon: <IconCurrencyDollar />,
    },
    {
        title: "Optimized for Core Web Vitals",
        description:
            "From First Contentful Paint to Cumulative Layout Shift, I meticulously fine-tune applications for top-tier web vitals and optimal user experiences.",
        icon: <IconAdjustmentsBolt />,
    },
    {
        title: "Continuous Improvement",
        description:
            "Web development is a dynamic and evolving domain. I stay updated with the most recent and effective strategies for creating high-performance applications.",
        icon: <IconHeart />,
    },
];

function MyApproach() {
    return (
        <>
            <div className="py-24">
                <h2 className="text-4xl md:text-4xl lg:text-6xl font-semibold container mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-200 ">
                    Unlock Your Application&apos;s <br /> Full Potential with{" "}
                    <Cover>Lightning Speed</Cover>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <Feature
                            key={feature.title}
                            {...feature}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyApproach;

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) &&
                    "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 tracking-wide transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-neutral-600 tracking-wide dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
