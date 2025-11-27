import {
    Facebook, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck, ArrowRight
} from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { navLinks } from "./Header";
import LinkWithLoading from "../LinkWithLoading";

export default function Footer() {
    return (
        <footer className="bg-white/95">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-2 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Coluna 1 - Sobre */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <img
                                src="/logo-pluggy-oficial.png"
                                alt="Pluggy"
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            Tecnologia de ponta para transformar sua experiência digital.
                            Produtos inovadores com qualidade e performance excepcionais.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Facebook, label: "Facebook" },
                                { icon: Instagram, label: "Instagram" },
                                { icon: RiTwitterXFill, label: "Twitter" },
                                { icon: Youtube, label: "YouTube" }
                            ].map((social, index) => (
                                <button
                                    key={index}
                                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coluna 2 - Links Rápidos */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Navegação</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <LinkWithLoading
                                        to={link.href}
                                        aria-label={link.label}
                                        className="text-gray-500 hover:text-sky-500 transition-colors flex items-center gap-2 max-w-max"
                                    >
                                        <ArrowRight className="w-3 h-3" />
                                        {link.label}
                                    </LinkWithLoading>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 3 - Suporte */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Suporte</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Central de Ajuda", href: "/help" },
                                { label: "Política de Trocas", href: "/returns" },
                                { label: "Garantia", href: "/warranty" },
                                { label: "Status do Pedido", href: "/tracking" },
                                { label: "Perguntas Frequentes", href: "/faq" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <LinkWithLoading
                                        to={link.href}
                                        aria-label={link.label}
                                        className="text-gray-500 hover:text-sky-500 transition-colors"
                                    >
                                        {link.label}
                                    </LinkWithLoading>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 4 - Contato */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contato</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-500">
                                <Phone className="w-5 h-5 text-blue-400" />
                                <div>
                                    <div className="font-medium">(86) 9999-9999</div>
                                    <div className="text-sm">Seg à Dom, 24h</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <Mail className="w-5 h-5 text-blue-400" />
                                <div>
                                    <div className="font-medium">contato@pluggy.com</div>
                                    <div className="text-sm">Respondemos em 24h</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-gray-500">
                                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                                <div>
                                    <div className="font-medium">Teresina, PI</div>
                                    <div className="text-sm">Av. Dos meus ovos, 1000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-1">Fique por dentro das novidades</h3>
                        <p className="text-gray-500 mb-4">Receba ofertas exclusivas e atualizações dos produtos</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap cursor-pointer">
                         <Mail className="w-5 h-5 inline-block -mt-0.5 mr-2" /> Inscrever-se Agora
                        </button>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {[
                                { icon: Shield, text: "Compra 100% Segura" },
                                { icon: CreditCard, text: "Pagamento Criptografado" },
                                { icon: Truck, text: "Entrega para Todo Brasil" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-500">
                                    <item.icon className="w-5 h-5 text-green-400" />
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500 text-sm mr-2">Métodos de pagamento:</span>
                            <div className="flex gap-2">
                                {["visa", "mastercard", "amex", "elo", "pix"].map((method) => (
                                    <div
                                        key={method}
                                        className="w-8 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-500"
                                    >
                                        {method === "pix" ? "PIX" : method.slice(0, 2).toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <div>
                            © 2025 Pluggy Technology. Todos os direitos reservados.
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/privacy" className="hover:text-gray-500 transition-colors">
                                Política de Privacidade
                            </Link>
                            <Link to="/terms" className="hover:text-gray-500 transition-colors">
                                Termos de Uso
                            </Link>
                            <Link to="/cookies" className="hover:text-gray-500 transition-colors">
                                Política de Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}