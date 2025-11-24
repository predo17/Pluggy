import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Header from './components/H_F/Header'
import Footer from './components/H_F/Footer'
import User from './components/ContaUser/User'
import Administrador from './pages/Administrador'
import { useLoading } from './context/LoadingContext'

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
    <div className="min-h-screen dark:bg-gray-100 :bg-black text-[#0D1117]">
      <Header />
      <main className="container mx-auto xl:px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/user" element={<User />} />
          <Route path="/admin/pluggy" element={<Administrador />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
