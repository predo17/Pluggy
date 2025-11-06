import { CircleUser, Search, ShoppingBag, ShoppingCart } from "lucide-react";

export default function HeaderMinimal() {
    const navLinks = [
        { href: "#", label: "Home" },
        { href: "#", label: "Produtos" },
        { href: "#", label: "Sobre" },
        { href: "#", label: "Contato" },
    ];

    return (
        <header className="sticky top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-3">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Logo */}

                <picture className="w-24">
                    {/* Imagem para telas maiores (a partir de 768px) */}
                    <source media="(min-width: 768px)" srcSet="./logo-pluggy-oficial.png" />

                    {/* Imagem para telas menores (até 767px) */}
                    <source media="(max-width: 767px)" srcSet="./logo-oficial.png" />

                    {/* Imagem padrão (fallback, obrigatória) */}
                    <img
                        src="./logo-pluggy-oficial.png"
                        alt="Logo da Pluggy"
                        className="w-full h-auto"
                        loading="eager"
                    />
                </picture>


                {/* Navegação Central */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Ações */}
                <div className="flex items-center gap-4">

                    <form
                        className="relative hidden md:flex items-center"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                            aria-label="Pesquisar"
                        />
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                            aria-hidden="true"
                        />
                    </form>
                    {/* Busca Minimal */}

                    {/* Carrinho */}
                    <button
                        className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label="Carrinho de compras"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>
                    <button
                        className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label="Carrinho de compras"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>

                    {/* Usuário */}
                    <button
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label="Perfil do usuário"
                    >
                        <CircleUser className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}