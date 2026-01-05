import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { CartItem } from "../types/Product";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, property: string) => void;
  isInCart: (id: number, property: string) => boolean;
  toggleHideItem: (id: number) => void
}

const CartContext = createContext<CartContextType>(null!);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("pluggy_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pluggy_cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: CartItem) {
    setCart(prev => [
      ...prev, 
      {
        ...product,
        hidden: false,
      }
    ]);
  }

  function removeFromCart(id: number, property: string) {
    setCart(prev =>
      prev.filter(p => !(p.id === id && p.property === property))
    );
  }

  const toggleHideItem = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, hidden: !item.hidden } : item
      )
    );
  };

  const cartCount = useMemo(() => cart.length, [cart]);

  // ← para checar no botão se já está no carrinho
  function isInCart(id: number, property: string) {
    return cart.some(p => p.id === id && p.property === property);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart, cartCount, toggleHideItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
