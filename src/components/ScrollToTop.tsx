"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Scroll to top when pathname changes
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // Use instant to avoid smooth scroll animation during transition
        });
    }, [pathname, searchParams]);

    return null;
}
