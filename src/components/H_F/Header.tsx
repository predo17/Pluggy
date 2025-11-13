import { CircleUser, Home, Menu, Package, Phone, ScrollText, Search, ShoppingBag, ShoppingCart, Ticket, X } from "lucide-react";
import { useState } from "react";

export default function HeaderMinimal() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home", alt:"início", icon: Home, },
        { href: "/", label: "Produtos", alt:"Produtos ", icon: Package, },
        { href: "/", label: "Ofertas", alt:"deals ", icon: Ticket, },
        { href: "/", label: "Sobre Nós", alt:"Sobre nós", icon: ScrollText, },
        { href: "/", label: "Contato", alt:"Contato", icon: Phone, },
    ];

    const bottonLinks = [
        { href: "/", label: "Carrinho", alt:"Carrinho, seus favoritos", icon: ShoppingCart, },
        { href: "/", label: "Comprados", alt:"Comprados, produtos comprados", icon: ShoppingBag, },
        { href: "/", label: "Login", alt:"Login, sua conta", icon: CircleUser, },
    ];

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
                <nav className="hidden lg:flex items-center space-x-4 lg:space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-label={link.alt}
                            className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Ações */}
                <div className="flex max-xl:flex-1 items-center gap-4">

                    <form
                        className="relative w-full flex items-center "
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="flex-1 w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 tracking-wide"
                            aria-label="Pesquisar"
                        />
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                            aria-hidden="true"
                        />
                    </form>
                    {/* bottons acoes */}
                    <button
                        className="relative hidden lg:block p-2 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                        aria-label="Carrinho de compras"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>
                    <button
                        className="relative hidden lg:block p-2 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                        aria-label="Carrinho de compras"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>

                    {/* Usuário */}
                    <button
                        className="hidden lg:block p-2 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                        aria-label="Perfil do usuário"
                    >
                        <CircleUser className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu Mobile Button */}
                <button
                    className="lg:hidden p-2 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-600 transition-colors rounded-sm"
                    aria-label="Menu"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
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
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    aria-label={link.alt}
                                    className="flex items-center text-gray-600 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500  focus:text-blue-600 focus:bg-blue-50 transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-blue-50 tracking-wide"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.icon && <link.icon className="w-5 h-5 mr-4" />}
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <hr className="my-2 border-t border-gray-200" />
                <div>
                    <div className="flex flex-col space-y-4 ">
                        <nav>
                            <ul className="flex flex-col space-y-4">
                                {bottonLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            aria-label={link.alt}
                                            className="flex items-center text-gray-600 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-600 focus:bg-blue-50 transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-blue-50 tracking-wide"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.icon && <link.icon className="w-5 h-5 mr-4" />}
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}