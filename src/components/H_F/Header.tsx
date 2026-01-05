import { useState } from "react";
import { Home, LayoutDashboard, Menu, Package, Phone, ScrollText, X } from "lucide-react";
import SearchBar from "../SearchBar";
import LinkWithLoading from "../LinkWithLoading";
import { useCart } from "../../context/CartContext";

export const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Produtos", icon: Package },
    { href: "/aboutus", label: "Sobre Nós", icon: ScrollText },
    { href: "/contact", label: "Contato", icon: Phone },
];

export default function HeaderMinimal() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="relative lg:sticky top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-2 md:px-6 py-3">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                {/* Logo */}
                <picture className="lg:w-24">
                    {/* Imagem para telas maiores (a partir de 768px) */}
                    <source media="(min-width: 1024px)" srcSet="/logo-pluggy-oficial.png" />

                    {/* Imagem para telas menores (até 767px) */}
                    <source media="(max-width: 1023px)" srcSet="/logo-oficial.png" />

                    {/* Imagem padrão (fallback, obrigatória) */}
                    <img
                        src="public/logo-pluggy-oficial.png"
                        alt="Logo da Pluggy"
                        className="w-auto lg:w-full h-10 lg:h-auto"
                        loading="eager"
                    />
                </picture>

                {/* Navegação Central */}
                <nav className="hidden lg:flex items-center space-x-4">
                    {navLinks.map((link) => (
                        <LinkWithLoading
                            key={link.href}
                            to={link.href}
                            aria-label={link.label}
                            className="text-gray-600 text-sm font-medium hover:text-blue-600 px-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full tracking-wide"
                        >
                            {link.label}
                        </LinkWithLoading>
                    ))}
                </nav>

                {/* Ações */}
                <div className="flex max-lg:flex-1 xl:w-xl items-center gap-4">
                    <SearchBar />

                    {/* Carrinho */}
                    <LinkWithLoading
                        to="/dashboard"
                        className="relative hidden lg:block p-2 text-gray-500 hover:text-blue-600 transition-colors focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 cursor-pointer"
                        aria-label="Painel de controle"
                    >
                        <LayoutDashboard className="w-5 h-5" />

                        {cartCount > 0 && (
                            <span
                                className={`absolute top-0 right-0 bg-blue-600 text-white  w-3 h-3 rounded-full flex items-center justify-center transition-transform duration-300 animate-pulse  `}
                            >

                            </span>
                        )}
                    </LinkWithLoading>
                </div>

                {/* Menu Mobile Button */}
                <button
                    className="relative lg:hidden p-2 text-gray-500 hover:text-blue-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-all duration-200 rounded-sm"
                    aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                    onClick={toggleMobileMenu}
                    aria-expanded={isMobileMenuOpen}
                    aria-haspopup="true"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-5 h-5" aria-hidden="true" />
                    ) : (
                        <Menu className="w-5 h-5" aria-hidden="true" />
                    )}
                    {cartCount > 0 && !isMobileMenuOpen && (
                        <span
                            className={`absolute top-0 right-0 bg-blue-600 text-white  w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 animate-pulse`}
                        >

                        </span>
                    )}
                </button>

            </div>

            {/* Menu Mobile */}
            <div className={`
                lg:hidden transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'max-h-max opacity-100 py-4 mb-2' : 'max-h-0 opacity-0 py-0 overflow-hidden'}
            `}>
                <nav>
                    <ul className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                                <LinkWithLoading
                                    to={link.href}
                                    aria-label={link.label}
                                    className="flex items-center text-gray-600 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500  focus:text-blue-600 focus:bg-blue-50 transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-blue-50 tracking-wide"
                                >
                                    {link.icon && <link.icon className="w-5 h-5 mr-4" />}
                                    {link.label}
                                </LinkWithLoading>
                            </li>
                        ))}
                    </ul>
                </nav>
                <hr className="my-2 border-t border-gray-200" />
                <div>
                    <div className="flex flex-col space-y-4 ">

                        <LinkWithLoading
                            to="/dashboard"
                            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 cursor-pointer"
                            aria-label="Painel de controle"
                        >
                            {cartCount > 0 && (
                                <span
                                    className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-600 text-white  w-3 h-3 rounded-full flex items-center justify-center transition-transform duration-300 animate-pulse `}
                                >

                                </span>
                            )}
                            <div
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center"
                            >
                                <LayoutDashboard className="w-5 h-5 mr-4" />
                                <span className="text-base font-medium">Painel de Controle</span>

                            </div>
                        </LinkWithLoading>

                    </div>
                </div>
            </div>
        </header>
    );
}