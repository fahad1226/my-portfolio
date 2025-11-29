"use client";

import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

export default function Grid() {
    return (
        <>
            <div>
                <BentoGrid className="w-full py-20">
                    {gridItems.map((item, i) => (
                        <BentoGridItem
                            id={item.id}
                            key={i}
                            title={item.title}
                            description={item.description}
                            className={item.className}
                            img={item.img}
                            imgClassName={item.imgClassName}
                            titleClassName={item.titleClassName}
                            spareImg={item.spareImg}
                        />
                    ))}
                </BentoGrid>
            </div>
        </>
    );
}
