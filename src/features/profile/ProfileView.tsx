import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { PRODUCTS } from '../../constants/data';
import { User, ShoppingBag, Heart, MapPin, Shield, Check, Trash2, ArrowRight, Truck, Info, Star } from 'lucide-react';

export default function ProfileView() {
  const {
    language,
    user,
    orders,
    wishlist,
    toggleWishlist,
    addToCart,
    addNewAddress,
    deleteAddress,
    logoutUser,
    setActivePage,
    setSelectedProduct
  } = useApp();

  // Guard if user not logged in
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-zinc-650 font-serif mb-4">Please log in to manage your premium account.</p>
        <button
          onClick={() => setActivePage('auth')}
          className="bg-brand-primary text-brand-cream text-xs font-semibold py-3 px-6 rounded-xl uppercase tracking-wider cursor-pointer"
        >
          Sign In
        </button>
      </div>
    );
  }

  const [activeSegment, setActiveSegment] = useState<'info' | 'orders' | 'wishlist' | 'addresses' | 'security'>('orders');

  // Address form states
  const [addrName, setAddrName] = useState('');
  const [addrLine, setAddrLine] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrProvince, setAddrProvince] = useState('');
  const [addrZip, setAddrZip] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrSuccess, setAddrSuccess] = useState(false);

  // Translations
  const t = {
    welcomeEn: 'Welcome back, Aura Practitioner',
    welcomeAr: 'أهلاً بكِ مجدداً في عائلة أورا',
    memberSinceEn: 'Premium Account Active ',
    memberSinceAr: 'حساب الولاء الماسي نشط',
    tabInfoEn: 'Account Identity',
    tabInfoAr: 'بيانات الحساب الشخصي',
    tabOrdersEn: 'Routine Orders',
    tabOrdersAr: 'الطلبيات والتتبع',
    tabWishEn: 'Wishlist Catalog',
    tabWishAr: 'قائمة الأمنيات والمفضلة',
    tabAddrEn: 'Address Book',
    tabAddrAr: 'دفتر العناوين',
    tabSecEn: 'Dermal Profile Settings',
    tabSecAr: 'الإعدادات الطبية وسرية المرور',
    phoneEn: 'Mobile',
    phoneAr: 'الجوال',
    emailEn: 'Mail',
    emailAr: 'البريد',
    logoutEn: 'Logout',
    logoutAr: 'تسجيل الخروج',
    noOrdersEn: 'No routine orders recorded yet.',
    noOrdersAr: 'لا توجد أي طلبيات مسجلة في حسابكِ حالياً.',
    orderNoEn: 'Order',
    orderNoAr: 'طلبية رقم',
    statusEn: 'Status',
    statusAr: 'حالة الطلب',
    statusProcEn: 'Under sterile preparation',
    statusProcAr: 'جارٍ التجهيز والتعقيم المخبري',
    trackingEn: 'Tracking Number',
    trackingAr: 'رقم تتبع الشحنة مع أرامكس',
    deliveryByEn: 'Expected Delivery By',
    deliveryByAr: 'التوصيل المتوقع لبابكِ بتاريخ',
    reorderEn: 'Reorder All Items',
    reorderAr: 'إعادة طلب هذه المستحضرات',
    emptyWishEn: 'Your wishlist is currently clean.',
    emptyWishAr: 'قائمة أمنياتكِ فارغة من المستحضرات حالياً.',
    moveToBagEn: 'Transfer to Bag',
    moveToBagAr: 'نقل للحقيبة',
    addAddressEn: 'Register New Destination',
    addAddressAr: 'إضافة عنوان شحن وتوصيل جديد',
    streetEn: 'Street & House Number',
    streetAr: 'اسم الشارع، رقم الفيلا والمنزل',
    cityEn: 'City',
    cityAr: 'المدينة',
    provEn: 'State / Region',
    provAr: 'المنطقة أو المحافظة',
    zipEn: 'ZIP Code',
    zipAr: 'الرمز البريدي / صندوق البريد',
    saveAddrEn: 'Save Location Info',
    saveAddrAr: 'حفظ الموقِع الجغرافي',
    securityEn: 'Dermal Diagnosis Settings',
    securityAr: 'التشخيص الطبي وتفضيلات حساسية الجلد',
    skinSelectEn: 'Active Skin Condition',
    skinSelectAr: 'نوع وحالة بشرتكِ الحالية للروتين:',
    notifyEn: 'Formulation alerts',
    notifyAr: 'تنبيهات انخفاض مخزون علاجاتي اليومية:',
    totalEn: 'Total Amount',
    totalAr: 'القيمة الإجمالية للطلب',
    aed: language === 'en' ? 'AED/SAR' : 'ريال'
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrName || !addrLine || !addrCity) return;

    addNewAddress({
      fullName: addrName,
      addressLine1: addrLine,
      city: addrCity,
      state: addrProvince || 'State',
      postalCode: addrZip || '0000',
      country: 'Saudi Arabia',
      phone: addrPhone || user.phone,
      isDefault: false
    });

    setAddrName('');
    setAddrLine('');
    setAddrCity('');
    setAddrProvince('');
    setAddrZip('');
    setAddrPhone('');
    setAddrSuccess(true);
    setTimeout(() => setAddrSuccess(false), 3000);
  };

  const handleReorder = (orderItems: any[]) => {
    orderItems.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.selectedSize, item.quantity);
      }
    });
    setActivePage('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Client Identity Welcome Header banner */}
      <div className="bg-brand-primary rounded-3xl p-8 sm:p-10 border border-brand-secondary/30 text-brand-cream relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <span className="text-[9px] tracking-[0.4em] text-brand-sage-light uppercase font-bold block">
            {language === 'en' ? t.memberSinceEn : t.memberSinceAr}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {language === 'en' ? t.welcomeEn : t.welcomeAr}: {user.name}
          </h1>
          <p className="text-xs text-zinc-300 font-sans max-w-xl">
            {language === 'en'
              ? 'Maximize efficacy by maintaining structural cosmetic applications. Check status of newly placed clinical orders below.'
              : 'حافظي على استمرارية الروتين اليومي بانتظام وعناية. تتبعي حالة وتاريخ طلبياتكِ النشطة أدناه.'}
          </p>
        </div>

        <button
          onClick={logoutUser}
          className="border border-brand-cream/30 hover:bg-white hover:text-brand-primary text-brand-cream font-semibold rounded-xl text-[10px] tracking-wider py-2 px-5 uppercase transition-all duration-300 cursor-pointer"
        >
          {language === 'en' ? t.logoutEn : t.logoutAr}
        </button>
      </div>

      {/* Workspace content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR TABS BAR */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-brand-sage-light/10 shadow-xs space-y-2 font-sans text-xs">
          {[
            { id: 'orders', label: language === 'en' ? t.tabOrdersEn : t.tabOrdersAr, icon: <ShoppingBag size={14} /> },
            { id: 'wishlist', label: language === 'en' ? t.tabWishEn : t.tabWishAr, icon: <Heart size={14} /> },
            { id: 'addresses', label: language === 'en' ? t.tabAddrEn : t.tabAddrAr, icon: <MapPin size={14} /> },
            { id: 'info', label: language === 'en' ? t.tabInfoEn : t.tabInfoAr, icon: <User size={14} /> },
            { id: 'security', label: language === 'en' ? t.tabSecEn : t.tabSecAr, icon: <Shield size={14} /> }
          ].map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id as any)}
              className={`w-full flex items-center space-x-2.5 rtl:space-x-reverse py-3 px-4 rounded-xl text-left rtl:text-right font-semibold transition-all cursor-pointer ${
                activeSegment === seg.id
                  ? 'bg-brand-primary text-brand-cream'
                  : 'text-zinc-500 hover:bg-brand-cream/65 hover:text-brand-primary'
              }`}
            >
              {seg.icon}
              <span>{seg.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN PANEL CONTENT AREA */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-brand-sage-light/10 shadow-xs min-h-[400px]">
          
          {/* ORDERS MANIFEST TAB */}
          {activeSegment === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-2.5">
                {language === 'en' ? t.tabOrdersEn : t.tabOrdersAr}
              </h3>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-brand-sage-light/25 bg-zinc-50/40 rounded-2xl p-5 sm:p-6 space-y-4"
                    >
                      {/* Top status */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-cream pb-3 text-xs font-sans text-zinc-650">
                        <div>
                          <span className="text-[10px] text-zinc-400 font-bold block uppercase">{language === 'en' ? 'Transaction Code' : 'سجل المعاملة'}</span>
                          <span className="font-mono text-zinc-800 font-bold">{ord.orderNumber}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 font-bold block uppercase">{language === 'en' ? t.statusEn : t.statusAr}</span>
                          <span className="bg-brand-sage-light/35 text-brand-primary rounded px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider inline-block">
                            {language === 'en' ? t.statusProcEn : t.statusProcAr}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 font-bold block uppercase">Date</span>
                          <span className="font-bold text-zinc-700">{ord.date}</span>
                        </div>
                      </div>

                      {/* Products visualised list */}
                      <div className="space-y-3 font-sans text-xs">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex space-x-3 rtl:space-x-reverse items-center">
                            <img src={it.image} alt="" className="w-10 h-12 object-cover rounded bg-white p-0.5 border" />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-serif font-bold text-zinc-800 m-0 truncate">{language === 'en' ? it.productNameEn : it.productNameAr}</h5>
                              <span className="text-[10px] text-zinc-400 block">{it.quantity} x {it.selectedSize}</span>
                            </div>
                            <span className="font-bold text-brand-primary">{it.price * it.quantity} {t.aed}</span>
                          </div>
                        ))}
                      </div>

                      {/* tracking number details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/70 p-3.5 rounded-xl border border-brand-sage-light/10 text-xs font-sans text-zinc-600">
                        <div>
                          <span className="text-[9px] text-zinc-400 block uppercase font-bold">{language === 'en' ? t.trackingEn : t.trackingAr}:</span>
                          <span className="font-mono font-bold text-brand-primary">{ord.trackingNumber} ({language === 'en' ? 'Aramex Express' : 'أرامكس مبرد'})</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-400 block uppercase font-bold">{language === 'en' ? t.deliveryByEn : t.deliveryByAr}:</span>
                          <span className="font-bold text-emerald-700">{ord.estimatedDelivery}</span>
                        </div>
                      </div>

                      {/* Reorder Button */}
                      <div className="flex justify-between items-center pt-2 font-sans text-xs">
                        <span className="font-serif font-bold text-zinc-800">
                          {language === 'en' ? t.totalEn : t.totalAr}: <span className="text-brand-primary font-sans text-sm font-bold">{ord.total} {t.aed}</span>
                        </span>
                        
                        <button
                          onClick={() => handleReorder(ord.items)}
                          className="bg-brand-primary hover:bg-brand-secondary text-brand-cream text-[10px] tracking-wider uppercase font-bold py-2.5 px-4 rounded-xl cursor-pointer"
                        >
                          {language === 'en' ? t.reorderEn : t.reorderAr}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-4 font-sans text-xs flex flex-col items-center">
                  <div className="text-zinc-300"><ShoppingBag size={40} /></div>
                  <p className="text-zinc-500 italic font-serif text-sm">{language === 'en' ? t.noOrdersEn : t.noOrdersAr}</p>
                  <button onClick={() => setActivePage('shop')} className="bg-brand-primary text-brand-cream py-2 px-5 rounded-lg text-[10px] font-bold uppercase cursor-pointer">Start Routine</button>
                </div>
              )}
            </div>
          )}

          {/* WISHLIST MANIFEST TAB */}
          {activeSegment === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-2.5">
                {language === 'en' ? t.tabWishEn : t.tabWishAr}
              </h3>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                  {wishlist.map((id) => {
                    const prod = PRODUCTS.find((p) => p.id === id);
                    if (!prod) return null;
                    return (
                      <div
                        key={prod.id}
                        className="p-4 bg-zinc-50/40 border border-brand-sage-light/20 rounded-2xl flex space-x-3.5 rtl:space-x-reverse relative group hover:border-brand-sage-muted transition-all"
                      >
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="absolute top-2 right-2 text-zinc-300 hover:text-red-500 cursor-pointer"
                          aria-label="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                        
                        <img src={prod.image} alt="" className="w-14 h-18 object-cover rounded bg-white p-0.5 border" />
                        
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="min-w-0">
                            <h4
                              onClick={() => setSelectedProduct(prod)}
                              className="font-serif font-bold text-zinc-800 truncate m-0 group-hover:text-brand-primary cursor-pointer leading-tight"
                            >
                              {language === 'en' ? prod.nameEn : prod.nameAr}
                            </h4>
                            <span className="text-[9px] text-zinc-400 block pt-0.5">{prod.size}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2 mt-1 border-t border-brand-cream">
                            <span className="font-bold text-brand-primary font-sans">{prod.discountPrice ?? prod.price} {t.aed}</span>
                            <button
                              onClick={() => {
                                addToCart(prod, prod.size, 1);
                                toggleWishlist(prod.id); // move to cart logic simply transfers item
                              }}
                              className="text-[9px] text-brand-primary hover:text-brand-sage-muted font-bold uppercase cursor-pointer flex items-center gap-0.5 leading-none font-sans"
                            >
                              <span>{language === 'en' ? t.moveToBagEn : t.moveToBagAr}</span>
                              <ArrowRight size={10} className="rtl:rotate-180" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-zinc-500 italic space-y-2 font-serif text-sm">
                  <Heart size={36} className="text-zinc-200 mx-auto" />
                  <p>{language === 'en' ? t.emptyWishEn : t.emptyWishAr}</p>
                </div>
              )}
            </div>
          )}

          {/* ADDRESS BOOK TAB */}
          {activeSegment === 'addresses' && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-2.5">
                {language === 'en' ? t.tabAddrEn : t.tabAddrAr}
              </h3>

              {/* Render address cards lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-zinc-600">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 bg-zinc-50/40 border border-brand-sage-light/20 rounded-2xl relative space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-serif font-bold text-zinc-850 text-xs block">{addr.fullName}</span>
                      
                      {addr.isDefault ? (
                        <span className="bg-brand-primary text-brand-cream text-[8px] font-bold uppercase rounded py-0.5 px-1.5 font-sans">
                          {language === 'en' ? 'Default' : 'الرئيسي'}
                        </span>
                      ) : (
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-zinc-400 hover:text-red-500 cursor-pointer"
                          title="Delete Location"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] leading-relaxed font-sans">{addr.addressLine1}, {addr.city}, {addr.state}, {addr.country}</p>
                    <p className="text-[10px] text-zinc-400 font-sans font-semibold uppercase">{language === 'en' ? t.phoneEn : t.phoneAr}: {addr.phone}</p>
                  </div>
                ))}
              </div>

              {/* Form to append new address record */}
              <form onSubmit={handleCreateAddress} className="pt-6 border-t border-brand-cream space-y-4 text-xs font-sans text-zinc-600">
                <h4 className="font-serif text-sm font-bold text-brand-primary uppercase">
                  {language === 'en' ? t.addAddressEn : t.addAddressAr}
                </h4>

                {addrSuccess && (
                  <p className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-semibold font-sans p-3 rounded-xl">
                    Location record registered safely in directory!
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest block font-bold text-zinc-400">{language === 'en' ? 'Full Recipient Name' : 'الاسم الكامل للمستلم'}</label>
                    <input
                      type="text"
                      required
                      value={addrName}
                      onChange={(e) => setAddrName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest block font-bold text-zinc-400">{language === 'en' ? t.phoneEn : t.phoneAr}</label>
                    <input
                      type="text"
                      value={addrPhone}
                      onChange={(e) => setAddrPhone(e.target.value)}
                      placeholder="+966"
                      className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest block font-bold text-zinc-400">{language === 'en' ? t.streetEn : t.streetAr}</label>
                  <input
                    type="text"
                    required
                    value={addrLine}
                    onChange={(e) => setAddrLine(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest block font-bold text-zinc-400">{language === 'en' ? t.cityEn : t.cityAr}</label>
                    <input
                      type="text"
                      required
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest block font-bold text-zinc-400">{language === 'en' ? t.provEn : t.provAr}</label>
                    <input
                      type="text"
                      value={addrProvince}
                      onChange={(e) => setAddrProvince(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest block font-bold text-zinc-400">{language === 'en' ? t.zipEn : t.zipAr}</label>
                    <input
                      type="text"
                      value={addrZip}
                      onChange={(e) => setAddrZip(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-250 focus:border-brand-primary focus:outline-none rounded-xl py-2 px-3 shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-secondary text-brand-cream text-[10px] tracking-wider uppercase font-bold py-3 px-6 rounded-xl cursor-pointer"
                >
                  {language === 'en' ? t.saveAddrEn : t.saveAddrAr}
                </button>
              </form>
            </div>
          )}

          {/* ACCOUNT IDENTITY INFO TAB */}
          {activeSegment === 'info' && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-2.5">
                {language === 'en' ? t.tabInfoEn : t.tabInfoAr}
              </h3>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-start space-x-3 rtl:space-x-reverse text-xs text-zinc-500 leading-relaxed font-sans">
                <Info size={16} className="text-brand-sage-muted flex-shrink-0 mt-0.5" />
                <span>
                  {language === 'en'
                    ? 'Aura identity data is locked with end-to-end client encryption. We never share sensitive demographic data or credit values.'
                    : 'يتم تشفير وتأمين بيانات حسابات روتينات أورا بالكامل داخل السيرفرات الآمنة. لا نقوم بمشاركة أي تفاصيل حساسة للمستخدمين.'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-zinc-650">
                <div className="p-4.5 bg-brand-cream/35 rounded-2xl border">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold mb-1">{language === 'en' ? 'Verified Account Holder' : 'حساب مستخدم موثق'}</span>
                  <span className="text-sm font-bold text-zinc-805 block">{user.name}</span>
                </div>
                <div className="p-4.5 bg-brand-cream/35 rounded-2xl border">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold mb-1">{language === 'en' ? t.emailEn : t.emailAr}</span>
                  <span className="text-sm font-bold text-zinc-805 block">{user.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* DERMAL PROFILE SETTINGS TAB */}
          {activeSegment === 'security' && (
            <div className="space-y-6 font-sans text-xs text-zinc-650">
              <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-zinc-50 pb-2.5">
                {language === 'en' ? t.securityEn : t.securityAr}
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 block uppercase font-bold">{t.skinSelectEn}</label>
                  <select className="w-full sm:max-w-xs bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 cursor-pointer">
                    <option>Dry & Dehydrated / البشرة الجافة والفاقدة للمرونة</option>
                    <option>Oily & Acne Prone / الدهنية والمعرضة للحبوب</option>
                    <option>Extremely Sensitive / الحساسة والمتهيجة</option>
                    <option>Normal Healthy / عادية وصحية متوازنة</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <label className="flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer font-semibold text-zinc-700">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-primary accent-brand-primary border-zinc-300 rounded" />
                    <span>{language === 'en' ? t.notifyEn : t.notifyAr}</span>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
