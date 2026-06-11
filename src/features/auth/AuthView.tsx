import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { Lock, Mail, User, ShieldCheck, ArrowRight, Chrome, Facebook, Info } from 'lucide-react';

export default function AuthView() {
  const { language, loginUser, registerUser, setActivePage } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Input States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Translations
  const t = {
    titleLoginEn: 'Enter Aura Haven',
    titleLoginAr: 'الدخول لبوابة أورا الشخصية',
    subLoginEn: 'Access your curated clinical skin routines and tracking dashboards.',
    subLoginAr: 'ادخلي حسابكِ لمراجعة روتينكِ المقترح ومتابعة الشحنات المبردة المجهزة.',
    titleRegEn: 'Create Aura Skincare Identity',
    titleRegAr: 'إنشاء حساب رعاية جديد',
    titleForgotEn: 'Recall Password',
    titleForgotAr: 'استعادة كلمة المرور المنسية',
    labelNameEn: 'Your Full Name',
    labelNameAr: 'الاسم رباعياً بالكامل',
    labelEmailEn: 'Professional Email',
    labelEmailAr: 'البريد الإلكتروني للعميل',
    labelPhoneEn: 'WhatsApp / Mobile Number',
    labelPhoneAr: 'رقم هاتف الجوال النشط',
    placeholderPassEn: 'Enter secure passphrase...',
    placeholderPassAr: 'أدخلي كلمة المرور الآمنة...',
    loginBtnEn: 'Sign In Account',
    loginBtnAr: 'تسجيل الدخول الآمن',
    registerBtnEn: 'Authorize New Account',
    registerBtnAr: 'إنشاء وتوثيق الحساب',
    forgotTitleBtnEn: 'Recover Passphrase',
    forgotTitleBtnAr: 'استرجاع كلمة المرور',
    noAccountEn: 'Never consulted with Aura yet? ',
    noAccountAr: 'ليس لديكِ حساب تجميلي مسبق؟ ',
    hasAccountEn: 'Already have an Aura account? ',
    hasAccountAr: 'لديكِ حساب بالفعل؟ ',
    createAccountEn: 'Create Account',
    createAccountAr: 'إنشاء حساب جديد',
    signInLinkEn: 'Sign In',
    signInLinkAr: 'تسجيل الدخول',
    backLinkEn: 'Back to Authentication',
    backLinkAr: 'العودة للخلف',
    socialHeaderEn: 'Or authorize with luxury partners',
    socialHeaderAr: 'أو الدخول الآمن بواسطة الشركاء الموثقين',
    forgotLinkEn: 'Forgot secure passphrase?',
    forgotLinkAr: 'نسيتِ كلمة المرور الآمنة لحسابكِ؟'
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg(language === 'en' ? 'Please supply all credentials.' : 'يرجى تقديم بيانات الاعتماد كاملة.');
      return;
    }

    loginUser(email, 'Serene Al-Ghamdi');
    setSuccessMsg(language === 'en' ? 'Signed in successfully!' : 'تم تسجيل الدخول بنجاح!');
    setTimeout(() => {
      setActivePage('profile');
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name || !email || !phone) {
      setErrorMsg(language === 'en' ? 'All fields are mandatory.' : 'جميع الحقول مطلوبة.');
      return;
    }

    registerUser(name, email, phone);
    setSuccessMsg(language === 'en' ? 'Account built successfully! Welcome to AURA.' : 'تم إنشاء حسابكِ بنجاح! أهلاً بكِ في عائلة أورا.');
    setTimeout(() => {
      setActivePage('profile');
    }, 1500);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email) {
      setErrorMsg(language === 'en' ? 'Please supply your email.' : 'يرجى تقديم البريد الإلكتروني.');
      return;
    }

    setSuccessMsg(language === 'en' ? 'Recovery sequence dispatched to inbox!' : 'تم إرسال تعليمات الاستعادة لبريدكِ الإلكتروني!');
    setAuthMode('login');
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      
      {/* Container Box */}
      <div className="bg-white rounded-3xl p-8 border border-brand-sage-light/10 shadow-sm space-y-6 font-sans text-xs text-zinc-650">
        
        {/* Title Dynamic Header */}
        <div className="text-center space-y-1.5">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
            {authMode === 'login' && (language === 'en' ? t.titleLoginEn : t.titleLoginAr)}
            {authMode === 'register' && (language === 'en' ? t.titleRegEn : t.titleRegAr)}
            {authMode === 'forgot' && (language === 'en' ? t.titleForgotEn : t.titleForgotAr)}
          </h2>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans max-w-xs mx-auto">
            {authMode === 'login' && (language === 'en' ? t.subLoginEn : t.subLoginAr)}
          </p>
        </div>

        {/* Notices */}
        {errorMsg && (
          <p className="p-3 bg-red-50 text-red-700 font-semibold rounded-xl border border-red-100">{errorMsg}</p>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-100 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 block">{language === 'en' ? t.labelEmailEn : t.labelEmailAr}</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-zinc-800 font-mono shadow-inner"
                />
                <Mail className="absolute left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 block">{language === 'en' ? 'Passphrase' : 'كلمة المرور'}</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder={language === 'en' ? t.placeholderPassEn : t.placeholderPassAr}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-zinc-805 shadow-inner"
                />
                <Lock className="absolute left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              </div>

              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className="text-[10px] text-zinc-400 hover:text-brand-primary hover:underline font-semibold block pt-1.5 cursor-pointer"
              >
                {language === 'en' ? t.forgotLinkEn : t.forgotLinkAr}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-cream py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-center transition-theme cursor-pointer"
            >
              {language === 'en' ? t.loginBtnEn : t.loginBtnAr}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 block">{language === 'en' ? t.labelNameEn : t.labelNameAr}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-zinc-800 shadow-inner"
                />
                <User className="absolute left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 block">{language === 'en' ? t.labelEmailEn : t.labelEmailAr}</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="client@aura.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-zinc-800 font-mono shadow-inner"
                />
                <Mail className="absolute left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 block">{language === 'en' ? t.labelPhoneEn : t.labelPhoneAr}</label>
              <input
                type="tel"
                required
                placeholder="+966 5x xxx xxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-3 px-4 text-zinc-850 shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-cream py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-center transition-theme cursor-pointer"
            >
              {language === 'en' ? t.registerBtnEn : t.registerBtnAr}
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 block">{language === 'en' ? t.labelEmailEn : t.labelEmailAr}</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-3 px-4 shadow-inner text-zinc-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-cream py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-center transition-theme cursor-pointer"
            >
              {language === 'en' ? t.forgotTitleBtnEn : t.forgotTitleBtnAr}
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="text-xs text-center font-semibold text-zinc-500 hover:text-brand-primary block w-full pt-1.5 cursor-pointer"
            >
              {language === 'en' ? t.backLinkEn : t.backLinkAr}
            </button>
          </form>
        )}

        {/* Toggle option login vs register switcher links */}
        {authMode !== 'forgot' && (
          <div className="text-center pt-2">
            {authMode === 'login' ? (
              <p className="text-zinc-500 font-sans text-[11px]">
                {language === 'en' ? t.noAccountEn : t.noAccountAr}
                <button
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-brand-primary hover:underline cursor-pointer"
                >
                  {language === 'en' ? t.createAccountEn : t.createAccountAr}
                </button>
              </p>
            ) : (
              <p className="text-zinc-500 font-sans text-[11px]">
                {language === 'en' ? t.hasAccountEn : t.hasAccountAr}
                <button
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-brand-primary hover:underline cursor-pointer"
                >
                  {language === 'en' ? t.signInLinkEn : t.signInLinkAr}
                </button>
              </p>
            )}
          </div>
        )}

        {/* SOCIAL AUTH BUTTONS BAR */}
        <div className="pt-6 border-t border-zinc-100 space-y-3">
          <span className="block text-center text-[10px] text-zinc-400 uppercase font-semibold tracking-wider font-sans">
            {language === 'en' ? t.socialHeaderEn : t.socialHeaderAr}
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginUser('google@aura.com', 'Google Client Partner');
                setSuccessMsg('Authenticated smoothly via Google security context!');
                setTimeout(() => setActivePage('profile'), 1200);
              }}
              className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 py-3.5 px-4 rounded-xl font-bold flex items-center justify-center space-x-2.5 rtl:space-x-reverse cursor-pointer transition-colors"
            >
              <Chrome size={14} className="text-red-500" />
              <span className="font-sans text-[10px]">Google</span>
            </button>
            <button
              type="button"
              onClick={() => {
                loginUser('facebook@aura.com', 'Aura Social Member');
                setSuccessMsg('Authenticated smoothly via Facebook security context!');
                setTimeout(() => setActivePage('profile'), 1200);
              }}
              className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 py-3.5 px-4 rounded-xl font-bold flex items-center justify-center space-x-2.5 rtl:space-x-reverse cursor-pointer transition-colors"
            >
              <Facebook size={14} className="text-blue-600" />
              <span className="font-sans text-[10px]">Facebook</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
