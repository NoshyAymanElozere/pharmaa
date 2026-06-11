import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../store/AppContext';
import { PRODUCTS, CATEGORIES, REVIEWS } from '../../constants/data';
import { ArrowRight, ArrowLeft, Heart, Star, Sparkles, ShieldCheck, Truck, HelpCircle, Eye, ArrowUpDown } from 'lucide-react';
import { Product } from '../../types';

export default function HomeView() {
  const {
    language,
    setActivePage,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setActiveCategory
  } = useApp();

  // Translations
  const t = {
    heroTitle1: language === 'en' ? 'Healthy Skin Starts Here' : 'البشرة الصحية تبدأ من هنا',
    heroSub1: language === 'en' ? 'Premium botanical skincare solutions designed for every skin type.' : 'حلول متميزة للعناية الفائقة بالبشرة مصممة لكل حالة وجلد.',
    heroTitle2: language === 'en' ? 'The Art of Clinical Botanism' : 'فن التركيب الطبيعي المتقدم',
    heroSub2: language === 'en' ? 'Advanced cell-renewal complexes created in collaboration with dermatology experts.' : 'مركبات تجديد الخلايا المتقدمة بالتعاون مع كبار خبراء طب الجلد.',
    shopNow: language === 'en' ? 'Shop Collections' : 'تسوقي التشكيلة',
    exploreRoutine: language === 'en' ? 'Explore Science' : 'استكشفي العلم',
    bestSellers: language === 'en' ? 'The Best Sellers' : 'الأكثر مبيعاً',
    bestSub: language === 'en' ? 'Our most coveted daily formulation staples requested worldwide.' : 'تركيباتنا اليومية الأكثر طلباً وشهرة حول العالم.',
    quickView: language === 'en' ? 'Quick View' : 'عرض سريع',
    addedToCart: language === 'en' ? 'Added to Bag!' : 'تمت الإضافة للحقيبة',
    shopCategory: language === 'en' ? 'Shop by Category' : 'تسوقي حسب الفئة',
    categorySub: language === 'en' ? 'Targeted clinical pathways crafted with pristine organic materials.' : 'مسارات علاجية مستهدفة مصنوعة من مواد طبيعية نقية ومثبتة.',
    promoHeadline: language === 'en' ? 'The Seasonal Ritual Bundle' : 'مجموعة الطقوس الموسمية الفاخرة',
    promoDesc: language === 'en' ? 'Incorporate our prebiotic cleanser, ocean hyaluronic serum, and cloud moisture barrier. Purchased as a complete system to activate maximum skin barrier defence, saving 15%.' : 'اجمعي بين غسول البريبايوتك، وسيروم الهيالورونيك الساحلي، وكريم حاجز السيراميد. احصلي على النظام المتكامل لتفعيل أقصى درجات حماية البشرة مع توفير 15٪.',
    promoBtn: language === 'en' ? 'Acquire the Bundle (Save 15%)' : 'اقتني المجموعة الكاملة (توفير 15٪)',
    newArrivals: language === 'en' ? 'New Arrivals' : 'وصل حديثاً',
    newSub: language === 'en' ? 'Freshly bottled scientific breakthroughs to refresh your vanity.' : 'ابتكارات علمية حديثة تم صبها مؤخراً لروتينكِ المستمر.',
    beforeAfterTitle: language === 'en' ? 'Clinical Visible Results' : 'نتائج مخبرية مرئية',
    beforeAfterSub: language === 'en' ? 'Drag the interactive slider below to witness 14-day lipid recovery and redness clearance with the Velvet Cloud Barrier Cream.' : 'اسحبي المؤشر التفاعلي أدناه لمشاهدة تعافي حاجز البشرة خلال 14 يوماً مع كريم فيلفيت كلاود.',
    beforeLabel: language === 'en' ? 'Day 1 (Dull & Dehydrated)' : 'اليوم الأول (جفاف واحمرار)',
    afterLabel: language === 'en' ? 'Day 14 (Radiant & Repaired)' : 'اليوم 14 (إشراقه وترميم)',
    reviewsTitle: language === 'en' ? 'Verified Skin Testimonials' : 'شهادات عملاء موثقة',
    reviewsSub: language === 'en' ? 'Aura is integrated into the daily routines of over 50,000 global citizens.' : 'أورا جزء أساسي في الروتين اليومي لأكثر من 50,000 عميل وعميلة.',
    verifiedBuyer: language === 'en' ? 'Verified Aura Owner' : 'مشترٍ موثق',
    instaTitle: language === 'en' ? 'Follow our Aesthetic Journal' : 'تابعي دفتر جمالنا الطبيعي',
    instaSub: language === 'en' ? 'Share your vanity bathroom visuals with @AuraLaboratories.' : 'شاركي تفاصيل وصور روتينكِ المنزلي مع @AuraLaboratories.',
    activeIngredients: language === 'en' ? 'Clinical Actives' : 'المواد الفعالة'
  };

  // Section 1: Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/src/assets/images/hero_skincare_banner_1781217525355.jpg',
      title: t.heroTitle1,
      sub: t.heroSub1
    },
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80',
      title: t.heroTitle2,
      sub: t.heroSub2
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  // Section 2: Features List
  const features = [
    {
      icon: <Truck className="text-brand-sage-muted" size={24} />,
      titleEn: 'Fast & Temperature-Controlled Shipping',
      titleAr: 'توصيل مبرّد وسريع',
      descEn: 'Dispatched in cooling boxes to protect active bacterial prebiotics and serums.',
      descAr: 'تُشحن في عبوات مبردة لحماية البريبايوتك ومكونات السيروم النشطة.'
    },
    {
      icon: <ShieldCheck className="text-brand-sage-muted" size={24} />,
      titleEn: '100% Secure Encrypted Payment',
      titleAr: 'دفع مشفر آمن 100٪',
      descEn: 'Flexible payment via Credit Card, Apple Pay, Google Pay, or Cash on Delivery.',
      descAr: 'خيارات دفع مرنة بالبطاقة الأمنة، آبل باي، أو الدفع نقداً عند الاستلام.'
    },
    {
      icon: <Sparkles className="text-brand-sage-muted" size={24} />,
      titleEn: 'Pristine Botanical Formulations',
      titleAr: 'تركيبات نباتية نقية',
      descEn: '100% vegan, cruelty-free, synthesized on premium biocompatible plant bases.',
      descAr: 'نباتي 100٪، بدون قسوة، ومصنوع على قواعد نباتية متوافقة حيوياً.'
    },
    {
      icon: <HelpCircle className="text-brand-sage-muted" size={24} />,
      titleEn: 'Dermatologist Consulting Support',
      titleAr: 'دعم استشاري لطب الجلد',
      descEn: 'Expert guidance available via online live chat to diagnose skin concerns.',
      descAr: 'فريق طبي تجميلي متوفر عبر المحادثة المباشرة لتشخيص وعلاج بشرتكِ.'
    }
  ];

  // Section 7: Before/After Slider Interaction State
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    let percentage = (touchX / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1 || !sliderRef.current) return; // Only dragging with left mouse button click
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setSliderPos((x / rect.width) * 100);
  };

  // Quick helper: Acquire 15% discount bundle triggers
  const checkoutRitualBundle = () => {
    // Add Ocean glow, Velvet cloud, and Prebiotic cleanser
    const clean = PRODUCTS.find((p) => p.id === 'prod_botanical_gel');
    const serum = PRODUCTS.find((p) => p.id === 'prod_ocean_glow');
    const moisturizer = PRODUCTS.find((p) => p.id === 'prod_velvet_cloud');

    if (clean) addToCart(clean, '150ml', 1);
    if (serum) addToCart(serum, '50ml', 1);
    if (moisturizer) addToCart(moisturizer, '100ml', 1);

    setActivePage('cart');
  };

  // Product slide card renderer
  const ProductCard = ({ prod }: { prod: Product }) => {
    const isWished = wishlist.includes(prod.id);
    const hasDiscount = prod.discountPrice !== undefined;
    
    return (
      <div className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl border border-brand-sage-light/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group relative flex flex-col h-full">
        {/* badges inside image */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {prod.isBestSeller && (
            <span className="bg-brand-primary text-brand-cream text-[9px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-full">
              {language === 'en' ? 'Best Seller' : 'الأكثر مبيعاً'}
            </span>
          )}
          {prod.isNew && (
            <span className="bg-brand-sage-muted text-brand-cream text-[9px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-full">
              {language === 'en' ? 'New Release' : 'وصل حديثاً'}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-full">
              {language === 'en' ? 'Saving' : 'خصم'}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(prod.id);
          }}
          className="absolute top-3 right-3 z-10 bg-white/85 hover:bg-white text-zinc-600 hover:text-red-500 p-2 rounded-full shadow-sm transition-all cursor-pointer"
          aria-label="Add to Wishlist"
        >
          <Heart size={15} className={isWished ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {/* Product Image Clickable to details */}
        <div 
          onClick={() => setSelectedProduct(prod)}
          className="w-full h-80 bg-zinc-50 overflow-hidden relative cursor-pointer group-hover:opacity-95"
        >
          <img
            src={prod.image}
            alt={prod.nameEn}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Subtle Hover overlay */}
          <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="bg-white/95 text-brand-primary text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-md flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Eye size={12} />
              <span>{t.quickView}</span>
            </span>
          </div>
        </div>

        {/* Product Info Description */}
        <div className="p-5 flex-1 flex flex-col">
          <span className="text-[10px] text-brand-sage-muted uppercase tracking-widest font-sans font-medium">
            {prod.size} • {language === 'en' ? prod.skinTypeEn : prod.skinTypeAr} {t.activeIngredients}
          </span>
          
          <h4 
            onClick={() => setSelectedProduct(prod)}
            className="font-serif text-base font-bold text-zinc-900 hover:text-brand-primary cursor-pointer mt-1 flex-1 transition-colors"
          >
            {language === 'en' ? prod.nameEn : prod.nameAr}
          </h4>

          {/* Rating */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse mt-2">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(prod.rating) ? 'fill-current' : 'text-zinc-200'}
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 font-sans font-medium">({prod.reviewCount})</span>
          </div>

          {/* Price & Add To Cart Button */}
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-brand-sage-light/10">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-zinc-400 text-xs line-through">{prod.price} {language === 'en' ? 'AED/SAR' : 'ريال'}</span>
                  <span className="text-brand-primary font-bold text-sm tracking-wide">{prod.discountPrice} {language === 'en' ? 'AED/SAR' : 'ريال'}</span>
                </>
              ) : (
                <span className="text-brand-primary font-bold text-sm tracking-wide">{prod.price} {language === 'en' ? 'AED/SAR' : 'ريال'}</span>
              )}
            </div>

            <button
              onClick={() => addToCart(prod, prod.size, 1)}
              className="bg-brand-primary hover:bg-brand-secondary text-brand-cream text-[10px] tracking-wider uppercase font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Add To Bag' : 'أضيفي للحقيبة'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-20 pb-20">
      
      {/* SECTION 1: HERO SLIDER BANNER */}
      <section className="relative w-full h-[650px] overflow-hidden bg-brand-primary">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-brand-primary/10 z-10" />
            <img src={slide.image} alt="Cosmetics Concept Banner" className="w-full h-full object-cover" />

            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center text-brand-cream space-y-6">
                <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-semibold text-brand-sage-light flex items-center space-x-2 rtl:space-x-reverse animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-brand-sage-light" />
                  <span>{language === 'en' ? 'Aura Skin Intelligence' : 'ذكاء البشرة المتقدم مع أورا'}</span>
                </span>
                
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-2xl leading-tight">
                  {slide.title}
                </h1>
                
                <p className="text-sm sm:text-lg text-zinc-200 max-w-xl font-sans font-light leading-relaxed">
                  {slide.sub}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setActivePage('shop')}
                    className="bg-brand-cream text-brand-primary hover:bg-white font-semibold rounded-xl text-xs py-3.5 px-8 uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    {t.shopNow}
                  </button>
                  <button
                    onClick={() => setActivePage('developer-specs')}
                    className="border border-brand-cream/40 hover:border-brand-cream text-brand-cream hover:bg-white/5 font-semibold rounded-xl text-xs py-3.5 px-8 uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {t.exploreRoutine}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nav arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Previous Slide"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Next Slide"
        >
          <ArrowRight size={18} />
        </button>

        {/* pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2.5 rtl:space-x-reverse">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? 'bg-brand-cream w-6' : 'bg-brand-cream/40 hover:bg-brand-cream/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: FEATURES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-brand-sage-light/10 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left rtl:sm:text-right space-y-3 group hover:border-brand-sage-muted transition-all duration-300"
            >
              <div className="p-3 bg-brand-cream rounded-xl group-hover:scale-110 group-hover:bg-brand-sage-light/20 transition-all">
                {feat.icon}
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-900 group-hover:text-brand-primary transition-colors">
                {language === 'en' ? feat.titleEn : feat.titleAr}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                {language === 'en' ? feat.descEn : feat.descAr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-sage-muted uppercase block">
              {language === 'en' ? 'Clinical Favorites' : 'المفضلة سريرياً'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
              {t.bestSellers}
            </h2>
            <p className="text-sm text-zinc-600 font-sans max-w-xl">
              {t.bestSub}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveCategory(null);
              setActivePage('shop');
            }}
            className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs uppercase tracking-wider font-semibold text-brand-primary hover:text-brand-sage-muted hover:underline transition-all cursor-pointer"
          >
            <span>{language === 'en' ? 'See all products' : 'رؤية كل المنتجات'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Swiper simulated slider container grid/flex */}
        <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-thin snap-x scroll-smooth">
          {PRODUCTS.filter((p) => p.isBestSeller).map((product) => (
            <div key={product.id} className="snap-start select-none">
              <ProductCard prod={product} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-sage-muted uppercase">
            {language === 'en' ? 'Organic Laboratories' : 'علاجات نباتية مجهزة'}
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
            {t.shopCategory}
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-lg mx-auto leading-relaxed">
            {t.categorySub}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.slug);
                setActivePage('shop');
              }}
              className="bg-white rounded-2xl overflow-hidden border border-brand-sage-light/10 shadow-xs hover:border-brand-sage-muted hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col items-center text-center p-4"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-cream group-hover:scale-105 transition-transform duration-300">
                <img src={cat.image} alt={cat.nameEn} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-xs font-bold text-zinc-900 mt-4 group-hover:text-brand-primary transition-colors">
                {language === 'en' ? cat.nameEn : cat.nameAr}
              </h3>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[130px] line-clamp-1 font-sans">
                {language === 'en' ? cat.descriptionEn : cat.descriptionAr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: PROMOTIONAL CAMPAIGN BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary rounded-3xl overflow-hidden relative shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Background visuals and decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sage-muted/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-sage-light/5 rounded-full blur-3xl pointer-events-none" />

          {/* Text panel */}
          <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center text-brand-cream space-y-6 z-10">
            <span className="bg-brand-sage-muted text-brand-cream text-[10px] uppercase tracking-widest font-bold py-1 px-3.5 rounded-full w-max">
              {language === 'en' ? 'Exclusive Skincare Ritual Combos' : 'طقوس حصرية بتركيبات متوافقة'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
              {t.promoHeadline}
            </h2>
            <p className="text-zinc-200 text-xs sm:text-sm font-sans leading-relaxed max-w-xl">
              {t.promoDesc}
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={checkoutRitualBundle}
                className="bg-brand-cream text-brand-primary hover:bg-white font-bold rounded-xl text-xs py-3 px-6 uppercase tracking-wider transition-colors shadow-lg cursor-pointer flex items-center space-x-2 rtl:space-x-reverse"
              >
                <span>{t.promoBtn}</span>
              </button>
              <span className="text-zinc-400 text-xs font-sans italic">
                {language === 'en' ? '*Comes with luxury linen pouch and custom dosage spoon.' : 'يشمل حقيبة قطنية فاخرة وملعقة جرعات أورا مخصصة.'}
              </span>
            </div>
          </div>

          {/* Product shot panel */}
          <div className="lg:col-span-5 h-[300px] lg:h-auto min-h-[350px] relative bg-brand-secondary/40">
            <img
              src="/src/assets/images/hero_skincare_banner_1781217525355.jpg"
              alt="Luxury cosmetic ritual items display"
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-sage-muted uppercase block">
              {language === 'en' ? 'Fresh Science Release' : 'إصدارات جديدة وحديثة'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
              {t.newArrivals}
            </h2>
            <p className="text-sm text-zinc-600 font-sans max-w-xl">
              {t.newSub}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveCategory(null);
              setActivePage('shop');
            }}
            className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs uppercase tracking-wider font-semibold text-brand-primary hover:text-brand-sage-muted hover:underline transition-all cursor-pointer"
          >
            <span>{language === 'en' ? 'Discover all releases' : 'اكتشفي الإضافات الجديدة'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Carousel for newly released items */}
        <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-thin snap-x scroll-smooth">
          {PRODUCTS.filter((p) => p.isNew).map((product) => (
            <div key={product.id} className="snap-start select-none">
              <ProductCard prod={product} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: BEFORE & AFTER INTERACTIVEreveal SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-sage-light/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informative text side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-sage-muted uppercase block">
                {language === 'en' ? 'Proven Results' : 'الدراسات والنتائج المضمونة'}
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
                {t.beforeAfterTitle}
              </h2>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                {t.beforeAfterSub}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse bg-zinc-50 border border-brand-sage-light/10 p-3.5 rounded-xl">
                <span className="bg-brand-sage-light/30 text-brand-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">94%</span>
                <span className="text-[11px] sm:text-xs text-zinc-700 font-sans font-medium">
                  {language === 'en' ? 'Reported immediate moisture recovery and barrier relief' : 'أكدوا تحسناً فورياً في الارتياح والترطيب للجلد.'}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse bg-zinc-50 border border-brand-sage-light/10 p-3.5 rounded-xl">
                <span className="bg-brand-sage-light/30 text-brand-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">88%</span>
                <span className="text-[11px] sm:text-xs text-zinc-700 font-sans font-medium">
                  {language === 'en' ? 'Observed visible reduction in cheek and nose redness within 12 days' : 'لاحظن تلاشي الاحمرار والبقع الجافة على الأنف والخد.'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive slider side */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Slider Container Box */}
            <div
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-brand-sage-light/40 shadow-inner"
            >
              {/* BEFORE IMAGE (Bottom layer: Dry skin representation with high-contrast desaturated and rough textures) */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80"
                  alt="Damaged dry dehydrated skin"
                  className="w-full h-full object-cover grayscale contrast-125 saturate-50 brightness-90"
                />
                <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
                <span className="absolute bottom-4 left-4 z-10 bg-black/50 text-white text-[10px] font-sans px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {t.beforeLabel}
                </span>
              </div>

              {/* AFTER IMAGE (Top Overlapping Layer clippable: Smooth, glowing, radiant representation) */}
              <div
                className="absolute inset-0 z-20"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80"
                  alt="Radiant hydrated repaired skin"
                  className="w-full h-full object-cover brightness-105 saturate-110 contrast-100"
                />
                <div className="absolute inset-0 bg-emerald-500/5 mix-blend-color-burn" />
                <span className="absolute bottom-4 right-4 z-10 bg-brand-primary/95 text-brand-cream text-[10px] font-sans px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {t.afterLabel}
                </span>
              </div>

              {/* DRAGGABLE BAR LINE */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white hover:bg-brand-sage-light z-30 flex items-center justify-center cursor-ew-resize transition-colors"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-8 h-8 bg-white border-2 border-brand-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <ArrowUpDown className="text-brand-primary rotate-90" size={12} />
                </div>
              </div>
            </div>

            {/* Hint slider */}
            <p className="text-zinc-400 text-[10px] tracking-wide mt-3 text-center italic font-sans">
              *Drag left or right to slide the divider boundary
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 8: CUSTOMER VERIFIED REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-sage-muted uppercase block">
            {language === 'en' ? 'Aura Community Voice' : 'أصوات مجتمعنا الثمينة'}
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
            {t.reviewsTitle}
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-lg mx-auto leading-relaxed">
            {t.reviewsSub}
          </p>
        </div>

        {/* Testimonials Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
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
                      {t.verifiedBuyer}
                    </span>
                  </div>
                </div>

                <div className="flex text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={11} className="fill-current" />
                  ))}
                </div>
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
      </section>

      {/* SECTION 9: INSTAGRAM MASONRY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-sage-muted uppercase block">
            {language === 'en' ? 'Social Curations' : 'منشورات مميزة للجمال'}
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
            {t.instaTitle}
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-lg mx-auto">
            {t.instaSub}
          </p>
        </div>

        {/* Masonry layout of organic aesthetic files */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="h-60 rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80"
              alt="Cozy bathroom vanity setup with skincare bottles"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-brand-cream text-xs font-semibold tracking-wider font-sans">@AuraLovesSkin</span>
            </div>
          </div>

          <div className="h-60 rounded-2xl overflow-hidden relative group md:translate-y-4">
            <img
              src="/src/assets/images/product_cream_jar_1781217540516.jpg"
              alt="Organic moisturizer jar on dark stone panel"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-brand-cream text-xs font-semibold tracking-wider font-sans">@GlowWithAura</span>
            </div>
          </div>

          <div className="h-60 rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=500&q=80"
              alt="Pipette dropping white cosmetic elixir"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-brand-cream text-xs font-semibold tracking-wider font-sans">@ComplexClinical</span>
            </div>
          </div>

          <div className="h-60 rounded-2xl overflow-hidden relative group md:translate-y-4">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80"
              alt="Cleanser gel foam wash textures"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-brand-cream text-xs font-semibold tracking-wider font-sans">@AuraBoutique</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: NEWSLETTER REDIRECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="max-w-lg mx-auto p-8 bg-brand-secondary/5 rounded-2xl border border-brand-sage-light/20">
          <span className="text-[9px] tracking-widest text-brand-sage-muted uppercase block font-semibold mb-2">
            {language === 'en' ? 'Aura Loyalty Circle' : 'دائرة الولاء لأورا'}
          </span>
          <p className="text-xs text-zinc-500 leading-relaxed font-sans">
            {language === 'en'
              ? 'Our seasonal offers and custom coupon codes are managed dynamically. Scroll directly to our Footer block below to subscribe and unlock immediate 10% premium reductions!'
              : 'جميع أكواد خصم المشتركين تتم إدارتها تلقائياً وبأمان. تفضلي بالنزول أسفل الصفحة للتسجيل في قائمة الرسائل المميزة لتلقي خصومات فورية.'}
          </p>
        </div>
      </section>

    </div>
  );
}
