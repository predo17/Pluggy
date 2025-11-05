import { CircleUser, Search, ShoppingBag, ShoppingCart } from "lucide-react";

export default function Header() {

    const navLinks = [
        { href: "#", label: "Home" },
        { href: "#", label: "Produtos" },
        { href: "#", label: "Sobre" },
        { href: "#", label: "Contato" },
    ];

    return (
        <header className="sticky top-0 left-0 z-50 w-full px-4 py-3 bg-linear-to-tl from-gray-100 to-white/20 border-b border-gray-200 backdrop-blur-md">
            <div className="container mx-auto">
                <div className="flex items-center justify-between ">

                    {/* Logo */}
                    <div className="w-40 shrink-0">
                        <img
                            src="./pluggy_logo.png"
                            alt="Logo da Pluggy"
                            className="w-full h-auto transition-opacity hover:opacity-80"
                            loading="eager"
                        />
                    </div>

                    <div className="max-w-5xl w-full flex items-center justify-between">
                        {/* Navegação */}
                        <nav className="hidden md:flex items-center justify-center space-x-4 mx-4 ">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-500 text-(var(--font-secondary)) hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1 rounded-md hover:bg-blue-50"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4 flex-1 justify-end">

                            {/* Busca */}
                            <div className="flex-1 max-w-md">
                                <form className="relative" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="text"
                                            required
                                            placeholder="Pesquisar..."
                                            className="w-full px-4 py-2 pl-10 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 transition-all duration-200"
                                            aria-label="Pesquisar"
                                        />
                                        <Search
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                                            aria-hidden="true"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-sm cursor-pointer shadow-sm"
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Ícones de Ação */}
                            <div className="flex items-center space-x-3 ml-4">
                                <button
                                    className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 relative cursor-pointer rounded-md hover:bg-gray-100"
                                    aria-label="Carrinho de compras"
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium shadow-sm">
                                        0
                                    </span>
                                </button>

                                <button
                                    className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 relative cursor-pointer rounded-md hover:bg-gray-100"
                                    aria-label="Sacola de compras"
                                >
                                    <ShoppingBag className="w-6 h-6" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium shadow-sm">
                                        0
                                    </span>
                                </button>

                                <button
                                    className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer rounded-md hover:bg-gray-100"
                                    aria-label="Perfil do usuário"
                                >
                                    <CircleUser className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}
