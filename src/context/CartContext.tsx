import { createContext, useContext, useState, useEffect } from "react";
import type { CartItem } from "../types/Product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, property: string) => void;
  isInCart: (id: number, property: string) => boolean;
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
        addedAnimation: true, // <-- salva animação
      }
    ]);
  }

  function removeFromCart(id: number, property: string) {
    setCart(prev =>
      prev.filter(p => !(p.id === id && p.property === property))
    );
  }

  // ← para checar no botão se já está no carrinho
  function isInCart(id: number, property: string) {
    return cart.some(p => p.id === id && p.property === property);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
