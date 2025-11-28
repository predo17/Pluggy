import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext'
import { LoadingProvider } from './context/LoadingContext.tsx'
import GlobalLoader from './GlobalLoader.tsx'
import { NotificationsProvider } from './hooks/useNotifications.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <GlobalLoader />
      <CartProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationsProvider>
      </CartProvider>
    </LoadingProvider>
  </StrictMode>,
)
