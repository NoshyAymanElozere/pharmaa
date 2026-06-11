import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { PRODUCTS, CATEGORIES } from '../../constants/data';
import { Grid, List, Heart, Star, Eye, Filter, X, Check } from 'lucide-react';
import { Product } from '../../types';

export default function ProductListingView() {
  const {
    language,
    activePage,
    setActivePage,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeSkinType,
    setActiveSkinType,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Translations
  const t = {
    allProducts: language === 'en' ? 'Prescribed Formulations' : 'مستحضرات طبية تجميلية',
    subText: language === 'en' ? 'Clinically evaluated botanical solutions targeted for absolute skin restoration.' : 'حلول نباتية مقيمة عملياً تم تطويرها واستخلاصها لتجديد البشرة.',
    filters: language === 'en' ? 'Skin Filters' : 'تصفية البشرة',
    categories: language === 'en' ? 'Product Category' : 'فئات وعلاجات',
    allCategories: language === 'en' ? 'All Collections' : 'كل المجموعات',
    skinConcern: language === 'en' ? 'Ideal Skin Type' : 'نوع البشرة المثالي',
    skinAll: language === 'en' ? 'All Concerns' : 'جميع الحالات',
    skinDry: language === 'en' ? 'Dry / Dehydrated' : 'الجافة والمتهيجة',
    skinOily: language === 'en' ? 'Oily / Active Sebum' : 'الدهنية والزيتية',
    skinSensitive: language === 'en' ? 'Hypoallergenic / Sensitive' : 'الحساسة وتلف الخلايا',
    skinCombination: language === 'en' ? 'Combination' : 'البشرة المختلطة',
    price: language === 'en' ? 'Maximum Price' : 'السعر الأقصى',
    sortByLabel: language === 'en' ? 'Sort By' : 'تحت ترتيب',
    sortBest: language === 'en' ? 'Best Sellers' : 'الأكثر مبيعاً',
    sortLowHigh: language === 'en' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى',
    sortHighLow: language === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل',
    sortNew: language === 'en' ? 'New Arrivals' : 'وصل حديثاً',
    availabilityEn: 'Availability',
    availabilityAr: 'مدى التوفر',
    inStockOnlyEn: 'In Stock Only',
    inStockOnlyAr: 'المنتجات المتوفرة فقط',
    showingEn: 'Showing',
    showingAr: 'عرض',
    resultsEn: 'formulations found',
    resultsAr: 'مستحضر متاح حالياً',
    resetFiltersEn: 'Reset All Filters',
    resetFiltersAr: 'إعادة تعيين الفلاتر',
    noResultsEn: 'No formulations match your precise filters. Try broadening your concern options.',
    noResultsAr: 'لم نجد أي مستحضرات مطابقة لخيارات الفلترة هذه. حاولي اختيار فئات أخرى.',
    aed: language === 'en' ? 'AED/SAR' : 'ريال',
    searchActiveEn: 'Search result for',
    searchActiveAr: 'نتائج البحث عن',
    clearSearchEn: 'Clear Search',
    clearSearchAr: 'مسح البحث'
  };

  // 1. Filtering logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.nameEn.toLowerCase().includes(q) || product.nameAr.includes(q);
      const matchSub = product.subtitleEn.toLowerCase().includes(q) || product.subtitleAr.includes(q);
      const matchIng = product.ingredientsEn.toLowerCase().includes(q) || product.ingredientsAr.includes(q);
      if (!matchName && !matchSub && !matchIng) return false;
    }

    // Category filter
    if (activeCategory && product.categorySlug !== activeCategory) {
      return false;
    }

    // Skin Type filter
    if (activeSkinType) {
      const pSkin = product.skinTypeEn.toLowerCase();
      const searchSkin = activeSkinType.toLowerCase();
      if (!pSkin.includes(searchSkin) && searchSkin !== 'all') {
        return false;
      }
    }

    // Price range filter
    const activePrice = product.discountPrice ?? product.price;
    if (activePrice > priceRange[1]) {
      return false;
    }

    // Availability filter
    if (onlyInStock && product.stockStatus !== 'in_stock') {
      return false;
    }

    return true;
  });

  // 2. Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = a.discountPrice ?? a.price;
    const bPrice = b.discountPrice ?? b.price;

    if (sortBy === 'price-low-high') {
      return aPrice - bPrice;
    }
    if (sortBy === 'price-high-low') {
      return bPrice - aPrice;
    }
    if (sortBy === 'newest') {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    // Default best-selling (ratings first, then reviews count)
    return b.rating * b.reviewCount - a.rating * a.reviewCount;
  });

  const handleResetFilters = () => {
    setActiveCategory(null);
    setActiveSkinType(null);
    setPriceRange([0, 500]);
    setSortBy('best-selling');
    setOnlyInStock(false);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center md:text-left rtl:md:text-right border-b border-brand-sage-light/20 pb-8 space-y-2">
        <span className="text-[10px] tracking-[0.4em] font-bold text-brand-sage-muted uppercase block">
          {searchQuery ? `${t.searchActiveEn} "${searchQuery}"` : t.allProducts}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-primary tracking-tight">
          {searchQuery ? `“${searchQuery}”` : t.allCategories}
        </h1>
        <p className="text-sm text-zinc-600 font-sans max-w-2xl leading-relaxed">
          {t.subText}
        </p>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-red-600 hover:underline font-semibold tracking-wider uppercase flex items-center justify-center md:justify-start gap-1 cursor-pointer font-sans"
          >
            <X size={12} />
            <span>{t.clearSearchEn}</span>
          </button>
        )}
      </div>

      {/* Top Toolbar: View Toggles, Sorting, Mobile Filter Trigger */}
      <div className="flex items-center justify-between bg-white border border-brand-sage-light/10 p-4 rounded-2xl shadow-xs">
        {/* Results indicator */}
        <div className="text-xs text-zinc-500 font-sans">
          {t.showingEn} <span className="font-bold text-brand-primary">{sortedProducts.length}</span> {t.resultsEn}
        </div>

        {/* Controls block */}
        <div className="flex items-center space-x-4 sm:space-x-6 rtl:space-x-reverse">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl hover:bg-zinc-100 cursor-pointer"
          >
            <Filter size={14} />
            <span>{t.filters}</span>
          </button>

          {/* Desktop Sort Dropdown */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <label className="hidden sm:inline text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              {t.sortByLabel}:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-50 border border-zinc-200/60 focus:outline-none text-xs font-semibold rounded-xl py-2 px-3 text-zinc-800 font-sans cursor-pointer"
            >
              <option value="best-selling">{t.sortBest}</option>
              <option value="price-low-high">{t.sortLowHigh}</option>
              <option value="price-high-low">{t.sortHighLow}</option>
              <option value="newest">{t.sortNew}</option>
            </select>
          </div>

          {/* Grid/List toggles */}
          <div className="hidden sm:flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white text-brand-primary shadow-sm' : 'text-zinc-400 hover:text-zinc-700'}`}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white text-brand-primary shadow-sm' : 'text-zinc-400 hover:text-zinc-700'}`}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Pane: Sidebar filters + Products list */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden md:block col-span-1 space-y-8 bg-white/60 p-6 rounded-2xl border border-brand-sage-light/10 h-max">
          <div className="flex items-center justify-between pb-3 border-b border-brand-sage-light/20">
            <span className="font-serif text-sm font-bold text-zinc-900 tracking-wide">
              {t.filters}
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold uppercase cursor-pointer"
            >
              {language === 'en' ? 'Reset' : 'مسح'}
            </button>
          </div>

          {/* Categories Selector */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
              {t.categories}
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={`w-full text-left rtl:text-right text-xs py-2 px-3 rounded-lg flex items-center justify-between group cursor-pointer transition-colors ${
                  activeCategory === null ? 'bg-brand-primary text-brand-cream font-semibold' : 'text-zinc-600 hover:bg-brand-cream/60'
                }`}
              >
                <span>{t.allCategories}</span>
                <span className={`text-[10px] rounded px-1.5 py-0.5 ${activeCategory === null ? 'bg-brand-secondary text-brand-cream' : 'bg-zinc-100 text-zinc-500 group-hover:bg-brand-sage-light/20'} font-sans`}>
                  {PRODUCTS.length}
                </span>
              </button>
              
              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`w-full text-left rtl:text-right text-xs py-2 px-3 rounded-lg flex items-center justify-between group cursor-pointer transition-colors ${
                      activeCategory === cat.slug ? 'bg-brand-primary text-brand-cream font-semibold' : 'text-zinc-600 hover:bg-brand-cream/60'
                    }`}
                  >
                    <span>{language === 'en' ? cat.nameEn : cat.nameAr}</span>
                    <span className={`text-[10px] rounded px-1.5 py-0.5 ${activeCategory === cat.slug ? 'bg-brand-secondary text-brand-cream' : 'bg-zinc-100 text-zinc-500 group-hover:bg-brand-sage-light/20'} font-sans`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
              {t.skinConcern}
            </h4>
            <div className="grid grid-cols-1 gap-1">
              {[
                { label: t.skinAll, val: null },
                { label: t.skinDry, val: 'dry' },
                { label: t.skinOily, val: 'oily' },
                { label: t.skinSensitive, val: 'sensitive' },
                { label: t.skinCombination, val: 'combination' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSkinType(item.val)}
                  className={`w-full text-left rtl:text-right text-xs py-2 px-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    activeSkinType === item.val ? 'bg-zinc-100 text-brand-primary font-bold border-l-2 border-brand-primary rtl:border-l-0 rtl:border-r-2' : 'text-zinc-600 hover:bg-brand-cream/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSkinType === item.val && <Check size={12} className="text-brand-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Cap */}
          <div className="space-y-3">
            <div className="flex justify-between items-center whitespace-nowrap">
              <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase block">
                {t.price}
              </h4>
              <span className="text-xs font-bold text-brand-primary font-sans">
                {priceRange[1]} {t.aed}
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-brand-secondary h-1 bg-zinc-250 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-400 font-sans">
              <span>0 {t.aed}</span>
              <span>500 {t.aed}</span>
            </div>
          </div>

          {/* In Stock Selection */}
          <div className="pt-2 border-t border-brand-sage-light/10">
            <label className="flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer text-xs font-semibold text-zinc-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-brand-primary border-brand-sage-light accent-brand-primary"
              />
              <span className="font-sans">
                {language === 'en' ? t.availabilityEn : t.availabilityAr} : {language === 'en' ? t.inStockOnlyEn : t.inStockOnlyAr}
              </span>
            </label>
          </div>

        </div>

        {/* PRODUCTS LIST SIDE */}
        <div className="col-span-1 md:col-span-3">
          {sortedProducts.length > 0 ? (
            viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((prod) => {
                  const isWished = wishlist.includes(prod.id);
                  const hasDiscount = prod.discountPrice !== undefined;
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-brand-sage-light/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col relative h-full"
                    >
                      {/* floating alerts */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                        {prod.isBestSeller && (
                          <span className="bg-brand-primary text-brand-cream text-[8px] uppercase tracking-wider font-semibold py-0.5 px-2 rounded-full">
                            {language === 'en' ? 'Best Daily' : 'الأكثر طلباً'}
                          </span>
                        )}
                        {prod.isNew && (
                          <span className="bg-brand-sage-muted text-brand-cream text-[8px] uppercase tracking-wider font-semibold py-0.5 px-2 rounded-full">
                            {language === 'en' ? 'Fresh Science' : 'مستحضر مجهري'}
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="bg-red-600 text-white text-[8px] uppercase tracking-wider font-bold py-0.5 px-2 rounded-full animate-pulse">
                            {language === 'en' ? 'Offer' : 'خصم'}
                          </span>
                        )}
                      </div>

                      {/* wishlist trigger */}
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-zinc-600 hover:text-red-500 p-2 rounded-full shadow-sm cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart size={14} className={isWished ? 'fill-red-500 text-red-500' : ''} />
                      </button>

                      {/* preview images */}
                      <div
                        onClick={() => setSelectedProduct(prod)}
                        className="w-full h-72 bg-zinc-50 overflow-hidden relative cursor-pointer"
                      >
                        <img
                          src={prod.image}
                          alt={prod.nameEn}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="bg-white text-brand-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded shadow-sm flex items-center space-x-1">
                            <Eye size={11} />
                            <span>{language === 'en' ? 'Inspect Detail' : 'رؤية كل الفوائد'}</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <span className="text-[9px] text-brand-sage-muted uppercase tracking-widest block font-medium font-sans">
                          {prod.size} • {language === 'en' ? prod.skinTypeEn : prod.skinTypeAr}
                        </span>
                        
                        <h3
                          onClick={() => setSelectedProduct(prod)}
                          className="font-serif text-sm font-bold text-zinc-900 mt-1 hover:text-brand-primary cursor-pointer line-clamp-2 leading-snug flex-1"
                        >
                          {language === 'en' ? prod.nameEn : prod.nameAr}
                        </h3>

                        {/* Stars */}
                        <div className="flex items-center space-x-1 rtl:space-x-reverse mt-2">
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                className={i < Math.floor(prod.rating) ? 'fill-current' : 'text-zinc-200'}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] text-zinc-400 font-sans">({prod.reviewCount})</span>
                        </div>

                        {/* foot price row */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-sage-light/10">
                          <div className="flex flex-col font-sans">
                            {hasDiscount ? (
                              <>
                                <span className="text-zinc-400 text-[10px] line-through">{prod.price} {t.aed}</span>
                                <span className="text-brand-primary font-bold text-xs">{prod.discountPrice} {t.aed}</span>
                              </>
                            ) : (
                              <span className="text-brand-primary font-bold text-xs">{prod.price} {t.aed}</span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(prod, prod.size, 1)}
                            className="bg-brand-primary hover:bg-brand-secondary text-brand-cream text-[9px] tracking-wider uppercase font-bold py-1.5 px-3 rounded-md transition-colors cursor-pointer"
                          >
                            {language === 'en' ? 'Add To Bag' : 'أضيفي للحقيبة'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-6">
                {sortedProducts.map((prod) => {
                  const isWished = wishlist.includes(prod.id);
                  const hasDiscount = prod.discountPrice !== undefined;
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-brand-sage-light/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col sm:flex-row relative"
                    >
                      {/* wishlist trigger */}
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-zinc-600 hover:text-red-500 p-2.5 rounded-full shadow-xs cursor-pointer"
                      >
                        <Heart size={14} className={isWished ? 'fill-red-500 text-red-500' : ''} />
                      </button>

                      <div
                        onClick={() => setSelectedProduct(prod)}
                        className="w-full sm:w-60 h-64 bg-zinc-50 overflow-hidden relative flex-shrink-0 cursor-pointer"
                      >
                        <img
                          src={prod.image}
                          alt={prod.nameEn}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[9px] text-brand-sage-muted uppercase tracking-widest font-sans font-medium block">
                            {prod.size} • {language === 'en' ? prod.skinTypeEn : prod.skinTypeAr} {t.skinConcern}
                          </span>
                          
                          <h3
                            onClick={() => setSelectedProduct(prod)}
                            className="font-serif text-lg font-bold text-zinc-900 hover:text-brand-primary cursor-pointer leading-tight transition-colors"
                          >
                            {language === 'en' ? prod.nameEn : prod.nameAr}
                          </h3>

                          {/* rating */}
                          <div className="flex items-center space-x-1.5 rtl:space-x-reverse mt-1">
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={11}
                                  className={i < Math.floor(prod.rating) ? 'fill-current' : 'text-zinc-200'}
                                />
                              ))}
                            </div>
                            <span className="text-[9px] text-zinc-400 font-sans">({prod.reviewCount} {language === 'en' ? 'reviews' : 'تقييم'})</span>
                          </div>

                          <p className="text-xs text-zinc-500 font-sans leading-relaxed line-clamp-3 pt-1">
                            {language === 'en' ? prod.descriptionEn : prod.descriptionAr}
                          </p>
                        </div>

                        {/* list foot prices */}
                        <div className="flex items-center justify-between border-t border-brand-sage-light/10 pt-4 mt-6">
                          <div className="flex items-baseline space-x-2 rtl:space-x-reverse font-sans">
                            {hasDiscount ? (
                              <>
                                <span className="text-brand-primary font-bold text-base">{prod.discountPrice} {t.aed}</span>
                                <span className="text-zinc-400 text-xs line-through">{prod.price} {t.aed}</span>
                              </>
                            ) : (
                              <span className="text-brand-primary font-bold text-sm">{prod.price} {t.aed}</span>
                            )}
                          </div>

                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => setSelectedProduct(prod)}
                              className="border border-brand-sage-muted text-brand-primary hover:bg-brand-cream text-[10px] tracking-wider uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer"
                            >
                              {language === 'en' ? 'More Details' : 'عرض التفاصيل'}
                            </button>
                            <button
                              onClick={() => addToCart(prod, prod.size, 1)}
                              className="bg-brand-primary hover:bg-brand-secondary text-brand-cream text-[10px] tracking-wider uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer"
                            >
                              {language === 'en' ? 'Add To Bag' : 'أضيفي للحقيبة'}
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* EMPTY VIEW */
            <div className="bg-white rounded-3xl p-12 text-center border border-brand-sage-light/10 flex flex-col items-center justify-center space-y-4">
              <span className="text-brand-sage-muted bg-brand-cream p-4 rounded-full">
                <Filter size={32} />
              </span>
              <p className="text-sm font-medium text-zinc-700 max-w-sm leading-relaxed">
                {language === 'en' ? t.noResultsEn : t.noResultsAr}
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-brand-primary hover:bg-brand-secondary text-brand-cream text-xs font-semibold py-2.5 px-6 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
              >
                {language === 'en' ? t.resetFiltersEn : t.resetFiltersAr}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER OVERLAY */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-start">
          <div className="absolute inset-0" onClick={() => setIsMobileFiltersOpen(false)} />

          <div className="relative w-full max-w-xs h-full bg-brand-cream p-6 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-350">
            <div className="flex items-center justify-between pb-3 border-b border-brand-sage-light/20">
              <span className="font-serif text-sm font-bold text-zinc-900">
                {t.filters}
              </span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full hover:bg-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* categories */}
            <div className="space-y-3 mt-6">
              <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
                {t.categories}
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`w-full text-left rtl:text-right text-xs py-2 px-3 rounded-lg flex items-center justify-between ${
                    activeCategory === null ? 'bg-brand-primary text-brand-cream font-bold' : 'text-zinc-600'
                  }`}
                >
                  <span>{t.allCategories}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.slug);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right text-xs py-2 px-3 rounded-lg flex items-center justify-between ${
                      activeCategory === cat.slug ? 'bg-brand-primary text-brand-cream font-bold' : 'text-zinc-600'
                    }`}
                  >
                    <span>{language === 'en' ? cat.nameEn : cat.nameAr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* skin concern */}
            <div className="space-y-3 mt-6">
              <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
                {t.skinConcern}
              </h4>
              <div className="space-y-1">
                {[
                  { label: t.skinAll, val: null },
                  { label: t.skinDry, val: 'dry' },
                  { label: t.skinOily, val: 'oily' },
                  { label: t.skinSensitive, val: 'sensitive' },
                  { label: t.skinCombination, val: 'combination' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveSkinType(item.val);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right text-xs py-2 px-3 rounded-lg flex items-center justify-between ${
                      activeSkinType === item.val ? 'bg-zinc-100 text-brand-primary font-bold' : 'text-zinc-600'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price maximum cap */}
            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center whitespace-nowrap">
                <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase block">
                  {t.price}
                </h4>
                <span className="text-xs font-bold text-brand-primary font-sans">{priceRange[1]} {t.aed}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-brand-secondary h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* In stock checklist */}
            <div className="pt-4 border-t border-brand-sage-light/10 mt-6">
              <label className="flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer text-xs font-semibold text-zinc-600">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-primary accent-brand-primary border-zinc-300"
                />
                <span className="font-sans">
                  {language === 'en' ? t.inStockOnlyEn : t.inStockOnlyAr}
                </span>
              </label>
            </div>

            <button
              onClick={handleResetFilters}
              className="mt-8 bg-brand-primary text-brand-cream py-2.5 w-full rounded-xl text-xs uppercase tracking-wider font-bold cursor-pointer"
            >
              {language === 'en' ? t.resetFiltersEn : t.resetFiltersAr}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
