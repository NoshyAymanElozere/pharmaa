import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { Mail, Instagram, ShieldCheck, HelpCircle, Truck, Heart } from 'lucide-react';

export default function Footer() {
  const { language, setActivePage } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const t = {
    newsletterTitleEn: 'Subscribe to our Skin Journal',
    newsletterTitleAr: 'اشتركي في مجلة أورا للبشرة',
    newsletterSubEn: 'Receive expert advice, product launches, and exclusive member-only pricing.',
    newsletterSubAr: 'احصلي على نصائح الخبراء وتنبيهات المنتجات الجديدة وأسعار خاصة بالأعضاء فقط.',
    emailPlaceholderEn: 'Enter your email address...',
    emailPlaceholderAr: 'أدخلي بريدكِ الإلكتروني...',
    subscribeEn: 'Subscribe',
    subscribeAr: 'اشتراك',
    successEn: 'Perfectly Subscribed! Check your inbox for 10% off coupon code: GLOWGLOW.',
    successAr: 'تم الاشتراك بنجاح! تفقد بريدكِ للحصول على خصم 10٪ بكود: GLOWGLOW.',
    aboutEn: 'Aura Laboratories was founded to offer high-efficacy, plant-derived, clinically sound skincare options for complex climates.',
    aboutAr: 'تأسست مختبرات أورا لتقديم حلول عناية للبشرة عالية الفعالية، مستخلصة من الطبيعة ومبنية على أسس سريرية لتناسب الأجواء المختلفة.',
    companyEn: 'Company',
    companyAr: 'الشركة',
    serviceEn: 'Customer Support',
    serviceAr: 'خدمة العملاء',
    paymentEn: '100% Secure Payment',
    paymentAr: 'دفع آمن 100٪',
    allRightsEn: '© 2026 AURA Laboratories. All designs are registered trademarks.',
    allRightsAr: '© 2026 مختبرات أورا الطبية. جميع التصاميم وحقوق الطبع محفوظة.'
  };

  const menuCompany = [
    { titleEn: 'About Us', titleAr: 'من نحن', page: 'developer-specs' },
    { titleEn: 'Contact Us', titleAr: 'اتصلي بنا', page: 'home' },
    { titleEn: 'FAQ', titleAr: 'الأسئلة الشائعة', page: 'home' },
    { titleEn: 'Privacy Policy', titleAr: 'سياسة الخصوصية', page: 'home' },
    { titleEn: 'Terms of Service', titleAr: 'الشروط والأحكام', page: 'home' }
  ];

  const menuSupport = [
    { titleEn: 'Shipping Guide', titleAr: 'دليل الشحن والتوصيل', page: 'home' },
    { titleEn: 'Luxury Returns', titleAr: 'المرتجعات والبدائل الفاخرة', page: 'home' },
    { titleEn: 'Custom Skin Assessment', titleAr: 'تقييم مخصص للبشرة', page: 'home' },
    { titleEn: 'Direct Live Chat', titleAr: 'دردشة مباشرة مع الخبراء', page: 'home' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-brand-primary text-brand-cream pt-16 pb-8 border-t border-brand-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div id="newsletter-section" className="pb-12 border-b border-brand-secondary/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="font-serif text-2xl font-bold tracking-wide">
              {language === 'en' ? t.newsletterTitleEn : t.newsletterTitleAr}
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm max-w-lg font-sans">
              {language === 'en' ? t.newsletterSubEn : t.newsletterSubAr}
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-brand-secondary/50 border border-brand-sage-light/30 rounded-2xl p-4.5 text-center text-xs tracking-wider text-brand-sage-light animate-in fade-in duration-200">
                {language === 'en' ? t.successEn : t.successAr}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder={language === 'en' ? t.emailPlaceholderEn : t.emailPlaceholderAr}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-brand-secondary/40 border border-brand-sage-muted/30 focus:border-brand-sage-light rounded-xl py-3 px-4 text-xs font-sans text-brand-cream focus:outline-none placeholder:text-zinc-400 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-brand-sage-light text-brand-primary hover:bg-white font-semibold rounded-xl text-xs py-3 px-6 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {language === 'en' ? t.subscribeEn : t.subscribeAr}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Logo / Brand Intro */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-brand-cream">AURA</span>
              <span className="font-sans text-[7px] tracking-[0.4em] text-brand-sage-light -mt-1">LABORATORIES</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xs font-sans">
              {language === 'en' ? t.aboutEn : t.aboutAr}
            </p>
            <div className="flex space-x-3 rtl:space-x-reverse pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-brand-sage-light transition-colors p-1.5 bg-brand-secondary/30 rounded-full">
                <Instagram size={16} />
              </a>
              <a href="mailto:expert@aura.com" className="text-zinc-300 hover:text-brand-sage-light transition-colors p-1.5 bg-brand-secondary/30 rounded-full">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wide text-brand-sage-light uppercase">
              {language === 'en' ? t.companyEn : t.companyAr}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans">
              {menuCompany.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActivePage(item.page)}
                    className="hover:text-brand-cream hover:underline underline-offset-4 transition-colors text-left cursor-pointer"
                  >
                    {language === 'en' ? item.titleEn : item.titleAr}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wide text-brand-sage-light uppercase">
              {language === 'en' ? t.serviceEn : t.serviceAr}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans">
              {menuSupport.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActivePage(item.page)}
                    className="hover:text-brand-cream hover:underline underline-offset-4 transition-colors text-left cursor-pointer"
                  >
                    {language === 'en' ? item.titleEn : item.titleAr}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantee Badges */}
          <div className="space-y-4 bg-brand-secondary/15 rounded-2xl p-4 border border-brand-secondary/35">
            <h4 className="font-serif text-xs font-bold tracking-widest text-brand-sage-light uppercase flex items-center">
              <ShieldCheck className="mr-1.5 rtl:ml-1.5" size={14} />
              {language === 'en' ? t.paymentEn : t.paymentAr}
            </h4>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
              {language === 'en'
                ? 'Your transactional security is prioritized. Express checkout accepts Apple Pay, Google Pay, and robust encrypted credit payments.'
                : 'أمان معاملاتكِ المالية هو أولويتنا الأولى. ندعم الدفع عن طريق فيزا، ماستركارد، آبل باي والدفع عند الاستلام.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-brand-secondary/40 rounded px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold font-sans text-brand-sage-light border border-brand-sage-muted/20">Visa</span>
              <span className="bg-brand-secondary/40 rounded px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold font-sans text-brand-sage-light border border-brand-sage-muted/20">Mastercard</span>
              <span className="bg-brand-secondary/40 rounded px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold font-sans text-brand-sage-light border border-brand-sage-muted/20">Apple Pay</span>
              <span className="bg-brand-secondary/40 rounded px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold font-sans text-brand-sage-light border border-brand-sage-muted/20">COD</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-brand-secondary/20 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] text-zinc-400 font-sans">
            {language === 'en' ? t.allRightsEn : t.allRightsAr}
          </p>
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-[10px] text-zinc-400 font-sans">
            <span>Made with passion for healthy skin</span>
            <Heart size={8} className="text-brand-sage-light fill-brand-sage-light animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
