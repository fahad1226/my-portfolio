"use client";

import Script from "next/script";
import { WithContext, WebSite, BreadcrumbList } from "schema-dts";

const WebsiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://fahadbinmunir.com",
    image: "/images/fahad-bin-munir-profile.png",
    funder: [
        {
            "@type": "Person",
            name: "Fahad Bin Munir",
        },
    ],
    copyrightHolder: "Fahad Bin Munir",
};

const BreadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            item: {
                "@id": "https://fahadbinmunir.com/",
                name: "Home",
            },
        },
    ],
};

export default function JsonLd() {
    return (
        <>
            <Script
                id="website-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(WebsiteJsonLd),
                }}
            />
            <Script
                id="breadcrumb-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(BreadcrumbJsonLd),
                }}
            />
        </>
    );
}
