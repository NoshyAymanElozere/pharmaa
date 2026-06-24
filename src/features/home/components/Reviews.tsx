"use client";
import React, { useState } from 'react';
import { useApp } from '../../../store/AppContext';
import { REVIEWS, PRODUCTS } from '../../../constants/data';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionTitle from '../../../components/shared/SectionTitle';

export default function Reviews() {
  const { language, user, setActivePage } = useApp();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [commentText, setCommentText] = useState('');
  const [selectedProdId, setSelectedProdId] = useState(PRODUCTS[0]?.id || '');

  const reviewsTitle = language === 'en' ? 'Verified Skin Testimonials' : 'شهادات عملاء موثقة';
  const reviewsSub = language === 'en' 
    ? 'Aura is integrated into the daily routines of over 50,000 global citizens.' 
    : 'أورا جزء أساسي في الروتين اليومي لأكثر من 50,000 عميل وعميلة.';
  const verifiedBuyer = language === 'en' ? 'Verified Aura Owner' : 'مشترٍ موثق';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    const selectedProd = PRODUCTS.find(p => p.id === selectedProdId) || PRODUCTS[0];

    const newReview = {
      id: `rev_user_${Date.now()}`,
      author: user.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      commentEn: commentText,
      commentAr: commentText,
      productNameEn: selectedProd.nameEn,
      productNameAr: selectedProd.nameAr,
      verified: true,
      helpfulCount: 0
    };

    setReviewsList([newReview, ...reviewsList]);
    setCommentText('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <SectionTitle
        subtitle={language === 'en' ? 'Aura Community Voice' : 'أصوات مجتمعنا الثمينة'}
        title={reviewsTitle}
        description={reviewsSub}
      />

      {/* Testimonials Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-brand-sage-light/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-sage-light/10">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-serif text-xs font-bold text-zinc-900">{rev.author}</h4>
                  <span className="text-[9px] text-emerald-600 font-semibold font-sans uppercase flex items-center tracking-wider gap-0.5">
                    <ShieldCheck size={9} />
                    {verifiedBuyer}
                  </span>
                </div>
              </div>

              {/* Commented out ratings stars per guidelines: */}
              {/* <div className="flex text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={11} className="fill-current" />
                ))}
              </div> */}
            </div>

            <p className="text-xs text-zinc-500 font-sans leading-relaxed flex-1 italic">
              “{language === 'en' ? rev.commentEn : rev.commentAr}”
            </p>

            <div>
              <span className="text-[9px] text-zinc-400 font-sans block pt-1 uppercase tracking-widest font-medium border-t border-zinc-100">
                {language === 'en' ? rev.productNameEn : rev.productNameAr}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Form Section */}
      {user ? (
        <form onSubmit={handleSubmit} className="bg-brand-cream/35 border border-brand-sage-light/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-4 mt-10">
          <h3 className="font-serif text-sm font-bold text-brand-primary uppercase tracking-wider pb-2 border-b border-brand-sage-light/10">
            {language === 'en' ? 'Share Your Skincare Testimonial' : 'شاركينا تجربتكِ مع مستحضرات أورا'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">
                {language === 'en' ? 'Select Product' : 'اختر المنتج'}
              </label>
              <select
                value={selectedProdId}
                onChange={(e) => setSelectedProdId(e.target.value)}
                className="input-field bg-white"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {language === 'en' ? prod.nameEn : prod.nameAr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">
                {language === 'en' ? 'Your Name' : 'اسمكِ'}
              </label>
              <input
                type="text"
                disabled
                value={user.name}
                className="input-field bg-zinc-100 cursor-not-allowed opacity-75 font-bold"
              />
            </div>
          </div>
          <div>
            <label className="input-label">
              {language === 'en' ? 'Your Experience / Comment' : 'تجربتكِ / تعليقكِ'}
            </label>
            <textarea
              required
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={language === 'en' ? 'Describe your skin transformation...' : 'صفي لنا كيف تغيرت بشرتكِ للأفضل بعد استخدام المنتج...'}
              className="input-field bg-white resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary w-full sm:w-auto">
              {language === 'en' ? 'Submit Testimonial' : 'إضافة تعليق'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-brand-cream/30 border border-brand-sage-light/15 rounded-2xl p-6 text-center max-w-md mx-auto mt-8 space-y-3">
          <ShieldCheck size={24} className="text-brand-sage-muted mx-auto" />
          <h4 className="font-serif text-xs font-bold text-brand-primary">
            {language === 'en' ? 'Share your Aura Experience' : 'شاركينا تجربتكِ مع أورا'}
          </h4>
          <p className="text-[11px] text-zinc-500 font-sans">
            {language === 'en' ? 'Sign in to add a testimonial about your skincare results.' : 'سجلي الدخول لإضافة شهادتكِ وتجربتكِ الخاصة مع منتجاتنا.'}
          </p>
          <button
            onClick={() => setActivePage('auth')}
            className="btn-secondary !py-2.5 !px-5 !text-[9px] cursor-pointer flex items-center justify-center mx-auto gap-1"
          >
            <span>{language === 'en' ? 'Log In / Sign Up' : 'تسجيل الدخول / إنشاء حساب'}</span>
            <ArrowRight size={10} className="rtl:rotate-180" />
          </button>
        </div>
      )}
    </section>
  );
}

