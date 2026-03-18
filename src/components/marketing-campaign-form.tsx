'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Palette, 
  CloudUpload, 
  ShieldCheck, 
  Copy, 
  ChevronDown,
  Calendar as CalendarIcon,
  Highlighter,
  Check
} from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const MarketingCampaignForm = () => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const sheetLink = "https://docs.google.com/spreadsheets/d/1ipdUtt8gEJHdWhcQcY-z5bZKZasLkwwSWqSM0k4aa2s/edit?gid=0#gid=0";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(sheetLink);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = sheetLink;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section suppressHydrationWarning id="marketing" className="py-20 px-4 sm:px-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900/90 dark:text-white tracking-tight">
            {t('marketing_form.launch_marketing')}
          </h2>
        </div>

        <Tabs defaultValue="media" className="w-full" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex justify-center mb-8 px-5">
            <TabsList className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <TabsTrigger value="media" className="gap-1 cursor-pointer text-xs sm:text-base">
                <CloudUpload className="w-4 h-4" />
                {t('marketing_form.media_uploads_tab')}
              </TabsTrigger>
              <TabsTrigger value="marketing" className="gap-1 cursor-pointer text-xs sm:text-base">
                <Highlighter className="w-4 h-4" />
                {t('marketing_form.marketing_tab')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="media" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm rounded-3xl overflow-hidden">
              <div className="p-5 border-b border-blue-50 dark:border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CloudUpload className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">{t('marketing_form.media_uploads_tab')}</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  <div className="flex-1 min-w-[200px] space-y-2">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.file_name_label')}</label>
                    <Input placeholder={t('marketing_form.file_name_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                  </div>
                  <div className="flex-1 min-w-[200px] space-y-2">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.caption_label')}</label>
                    <Input placeholder={t('marketing_form.caption_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-800/50 flex flex-col items-start gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-start leading-relaxed">
                      {t('marketing_form.cloud_storage_info')}
                    </p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-xl shadow-lg shadow-blue-500/20 text-xs sm:text-base px-3 sm:px-6 h-10 sm:h-11 font-bold transition-all active:scale-95"
                      onClick={() => window.open('https://dash.cloudflare.com/489491c88349f16290f6a620397fccc0/r2/overview', '_blank')}
                    >
                      <CloudUpload className="w-4 h-4 me-1" />
                      {t('marketing_form.visit_cloud_button')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button className="h-10 sm:h-12 px-10 sm:px-16 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full text-md sm:text-lg font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all">
                {t('marketing_form.create_media_button')}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm rounded-3xl overflow-hidden">
              <div className="p-5 border-b border-blue-50 dark:border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Highlighter className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">{t('marketing_form.marketing_tab')}</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.start_date_label')}</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-11 justify-start text-left font-normal bg-slate-50 dark:bg-slate-800 border-none rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>{t('marketing_form.pick_date')}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-2xl border-slate-200 dark:border-slate-800" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.end_date_label')}</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-11 justify-start text-left font-normal bg-slate-50 dark:bg-slate-800 border-none rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>{t('marketing_form.pick_date')}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-2xl border-slate-200 dark:border-slate-800" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.goal_label')}</label>
                      <Input placeholder={t('marketing_form.goal_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                    </div>
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.hook_style_label')}</label>
                      <Input placeholder={t('marketing_form.hook_style_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.tone_label')}</label>
                      <Input placeholder={t('marketing_form.tone_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                    </div>
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.channel_type_label')}</label>
                      <Input placeholder={t('marketing_form.channel_type_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.target_audience_label')}</label>
                    <Input placeholder={t('marketing_form.target_audience_placeholder')} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-11" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('marketing_form.notes_label')}</label>
                    <textarea 
                      placeholder={t('marketing_form.notes_placeholder')} 
                      className="w-full min-h-[100px] p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button className="h-10 sm:h-12 px-10 sm:px-16 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full text-md sm:text-lg font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all">
                {t('marketing_form.create_marketing_button')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Bottom Section: Review & Approval */}
        <Card className="border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-blue-50 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">{t('marketing_form.review_approval_title')}</h3>
          </div>
          <CardContent className="px-6 space-y-2">
            {/* <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Review before publishing?</span>
              <div className="flex items-center gap-2">
                <Switch 
                  id="review-switch"
                  defaultChecked 
                  className="data-[state=checked]:bg-blue-600"
                />
                <label htmlFor="review-switch" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Yes</label>
              </div>
            </div> */}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
              <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm whitespace-nowrap border border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{t('marketing_form.google_sheet_label')}</span>
              </div>
              <div className="flex-1 flex items-center gap-4 w-full px-2 overflow-hidden">
                <a 
                  href={sheetLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 truncate flex-1 hover:underline font-medium transition-colors"
                >
                  {sheetLink}
                </a>
                <button 
                  onClick={handleCopy}
                  title="Copy link"
                  className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm hover:shadow active:scale-90 group relative border border-transparent hover:border-slate-200 dark:hover:border-slate-600 bg-slate-100/50 dark:bg-slate-800"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  )}
                  {copied && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2">
                      {t('marketing_form.copied_tooltip')}
                    </div>
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
};

export default MarketingCampaignForm;
