"use client";

import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";

const WebPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://fahadbinmunir.com/#webpage",
    url: "https://fahadbinmunir.com",
    name: "Fahad Bin Munir | Software Engineer | Expert in TypeScript, NextJS, React and Laravel",
    description:
        "Fahad Bin Munir - Software Engineer skilled in TypeScript, Next.js, React & Laravel. Expert in building fast, scalable, user-friendly, high-performance web applications.",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],

    // Main entity - Person information
    mainEntity: {
        "@type": "Person",
        "@id": "https://fahadbinmunir.com/#person",
        name: "Fahad Bin Munir",
        alternateName: ["Fahad Bin Munir", "Fahad"],
        jobTitle: "Software Engineer",
        description:
            "Software Engineer skilled in TypeScript, Next.js, React & Laravel. Expert in building fast, scalable, user-friendly, high-performance web applications.",
        url: "https://fahadbinmunir.com",
        image: {
            "@type": "ImageObject",
            url: "https://fahadbinmunir.com/images/fahad_bin_munir_profile.webp",
            width: "400",
            height: "400",
        },
        sameAs: [
            "https://github.com/fahad1226",
            "https://www.linkedin.com/in/fahad-bin-munir-9a17b2183/",
            "https://x.com/FahadBinMunir2",
        ],
        knowsAbout: [
            "TypeScript",
            "Next.js",
            "React",
            "JavaScript",
            "Web Development",
            "Frontend Development",
            "UI/UX Design",
            "Performance Optimization",
            "Web Technologies",
            "Software Engineering",
            "Laravel Developer",
            "Backend Development",
        ],
        hasOccupation: {
            "@type": "Occupation",
            name: "Software Engineer",
            occupationLocation: {
                "@type": "AdministrativeArea",
                name: "Remote/Worldwide",
            },
        },
        worksFor: {
            "@type": "Organization",
            name: "Remote Work",
        },
        alumniOf: {
            "@type": "Organization",
            name: "Software Engineering Education",
        },
    },

    // Author information
    author: {
        "@type": "Person",
        "@id": "https://fahadbinmunir.com/#person",
        name: "Fahad Bin Munir",
    },

    // Publisher information
    publisher: {
        "@type": "Organization",
        "@id": "https://fahadbinmunir.com/#organization",
        name: "Fahad Bin Munir - Software Engineering Services",
        url: "https://fahadbinmunir.com",
        logo: {
            "@type": "ImageObject",
            url: "https://fahadbinmunir.com/images/fahad_bin_munir_profile.webp",
            width: "400",
            height: "400",
        },
        description:
            "Professional Software Engineering services specializing in TypeScript, Next.js, React & Laravel development. Expert in building high-performance web applications with modern technologies.",
        founder: {
            "@type": "Person",
            name: "Fahad Bin Munir",
        },
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "contact@fahadbinmunir.com",
            availableLanguage: "English",
        },
        sameAs: [
            "https://github.com/fahad1226",
            "https://www.linkedin.com/in/fahad-bin-munir-9a17b2183/",
            "https://x.com/FahadBinMunir2",
        ],
    },

    // About information
    about: {
        "@type": "Person",
        "@id": "https://fahadbinmunir.com/#person",
        name: "Fahad Bin Munir",
    },

    // Breadcrumb navigation
    breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": "https://fahadbinmunir.com/#breadcrumb",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://fahadbinmunir.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://fahadbinmunir.com/blog",
            },
        ],
    },

    // Website information
    isPartOf: {
        "@type": "WebSite",
        "@id": "https://fahadbinmunir.com/#website",
        url: "https://fahadbinmunir.com",
        name: "Fahad Bin Munir - Software Engineering Services",
        description:
            "Professional website of Fahad Bin Munir, a Software Engineer specializing in TypeScript, Next.js, React & Laravel development. Expert in building high-performance web applications with modern technologies.",
        author: {
            "@type": "Person",
            name: "Fahad Bin Munir",
        },
        publisher: {
            "@type": "Person",
            name: "Fahad Bin Munir",
        },
        inLanguage: "en-US",
        copyrightHolder: {
            "@type": "Person",
            name: "Fahad Bin Munir",
        },
        copyrightYear: new Date().getFullYear(),
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate:
                    "https://fahadbinmunir.com/search?q={search_term_string}",
            },
            query: "required name=search_term_string",
        },
    },

    // Creative work information
    mainContentOfPage: {
        "@type": "WebPageElement",
        "@id": "https://fahadbinmunir.com/#creativework",
        name: "Fahad Bin Munir",
        description:
            "A comprehensive website showcasing Software Engineering projects, technical expertise, and professional experience in web development.",
        author: {
            "@type": "Person",
            "@id": "https://fahadbinmunir.com/#person",
        },
        creator: {
            "@type": "Person",
            "@id": "https://fahadbinmunir.com/#person",
        },
        publisher: {
            "@type": "Organization",
            "@id": "https://fahadbinmunir.com/#organization",
        },
        dateCreated: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        inLanguage: "en-US",
        genre: ["Software Engineer", "Software Engineer", "Frontend Expert"],
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
    },

    // Speakable content for voice search
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", "h3", "p"],
    },
};

export default function JsonLd() {
    return (
        <Script
            id="webpage-json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(WebPageJsonLd),
            }}
        />
    );
}
