import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { ShoppingBag, Heart, User, Search, Globe, X, Plus, Minus, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../constants/data';

export default function Header() {
  const {
    language,
    setLanguage,
    activePage,
    setActivePage,
    cart,
    wishlist,
    updateCartQuantity,
    removeFromCart,
    user,
    searchQuery,
    setSearchQuery,
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    setSelectedProduct,
    appliedCoupon
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Translations
  const t = {
    freeShipping: language === 'en' ? 'Free shipping on orders above 200 AED/SAR' : 'شحن مجاني على الطلبات بأكثر من 200 ريال/درهم',
    brandName: language === 'en' ? 'AURA' : 'أورا',
    brandSub: language === 'en' ? 'LABORATORIES' : 'مختبرات',
    navHome: language === 'en' ? 'Home' : 'الرئيسية',
    navShop: language === 'en' ? 'Shop' : 'المتجر',
    navSpecs: language === 'en' ? 'Design Guide & Project Specs' : 'دليل التصميم والمواصفات',
    searchPlaceholder: language === 'en' ? 'Search elixirs, ingredients, skin concern...' : 'ابحثي عن الإكسير، المكونات، مشاكل البشرة...',
    recentSearches: language === 'en' ? 'Recent Searches' : 'عمليات البحث الأخيرة',
    clear: language === 'en' ? 'Clear' : 'مسح',
    noHistory: language === 'en' ? 'No recent searches' : 'لا توجد عمليات بحث أخيرة',
    cartTitle: language === 'en' ? 'Your Routine Bag' : 'حقيبة الروتين الخاصة بكِ',
    cartEmpty: language === 'en' ? 'Your cosmetic bag is empty.' : 'حقيبة مستحضرات التجميل الخاصة بكِ فارغة.',
    startRoutine: language === 'en' ? 'Start Your Routine' : 'ابدئي روتينكِ الآن',
    checkout: language === 'en' ? 'Secure Checkout' : 'الدفع الآمن',
    viewCart: language === 'en' ? 'View Cart Details' : 'عرض تفاصيل الحقيبة',
    subtotal: language === 'en' ? 'Subtotal' : 'المجموع الفرعي',
    discount: language === 'en' ? 'Discount' : 'الخصم',
    total: language === 'en' ? 'Grand Total' : 'الإجمالي الكلي',
    aed: language === 'en' ? 'AED/SAR' : 'ريال/درهم',
    welcome: language === 'en' ? 'Hello' : 'مرحباً'
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = cartSubtotal - discountAmount;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      addToSearchHistory(localSearch);
      setIsSearchOpen(false);
      setActivePage('shop');
    }
  };

  const selectSuggestedSearch = (q: string) => {
    setLocalSearch(q);
    setSearchQuery(q);
    addToSearchHistory(q);
    setIsSearchOpen(false);
    setActivePage('shop');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-cream/95 backdrop-blur-md border-b border-brand-sage-light/20 shadow-sm transition-all">
      {/* Top Banner Alert */}
      <div className="w-full bg-brand-primary text-brand-cream py-2 px-4 text-center text-xs tracking-wider uppercase font-medium">
        {t.freeShipping}
      </div>

      {/* Main Navbar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <button
            onClick={() => setActivePage('home')}
            className={`font-sans text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
              activePage === 'home' ? 'text-brand-primary font-semibold underline underline-offset-8 decoration-brand-sage-muted' : 'text-zinc-600 hover:text-brand-primary'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => {
              setSearchQuery('');
              setActivePage('shop');
            }}
            className={`font-sans text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
              activePage === 'shop' ? 'text-brand-primary font-semibold underline underline-offset-8 decoration-brand-sage-muted' : 'text-zinc-600 hover:text-brand-primary'
            }`}
          >
            {t.navShop}
          </button>
          <button
            onClick={() => setActivePage('developer-specs')}
            className={`font-sans text-xs tracking-wider uppercase bg-brand-sage-light/30 px-3 py-1.5 rounded-full border border-brand-sage-muted/20 text-brand-primary font-medium hover:bg-brand-sage-light/50 transition-colors cursor-pointer`}
          >
            {t.navSpecs}
          </button>
        </div>

        {/* Brand center logo */}
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => setActivePage('home')}>
          <span className="font-serif text-3xl font-semibold tracking-widest text-brand-primary">
            {t.brandName}
          </span>
          <span className="font-sans text-[8px] tracking-[0.4em] text-brand-sage-muted -mt-1">
            {t.brandSub}
          </span>
        </div>

        {/* Right utility elements (Search, Languages, Profile, Cart, Wishlist, Mobile menu) */}
        <div className="flex items-center space-x-4 sm:space-x-6 rtl:space-x-reverse">
          
          {/* Universal Language Toggler */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center space-x-1 text-zinc-600 hover:text-brand-primary text-xs font-semibold tracking-wider bg-zinc-100 hover:bg-brand-sage-light/20 px-2.5 py-1.5 rounded-lg border border-zinc-200 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe size={14} />
            <span className="font-sans">{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Search Trigger Icon */}
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setLocalSearch(searchQuery);
            }}
            className="text-zinc-600 hover:text-brand-primary transition-colors p-1 cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => setActivePage('wishlist')}
            className="relative text-zinc-600 hover:text-brand-primary transition-colors p-1 cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart size={20} className={activePage === 'wishlist' ? 'fill-brand-sage-muted text-brand-sage-muted' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-sage-muted text-brand-cream text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-semibold font-sans">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Profile Access */}
          <button
            onClick={() => setActivePage(user ? 'profile' : 'auth')}
            className="text-zinc-600 hover:text-brand-primary transition-colors p-1 flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
            aria-label="User Account"
          >
            <User size={20} className={activePage === 'profile' || activePage === 'auth' ? 'text-brand-primary' : ''} />
            {user && (
              <span className="hidden lg:inline text-xs font-medium text-zinc-700 font-sans max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Luxury Mini Cart Trigger */}
          <button
            onClick={() => setIsMiniCartOpen(true)}
            className="relative text-zinc-600 hover:text-brand-primary transition-colors p-1 bg-brand-primary text-brand-cream rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-brand-secondary"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={17} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-sage-light text-brand-primary text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold font-sans animate-pulse">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <div className="md:hidden flex justify-center space-x-6 rtl:space-x-reverse border-t border-brand-sage-light/10 bg-brand-cream/40 py-2.5 px-4">
        <button
          onClick={() => setActivePage('home')}
          className={`text-xs uppercase tracking-wider font-sans ${activePage === 'home' ? 'text-brand-primary font-semibold' : 'text-zinc-500'}`}
        >
          {t.navHome}
        </button>
        <button
          onClick={() => {
            setSearchQuery('');
            setActivePage('shop');
          }}
          className={`text-xs uppercase tracking-wider font-sans ${activePage === 'shop' ? 'text-brand-primary font-semibold' : 'text-zinc-500'}`}
        >
          {t.navShop}
        </button>
        <button
          onClick={() => setActivePage('developer-specs')}
          className={`text-[10px] uppercase tracking-wide font-sans bg-brand-sage-light/20 px-2 py-0.5 rounded text-brand-primary ${activePage === 'developer-specs' ? 'border border-brand-sage-muted' : ''}`}
        >
          {language === 'en' ? 'Specs Guide' : 'المواصفات'}
        </button>
      </div>

      {/* ADVANCED FULL-SCREEN SEARCH MODAL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-brand-primary/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-brand-cream rounded-2xl shadow-2xl p-6 border border-brand-sage-light/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-brand-sage-light/20">
              <span className="font-serif text-lg font-bold text-brand-primary">
                {language === 'en' ? 'Interactive Search Center' : 'مركز البحث التفاعلي'}
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full hover:bg-brand-sage-light/20 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-6 relative">
              <input
                type="text"
                autoFocus
                placeholder={t.searchPlaceholder}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-zinc-50 border border-brand-sage-light/50 focus:border-brand-primary focus:outline-none rounded-xl py-3.5 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm font-sans placeholder:text-zinc-400 text-zinc-800 shadow-inner"
              />
              <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch('')}
                  className="absolute right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Recent Search Histories */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {t.recentSearches}
                </span>
                {searchHistory.length > 0 && (
                  <button
                    onClick={() => clearSearchHistory()}
                    className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold uppercase cursor-pointer"
                  >
                    {t.clear}
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {searchHistory.length > 0 ? (
                  searchHistory.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectSuggestedSearch(q)}
                      className="bg-zinc-100 hover:bg-brand-sage-light/20 border border-zinc-200/50 hover:border-brand-sage-muted text-zinc-700 hover:text-brand-primary text-xs py-1.5 px-3 rounded-full transition-all cursor-pointer font-sans"
                    >
                      {q}
                    </button>
                  ))
                ) : (
                  <span className="text-xs text-zinc-400 italic">{t.noHistory}</span>
                )}
              </div>
            </div>

            {/* Category Quick jump links */}
            <div className="mt-6 pt-4 border-t border-brand-sage-light/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {language === 'en' ? 'Suggested Collections' : 'التشكيلات المقترحة'}
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      selectSuggestedSearch(language === 'en' ? cat.nameEn : cat.nameAr);
                    }}
                    className="flex items-center text-left rtl:text-right p-2.5 rounded-lg border border-zinc-100 hover:bg-white hover:border-brand-sage-light/60 transition-all cursor-pointer group"
                  >
                    <img src={cat.image} alt="" className="w-8 h-8 rounded object-cover mr-2.5 rtl:ml-2.5 group-hover:scale-105 transition-transform" />
                    <span className="text-xs font-semibold tracking-wide text-zinc-800 hover:text-brand-primary font-sans">
                      {language === 'en' ? cat.nameEn : cat.nameAr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM SLIDING SIDEBAR MINI-CART DRAWER */}
      {isMiniCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0" onClick={() => setIsMiniCartOpen(false)} />

          <div className="relative w-full max-w-md h-full bg-brand-cream shadow-2xl flex flex-col z-10 border-l border-brand-sage-light/20 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-brand-sage-light/20 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <ShoppingBag className="text-brand-primary" size={20} />
                <span className="font-serif text-lg font-bold text-brand-primary">
                  {t.cartTitle}
                </span>
              </div>
              <button
                onClick={() => setIsMiniCartOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-full hover:bg-brand-sage-light/10 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 rtl:space-x-reverse pb-4 border-b border-brand-sage-light/10"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.nameEn}
                      className="w-16 h-20 rounded-lg object-cover bg-white-50 border border-brand-sage-light/20 p-0.5"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-bold text-zinc-900 truncate">
                        {language === 'en' ? item.product.nameEn : item.product.nameAr}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                        {language === 'en' ? 'Size' : 'الحجم'}: {item.selectedSize}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Stepper qty controls */}
                        <div className="flex items-center border border-brand-sage-light/40 rounded-lg bg-zinc-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-zinc-500 hover:text-brand-primary cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-semibold text-zinc-800 font-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-zinc-500 hover:text-brand-primary cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-xs font-bold text-brand-primary font-sans">
                            {(item.product.discountPrice ?? item.product.price) * item.quantity} {t.aed}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-16">
                  <div className="w-16 h-16 rounded-full bg-brand-sage-light/10 flex items-center justify-center text-brand-sage-muted">
                    <ShoppingBag size={28} />
                  </div>
                  <p className="text-sm font-medium text-zinc-600 font-serif">
                    {t.cartEmpty}
                  </p>
                  <button
                    onClick={() => {
                      setIsMiniCartOpen(false);
                      setSearchQuery('');
                      setActivePage('shop');
                    }}
                    className="bg-brand-primary text-brand-cream py-2.5 px-6 rounded-xl text-xs tracking-wider uppercase font-semibold hover:bg-brand-secondary transition-all cursor-pointer"
                  >
                    {t.startRoutine}
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary (if products added) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-sage-light/20 bg-zinc-50 rounded-t-2xl space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-500 font-sans">
                    <span>{t.subtotal}</span>
                    <span>{cartSubtotal} {t.aed}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-red-600 font-sans">
                      <span>{t.discount} ({appliedCoupon.code})</span>
                      <span>-{discountAmount} {t.aed}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-zinc-900 pt-1.5 border-t border-zinc-200 font-sans">
                    <span>{t.total}</span>
                    <span className="text-brand-primary text-base">{grandTotal} {t.aed}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsMiniCartOpen(false);
                      setActivePage('cart');
                    }}
                    className="w-full bg-white border border-brand-sage-muted text-brand-primary py-3 rounded-xl text-[10px] tracking-wider uppercase font-bold text-center hover:bg-brand-cream transition-theme cursor-pointer"
                  >
                    {t.viewCart}
                  </button>
                  <button
                    onClick={() => {
                      setIsMiniCartOpen(false);
                      setActivePage('checkout');
                    }}
                    className="w-full bg-brand-primary text-brand-cream py-3 rounded-xl text-[10px] tracking-wider uppercase font-bold text-center hover:bg-brand-secondary transition-theme cursor-pointer"
                  >
                    {t.checkout}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
