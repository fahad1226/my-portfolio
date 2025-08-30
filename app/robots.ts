import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/console/", // Disallow admin console
        },
        sitemap: "https://fahadbinmunir.com/sitemap.xml",
    };
}
