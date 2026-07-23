'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navbar
    navHome: 'الرئيسية',
    navAbout: 'عن العيادة',
    navServices: 'الخدمات والعلاجات',
    navContact: 'اتصل بنا',
    navBookNow: 'احجز الآن',

    // Hero
    heroBadge: 'أحدث تقنيات طب الأسنان الرقمية لابتسامة مشرقّة',
    heroTitlePart1: 'ابتسامتك الناصعة تبدأ من',
    heroTitlePart2: 'عيادة الأسنان',
    heroSubtitle:
      'نقدم رعاية طبية تخصصية متكاملة لجميع الفئات العمرية بأحدث التقنيات الأوروبية والمعايير العالمية، بدون ألم وبأعلى درجات التعقيم.',
    heroCtaBook: 'احجز الآن',
    heroCtaDoctors: 'تعرف على أطبائنا',
    statPatients: '+12,000 مريض راضٍ',
    statExp: '+15 سنة خبرة تخصصية',
    statSteril: '100% تعقيم وحماية',
    heroFloatCardTitle: 'أعلى درجات الأمان',
    heroFloatCardSubtitle: 'أجهزة تعقيم بالبخار المضغوط',

    // Services
    servicesBadge: 'خدماتنا العلاجية والتجميلية',
    servicesTitle: 'علاجات متطورة تلبي كافة احتياجات أسنانك',
    servicesSubtitle:
      'اختر الخدمة الطبية المناسبة واطلع على التفاصيل والسعر والمدة التقديرية واحجز موعدك فوراً',
    servicesSearchPlaceholder: 'ابحث عن علاج أو خدمة أسنان...',
    servicesBookBtn: 'حجز الخدمة',
    servicesEstPrice: 'السعر التقديري',
    servicesDuration: 'دقيقة',

    // Doctors
    doctorsBadge: 'فريقنا الطبي المتميز',
    doctorsTitle: 'نخبة من كبار أخصائيي وطب الأسنان',
    doctorsSubtitle:
      'نمتلك طاقماً طبيًا متكاملاً يحمل أعلى الشهادات الأكاديمية والخبرات العالمية في الجراحة والتجميل والتقويم',
    doctorsYearsExp: 'خبرة',
    doctorsYears: 'سنوات',
    doctorsCerts: 'الشهادات والاعتمادات:',

    // Quality
    qualityTitle: 'لماذا تختار "عيادة الأسنان"؟',
    qualitySubtitle: 'مقومات الجودة التي تجعلنا الخيار الأول لآلاف العائلات',
    qualitySterilTitle: 'تعقيم بنسبة 100%',
    qualitySterilDesc:
      'نطبق أدق بروتوكولات التعقيم الألمانية لكل أداة وطاولة علاجية لضمان سلامة المرضى التامة.',
    qualityPainfreeTitle: 'تقنيات علاج بدون ألم',
    qualityPainfreeDesc:
      'استخدام التخدير الرقمي والليزر الطبي الحديث يضمن لك جلسة علاجية مريحة وخالية من الخوف.',
    qualityFollowupTitle: 'متابعة واستشارات مستمرة',
    qualityFollowupDesc:
      'فريقنا يتابع حالة المريض حتى بعد انتهاء العلاج لضمان أفضل النتائج والراحة التامة.',

    // Testimonials
    testimonialsBadge: 'آراء ومراجعات المرضى',
    testimonialsTitle: 'ماذا يقول مرضانا عنا؟',

    // Quick CTA
    ctaBannerTitle: 'هل أنت جاهز لاكتساب ابتسامة جديدة؟',
    ctaBannerSubtitle:
      'احجز موعدك الآن بسهولة عبر نموذج الحجز المباشر وسيتواصل معك طاقمنا لتأكيد الوقت المناسب لك',
    ctaBannerBtn: 'احجز موعدك الآن',

    // Booking Form
    bookingModalTitle: 'حجز موعد جديد في العيادة',
    bookingModalDesc:
      'يرجى ملء كافة البيانات التالية بدقة وسيصلك اتصال من فريقنا لتأكيد الموعد النهائي',
    formFirstName: 'الاسم الأول',
    formLastName: 'اللقب',
    formAge: 'العمر',
    formPhone: 'رقم الهاتف (جزائري)',
    formPhoneHelper: 'يجب أن يتكون من 10 أرقام ويبدأ بـ 05 أو 06 أو 07',
    formService: 'الخدمة المطلوبة',
    formSelectServicePlaceholder: 'اختر الخدمة المطلوبة',
    formEstCost: 'التكلفة التقريبية:',
    formEstDuration: 'المدة التقديرية:',
    formPreferredDate: 'التاريخ المفضل',
    formPreferredTime: 'التوقيت المفضل',
    formNotes: 'ملاحظات إضافية (اختياري)',
    formSubmitBtn: 'إرسال طلب الحجز',
    bookingSuccessTitle: 'تم تسجيل الموعد بنجاح',
    bookingSuccessNotice:
      'تم تقديم طلب الحجز الخاص بك بنجاح، وسنتصل بك قريباً عبر الهاتف لتأكيد الموعد.',
    bookingAnotherBtn: 'حجز موعد آخر',

    // Footer
    footerBrandDesc:
      'مركز طبي متخصص في أحدث تقنيات طب وتجميل الأسنان وزراعة الأسنان الرقمية، نلتزم بتوفير أعلى معايير الجودة والتعقيم والراحة لمحيانا.',
    footerSterilText: 'معايير تعقيم أوروبية متطورة',
    footerQuickLinks: 'روابط سريعة',
    footerHoursHeader: 'أوقات العمل الرسمية',
    footerHoursSatThu: 'السبت - الخميس: 08:00 ص - 05:00 م',
    footerHoursFri: 'الجمعة: مغلق (عطلة رسمية)',
    footerEmergency: 'حالات الطوارئ متوفرة باتصال مسبق',
    footerContactHeader: 'تواصل مباشر',
    footerAddress: 'شارع الاستقلال، وسط المدينة، الجزائر العاصمة',
    footerRights: 'جميع الحقوق محفوظة.',

    // About Page
    aboutMissionBadge: 'من نحن ورسالتنا',
    aboutTitle: 'التميز في طب وتجميل الأسنان',
    aboutSubtitle:
      'تأسست "عيادة الأسنان" لتكون صرحاً طبياً متكاملاً يقدم أحدث الحلول العلاجية والتجميلية في الجزائر بأرقى المستويات العالمية وبالاعتماد على التكنولوجيا الرقمية الحديثة.',
    aboutVisionTitle: 'رؤيتنا الطبية',
    aboutVisionDesc:
      'نسعى دائماً لتوفير بيئة علاجية مريحة وخالية تماماً من الخوف أو الألم، نركز على الوقاية والتجميل ورضا المريض الكامل من خلال متابعة أدق التفاصيل الطبية والتجميلية.',
    aboutValuesTitle: 'قيمنا الجوهرية',
    aboutVal1: 'الأمان التام والتعقيم الموثوق بأحدث الأجهزة',
    aboutVal2: 'الشفافية في التشخيص وتحديد تكلفة وخطة العلاج',
    aboutVal3: 'مواكبة أحدث التطورات والتقنيات الرقمية العالمية',

    // Contact Page
    contactTitle: 'تواصل مع فريقنا الطبي',
    contactSubtitle:
      'نحن هنا للإجابة على جميع استفساراتك وتقديم الدعم والمعلومات الطبية اللازمة',
    contactPhoneTitle: 'الهاتف والحالات الطارئة',
    contactAddressTitle: 'عنوان العيادة',
    contactHoursTitle: 'ساعات العمل الرسمية',
  },
  en: {
    // Navbar
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services & Treatments',
    navContact: 'Contact Us',
    navBookNow: 'Book Now',

    // Hero
    heroBadge: 'Advanced Digital Dentistry for a Brighter Smile',
    heroTitlePart1: 'Your Radiant Smile Begins at',
    heroTitlePart2: 'Dental Clinic',
    heroSubtitle:
      'Providing specialized dental care for all age groups using European technology and international standards—painless with 100% sterilization.',
    heroCtaBook: 'Book Appointment',
    heroCtaDoctors: 'Meet Our Doctors',
    statPatients: '+12,000 Satisfied Patients',
    statExp: '+15 Years Experience',
    statSteril: '100% Sterilization',
    heroFloatCardTitle: 'Highest Safety Standards',
    heroFloatCardSubtitle: 'Autoclave Steam Sterilizers',

    // Services
    servicesBadge: 'Our Treatments & Procedures',
    servicesTitle: 'Advanced Treatments Tailored to Your Needs',
    servicesSubtitle:
      'Select a procedure to view details, estimated pricing, and duration, then book instantly.',
    servicesSearchPlaceholder: 'Search for a treatment or service...',
    servicesBookBtn: 'Book Treatment',
    servicesEstPrice: 'Estimated Cost',
    servicesDuration: 'min',

    // Doctors
    doctorsBadge: 'Our Medical Team',
    doctorsTitle: 'Leading Specialists in Dental Surgery & Care',
    doctorsSubtitle:
      'A dedicated multidisciplinary team holding top academic credentials and international expertise in surgery, cosmetics, and orthodontics.',
    doctorsYearsExp: 'Experience',
    doctorsYears: 'years',
    doctorsCerts: 'Certifications & Credentials:',

    // Quality
    qualityTitle: 'Why Choose Dental Clinic?',
    qualitySubtitle: 'Quality pillars that make us the first choice for thousands of families.',
    qualitySterilTitle: '100% Sterilization',
    qualitySterilDesc:
      'Strict German sterilization protocols applied to every instrument and treatment chair.',
    qualityPainfreeTitle: 'Painless Treatments',
    qualityPainfreeDesc:
      'Digital anesthesia and modern medical lasers ensure comfortable, anxiety-free sessions.',
    qualityFollowupTitle: 'Continuous Care & Follow-up',
    qualityFollowupDesc:
      'Our team provides dedicated follow-up after treatments for lasting results and peace of mind.',

    // Testimonials
    testimonialsBadge: 'Patient Reviews',
    testimonialsTitle: 'What Our Patients Say',

    // Quick CTA
    ctaBannerTitle: 'Ready to Get Your Brand New Smile?',
    ctaBannerSubtitle:
      'Book your appointment online easily and our team will contact you to confirm the best time for your visit.',
    ctaBannerBtn: 'Book Your Visit Now',

    // Booking Form
    bookingModalTitle: 'Book a New Appointment',
    bookingModalDesc:
      'Please fill out the following details accurately and our team will call you to confirm your exact date.',
    formFirstName: 'First Name',
    formLastName: 'Last Name',
    formAge: 'Age',
    formPhone: 'Phone Number (Algeria)',
    formPhoneHelper: 'Must be 10 digits starting with 05, 06, or 07',
    formService: 'Select Treatment',
    formSelectServicePlaceholder: 'Choose desired treatment',
    formEstCost: 'Estimated Cost:',
    formEstDuration: 'Estimated Duration:',
    formPreferredDate: 'Preferred Date',
    formPreferredTime: 'Preferred Time',
    formNotes: 'Additional Notes (Optional)',
    formSubmitBtn: 'Submit Appointment Request',
    bookingSuccessTitle: 'Appointment Request Registered!',
    bookingSuccessNotice:
      'Your appointment request has been successfully submitted. We will contact you shortly by phone to confirm your date.',
    bookingAnotherBtn: 'Book Another Appointment',

    // Footer
    footerBrandDesc:
      'Specialized dental center utilizing digital dentistry and cosmetic care. Committed to top quality standards and patient comfort.',
    footerSterilText: 'Advanced European Sterilization Standards',
    footerQuickLinks: 'Quick Links',
    footerHoursHeader: 'Official Working Hours',
    footerHoursSatThu: 'Saturday - Thursday: 08:00 AM - 05:00 PM',
    footerHoursFri: 'Friday: Closed',
    footerEmergency: 'Emergency care available upon prior phone contact',
    footerContactHeader: 'Direct Contact',
    footerAddress: 'Independence Street, City Center, Algiers',
    footerRights: 'All rights reserved.',

    // About Page
    aboutMissionBadge: 'Who We Are & Our Mission',
    aboutTitle: 'Excellence in Dental Care & Cosmetics',
    aboutSubtitle:
      'Dental Clinic was founded as an integrated medical facility offering modern therapeutic and cosmetic solutions in Algeria according to top international standards.',
    aboutVisionTitle: 'Our Medical Vision',
    aboutVisionDesc:
      'We constantly strive to provide a comfortable, anxiety-free environment focusing on prevention, cosmetic perfection, and complete patient satisfaction.',
    aboutValuesTitle: 'Core Values',
    aboutVal1: 'Absolute safety and certified sterilization equipment',
    aboutVal2: 'Complete transparency in diagnosis, treatment plans, and pricing',
    aboutVal3: 'Adopting the latest global digital dentistry innovations',

    // Contact Page
    contactTitle: 'Contact Our Medical Team',
    contactSubtitle: 'We are here to answer all your questions and provide medical information.',
    contactPhoneTitle: 'Phone & Emergency',
    contactAddressTitle: 'Clinic Address',
    contactHoursTitle: 'Working Hours',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.ar) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    const savedLang = localStorage.getItem('dental_clinic_lang') as Language;
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dental_clinic_lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: keyof typeof translations.ar): string => {
    return translations[language][key] || translations['ar'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
