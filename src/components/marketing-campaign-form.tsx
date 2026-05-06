'use client';

import { useState } from 'react';
import { User, Mail, Phone, ChevronRight, ChevronLeft, Lock, Globe, Instagram, Facebook, Upload, Zap, BarChart, Heart, DollarSign,Monitor,ShoppingBag,Building2,Rocket,Sparkles,Target,CloudUpload,Highlighter, Users, CalendarIcon, Check, BadgeInfo} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { useTranslation } from 'react-i18next';
import { Calendar } from "@/components/ui/calendar";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

const OnboardingForm = () => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    businessType: '',
    companyName: '',
    websiteUrl: '',
    noWebsite: false,
    businessDescription: '',
    brandVoice: [] as string[],
    customBrandVoice: '',
    skippedBrandVoice: false,
    brandColors: { primary: '#000000', secondary: '#ffffff', accent: '#0066ff' },
    skippedBrandColors: false,
    idealCustomer: [] as string[],
    customIdealCustomer: '',
    skippedIdealCustomer: false,
    instagram: '',
    facebook: '',
    primaryGoal: '',
    postingFrequency: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim().length > 2 &&
          EMAIL_REGEX.test(formData.email) &&
          (formData.whatsapp.trim().length === 0 || PHONE_REGEX.test(formData.whatsapp))
        );
      case 2:
        return formData.businessType !== '';
      case 3:
        return (
          formData.companyName.trim().length > 1 &&
          (formData.noWebsite || URL_REGEX.test(formData.websiteUrl))
        );
      case 4:
        return formData.primaryGoal !== '' && formData.postingFrequency !== '';
      default:
        return false;
    }
  };

  const isValid = isStepValid();

  const getFieldError = (field: string) => {
    if (!touched[field]) return null;

    switch (field) {
      case 'fullName':
        if (formData.fullName.trim().length > 0 && formData.fullName.trim().length <= 2) 
          return t('onboarding.errors.name_required');
        return null;
      case 'email':
        if (formData.email.trim().length > 0 && !EMAIL_REGEX.test(formData.email)) 
          return t('onboarding.errors.email_invalid');
        return null;
      case 'whatsapp':
        if (formData.whatsapp.trim().length > 0 && !PHONE_REGEX.test(formData.whatsapp)) 
          return t('onboarding.errors.whatsapp_invalid');
        return null;
      case 'companyName':
        if (formData.companyName.trim().length > 0 && formData.companyName.trim().length <= 1) 
          return t('onboarding.errors.company_required');
        return null;
      case 'websiteUrl':
        if (!formData.noWebsite && formData.websiteUrl.trim().length > 0 && !URL_REGEX.test(formData.websiteUrl)) 
          return t('onboarding.errors.url_invalid');
        return null;
      default:
        return null;
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const toggleArrayItem = (field: 'brandVoice' | 'idealCustomer', item: string) => {
    const current = formData[field];
    
    if (field === 'brandVoice') {
      if (item === 'Skip this') {
        updateFormData({ 
          brandVoice: [], 
          customBrandVoice: '',
          skippedBrandVoice: !formData.skippedBrandVoice 
        });
        return;
      }
      const newSkipped = false;
      if (current.includes(item)) {
        updateFormData({ [field]: current.filter(i => i !== item), skippedBrandVoice: newSkipped });
      } else if (current.length < 3) {
        updateFormData({ [field]: [...current, item], skippedBrandVoice: newSkipped });
      }
    } else if (field === 'idealCustomer') {
      if (item === 'Skip this') {
        updateFormData({ 
          idealCustomer: [], 
          customIdealCustomer: '',
          skippedIdealCustomer: !formData.skippedIdealCustomer 
        });
        return;
      }
      const newSkipped = false;
      if (current.includes(item)) {
        updateFormData({ [field]: current.filter(i => i !== item), skippedIdealCustomer: newSkipped });
      } else {
        updateFormData({ [field]: [...current, item], skippedIdealCustomer: newSkipped });
      }
    }
  };

  const businessTypes = [
    { id: 'agency', icon: Users, popular: true },
    { id: 'solopreneur', icon: User },
    { id: 'ecommerce', icon: ShoppingBag },
    { id: 'tech', icon: Rocket },
    { id: 'small_biz', icon: Building2 },
    { id: 'enterprise', icon: Monitor }
  ];

  const goals = [
    { id: 'Brand awareness', icon: BarChart },
    { id: 'Engagement', icon: Heart },
    { id: 'Lead generation', icon: Target },
    { id: 'Drive sales', icon: DollarSign }
  ];

  const frequencies = [
    { id: 'Daily', popular: false },
    { id: '3x per week', popular: true },
    { id: 'Weekly', popular: false }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-blue-600 font-bold text-[9px] sm:text-xs tracking-widest uppercase">{t('onboarding.step3.optional')}</span>
              <h2 className="text-2xl sm:text-4xl pt-2 font-serif font-medium text-slate-900 dark:text-white leading-tight">
                {t('onboarding.step1.title_main')}<span>{t('onboarding.step1.title_italic')}</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {t('onboarding.step1.subtitle')}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t('onboarding.step1.name_label')} <span className="text-blue-500">*</span>
                </label>
                <div className="relative group mt-2">
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input 
                    placeholder={t('onboarding.step1.name_placeholder')}
                    className={cn(
                      "h-10 ps-10 rounded-lg text-sm sm:text-base border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-visible:ring-blue-500/40 focus-visible:border-blue-100",
                      getFieldError('fullName') && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    )}
                    value={formData.fullName}
                    onChange={(e) => updateFormData({ fullName: e.target.value })}
                    onBlur={() => handleBlur('fullName')}
                  />
                </div>
                {getFieldError('fullName') && (
                  <p className="text-xs text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                    {getFieldError('fullName')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t('onboarding.step1.email_label')} <span className="text-blue-500">*</span>
                </label>
                <div className="relative group mt-2">
                  <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input 
                    placeholder={t('onboarding.step1.email_placeholder')}
                    className={cn(
                      "h-10 ps-10 rounded-lg text-sm sm:text-base border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-visible:ring-blue-500/20 focus-visible:border-blue-50",
                      getFieldError('email') && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    )}
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    onBlur={() => handleBlur('email')}
                  />
                </div>
                {getFieldError('email') && (
                  <p className="text-xs text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                    {getFieldError('email')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{t('onboarding.step1.whatsapp_label')}</label>
                  <span className="text-[10px] text-slate-400 font-medium">{t('onboarding.step1.whatsapp_optional')}</span>
                </div>
                <div className="relative group mt-2">
                  <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    placeholder={t('onboarding.step1.whatsapp_placeholder')}
                    className={cn(
                      "h-10 ps-10 rounded-lg text-sm sm:text-base border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-visible:ring-blue-500/20 focus-visible:border-blue-50",
                      getFieldError('whatsapp') && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    )}
                    value={formData.whatsapp}
                    onChange={(e) => updateFormData({ whatsapp: e.target.value })}
                    onBlur={() => handleBlur('whatsapp')}
                  />
                </div>
                {getFieldError('whatsapp') && (
                  <p className="text-xs text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                    {getFieldError('whatsapp')}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-blue-600 font-bold text-[9px] sm:text-xs tracking-widest uppercase">{t('onboarding.step2.agency.title')}</span>
              <h2 className="text-2xl sm:text-4xl pt-2 font-serif font-medium text-slate-900 dark:text-white leading-tight">
                {t('onboarding.step2.title_main')}<span>{t('onboarding.step2.title_italic')}</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {t('onboarding.step2.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.businessType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateFormData({ businessType: type.id })}
                    className={cn(
                      "relative  cursor-pointer p-4 sm:p-6 text-start rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group",
                      isSelected 
                        ? "border-blue-600 bg-white dark:bg-slate-900 shadow-xl shadow-blue-600/10" 
                        : "border-slate-100 dark:border-slate-800 hover:border-blue-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    {type.popular && (
                      <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[8px] sm:text-[10px] font-semibold px-2 py-1 rounded-full shadow-lg">
                        {t('onboarding.step2.popular')}
                      </span>
                    )}
                    <div className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300",
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500"
                    )}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className={cn("font-bold text-sm sm:text-base mb-1 transition-colors", isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300")}>
                      {t(`onboarding.step2.${type.id}.title`)}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                      {t(`onboarding.step2.${type.id}.desc`)}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="space-y-2">
              <span className="text-blue-600 font-bold text-[9px] sm:text-xs tracking-widest uppercase">{t('onboarding.step3.discovery_tag')}</span>
              <h2 className="text-2xl sm:text-4xl pt-2 font-serif font-medium text-slate-900 dark:text-white leading-tight">
                {t('onboarding.step3.title_main')}<span>{t('onboarding.step3.title_italic')}</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('onboarding.step3.subtitle')}
              </p>
            </div>

            <div className="space-y-6" >
              <div className={cn("space-y-2", formData.noWebsite && "opacity-50 pointer-events-none")}>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{t('onboarding.step3.company_name')} <span className="text-blue-500">*</span></label>
                <Input 
                  className={cn(
                    "h-10 rounded-lg mt-2 text-sm sm:text-base border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/40 focus-visible:border-blue-100",
                    getFieldError('companyName') && "border-red-500 focus-visible:ring-red-500/20"
                  )}
                  value={formData.companyName}
                  onChange={(e) => updateFormData({ companyName: e.target.value })}
                  onBlur={() => handleBlur('companyName')}
                  placeholder={t('onboarding.step3.company_name_placeholder')}
                />
                {getFieldError('companyName') && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {getFieldError('companyName')}
                  </p>
                )}
              </div>

              <div className={cn("space-y-2 transition-all duration-300", formData.noWebsite && "opacity-50 pointer-events-none")}>
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{t('onboarding.step3.website_url')} <span className="text-blue-500">*</span></label>
                  {/* <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    {t('onboarding.step3.magic_ingredient')} <Sparkles className="w-3 h-3 text-orange-400" />
                  </span> */}
                </div>
                <div className="relative group mt-2">
                  <Globe className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <Input 
                    disabled={formData.noWebsite}
                    className={cn(
                      "h-10 ps-10 rounded-lg text-sm sm:text-base border-blue-500/50 shadow-sm focus-visible:ring-blue-500/40 focus-visible:border-blue-100",
                      getFieldError('websiteUrl') && "border-red-500 focus-visible:ring-red-500/20"
                    )}
                    value={formData.websiteUrl}
                    onChange={(e) => updateFormData({ websiteUrl: e.target.value })}
                    onBlur={() => handleBlur('websiteUrl')}
                    placeholder={t('onboarding.step3.website_url_placeholder')}
                  />
                </div>
                {getFieldError('websiteUrl') && !formData.noWebsite && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {getFieldError('websiteUrl')}
                  </p>
                )}
              </div>

              <div className={cn("p-3 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4", formData.noWebsite && "border-blue-500 dark:border-blue-500 bg-blue-600/5 dark:bg-blue-600/10")}>
                <Checkbox 
                  id="noWebsite" 
                  className="w-6 h-6 cursor-pointer rounded-lg data-[state=checked]:bg-blue-600 data-[state=checked]:border-none" 
                  checked={formData.noWebsite}
                  onCheckedChange={(checked) => updateFormData({ noWebsite: !!checked })}
                />
                <div className="space-y-0.5">
                  <label htmlFor="noWebsite" className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 block">{t('onboarding.step3.no_website')}</label>
                  <p className="text-[10px] sm:text-xs text-slate-400">{t('onboarding.step3.no_website_desc')}</p>
                </div>
              </div>

              {formData.noWebsite && (

                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-8 pt-4">
                  <div className="space-y-2 flex items-center gap-2 ">
                    <BadgeInfo className="w-3.5 h-3.5 text-blue-500 mt-1.5" />
                    <p className="text-[10px] sm:text-sm text-blue-500 font-medium">{t('onboarding.step3.optional_fields_notice')}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step3.business_desc_label')}</label>
                      <span className="text-[10px] text-slate-400 font-medium">{t('onboarding.step3.business_desc_info')}</span>
                    </div>
                    <textarea 
                      placeholder={t('onboarding.step3.business_desc_placeholder')}
                      className="w-full min-h-[100px] p-5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 focus-visible:ring-blue-500/40 focus-visible:border-blue-100 bg-white dark:bg-slate-900 text-sm"
                      value={formData.businessDescription}
                      onChange={(e) => updateFormData({ businessDescription: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step3.brand_voice')}</label>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formData.skippedBrandVoice ? (
                          <span className="text-slate-300 italic">{t('onboarding.step3.skipped')}</span>
                        ) : (
                          <>{t('onboarding.step3.pick_up_to_3')} · <span className="text-blue-600 font-bold">{formData.brandVoice.length} {t('onboarding.step3.selected')}</span></>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(t('onboarding.step3.voices', { returnObjects: true }) as string[]).map((voice) => {
                        const isSelected = formData.brandVoice.includes(voice);
                        const isOther = ['Other..', 'Other', 'آخر..', '其他..'].includes(voice);
                        const isSkip = voice === 'Skip this' || voice === 'Skip';
                        
                        return (
                          <button
                            key={voice}
                            onClick={() => toggleArrayItem('brandVoice', voice)}
                            className={cn(
                              "px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer rounded-full border hover:border-blue-500 dark:hover:border-blue-500 font-medium transition-all flex items-center gap-2",
                              isSelected
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                                : formData.skippedBrandVoice && !isSkip
                                  ? "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                                  : isSkip && formData.skippedBrandVoice
                                    ? "bg-slate-500 border border-slate-500 dark:bg-slate-600 dark:border-slate-600 text-white italic shadow-lg shadow-slate-500/20"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300"
                            )}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            {isSkip && formData.skippedBrandVoice && <Check className="w-3.5 h-3.5" />}
                            {voice}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => toggleArrayItem('brandVoice', 'Skip this')}
                        className={cn(
                          "px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer rounded-full border hover:border-blue-500 dark:hover:border-blue-500 font-medium transition-all flex items-center gap-2",
                          formData.skippedBrandVoice
                            ? "bg-slate-500 border-slate-500 dark:bg-slate-800 dark:border-slate-800 text-white italic shadow-lg shadow-slate-500/20"
                            : "bg-white dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:border-blue-300 hover:text-blue-500"
                        )}
                      >
                        {formData.skippedBrandVoice && <Check className="w-3.5 h-3.5" />}
                        {t('onboarding.step3.skip')}
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {formData.brandVoice.some(v => ['Other..', 'Other', 'آخر..', '其他..'].includes(v)) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="pt-2"
                        >
                          <Input 
                            placeholder={t('onboarding.step3.tell_us_more')}
                            className="h-12 rounded-xl border-blue-200 bg-blue-50/20 focus-visible:ring-blue-500/20"
                            value={formData.customBrandVoice}
                            onChange={(e) => updateFormData({ customBrandVoice: e.target.value })}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step3.brand_colors')}</label>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formData.skippedBrandColors ? (
                          <span className="text-slate-300 italic">{t('onboarding.step3.skipped')}</span>
                        ) : (
                          t('onboarding.step3.brand_colors_info')
                        )}
                      </span>
                    </div>

                    <div className={cn(
                      "p-10 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 bg-slate-50/50 dark:bg-slate-950/50",
                      formData.skippedBrandColors 
                        ? "border-slate-100 opacity-40 cursor-not-allowed" 
                        : "border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-blue-50/30"
                    )}>
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                        <Upload className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm text-slate-800 dark:text-slate-500">{t('onboarding.step3.upload_logo')}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{t('onboarding.step3.upload_logo_types')}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className={cn(
                        "text-xs font-medium text-slate-400 transition-opacity",
                        formData.skippedBrandColors && "opacity-40"
                      )}>
                        {t('onboarding.step3.pick_manually')}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['primary', 'secondary', 'accent'].map((type) => (
                          <div 
                            key={type}
                            onClick={() => {
                              if (!formData.skippedBrandColors) {
                                document.getElementById(`color-picker-${type}`)?.click();
                              }
                            }}
                            className={cn(
                              "p-4 rounded-2xl border-2 transition-all flex items-center gap-3 relative",
                              formData.skippedBrandColors
                                ? "border-slate-100 bg-slate-100/30 opacity-60 cursor-not-allowed"
                                : "border-slate-100 dark:border-slate-800 hover:border-blue-200 cursor-pointer active:scale-[0.98]"
                            )}
                          >
                            <input 
                              type="color"
                              id={`color-picker-${type}`}
                              className="sr-only"
                              value={(formData.brandColors as any)[type]}
                              onChange={(e) => {
                                updateFormData({ 
                                  brandColors: { ...formData.brandColors, [type]: e.target.value },
                                  skippedBrandColors: false
                                });
                              }}
                            />
                            <div 
                              className="w-10 h-10 rounded-lg shadow-inner border border-slate-100 transition-colors duration-300"
                              style={{ backgroundColor: formData.skippedBrandColors ? '#f1f5f9' : (formData.brandColors as any)[type] }}
                            />
                            <div className="space-y-0.5">
                              <p className="text-[10px] font-bold text-slate-900 dark:text-white capitalize">{t('onboarding.step3.' + type)}</p>
                              <p className="text-[10px] font-mono text-slate-400">
                                {formData.skippedBrandColors ? '—' : (formData.brandColors as any)[type]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => updateFormData({ skippedBrandColors: !formData.skippedBrandColors })}
                      className={cn(
                        "px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm cursor-pointer rounded-full border font-medium transition-all flex items-center gap-2 w-fit",
                        formData.skippedBrandColors
                          ? "bg-slate-700 border-slate-700 text-white italic shadow-lg shadow-slate-700/20"
                          : "bg-white dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-blue-300 hover:text-blue-500"
                      )}
                    >
                      {formData.skippedBrandColors && <Check className="w-3.5 h-3.5" />}
                      {formData.skippedBrandColors ? t('onboarding.step3.skipped') : t('onboarding.step3.skip')}
                    </button>
                  </div>


                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step3.ideal_customer')}</label>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formData.skippedIdealCustomer ? (
                          <span className="text-slate-300 italic">{t('onboarding.step3.skipped')}</span>
                        ) : (
                          t('onboarding.step3.ideal_customer_info')
                        )}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(t('onboarding.step3.customers', { returnObjects: true }) as string[]).map((customer) => {
                        const isSelected = formData.idealCustomer.includes(customer);
                        const isOther = ['Other..', 'Other', 'آخر..', '其他..'].includes(customer);
                        
                        return (
                          <button
                            key={customer}
                            onClick={() => toggleArrayItem('idealCustomer', customer)}
                            className={cn(
                              "px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm cursor-pointer rounded-full border font-medium transition-all flex items-center gap-2",
                              isSelected
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                                : formData.skippedIdealCustomer
                                  ? "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300"
                            )}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            {customer}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => toggleArrayItem('idealCustomer', 'Skip this')}
                        className={cn(
                          "px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm cursor-pointer rounded-full border font-medium transition-all flex items-center gap-2",
                          formData.skippedIdealCustomer
                            ? "bg-slate-700 border-slate-700 text-white italic shadow-lg shadow-slate-700/20"
                            : "bg-white dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-blue-300 hover:text-blue-500"
                        )}
                      >
                        {formData.skippedIdealCustomer && <Check className="w-3.5 h-3.5" />}
                        {t('onboarding.step3.skip')}
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {formData.idealCustomer.some(v => ['Other..', 'Other', 'آخر..', '其他..'].includes(v)) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="pt-2"
                        >
                          <Input 
                            placeholder={t('onboarding.step3.audience_placeholder')}
                            className="h-12 rounded-xl border-blue-200 bg-blue-50/20 focus-visible:ring-blue-500/20"
                            value={formData.customIdealCustomer}
                            onChange={(e) => updateFormData({ customIdealCustomer: e.target.value })}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {!formData.noWebsite && (
                <div className="px-6 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 rounded-2xl py-5 flex items-center gap-4 text-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <p className="text-[10px] sm:text-sm font-medium leading-relaxed">
                    {t('onboarding.step3.extract_info')}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step3.instagram')}</label>
                    <span className="text-[10px] text-slate-400 font-medium">{t('onboarding.step3.optional')}</span>
                  </div>
                  <div className="relative group">
                    <Instagram className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <Input placeholder="@yourbrand" className="h-10 ps-10 rounded-2xl border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step3.facebook')}</label>
                    <span className="text-[10px] text-slate-400 font-medium">{t('onboarding.step3.optional')}</span>
                  </div>
                  <div className="relative group">
                    <Facebook className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <Input placeholder="facebook.com/yourbrand" className="h-10 ps-10 rounded-2xl border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="space-y-2">
              <span className="text-blue-600 font-bold text-[9px] sm:text-xs tracking-widest uppercase">{t('onboarding.step4.goals_tag')}</span>
              <h2 className="text-2xl sm:text-4xl pt-2 font-serif font-medium text-slate-900 dark:text-white leading-tight">
                {t('onboarding.step4.title_main')}<span>{t('onboarding.step4.title_italic')}</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {t('onboarding.step4.subtitle')}
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{t('onboarding.step4.primary_goal')}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
                  {(t('onboarding.step4.goals', { returnObjects: true }) as any[]).map((goal, i) => {
                    const Icon = goals[i].icon;
                    const isSelected = formData.primaryGoal === goal.title;
                    return (
                      <button
                        key={goal.title}
                        onClick={() => updateFormData({ primaryGoal: goal.title })}
                        className={cn(
                          "p-4 sm:p-5 cursor-pointer rounded-2xl border-2 text-start transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500",
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200"
                        )}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={cn(
                            "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0",
                            isSelected ? "bg-white/20" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                          )}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm">{goal.title}</h4>
                            <p className={cn("text-[10px] sm:text-xs", isSelected ? "text-blue-100" : "text-slate-400")}>{goal.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('onboarding.step4.frequency')}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {(t('onboarding.step4.freq_options', { returnObjects: true }) as any[]).map((option, i) => {
                    const freq = frequencies[i];
                    const isSelected = formData.postingFrequency === freq.id;
                    return (
                      <button
                        key={freq.id}
                        onClick={() => updateFormData({ postingFrequency: freq.id })}
                        className={cn(
                          "relative p-6 cursor-pointer text-start rounded-lg sm:rounded-xl border-2 transition-all flex flex-col gap-1",
                          isSelected ? "border-blue-600 bg-blue-100 dark:bg-blue-900/30  shadow-xl shadow-blue-500/10" : "border-slate-100 hover:border-blue-200"
                        )}
                      >
                        {freq.popular && (
                          <span className="absolute -top-2 start-4 bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            {t('onboarding.step2.popular')}
                          </span>
                        )}
                        <Zap className={cn("w-5 h-5 mb-2", isSelected ? "text-blue-500" : "text-slate-300")} />
                        <h4 className="font-semibold text-slate-900 dark:text-slate-300">{option.title}</h4>
                        <p className="text-xs text-slate-500">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-900/30  border border-blue-100 dark:border-blue-500 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 flex items-center justify-center shadow-sm">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
                {t('onboarding.step4.automation_footer')}
              </p>
            </div>
          </motion.div>
        );
      default:
        return null;
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
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border border-blue-600/50 rounded-md sm:rounded-lg flex items-center justify-center">
                    <Highlighter className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-600" />
                  </div>
                  <span className="font-bold text-xs sm:text-base text-blue-600 dark:text-blue-600">{t('onboarding.brand_onboarding')}</span>
                </div>
                <span className="text-[8px] sm:text-[10px] font-medium text-slate-600 dark:text-slate-400 tracking-widest uppercase">
                  {t('onboarding.step_of', { current: currentStep, total: 4 })}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-2 h-1.5 w-full mb-10">
                {[1, 2, 3, 4].map(step => (
                  <div 
                    key={step} 
                    className={cn(
                      "flex-1 rounded-full transition-all duration-500",
                      currentStep >= step ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-800"
                    )} 
                  />
                ))}
              </div>

              {/* Main Content Card */}
              <Card className="border-none rounded-xl py-0 overflow-hidden bg-white dark:bg-slate-900">
                <CardContent className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    {renderStep()}
                  </AnimatePresence>

                  {/* Footer Actions */}
                  <div className="mt-6 pt-6 sm:mt-10 sm:pt-10 border-t border-slate-50 dark:border-slate-800 flex flex-col items-center gap-8">
                    <div className="flex w-full justify-between items-center">
                      <Button 
                        variant="ghost" 
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="rounded-lg cursor-pointer px-6 h-10 font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-transparent dark:hover:text-slate-200 dark:hover:bg-transparent disabled:opacity-20"
                      >
                        <ChevronLeft className={cn("w-4 h-4 mt-0.5", isRTL ? "ml-0.5 rotate-180" : "mr-0.5")} />
                        {t('onboarding.back')}
                      </Button>

                      <Button 
                        onClick={() => { if(isValid) nextStep(); }}
                        className={cn(
                          "rounded-lg cursor-pointer text-xs sm:text-base px-4 sm:px-10 h-10 font-medium transition-all active:scale-95 text-white",
                          isValid 
                            ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20" 
                            : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
                        )}
                      >
                        {currentStep === 4 ? t('onboarding.step4.build_profile') : t('onboarding.continue')}
                        <ChevronRight className={cn("w-5 h-5", isRTL ? "mr-0.5 rotate-180" : "ml-0.5")} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>  
    </section>
  );
};

export default OnboardingForm;
