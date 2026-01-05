import { StrictMode } from 'react'
import { AuthProvider } from './context/AuthContext.tsx'
import { LoadingProvider } from './context/LoadingContext.tsx'

import GlobalLoader from './GlobalLoader.tsx'
import { CartProvider } from './context/CartContext'
import { NotificationsProvider } from './hooks/useNotifications.ts'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </StrictMode>,
)
