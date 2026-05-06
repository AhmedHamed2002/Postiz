"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingSpinner() {
    return (
        <div suppressHydrationWarning 
            dir="auto" 
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-50/90 dark:bg-[#030910]/95 backdrop-blur-xl"
        >
            <div className="relative flex flex-col items-center">
                {/* Decorative background glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 dark:bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600/10 dark:bg-yellow-500/5 blur-[80px] rounded-full animate-pulse delay-700" />
                
                <div className="relative mb-8">
                    {/* Multi-layered rotating rings */}
                    <div className="absolute inset-[-12px] border-[3px] border-t-blue-600 border-r-transparent border-b-blue-600/20 border-l-transparent rounded-full animate-[spin_2s_linear_infinite]" />
                    <div className="absolute inset-[-24px] border border-dashed border-blue-600/20 dark:border-blue-400/20 rounded-full animate-[spin_8s_linear_infinite]" />
                    
                    {/* Main Icon Container */}
                    <div className="relative z-10 p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 dark:shadow-black/50 border border-slate-200/50 dark:border-white/5 flex items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/5 to-purple-600/5 dark:from-blue-500/10 dark:to-yellow-500/5" />
                        <Sparkles 
                            className={cn(
                                "sm:h-10 sm:w-10 h-8 w-8 animate-pulse",
                                "text-blue-600 dark:text-blue-400"
                            )} 
                        />
                    </div>

                    {/* Orbiting particles (CSS only) */}
                    <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]">
                        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]" />
                    </div>
                </div>

                {/* Branding Text */}
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                        postily
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" />
                    </h2>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400 animate-pulse">
                        AI Marketing Engine
                    </p>
                </div>
            </div>
        </div>
    );
}

