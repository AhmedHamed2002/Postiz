"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Menu,
  Home,
  ChevronDown,
  Check,
  Info,
  Highlighter,
  BrickWallShield,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FLAG_MAP } from "@/components/FlagIcons";
import Link from "next/link";

/* -------- Language config -------- */
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
];

/* ---------------- Navbar ---------------- */
export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [darkMode, setDarkMode]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* -------- Restore dark mode on mount -------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  /* -------- Scroll listener -------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ["home", "about", "marketing", "footer"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------- Sync RTL direction whenever language changes -------- */
  useEffect(() => {
    const lang = i18n.language || "en";
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [i18n.language]);

  /* -------- Dark mode -------- */
  const toggleDark = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  /* -------- Language switcher -------- */
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  /* -------- Scroll to section -------- */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMenuOpen(false);
    }
  };

  const NavLink = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => scrollToSection(id)}
            className={`flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg transition-all duration-500 font-bold text-sm relative group ${
              // isScrolled ?
              // (
              //   activeSection === id 
              //     ? "text-yellow-200 dark:text-[#fbdf95] bg-yellow-200/10 dark:bg-[#fbdf95]/10 "
              //     : "text-white dark:text-slate-300 hover:text-yellow-200 dark:hover:text-[#fbdf95]"
              // )
              //   : 
              // (
                activeSection === id 
                  ? "text-blue-600 dark:text-blue-600  bg-blue-500/10 dark:bg-[#fbdf95]/10 "
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-500 "
              // )
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:block">{label}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="lg:hidden bg-[#1a1f35] border-[#e6d58a]/50 text-white">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <nav suppressHydrationWarning
      className={`fixed  top-0 left-0 right-0 mx-auto transition-all duration-700 ease-in-out z-50 rounded-full w-11/12 ${
        isScrolled
          ? "top-5 border-2 border-blue-300 dark:border-blue-700/50 bg-linear-to-b from-white/60 to-slate-50/90 dark:from-slate-900/90 dark:via-slate-950/90 dark:to-slate-900/90 text-black  dark:text-white py-1 md:py-3 backdrop-blur-lg shadow-md"
          : "top-5  bg-linear-to-r from-white/60 to-slate-50/90 dark:from-slate-900/90 dark:via-slate-950/90 dark:to-slate-900/90 text-black  shadow-md dark:text-white py-1 md:py-3 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">

         {/* Logo */}
        <div  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  className="flex items-center justify-start h-12 w-48">
          <Image
            src="/assets/images/Postily-logo.png"
            alt="postily"
            width={200}
            height={200}
            className="h-auto w-auto mt-2 -ms-4 sm:-ms-6 md:-ms-3 lg:ms-0 xl:-ms-12 cursor-pointer"
            priority
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink id="home" label={t("nav.home")} icon={Home} />
          <NavLink id="about" label={t("nav.about")} icon={Info} />
          <NavLink id="marketing" label={t("nav.marketing")} icon={Highlighter} />
          <NavLink id="footer" label={t("nav.footer")} icon={BrickWallShield} />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1">

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDark}
            className="w-7 h-7 cursor-pointer rounded-full bg-black/5 hover:bg-black/10  dark:bg-white/5 dark:hover:bg-white/10 text-blue-500 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2  cursor-pointer rounded-full bg-black/5 hover:bg-black/10  dark:bg-white/5 dark:hover:bg-white/10 text-white border-white/10 gap-2 transition-all"
              >
                {(() => { const F = FLAG_MAP[currentLang.code]; return F ? <F className="h-3 w-4 rounded-sm" /> : null; })()}
                <span className="text-xs font-bold uppercase text-slate-600 dark:text-white">{currentLang.code}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 min-w-[140px] bg-white dark:bg-[#030719] border-2 border-[#438aff]/30 text-black dark:text-white rounded-xl shadow-2xl p-1"
            >
              {LANGUAGES.map((lang) => {
                const Flag = FLAG_MAP[lang.code];
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-[#438aff] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {Flag && <Flag className="h-3 w-4 rounded-sm" />}
                      <span className="text-sm font-medium">{lang.label}</span>
                    </span>
                    {i18n.language === lang.code && (
                      <Check className="h-3 w-3 text-[#438aff]" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contact Us button (Desktop) */}
          {/* <Button
            onClick={() => scrollToSection("footer")}
            className="hidden md:flex cursor-pointer rounded-full bg-linear-to-r from-[#fbdf95] via-[#e4c26b] to-[#f7de9c] bg-size-[200%_100%] hover:bg-right transition-all duration-700 text-black  h-9 px-6 shadow-[0_10px_20px_-5px_rgba(251,223,149,0.3)] active:scale-95"
          >
            {t("nav.contact")}
          </Button> */}

          {/* Mobile Menu Toggle */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-7 h-7 rounded-full cursor-pointer text-black dark:text-white"
              >
                <Menu className="w-3 h-3" />
              </Button>
            </SheetTrigger>
            <SheetContent side={i18n.language === "ar" ? "left" : "right"} className="px-4 bg-slate-50 dark:bg-[#050a1e] border-none">
              <SheetHeader className="text-start mt-5 mb-8">
                <SheetTitle className="text-2xl font-black text-[#212e64] dark:text-[#263985]">postily</SheetTitle>
                <SheetDescription className="text-slate-500 dark:text-slate-400">
                  {t("nav.branding_subtitle")}
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  {[
                    ["home", t("nav.home"), Home],
                    ["about", t("nav.about"), Info],
                    ["marketing", t("nav.marketing"), Highlighter],
                    ["footer", t("nav.footer"), BrickWallShield],
                  ].map(([id, label, Icon]: any) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`flex items-center gap-4 w-full p-3 cursor-pointer rounded-2xl transition-all ${
                        activeSection === id
                          ? "text-blue-700 dark:text-blue-600"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-bold">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-slate-100 dark:bg-white/5 space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {t("nav.language")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGES.map((lang) => {
                      const Flag = FLAG_MAP[lang.code];
                      return (
                        <button
                          key={lang.code}
                          onClick={() => { changeLanguage(lang.code); setMenuOpen(false); }}
                          className={`flex cursor-pointer items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                            i18n.language === lang.code
                              ? "border-blue-600 shadow-sm"
                              : "border-transparent text-slate-500 dark:text-slate-400 hover:bg-black/10 dark:hover:bg-white/10"
                          }`}
                        >
                          {Flag && <Flag className="h-3 w-4 rounded-sm" />}
                          <span>{lang.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* <Button
                  onClick={() => scrollToSection("footer")}
                  className="w-full mt-4 cursor-pointer rounded-full h-14 text-lg bg-linear-to-r from-blue-600 via-blue-500 to-blue-600  hover:bg-right transition-all duration-700 text-white active:scale-95"
                >
                  {t("nav.contact")}
                </Button> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
