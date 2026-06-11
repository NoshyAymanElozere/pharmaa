import React from 'react';
import { AppProvider, useApp } from './store/AppContext';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import HomeView from './features/home/HomeView';
import ProductListingView from './features/products/ProductListingView';
import ProductDetailsView from './features/products/ProductDetailsView';
import CartView from './features/cart/CartView';
import CheckoutView from './features/checkout/CheckoutView';
import ProfileView from './features/profile/ProfileView';
import AuthView from './features/auth/AuthView';

function AppShell() {
  const { activePage } = useApp();

  // Route switch handler
  const renderActiveRoute = () => {
    switch (activePage) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ProductListingView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'profile':
        return <ProfileView />;
      case 'auth':
        return <AuthView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream/15 text-zinc-900 selection:bg-brand-sage-muted/30">
      {/* Global upper header */}
      <Header />

      {/* Dynamic Main Body Content */}
      <main className="flex-grow pt-28 sm:pt-32 pb-16">
        {renderActiveRoute()}
      </main>

      {/* Corporate details footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
