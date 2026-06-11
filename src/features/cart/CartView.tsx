import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { Trash2, Plus, Minus, Ticket, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CartView() {
  const {
    language,
    cart,
    updateCartQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActivePage,
    setSelectedProduct
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const t = {
    cartTitleEn: 'Daily Routine Shopping Bag',
    cartTitleAr: 'حقيبة التسوق للعناية والروتين',
    emptyTitleEn: 'No skin formulas added yet.',
    emptyTitleAr: 'حقيبة مستحضرات التجميل فارغة حالياً.',
    emptyBtnEn: 'Begin Selection',
    emptyBtnAr: 'ابدئي باكتشاف المستحضرات',
    itemEn: 'Product details',
    itemAr: 'تفاصيل المنتج',
    qtyEn: 'Quantity',
    qtyAr: 'الكمية',
    totalPriceEn: 'Total Price',
    totalPriceAr: 'الإجمالي الفرعي',
    orderSummaryEn: 'Formulation Summary',
    orderSummaryAr: 'ملخص الحساب والجرعات',
    subtotalEn: 'Subtotal',
    subtotalAr: 'المجموع الفرعي',
    discountEn: 'Pro coupon applied',
    discountAr: 'تم تفعيل كود الخصم',
    shippingEn: 'Insulated Delivery',
    shippingAr: 'الشحن المبرد الفاخر',
    freeEn: 'FREE',
    freeAr: 'مجاني',
    totalEn: 'Grand Total',
    totalAr: 'الإجمالي الكلي',
    checkoutEn: 'Secure Checkout',
    checkoutAr: 'الانتقال للدفع الآمن',
    promoCodeEn: 'Promotion Code / Coupon',
    promoCodeAr: 'كوبون الخصم أو رمز ترويجي',
    applyEn: 'Apply',
    applyAr: 'تطبيق',
    removeEn: 'Remove',
    removeAr: 'حذف',
    placeholderEn: 'Try AURA20, SAVE50...',
    placeholderAr: 'أدخلي كوبون الخصم (AURA20)...',
    aed: language === 'en' ? 'AED/SAR' : 'ريال',
    satisfactionEn: 'Tested Botanics',
    satisfactionAr: 'مواد مجربة بيولوجياً'
  };

  const currentSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );

  let discountValue = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountValue = Math.round((currentSubtotal * appliedCoupon.value) / 100);
    } else {
      discountValue = appliedCoupon.value;
    }
  }

  const shippingFee = currentSubtotal - discountValue > 200 || currentSubtotal === 0 ? 0 : 25;
  const grandTotal = currentSubtotal - discountValue + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponCode.trim()) return;

    const error = applyCoupon(couponCode);
    if (error) {
      setCouponError(error);
    } else {
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-brand-cream border-2 border-brand-sage-light/20 flex items-center justify-center text-brand-sage-muted animate-bounce">
          <ShoppingBag size={34} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-zinc-900">
          {language === 'en' ? t.emptyTitleEn : t.emptyTitleAr}
        </h2>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-brand-primary hover:bg-brand-secondary text-brand-cream py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors shadow-md"
        >
          {language === 'en' ? t.emptyBtnEn : t.emptyBtnAr}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title block */}
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-primary border-b border-brand-sage-light/10 pb-4">
        {language === 'en' ? t.cartTitleEn : t.cartTitleAr}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="hidden md:grid grid-cols-12 pb-2 px-4 border-b border-brand-sage-light/10 text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
            <div className="col-span-6">{language === 'en' ? t.itemEn : t.itemAr}</div>
            <div className="col-span-3 text-center">{language === 'en' ? t.qtyEn : t.qtyAr}</div>
            <div className="col-span-3 text-right rtl:text-left">{language === 'en' ? t.totalPriceEn : t.totalPriceAr}</div>
          </div>

          <div className="space-y-4">
            {cart.map((item) => {
              const unitPrice = item.product.discountPrice ?? item.product.price;
              const rowTotal = unitPrice * item.quantity;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-brand-sage-light/10 rounded-2xl p-4 md:p-6 shadow-3xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  {/* Info Column */}
                  <div className="md:col-span-6 flex items-start space-x-4 rtl:space-x-reverse min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.nameEn}
                      className="w-16 h-20 rounded-xl object-cover bg-zinc-50 border border-brand-sage-light/20 p-0.5"
                    />
                    <div className="min-w-0 space-y-1">
                      <h4
                        onClick={() => {
                          setSelectedProduct(item.product);
                        }}
                        className="font-serif text-sm font-bold text-zinc-900 hover:text-brand-primary cursor-pointer truncate"
                      >
                        {language === 'en' ? item.product.nameEn : item.product.nameAr}
                      </h4>
                      <p className="text-[10px] text-brand-sage-muted font-sans font-semibold uppercase">
                        {language === 'en' ? 'Formulation Size' : 'الحجم'}: {item.selectedSize}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-zinc-400 hover:text-red-500 font-bold uppercase flex items-center gap-1 cursor-pointer pt-1 transition-colors"
                      >
                        <Trash2 size={11} />
                        <span>{language === 'en' ? 'Vaporize' : 'حذف'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantity Counter Column */}
                  <div className="md:col-span-3 flex justify-center">
                    <div className="flex items-center border border-brand-sage-light/40 rounded-xl bg-zinc-50 font-sans">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-zinc-400 hover:text-brand-primary cursor-pointer h-full"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3.5 text-xs font-bold text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-brand-primary cursor-pointer h-full"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="md:col-span-3 text-right rtl:text-left min-w-0">
                    <span className="text-sm font-bold text-brand-primary block font-sans">
                      {rowTotal} {t.aed}
                    </span>
                    <span className="text-[10px] text-zinc-400 block font-sans">
                      {unitPrice} {t.aed} / unit
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Promo input and receipt summary */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Coupon Entry */}
          <div className="bg-white rounded-2xl p-5 border border-brand-sage-light/10 shadow-3xs space-y-4">
            <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
              {t.promoCodeEn}
            </h4>

            {appliedCoupon ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-emerald-800 block font-sans">
                    {appliedCoupon.code} Activated
                  </span>
                  <span className="text-[10px] text-emerald-600 block line-clamp-1">
                    {language === 'en' ? appliedCoupon.descriptionEn : appliedCoupon.descriptionAr}
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[10px] text-red-500 hover:underline font-bold cursor-pointer"
                >
                  {language === 'en' ? 'Erase' : 'إزالة'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex space-x-2 rtl:space-x-reverse">
                <input
                  type="text"
                  placeholder={language === 'en' ? t.placeholderEn : t.placeholderAr}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 text-xs text-zinc-800 uppercase placeholder:text-zinc-400 font-sans shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-secondary text-brand-cream font-bold rounded-xl text-xs py-2 px-4 uppercase tracking-wider cursor-pointer"
                >
                  {language === 'en' ? t.applyEn : t.applyAr}
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-[10px] text-red-600 font-semibold font-sans">
                {couponError}
              </p>
            )}
            <p className="text-[9px] text-zinc-400 block font-sans italic">
              *Promo codes (AURA20 / SAVE50) cannot be grouped together.
            </p>
          </div>

          {/* Totals panel */}
          <div className="bg-white rounded-2xl p-5 border border-brand-sage-light/10 shadow-3xs space-y-4 font-sans text-xs">
            <h4 className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
              {language === 'en' ? t.orderSummaryEn : t.orderSummaryAr}
            </h4>

            <div className="space-y-2.5 pb-3 border-b border-brand-cream">
              <div className="flex justify-between text-zinc-500">
                <span>{language === 'en' ? t.subtotalEn : t.subtotalAr}</span>
                <span>{currentSubtotal} {t.aed}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-red-600">
                  <span>{language === 'en' ? t.discountEn : t.discountAr} ({appliedCoupon.code})</span>
                  <span>-{discountValue} {t.aed}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500">
                <span>{language === 'en' ? t.shippingEn : t.shippingAr}</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-emerald-600">{language === 'en' ? t.freeEn : t.freeAr}</span>
                  ) : (
                    `${shippingFee} ${t.aed}`
                  )}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline font-serif">
              <span className="text-sm font-bold text-zinc-900">
                {language === 'en' ? t.totalEn : t.totalAr}
              </span>
              <span className="font-sans text-lg font-bold text-brand-primary">
                {grandTotal} {t.aed}
              </span>
            </div>

            {/* Free Shipping Progress bar */}
            {currentSubtotal < 200 ? (
              <div className="p-3 bg-brand-cream/60 rounded-xl space-y-1.5 border border-brand-sage-light/10">
                <p className="text-[10px] text-brand-primary leading-snug font-sans">
                  {language === 'en'
                    ? `Add ${200 - currentSubtotal} ${t.aed} more to unlock Free Temp-Controlled insulated delivery!`
                    : `أضيفي منتجات بـ ${200 - currentSubtotal} ريال/درهم أخرى لـتفعيل الشحن المبرد المجاني الفاخر!`}
                </p>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-sage-muted h-full transition-all duration-300"
                    style={{ width: `${(currentSubtotal / 200) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-2 rtl:space-x-reverse text-emerald-700">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  {language === 'en' ? 'Unlocked Free Temperature-Regulated Shipping!' : 'تفعيل الشحن المبرد المجاني الفاخر!'}
                </span>
              </div>
            )}

            <button
              onClick={() => setActivePage('checkout')}
              className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-cream py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-center transition-theme cursor-pointer flex items-center justify-center space-x-1"
            >
              <span>{language === 'en' ? t.checkoutEn : t.checkoutAr}</span>
              <ArrowRight size={13} className="ml-1 rtl:mr-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
