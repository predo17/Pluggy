import { useEffect, useState } from "react";
import Cart from "./Shop/Cart";
import { ShoppingCart, Package, User, Star, Bell, Search, Filter, } from "lucide-react";
import { useLoading } from "../../context/LoadingContext";
import { useCart } from "../../context/CartContext";
import { Notification} from "./Notification";
import { useNotifications } from "../../hooks/useNotifications";

export function formatCount(count: number, limit: number = 9) {
    if (count <= 0) return "";
    if (count > limit) return `${limit}+`;
    return String(count);
}

export default function DashboardUser() {
    const [activeSection, setActiveSection] = useState(() => { return localStorage.getItem("activeSection") || "cart"; });
    const [searchTerm, setSearchTerm] = useState("");
    const { startLoading, stopLoading } = useLoading();

    const { cart, cartCount } = useCart();
    const showCart = cart.length;
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
            localStorage.setItem("activeSection", activeSection);
        };
    }, []);

    const menuItems = [
        { id: "cart", icon: ShoppingCart, label: "Carrinho", count: formatCount(cartCount), color: "blue" },
        { id: "orders", icon: Package, label: "Meus Pedidos", color: "green" },
        { id: "notifications", icon: Bell, label: "Novidades", count: formatCount(totalCount), color: "yellow" },
        { id: "profile", icon: User, label: "Perfil", color: "purple" },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: "bg-blue-500 text-white",
            green: "bg-green-500 text-white",
            yellow: "bg-yellow-500 text-white",
            purple: "bg-purple-500 text-white",
            gray: "bg-gray-500 text-white"
        };
        return colors[color as keyof typeof colors] || colors.gray;
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-2">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                            PH
                        </div>
                        <h3 className="font-semibold text-gray-900">Pedro Henrique</h3>
                        <p className="text-gray-600 text-sm">predo17@email.com</p>
                        <div className="flex justify-center gap-2 mt-3">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full inline-flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-xs">Desenvolvedor</span>
                            </span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleChangeSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer ${activeSection === item.id
                                            ? `${getColorClasses(item.color)} shadow-md`
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.count && (
                                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${activeSection === item.id
                                                ? "bg-white text-gray-900"
                                                : "bg-gray-200 text-gray-700"
                                                }`}>
                                                {item.count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Estatísticas</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Gasto Total </span>
                                <span className="font-semibold text-green-600 truncate">{`${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pedidos/Mês</span>
                                <span className="font-semibold text-gray-600">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Economia</span>
                                <span className="font-semibold text-gray-600">{`R$ ${cart.reduce((acc, item) => acc - item.price, 0).toLocaleString("pt-BR")}`}</span>{/* kkkkk */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Header Bar */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {menuItems.find(item => item.id === activeSection)?.label}
                                </h1>
                                <p className="text-gray-600">{activeSection === "cart" || activeSection === "orders" ? "Gerencie suas compras e pedidos" : activeSection === "notifications" ? "Verifique suas notificações mais recentes" : "Administre seus dados pessoais"}</p>
                            </div>

                            <div className={`flex items-center gap-3 ${activeSection === "profile" ? "pointer-events-none opacity-50" : ""}`}>
                                <div className="relative">
                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Buscar pedidos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button

                                    className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                                    <Filter className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                        {/* WRAPPER PRINCIPAL */}
                        <div className="h-[70vh]">

                            {/* CARRINHO */}
                            {activeSection === "cart" && (
                                <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 animate-fadeIn h-full flex flex-col">
                                    <header className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Carrinho de Compras</h2>
                                    </header>

                                    {showCart === 0 ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                            <img src="imgsnull/carrinho-vazio.png" alt="Carrinho Vazio" className="w-45 h-40 mb-4" />
                                            <p className="text-center">Seu carrinho de compras está vazio</p>
                                        </div>
                                    ) : (
                                        <div className="flex-1 overflow-y-auto pr-1 md:pr-2 xl:pr-4">
                                            <Cart />
                                        </div>
                                    )}

                                </section>
                            )}

                            {/* PEDIDOS */}
                            {activeSection === "orders" && (
                                <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 animate-fadeIn h-full flex flex-col">
                                    <header className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Histórico de Compras</h2>
                                    </header>

                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                        <img src="imgsnull/saco-vazio.png" alt="Histórico de Pedidos" className="w-40 h-40 mb-4" />
                                        <p className="text-center">Configurações do histórico em desenvolvimento</p>
                                    </div>

                                </section>
                            )}

                            {/* NOTIFICAÇÕES */}
                            {activeSection === "notifications" && (
                                <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 animate-fadeIn h-full flex flex-col">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Notificações</h2>

                                    <Notification />

                                </section>
                            )}

                            {/* PERFIL */}
                            {activeSection === "profile" && (
                                <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 animate-fadeIn h-full flex flex-col">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Meu Perfil</h2>

                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                        <img src="imgsnull/user.png" alt="usuário" className="w-45 h-40 mb-4" />
                                        <p className="text-center">Configurações do perfil em desenvolvimento</p>
                                    </div>
                                </section>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
