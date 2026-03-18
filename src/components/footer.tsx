'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    if (!mounted) return null;

    return (
        <footer id="footer" suppressHydrationWarning className="relative w-full bg-slate-50 dark:bg-[#030712] overflow-hidden border-t border-slate-200 dark:border-slate-800/50">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    {/* Column 1: Brand & Desc */}
                    <div className="lg:col-span-4 flex flex-col space-y-8">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-3xl font-black tracking-tight text-blue-700 dark:text-blue-500">
                                {t("nav.brand")}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                                {t("footer.company_desc")}
                            </p>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, idx) => (
                                <Link 
                                    key={idx} 
                                    href={social.href} 
                                    className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300 group shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-2 flex flex-col space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">
                            {t("footer.nav_title")}
                        </h4>
                        <ul className="space-y-4">
                            {['home', 'about', 'marketing'].map((key) => (
                                <li key={key}>
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById(key);
                                            if (element) {
                                                window.scrollTo({
                                                    top: element.offsetTop - 80,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }}
                                        className="text-slate-600 cursor-pointer dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors text-sm font-medium flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 group-hover:scale-150 transition-all" />
                                        {t(`nav.${key}`)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Features/Services */}
                    <div className="lg:col-span-2 flex flex-col space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">
                            {t("footer.popular_items_title", { defaultValue: "Solutions" })}
                        </h4>
                        <ul className="space-y-4">
                            {(() => {
                                const items = t("footer.popular_items", { returnObjects: true });
                                if (Array.isArray(items)) {
                                    return items.slice(0, 4).map((item, idx) => (
                                        <li key={idx} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
                                            {item}
                                        </li>
                                    ));
                                }
                                return null;
                            })()}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="lg:col-span-4 flex flex-col space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">
                            {t("footer.contact_title")}
                        </h4>
                        <div className="grid gap-5">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{t("footer.email")}</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">hello@postiz.ai</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500">
                                    <MessageCircle className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{t("footer.whatsapp")}</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">+86 199 2455 4911</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{t("footer.address")}</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {t("footer.address_val")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-center gap-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-500 tracking-wider">
                        &copy; {new Date().getFullYear()} <span className="text-slate-900 dark:text-white font-bold">{t("nav.brand")}</span>. {t("footer.rights")}
                    </p>
                    
                    {/* <div className="flex items-center gap-8">
                        <Link href="/privacy" className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                            Terms of Service
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
