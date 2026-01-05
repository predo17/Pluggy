import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useLoading } from './context/LoadingContext'
import { Toaster } from "react-hot-toast";

import HeaderMinimal from './components/H_F/Header'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import AboutUs from './pages/AboutUs'
import ContactUsPage from './pages/ContactUsPage'
import CheckoutPage from './pages/CheckoutPage'
import Dashboard from './pages/DashboardPage'
import AuthPage from './pages/AuthPage';
import Footer from './components/H_F/Footer'
import ProfessionalBanner from './components/Hero/Banner';

export default function App() {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleNavigation = () => {
      startLoading();

      // Aguarda renderização do novo estado da página
      setTimeout(() => {
        stopLoading();
      }, 300);
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);


  return (
    <div className="min-h-screen dark:bg-gray-200 text-[#0D1117] max-md:overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <HeaderMinimal />
      <div className='relative w-full'>
        {location.pathname === "/" && <ProfessionalBanner/>}
      </div>
      <main className="container mx-auto xl:px-4 py-4 md:py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
