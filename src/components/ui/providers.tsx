"use client";

import "@/i18n"; // bootstrap i18next before any component reads it
import { ThemeProvider } from "@/components/ui/theme-provider";
import NavbarWrapper from "@/components/ui/NavbarWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            <NavbarWrapper />
            {children}
        </ThemeProvider>
    );
}
