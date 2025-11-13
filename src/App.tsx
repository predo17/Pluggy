import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage.tsx'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Header from './components/H_F/Header.tsx'
import Footer from './components/H_F/Footer.tsx'
import { useEffect } from 'react'

export default function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0D1117] text-[#0D1117]">
      <Header />
      <main className="container mx-auto xl:px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}