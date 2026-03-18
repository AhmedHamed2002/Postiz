"use client";

import { useState } from "react";
import { MessageCircle, X} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function WhatsAppFloat() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const contacts = [
        {
        region: t("whatsapp_float.bahrain"),
        number: "+973 3706 1696",
        link: "https://wa.me/97337061696",
        desc: t("whatsapp_float.bahrain_desc")
        },
        {
        region: t("whatsapp_float.china"),
        number: "+86 199 2455 4911",
        link: "https://wa.me/8619924554911",
        desc: t("whatsapp_float.china_desc")
        }
    ];

    return (
        <div suppressHydrationWarning className="fixed bottom-6 end-6 z-50 flex flex-col items-end">
        {/* Contact Menu */}
        <div 
            className={`mb-4 flex flex-col gap-3 transition-all duration-300 origin-bottom-right ${
            isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-10 pointer-events-none"
            }`}
        >
            {contacts.map((contact, idx) => (
            <Link
                key={idx}
                href={contact.link}
                target="_blank"
                className="group flex items-center gap-4 bg-white dark:bg-[#1a1b1e] p-3 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 hover:border-[#b89b4b] transition-all"
            >
                <div className="flex flex-col text-right">
                <span suppressHydrationWarning className="text-[10px] uppercase tracking-widest font-bold text-[#b89b4b]">
                    {t("whatsapp_float.whatsapp")} {contact.region}
                </span>
                <span suppressHydrationWarning className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {contact.number}
                </span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8" />
                </div>
            </Link>
            ))}
        </div>

        {/* Main Toggle Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`cursor-pointer  relative sm:h-14 sm:w-14 h-12 w-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 overflow-hidden group ${
            isOpen 
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 rotate-90" 
                : "animate-pulse bg-linear-to-br from-[#b89b4b] via-[#fbea94] to-[#e3c05d] hover:bg-linear-to-br hover:from-[#fbea94] hover:via-[#e3c05d] hover:to-[#b89b4b] text-gray-900"
            }`}
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {isOpen ? (
            <X className="h-6 w-6" />
            ) : (
            <div className="flex items-center justify-center relative">
                <MessageCircle className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#25D366] rounded-full border-2 border-white animate-pulse" />
            </div>
            )}
        </button>

        {/* Pulsing Label when closed */}
        {!isOpen && (
            <div className="absolute border border-[#e1d960] dark:border-[#ece690] end-0 bottom-12 -translate-y-1/2 bg-[#f4f6fd] dark:bg-[#1a1b1e] py-2 px-4 rounded-xl shadow-xl  whitespace-nowrap hidden md:block animate-in fade-in slide-in-from-right-4">
            <p className="text-xs font-bold  text-gray-900 dark:text-gray-100">
                {t("whatsapp_float.label")}
            </p>
            </div>
        )}
        </div>
    );
}

