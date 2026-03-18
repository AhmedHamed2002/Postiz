"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/navbar";

export default function NavbarWrapper() {
    const pathname = usePathname();
    const hiddenRoutes = [
        "/not-found",
    ];

    const showNavbar = !hiddenRoutes.includes(pathname);

    return showNavbar ? <Navbar/> : null;
}
