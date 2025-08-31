import { Metadata } from "next";
import ConsoleDashboard from "../components/ConsoleDashboard";

export const metadata: Metadata = {
    title: "Console Dashboard | Fahad Bin Munir",
    description: "Console Dashboard | Fahad Bin Munir",
    alternates: {
        canonical: "https://fahadbinmunir.com/console",
        languages: {
            "en-US": "https://fahadbinmunir.com/console",
        },
    },
    publisher: "Fahad Bin Munir",
    authors: {
        name: "Fahad Bin Munir",
        url: "https://fahadbinmunir.com/console",
    },
};

export default function ConsolePage() {
    return (
        <>
            <ConsoleDashboard />
        </>
    );
}
