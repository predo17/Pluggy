import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage.tsx'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Header from './components/Header'
import { DataProducts } from './data/DataProducts.ts'


export default function App() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0D1117] overflow-x-hidden">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home DataProducts={DataProducts} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}