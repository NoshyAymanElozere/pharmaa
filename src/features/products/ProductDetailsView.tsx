import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { PRODUCTS } from '../../constants/data';
import { Star, Heart, Plus, Minus, ShieldCheck, HelpCircle, ArrowRight, CornerDownLeft, Sparkles, Check, Info } from 'lucide-react';
import { Product } from '../../types';

export default function ProductDetailsView() {
  const {
    language,
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setActivePage
  } = useApp();

  // Guard if no product selected
  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-zinc-650 font-serif">Select a luxury formulation to inspect.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 bg-brand-primary text-brand-cream text-xs font-semibold py-3 px-6 rounded-xl uppercase tracking-wider cursor-pointer"
        >
          Go To Collections
        </button>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'how' | 'shipping'>('desc');
  const [activeImage, setActiveImage] = useState(selectedProduct.image);
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(wishlist.includes(selectedProduct.id));

  // Frequently bought together states
  const bundleMatch1 = PRODUCTS.find((p) => p.id !== selectedProduct.id && p.categorySlug === 'serums') || PRODUCTS[0];
  const bundleMatch2 = PRODUCTS.find((p) => p.id !== selectedProduct.id && p.id !== bundleMatch1.id && p.categorySlug === 'moisturizers') || PRODUCTS[1];

  const [buyMatch1, setBuyMatch1] = useState(true);
  const [buyMatch2, setBuyMatch2] = useState(false);

  useEffect(() => {
    setActiveImage(selectedProduct.image);
    setQuantity(1);
    setIsWished(wishlist.includes(selectedProduct.id));
  }, [selectedProduct, wishlist]);

  const hasDiscount = selectedProduct.discountPrice !== undefined;
  const currentPrice = selectedProduct.discountPrice ?? selectedProduct.price;

  // Bundle calculations
  let bundleSubtotal = currentPrice;
  if (buyMatch1) bundleSubtotal += bundleMatch1.discountPrice ?? bundleMatch1.price;
  if (buyMatch2) bundleSubtotal += bundleMatch2.discountPrice ?? bundleMatch2.price;

  const bundleDiscount = Math.round(bundleSubtotal * 0.1); // 10% bundle discount
  const bundleTotal = bundleSubtotal - bundleDiscount;

  const handleAddBundleToCart = () => {
    // Add current
    addToCart(selectedProduct, selectedProduct.size, 1);
    // Add matches if checked
    if (buyMatch1) addToCart(bundleMatch1, bundleMatch1.size, 1);
    if (buyMatch2) addToCart(bundleMatch2, bundleMatch2.size, 1);

    setActivePage('cart');
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedProduct.size, quantity);
    setActivePage('checkout');
  };

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Related products (limit to same category, max 3)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === selectedProduct.categorySlug && p.id !== selectedProduct.id
  ).slice(0, 3);

  // Translations
  const t = {
    ratingLabelEn: 'Dermatologist Evaluated',
    ratingLabelAr: 'تم التقييم من أطباء جلدية',
    sizeLabelEn: 'Net Volume',
    sizeLabelAr: 'الحجم الصافي',
    stockInEn: 'In Stock • Ships Temperature Controlled',
    stockInAr: 'متوفر • شحن مبرد طبيعي آمن',
    buyNowEn: 'Instant Buy Now',
    buyNowAr: 'شراء فوري سريع',
    addToBagEn: 'Add Routine Bag',
    addToBagAr: 'أضيفي للحقيبة التجميلية',
    benefitsTitleEn: 'Clinical Benefits:',
    benefitsTitleAr: 'الفوائد السريرية المثبتة:',
    descriptionEn: 'Clinical Profile',
    descriptionAr: 'الملف الطبي المعتمد',
    ingredientsEn: 'Ingredients Spec',
    ingredientsAr: 'المكونات بالتفصيل',
    howToUseEn: 'Application Ritual',
    howToUseAr: 'طقوس الاستخدام والجرعة',
    shippingTabEn: 'Shipping & Returns',
    shippingTabAr: 'الشحن الفاخر والضمان',
    shippingDescEn: 'We dispatch all potions inside insulated white presentation boxes equipped with cooling cells. Hand-delivered across KSA and UAE doors within 3-4 working days. Aura offers free luxury exchanges on pristine items within 14 days.',
    shippingDescAr: 'نقوم بشحن جميع المنتجات والجرعات بداخل صناديق بيضاء فاخرة معزولة ومجهزة بخلايا تبريد لحماية المواد. يتم التوصيل والتسليم لباب منزلكِ في غضون 3-4 أيام عمل. نوفر ميزة الاستبدال أو الاسترجاع الفاخر خلال 14 يوماً من الاستلام.',
    bundleTitleEn: 'Frequently Bought Together',
    bundleTitleAr: 'مجموعة التآزر المقترحة (الترطيب المتكامل)',
    bundleSubEn: 'Activate maximum therapeutic skin repair with synergy. Save 10% on this complete selection.',
    bundleSubAr: 'نشطي روتين العلاج والترميم الأقصى بتوفير 10٪ على هذا المستحضر والمكملات المتناسقة معه.',
    addBundleBtnEn: 'Add Selection to Routine (Save 10%)',
    addBundleBtnAr: 'أضيفي المجموعة للحقيبة (توفير 10٪)',
    relatedTitleEn: 'You May Also Consult',
    relatedTitleAr: 'منتجات أخرى قد تهمكِ أيضاً',
    relatedSubtitleEn: 'Explore complementing elixirs in our pharmacy line.',
    relatedSubtitleAr: 'استكشفي تركيبات تكميلية دقيقة لبشرة ممتازة.',
    aed: language === 'en' ? 'AED/SAR' : 'ريال',
    saveEn: 'Save',
    saveAr: 'توفير'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Product Card Upper Half: Gallery + Info Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-brand-sage-light/10 shadow-sm">
        
        {/* LEFT COMPONENT: GALLERY SYSTEM */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-start">
          {/* Large display screen */}
          <div className="w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden bg-zinc-50 border border-brand-sage-light/20 p-2 relative">
            <img
              src={activeImage}
              alt={selectedProduct.nameEn}
              className="w-full h-full object-cover rounded-xl transition-all duration-300"
            />
          </div>

          {/* Carousel thumbnails */}
          {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0 && (
            <div className="flex space-x-3.5 rtl:space-x-reverse overflow-x-auto pb-2 scrollbar-thin">
              {selectedProduct.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden border-2 p-0.5 bg-white transition-all cursor-pointer ${
                    activeImage === img ? 'border-brand-primary scale-103' : 'border-zinc-200 hover:border-brand-sage-muted'
                  }`}
                >
                  <img src={img} alt="Cosmetics thumbnail view" className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COMPONENT: INFO DESCRIPTIONS PANEL */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category Breadcrumb */}
            <span className="text-[10px] tracking-widest font-bold text-brand-sage-muted uppercase block">
              {language === 'en' ? `Collections / ${selectedProduct.categorySlug}` : `مجموعات / ${selectedProduct.categorySlug}`}
            </span>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
              {language === 'en' ? selectedProduct.nameEn : selectedProduct.nameAr}
            </h1>

            {/* Product Subtitle */}
            <p className="text-zinc-650 text-xs sm:text-sm font-sans italic leading-relaxed">
              {language === 'en' ? selectedProduct.subtitleEn : selectedProduct.subtitleAr}
            </p>

            {/* Rating Stars row */}
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse pt-1 pb-1">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-zinc-200'}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-zinc-900 font-sans">{selectedProduct.rating}</span>
              <span className="text-zinc-300">|</span>
              <span className="text-xs text-zinc-500 font-sans">
                {selectedProduct.reviewCount} {language === 'en' ? t.ratingLabelEn : t.ratingLabelAr}
              </span>
            </div>

            {/* Price display card */}
            <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-sage-light/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-zinc-400 block uppercase font-bold mb-1 font-sans">{language === 'en' ? 'Aura pricing' : 'السعر المعتمد'}</span>
                <div className="flex items-baseline space-x-2.5 rtl:space-x-reverse">
                  {hasDiscount ? (
                    <>
                      <span className="text-brand-primary text-2xl font-bold font-sans">
                        {selectedProduct.discountPrice} {t.aed}
                      </span>
                      <span className="text-zinc-400 text-sm line-through font-sans">
                        {selectedProduct.price} {t.aed}
                      </span>
                      <span className="bg-red-50 text-red-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded font-sans">
                        {t.saveEn} {selectedProduct.price - (selectedProduct.discountPrice ?? 0)} {t.aed}
                      </span>
                    </>
                  ) : (
                    <span className="text-brand-primary text-2xl font-bold font-sans">
                      {selectedProduct.price} {t.aed}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-zinc-400 block uppercase font-bold mb-1 font-sans">
                  {language === 'en' ? t.sizeLabelEn : t.sizeLabelAr}
                </span>
                <span className="text-xs font-bold text-zinc-800 bg-white border border-brand-sage-light/30 px-3 py-1.5 rounded-lg inline-block font-sans">
                  {selectedProduct.size}
                </span>
              </div>
            </div>

            {/* Stock and Temperature compliance tag */}
            <span className="flex items-center space-x-1.5 rtl:space-x-reverse text-emerald-700 text-[10px] font-bold uppercase tracking-wider font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>{language === 'en' ? t.stockInEn : t.stockInAr}</span>
            </span>

            {/* Key Clinical Benefits layout */}
            <div className="space-y-2 pt-2">
              <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
                {language === 'en' ? t.benefitsTitleEn : t.benefitsTitleAr}
              </h4>
              <ul className="grid grid-cols-1 gap-1.5 font-sans">
                {(language === 'en' ? selectedProduct.benefitsEn : selectedProduct.benefitsAr).map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-zinc-700">
                    <Check className="text-emerald-600 mr-2 rtl:ml-2 flex-shrink-0 mt-0.5" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ADD AND ACCELERATED ACTIONS CONTAINER */}
          <div className="pt-4 border-t border-brand-sage-light/10 space-y-3">
            <div className="flex space-x-4 rtl:space-x-reverse">
              {/* Counter Step Picker */}
              <div className="flex items-center border-2 border-brand-sage-light/30 rounded-xl bg-zinc-50 font-sans">
                <button
                  onClick={decrementQty}
                  className="p-3 text-zinc-500 hover:text-brand-primary cursor-pointer h-full"
                >
                  <Minus size={14} />
                </button>
                <span className="px-5 text-sm font-bold text-zinc-900 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="p-3 text-zinc-500 hover:text-brand-primary cursor-pointer h-full"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add Routine Bag CTA */}
              <button
                onClick={() => addToCart(selectedProduct, selectedProduct.size, quantity)}
                className="flex-1 bg-brand-primary hover:bg-brand-secondary text-brand-cream py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-center transition-theme cursor-pointer"
              >
                {language === 'en' ? t.addToBagEn : t.addToBagAr}
              </button>

              {/* Wishlist toggle block */}
              <button
                onClick={() => {
                  toggleWishlist(selectedProduct.id);
                  setIsWished(!isWished);
                }}
                className={`p-4 rounded-xl border cursor-pointer ${
                  isWished ? 'border-red-200 bg-red-50 text-red-500' : 'border-zinc-200 text-zinc-500 hover:text-brand-primary hover:bg-brand-cream/30'
                }`}
                aria-label="Wishlist Trigger"
              >
                <Heart size={18} className={isWished ? 'fill-red-500' : ''} />
              </button>
            </div>

            {/* Buy now direct CTA */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-brand-cream border border-brand-sage-muted text-brand-primary py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-center hover:bg-brand-primary hover:text-brand-cream transition-all duration-300 cursor-pointer"
            >
              {language === 'en' ? t.buyNowEn : t.buyNowAr}
            </button>
          </div>

        </div>

      </div>

      {/* Product Information Switch Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-sage-light/10 shadow-xs">
        {/* Buttons header */}
        <div className="flex border-b border-zinc-100 pb-3 gap-6 sm:gap-10 overflow-x-auto scrollbar-none">
          {[
            { id: 'desc', labelEn: t.descriptionEn, labelAr: t.descriptionAr },
            { id: 'ingredients', labelEn: t.ingredientsEn, labelAr: t.ingredientsAr },
            { id: 'how', labelEn: t.howToUseEn, labelAr: t.howToUseAr },
            { id: 'shipping', labelEn: t.shippingTabEn, labelAr: t.shippingTabAr }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs sm:text-sm font-semibold uppercase tracking-wider pb-3 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-700'
              }`}
            >
              {language === 'en' ? tab.labelEn : tab.labelAr}
            </button>
          ))}
        </div>

        {/* Dynamic content rendering panel */}
        <div className="pt-8 text-zinc-650 text-xs sm:text-sm leading-relaxed font-sans max-w-4xl space-y-4">
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p>{language === 'en' ? selectedProduct.descriptionEn : selectedProduct.descriptionAr}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                <div className="p-3.5 bg-brand-cream/40 rounded-xl">
                  <span className="font-serif text-xs font-bold text-brand-primary block mb-0.5">Sustainably Sealed</span>
                  <span className="text-[10px] text-zinc-500 font-sans block">Glass jars and recycled caps</span>
                </div>
                <div className="p-3.5 bg-brand-cream/40 rounded-xl">
                  <span className="font-serif text-xs font-bold text-brand-primary block mb-0.5">Hypoallergenic</span>
                  <span className="text-[10px] text-zinc-500 font-sans block">Clinically certified sensitive skin safe</span>
                </div>
                <div className="p-3.5 bg-brand-cream/40 rounded-xl">
                  <span className="font-serif text-xs font-bold text-brand-primary block mb-0.5">Dermatological</span>
                  <span className="text-[10px] text-zinc-500 font-sans block">No endocrine disruptors formulated</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <div className="p-4 bg-brand-cream rounded-2xl border border-brand-sage-light/20 flex items-start space-x-2.5 rtl:space-x-reverse">
                <Info size={16} className="text-brand-sage-muted mt-0.5 flex-shrink-0" />
                <span className="text-zinc-650 text-xs font-sans">
                  {language === 'en'
                    ? 'Our actives comply with absolute pharmaceutical cosmetic safety metrics. No chemical parabens, silicones, sulfates or synthetic perfumes used.'
                    : 'جميع المكونات والتركيبات خاضعة للمراقبة الصحية والدوائية. خالية من البارابين والسليكون والسلفات والعطور الكيميائية المهيجة للبشرة.'}
                </span>
              </div>
              <p className="font-serif font-bold text-sm text-brand-primary pt-2">{language === 'en' ? 'Core Actives Formula:' : 'قائمة المكونات النشطة بالكامل:'}</p>
              <p className="font-mono text-zinc-500 leading-relaxed text-xs p-4 bg-zinc-50 rounded-xl border border-zinc-200/50">
                {language === 'en' ? selectedProduct.ingredientsEn : selectedProduct.ingredientsAr}
              </p>
            </div>
          )}

          {activeTab === 'how' && (
            <div className="space-y-2">
              <p>{language === 'en' ? selectedProduct.howToUseEn : selectedProduct.howToUseAr}</p>
              <div className="flex space-x-2 rtl:space-x-reverse pt-2 font-sans">
                <span className="bg-zinc-100 rounded px-2.5 py-1 text-[11px] font-semibold text-zinc-650">Step 01: Purify</span>
                <span className="bg-brand-sage-light/20 rounded px-2.5 py-1 text-[11px] font-semibold text-zinc-650">Step 02: Treat (This item)</span>
                <span className="bg-zinc-100 rounded px-2.5 py-1 text-[11px] font-semibold text-zinc-650">Step 03: Protect</span>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <p>{language === 'en' ? t.shippingDescEn : t.shippingDescAr}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 font-sans text-xs">
                <li className="flex items-center text-zinc-650">
                  <ShieldCheck className="text-brand-sage-muted mr-2 rtl:ml-2" size={16} />
                  <span>Saudi Arabia Express Deliveries: Riyadh, Jeddah, Dammam (24-48 hours)</span>
                </li>
                <li className="flex items-center text-zinc-650">
                  <ShieldCheck className="text-brand-sage-muted mr-2 rtl:ml-2" size={16} />
                  <span>Emirates Delivery: Dubai, Abu Dhabi, Sharjah (48-72 hours)</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FREQUENTLY BOUGHT TOGETHER - HIGH-CONVERSION BUNDLE */}
      <div className="bg-brand-primary text-brand-cream rounded-3xl p-6 sm:p-10 border border-brand-secondary/40 shadow-xl space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold flex items-center">
            <Sparkles className="text-brand-sage-light mr-2.5 rtl:ml-2.5" size={20} />
            {language === 'en' ? t.bundleTitleEn : t.bundleTitleAr}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-sans">
            {language === 'en' ? t.bundleSubEn : t.bundleSubAr}
          </p>
        </div>

        {/* Bundle horizontal layout items selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
            
            {/* Cur - Current item */}
            <div className="flex items-center text-left rtl:text-right bg-brand-secondary/40 p-3 rounded-2xl border border-brand-sage-muted/30 w-full sm:w-max">
              <label className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <input type="checkbox" disabled checked className="w-4 h-4 accent-brand-sage-light rounded border-none" />
                <img src={selectedProduct.image} alt="" className="w-12 h-14 object-cover rounded" />
                <div>
                  <h4 className="font-serif text-[11px] font-bold truncate max-w-[150px]">{language === 'en' ? selectedProduct.nameEn : selectedProduct.nameAr}</h4>
                  <span className="text-[10px] text-brand-sage-light font-sans">{currentPrice} {t.aed}</span>
                </div>
              </label>
            </div>

            <span className="text-zinc-400 font-sans text-xl font-bold mx-auto">+</span>

            {/* Match 1 item */}
            <div className={`flex items-center text-left rtl:text-right p-3 rounded-2xl border transition-all duration-350 w-full sm:w-max ${
              buyMatch1 ? 'bg-brand-secondary border-brand-sage-light/40' : 'bg-brand-secondary/15 border-brand-secondary/30 opacity-60'
            }`}>
              <label className="flex items-center space-x-3.5 rtl:space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  checked={buyMatch1}
                  onChange={(e) => setBuyMatch1(e.target.checked)}
                  className="w-4 h-4 accent-brand-sage-light rounded border-none"
                />
                <img src={bundleMatch1.image} alt="" className="w-12 h-14 object-cover rounded" />
                <div>
                  <h4 className="font-serif text-[11px] font-bold truncate max-w-[150px]">{language === 'en' ? bundleMatch1.nameEn : bundleMatch1.nameAr}</h4>
                  <span className="text-[10px] text-brand-sage-light font-sans">{bundleMatch1.discountPrice ?? bundleMatch1.price} {t.aed}</span>
                </div>
              </label>
            </div>

            <span className="text-zinc-400 font-sans text-xl font-bold mx-auto">+</span>

            {/* Match 2 item */}
            <div className={`flex items-center text-left rtl:text-right p-3 rounded-2xl border transition-all duration-350 w-full sm:w-max ${
              buyMatch2 ? 'bg-brand-secondary border-brand-sage-light/40' : 'bg-brand-secondary/15 border-brand-secondary/30 opacity-60'
            }`}>
              <label className="flex items-center space-x-3.5 rtl:space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  checked={buyMatch2}
                  onChange={(e) => setBuyMatch2(e.target.checked)}
                  className="w-4 h-4 accent-brand-sage-light rounded border-none"
                />
                <img src={bundleMatch2.image} alt="" className="w-12 h-14 object-cover rounded" />
                <div>
                  <h4 className="font-serif text-[11px] font-bold truncate max-w-[150px]">{language === 'en' ? bundleMatch2.nameEn : bundleMatch2.nameAr}</h4>
                  <span className="text-[10px] text-brand-sage-light font-sans">{bundleMatch2.discountPrice ?? bundleMatch2.price} {t.aed}</span>
                </div>
              </label>
            </div>

          </div>

          {/* Pricing calculations and buy button */}
          <div className="lg:col-span-4 bg-brand-secondary/30 p-6 rounded-2xl border border-brand-sage-muted/30 flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <span className="text-[10px] text-zinc-300 block font-sans uppercase">{language === 'en' ? 'Combined bundle' : 'إجمالي سعر الفردية'}</span>
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <span className="text-zinc-400 line-through text-xs font-sans">{bundleSubtotal} {t.aed}</span>
                <span className="text-brand-sage-light text-xl font-bold font-sans">{bundleTotal} {t.aed}</span>
              </div>
              <span className="text-[9px] bg-emerald-600 font-sans text-white px-2 py-0.5 rounded font-bold uppercase mt-1 inline-block">
                {language === 'en' ? 'Includes 10% Bundle Discount' : 'يشمل خصم تشجيعي 10٪'}
              </span>
            </div>

            <button
              onClick={handleAddBundleToCart}
              className="bg-brand-sage-light text-brand-primary hover:bg-white w-full rounded-xl py-3.5 text-xs uppercase tracking-wider font-bold text-center transition-colors cursor-pointer"
            >
              {language === 'en' ? t.addBundleBtnEn : t.addBundleBtnAr}
            </button>
          </div>
        </div>

      </div>

      {/* RELATED RECOMMENDATIONS ROW */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="border-b border-brand-sage-light/25 pb-4">
            <h2 className="font-serif text-2xl font-bold text-brand-primary tracking-tight">
              {language === 'en' ? t.relatedTitleEn : t.relatedTitleAr}
            </h2>
            <p className="text-xs text-zinc-600 font-sans">
              {language === 'en' ? t.relatedSubtitleEn : t.relatedSubtitleAr}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => {
              const isWished = wishlist.includes(p.id);
              const hasDiscount = p.discountPrice !== undefined;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-3xs cursor-pointer hover:border-brand-sage-muted hover:shadow-md transition-all duration-300 group flex space-x-4 rtl:space-x-reverse relative"
                >
                  <img src={p.image} alt={p.nameEn} className="w-16 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xs font-bold text-zinc-900 group-hover:text-brand-primary transition-colors truncate">
                        {language === 'en' ? p.nameEn : p.nameAr}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-sans mt-0.5">{p.size} • {language === 'en' ? p.skinTypeEn : p.skinTypeAr}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-50 font-sans">
                      <span className="text-brand-primary font-bold text-xs">
                        {p.discountPrice ?? p.price} {t.aed}
                      </span>
                      <span className="text-brand-primary group-hover:translate-x-1 duration-250 transition-transform">
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
