import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Product, CartItem, Coupon, Order, Address, UserProfile, Category } from '../types';
import { PRODUCTS, CATEGORIES, COUPONS } from '../constants/data';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => string | null; // returns error message if invalid, or null if success
  removeCoupon: () => void;
  user: UserProfile | null;
  loginUser: (email: string, name?: string) => void;
  registerUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  addNewAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  orders: Order[];
  placeOrder: (shippingAddress: Address, paymentMethod: Order['paymentMethod']) => Order;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  activeCategory: string | null; // filter by category slug
  setActiveCategory: (slug: string | null) => void;
  activeSkinType: string | null; // filter by skin type
  setActiveSkinType: (type: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: 'usr_premium_1',
  name: 'Serene Al-Ghamdi',
  email: 'serene@aura.com',
  phone: '+966 54 123 4567',
  addresses: [
    {
      id: 'addr_1',
      fullName: 'Serene Al-Ghamdi',
      addressLine1: '7821 Al Reem Boulevard, Floor 14',
      addressLine2: 'Al Murooj District',
      city: 'Riyadh',
      state: 'Central Province',
      postalCode: '12282',
      country: 'Saudi Arabia',
      phone: '+966 54 123 4567',
      isDefault: true
    }
  ],
  wishlist: ['prod_ocean_glow']
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [activePage, setActivePageState] = useState<string>('home');
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod_ocean_glow']);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Serum', 'Moisturizer', 'Cleanser']);
  
  // Custom Filters & Sorting State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSkinType, setActiveSkinType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('best-selling');

  // Trigger Language and Direction Sync
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }
  };

  useEffect(() => {
    // Sync initial direction
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const setActivePage = (page: string) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const setSelectedProduct = (product: Product | null) => {
    setSelectedProductState(product);
    if (product) {
      setActivePageState('product-details');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const addToCart = (product: Product, size: string, qty = 1) => {
    const itemId = `${product.id}_${size}`;
    setCart((prevCart) => {
      const matchIndex = prevCart.findIndex((item) => item.id === itemId);
      if (matchIndex > -1) {
        const newCart = [...prevCart];
        newCart[matchIndex].quantity += qty;
        return newCart;
      } else {
        return [...prevCart, { id: itemId, product, quantity: qty, selectedSize: size }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWish) => {
      const isExist = prevWish.includes(productId);
      if (isExist) {
        return prevWish.filter((id) => id !== productId);
      } else {
        return [...prevWish, productId];
      }
    });
  };

  const applyCoupon = (code: string): string | null => {
    const codeClean = code.toUpperCase().trim();
    const coupon = COUPONS.find((c) => c.code === codeClean);
    if (!coupon) {
      return language === 'en' ? 'Invalid promotion code' : 'كود الخصم غير صالح';
    }

    // Subtotal calculation
    const currentSubtotal = cart.reduce(
      (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
      0
    );

    if (currentSubtotal < coupon.minOrderAmount) {
      return language === 'en'
        ? `Minimum order amount for this coupon is ${coupon.minOrderAmount} AED/SAR`
        : `الحد الأدنى لتفعيل هذا الكوبون هو ${coupon.minOrderAmount} ريال/درهم`;
    }

    setAppliedCoupon(coupon);
    return null;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const loginUser = (email: string, name = 'Valued Customer') => {
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: '+966 50 000 0000',
      addresses: [
        {
          id: 'addr_init',
          fullName: name,
          addressLine1: 'Tahlia Terrace Street, House 42A',
          city: 'Jeddah',
          state: 'Western Area',
          postalCode: '21563',
          country: 'Saudi Arabia',
          phone: '+966 50 000 0000',
          isDefault: true
        }
      ],
      wishlist: []
    });
  };

  const registerUser = (name: string, email: string, phone: string) => {
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      addresses: [],
      wishlist: []
    });
  };

  const logoutUser = () => {
    setUser(null);
    setWishlist([]);
  };

  const addNewAddress = (addr: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addr,
      id: `addr_${Date.now()}`,
      isDefault: user.addresses.length === 0 ? true : addr.isDefault
    };

    const updatedAddresses = newAddr.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
      : user.addresses.concat(newAddr);

    setUser({
      ...user,
      addresses: updatedAddresses
    });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id)
    });
  };

  const placeOrder = (addr: Address, payment: Order['paymentMethod']): Order => {
    const subtotal = cart.reduce(
      (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
      0
    );

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = appliedCoupon.value;
      }
    }

    const shippingFee = subtotal - discount > 200 ? 0 : 25;
    const total = subtotal - discount + shippingFee;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `AURA-${Math.floor(Math.random() * 900000 + 100000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      items: cart.map((item) => ({
        productId: item.product.id,
        productNameEn: item.product.nameEn,
        productNameAr: item.product.nameAr,
        price: item.product.discountPrice ?? item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        selectedSize: item.selectedSize
      })),
      shippingAddress: addr,
      paymentMethod: payment,
      couponApplied: appliedCoupon?.code,
      subtotal,
      discount,
      shippingFee,
      total,
      trackingNumber: `TRK-${Math.floor(Math.random() * 89000000 + 10000000)}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 days
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        user,
        loginUser,
        registerUser,
        logoutUser,
        addNewAddress,
        deleteAddress,
        orders,
        placeOrder,
        searchQuery,
        setSearchQuery,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory,
        activeCategory,
        setActiveCategory,
        activeSkinType,
        setActiveSkinType,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
