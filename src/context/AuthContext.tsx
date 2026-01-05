import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLogged: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const isLogged = !!user;

  // REGISTER
  async function register(name: string, email: string, password: string) {
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) return false;

    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth_user");
  }
  // LOGIN
  async function login(email: string, password: string) {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || !data.success) return false;

    setUser(data.user);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    return data.user;
  }

  async function deleteAccount() {
    if (!user) return;

    await fetch(`http://localhost:3001/api/auth/user/${user.id}`, {
      method: "DELETE"
    });

    // limpa frontend
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("pluggy_cart");

    window.location.href = "/Auth", { state: { mode: "register" }, replace: true };
  }

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLogged, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
