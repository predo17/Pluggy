import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Package, User, Bell, LayoutDashboard, } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../hooks/useOrders";
import { useLoading } from "../../context/LoadingContext";
import { useNotifications } from "../../hooks/useNotifications";

import Cart from "./Shop/Cart";
import BagComponent from "./Shop/Bag";
import Notification from "./Notification";
import UserProfileInfo from "./User/UserProfileInfo";

export default function DashboardUser() {
  const [activeSection, setActiveSection] = useState(() => { return localStorage.getItem("activeSection") || "cart"; });
  const { startLoading, stopLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { orders, ordersCount, loading, removeConfirmation } = useOrders();
  const { totalCount } = useNotifications();

  async function handleChangeSection(sectionId: string) {
    startLoading();
    // tempo para que o React atualize tudo
    await new Promise(res => setTimeout(res, 300));
    setActiveSection(sectionId);
    localStorage.setItem("activeSection", sectionId);

    stopLoading();
  }

  useEffect(() => {
    return () => {
      localStorage.setItem("activeSection", "cart");
    };
  }, []);

  useEffect(() => {
    const goTo = location.state?.goTo;
    if (!goTo) return;

    const allowed = ["orders", "profile"];
    if (allowed.includes(goTo)) {
      setActiveSection(goTo);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.goTo, navigate, location.pathname]);

  function formatCount(count: number, limit: number = 9) {
    if (count <= 0) return "";
    if (count > limit) return `${limit}+`;
    return String(count);
  }

  const menuItems = [
    { id: "cart", icon: ShoppingCart, label: "Carrinho", count: formatCount(cartCount) },
    { id: "orders", icon: Package, label: "Meus Pedidos", count: formatCount(ordersCount) },
    { id: "notifications", icon: Bell, label: "Novidades", count: formatCount(totalCount) },
    { id: "profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 rounded-md">
      <div className="max-w-7xl mx-auto py-4 px-2 sm:px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar Modular */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-1 lg:block hidden">
            {/* User Module */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
            </div>

            {/* Navigation Module */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Navegação</h4>
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleChangeSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200 cursor-pointer
                      ${activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count && (
                        <span className={`text-xs px-2 py-1 rounded
                        ${activeSection === item.id
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700'
                          }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Content Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 lg:mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {menuItems.find(item => item.id === activeSection)?.label}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {activeSection === "cart" ? "Gerencie seu carrinho" :
                      activeSection === "orders" ? "Visualize seus pedidos" :
                        activeSection === "notifications" ? "Acompanhe notificações" :
                          "Configurações do perfil"}
                  </p>
                </div>
              </div>
            </div>
            {/* Mobile Navigation */}
            <div className="w-full lg:hidden flex items-center gap-1 px-1.5 sm:px-5 -mb-px">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleChangeSection(item.id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-t-lg text-sm focus-visible:outline-blue-500 focus-visible:outline-offset-1 transition-colors duration-200 cursor-pointer ${activeSection === item.id
                      ? 'bg-white border-t border-l border-r border-gray-200'
                      : 'text-gray-600 border border-transparent'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <div className="relative h-[calc(100vh-17.5rem)] bg-white rounded-md lg:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div
                className={`absolute inset-0 p-6 transition-transform duration-00 ease-in-out ${activeSection ? "translate-y-0" : "translate-y-12"}`}
              >
                <div className="h-full overflow-y-auto">
                  {activeSection === "cart" && <Cart />}
                  {activeSection === "orders" && <BagComponent
                    orders={orders}
                    loading={loading}
                    removeConfirmation={removeConfirmation} />}
                  {activeSection === "notifications" && <Notification />}
                  {activeSection === "profile" && <UserProfileInfo />}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
