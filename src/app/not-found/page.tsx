"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Home, MoveRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
    const { t , i18n} = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-[#f3f4f8] dark:bg-[#030910]" />;

    return (
        <div suppressHydrationWarning className="relative flex flex-col items-center justify-center min-h-screen bg-[#f3f4f8] dark:bg-[#030910] p-6 overflow-hidden">
            {/* Animated Background Decorative Elements */}
            <div suppressHydrationWarning className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div suppressHydrationWarning className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 dark:bg-blue-900/10 blur-[100px] rounded-full pointer-events-none animate-pulse delay-1000" />
            
            <div suppressHydrationWarning className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center">
                {/* 404 Visual Container */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-400/10 blur-3xl rounded-full scale-150 animate-pulse" />
                    <div className="relative flex items-center justify-center gap-4">
                        <span className="text-8xl md:text-9xl font-black tracking-tighter text-slate-900/10 dark:text-white/5 select-none focus:outline-none">
                            404
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-12">
                                <Sparkles className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 mb-10">
                    <h2 suppressHydrationWarning className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t("not_found.title")}
                    </h2>
                    
                    <p suppressHydrationWarning className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
                        {t("not_found.description")}
                    </p>
                </div>

                {/* Interactive Buttons */}
                <div suppressHydrationWarning className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link href="/">
                        <Button 
                            size="lg" 
                            className="w-full cursor-pointer sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900 text-white font-bold rounded-full px-10 h-14 shadow-md shadow-blue-900/20 transition-all hover:scale-105 active:scale-95"
                        >
                            <Home className="w-5 h-5" />
                            {t("not_found.return_home")}
                        </Button>
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full cursor-pointer sm:w-auto inline-flex items-center justify-center gap-2 px-10 h-14 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
                    >
                        {t("not_found.go_back")}
                        <MoveRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${i18n.language === "ar" ? "rotate-180 mt-1" : ""}`} />
                    </button>
                </div>

                {/* Support Link */}
                <div className="mt-12 group">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        {t("not_found.need_help")}
                    </Link>
                </div>
            </div>
        </div>
    );
}


