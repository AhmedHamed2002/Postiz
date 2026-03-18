"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

import { useTranslation } from "react-i18next";

export default function RouteLoadingIndicator({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isChanging, setIsChanging] = useState(false);
    const [isHydrating, setIsHydrating] = useState(true);

    // Handle initial hydration and i18n init
    useEffect(() => {
        const checkI18n = () => {
            if (i18n.isInitialized) {
                const timer = setTimeout(() => {
                    setIsHydrating(false);
                }, 500);
                return timer;
            }
            return null;
        };

        const timer = checkI18n();
        
        // Safety fallback: Hide loading after 3 seconds anyway
        const safetyTimer = setTimeout(() => {
            setIsHydrating(false);
        }, 500);

        return () => {
            if (timer) clearTimeout(timer);
            clearTimeout(safetyTimer);
        };
    }, [i18n.isInitialized]);

    // Handle route changes
    useEffect(() => {
        if (!isHydrating) {
            setIsChanging(true);
            const timer = setTimeout(() => {
                setIsChanging(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [pathname, searchParams, isHydrating]);

    return (
        <>
            {(isHydrating || isChanging) && <LoadingSpinner />}
            <div className={(isHydrating || isChanging) ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
                {children}
            </div>
        </>
    );
}
