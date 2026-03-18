import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function FeatureCard({ icon, iconBg, title, description, delay }: { 
  icon: React.ReactNode, 
  iconBg: string, 
  title: string, 
  description: string,
  delay: number
}) {
  return (
    <Card 
      style={{ animationDelay: `${delay}ms` }}
      className={`group hover:shadow-2xl py-1 transition-all duration-500 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm overflow-hidden hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards`}
    >
      <CardContent className="p-5 space-y-4">
        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg md:rounded-2xl border ${iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-base sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {description}
          </p>
        </div>
        <div className="pt-2">
          <div className="h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-500 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
