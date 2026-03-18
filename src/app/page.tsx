"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  MessageCircle, 
  Layout, 
  Image as ImageIcon, 
  Video, 
  Calendar,
  Layers,
  Sparkles,
  Play
} from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import MarketingCampaignForm from "@/components/marketing-campaign-form";
import Footer from "@/components/footer";
import { FeatureCard } from "@/components/feature-card";

export default function StartPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f3f4f8] dark:bg-[#030910]" />;
  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#f3f4f8] dark:bg-[#030910] transition-colors duration-300 overflow-x-hidden relative">
      
      <main className="mx-auto space-y-8 relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative flex flex-col lg:flex-row items-center gap-5 lg:gap-10 bg-[url('/assets/images/home.png')] dark:bg-[url('/assets/images/home-dark.png')] bg-cover bg-center bg-no-repeat py-20 lg:pt-0 px-4 lg:px-16 lg:h-lvh  overflow-hidden ">
          <div className="flex-1 space-y-8 mt-20 lg:mt-25 text-center lg:text-start animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-10 py-5 lg:py-10">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-[#252d67] dark:text-white/80 leading-[1.1]">
                {t('home.hero_title').split('&')[0]} & <br className="hidden lg:block" />
                {t('home.hero_title').split('&')[1]}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('home.hero_desc')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Button size="lg" className="bg-linear-to-r from-blue-800 to-blue-700 hover:from-blue-600 dark:from-blue-950 dark:to-blue-900 dark:hover:from-blue-900 dark:hover:to-blue-900   text-white rounded-full px-10 h-10 lg:h-12 text-sm lg:text-lg font-semibold transition-all cursor-pointer duration-500 hover:scale-95 active:scale-95 border-none">
                <a href="#marketing">{t('home.start_marketing')}</a>
              </Button>
            </div>
          </div>

          <div className="flex-1 hidden lg:block mt-40 xl:mt-40 w-full max-w-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="relative group">
              {/* Decorative Blur Backgrounds */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
              
              {/* Dashboard Content Mockup */}
              <Card className="relative py-2 overflow-hidden border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-2xl">
                <div className="h-4 bg-slate-50/50 dark:bg-slate-800/50 flex items-center px-6 gap-2 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <CardContent className="px-4 py-1">
                  <div className="grid grid-cols-12 gap-2">
                    {/* Content Scheduler Widget */}
                    <div className="col-span-12 sm:col-span-7 xl:col-span-9 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('home.scheduler_title')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-12 bg-slate-100 dark:bg-slate-700 rounded-full" />
                          <div className="h-2 w-8 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                      <div className="h-28 flex items-end gap-2 pt-2">
                        {[30, 50, 40, 80, 60, 45, 90, 70, 55, 75].map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }} 
                            className={`flex-1 rounded-t-md transition-all duration-700 animate-in slide-in-from-bottom fill-mode-forwards ${i === 7 ? 'bg-blue-600 shadow-lg shadow-blue-500/40' : 'bg-blue-100 dark:bg-blue-900/40'}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* AI Image Generation Widget */}
                    <div className="col-span-12 sm:col-span-5 xl:col-span-3 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('home.ai_image_title')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 flex-1">
                          <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800" />
                          <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800" />
                          <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800" />
                          <div className="aspect-square bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:rotate-12 transition-transform">
                              <Plus className="w-6 h-6 text-white" />
                          </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                          <Play className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('home.media_gen_title')}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="h-10 w-full bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800" />
                        <div className="flex items-center justify-between">
                            <div className="h-2 w-24 bg-orange-200 dark:bg-orange-900/50 rounded-full" />
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                              <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor" />
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('home.ai_customer_manager')}</span>
                      </div>
                      <div className="flex items-center justify-center h-20">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 blur-xl opacity-20" />
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg relative">
                              <MessageCircle className="w-6 h-6 text-white" fill="currentColor" />
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('home.multi_platform_publishing')}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['bg-blue-500', 'bg-pink-500', 'bg-sky-500', 'bg-slate-900', 'bg-red-500'].map((color, i) => (
                          <div key={i} className={`w-8 h-8 rounded-lg ${color} shadow-sm`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section id="about" className="pt-10 md:pt-20 md:pb-20 pb-10 px-4 sm:px-16 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="text-center space-y-8 pb-10">
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900/90 dark:text-white tracking-tight">
              {t('home.features_title')}
            </h2>
            <div className="w-40 sm:w-80 h-1.5 bg-blue-800 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <FeatureCard 
              icon={<Layout className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />}
              iconBg="border-blue-500"
              title={t('home.feature_1_title')}
              description={t('home.feature_1_desc')}
              delay={0}
            />
            <FeatureCard 
              icon={<Video className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500" />}
              iconBg="border-orange-500"
              title={t('home.feature_2_title')}
              description={t('home.feature_2_desc')}
              delay={100}
            />
            <FeatureCard 
              icon={<Plus className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500" />}
              iconBg="border-purple-500"
              title={t('home.feature_3_title')}
              description={t('home.feature_3_desc')}
              delay={200}
            />
            <FeatureCard 
              icon={<MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />}
              iconBg="border-green-500"
              title={t('home.feature_4_title')}
              description={t('home.feature_4_desc')}
              delay={300}
            />
          </div>
        </section>

        {/* Marketing Campaign Form Section */}
        <MarketingCampaignForm />
      </main>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}



