import { ArrowRight, CreditCard, Shield, Truck, UserCheck2 } from "lucide-react";
import LinkWithLoading from "../LinkWithLoading";

export default function HomepageHighlights() {
    return (
        <div className="max-w-7xl mx-auto lg:h-60 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-3">

                {/* Bloco Principal - Promoção Relâmpago */}
                <div className="relative group md:col-span-2 overflow-hidden rounded-xl border-b-2 border-gray-400/50">
                    {/* Gradiente de fundo com transição suave */}
                    <div className="absolute inset-0 bg-linear-to-br from-pink-600 via-orange-500 to-yellow-400 transition-all duration-500 group-hover:brightness-110 rounded-xl"></div>

                    {/* Efeitos de brilho */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

                    {/* Conteúdo principal */}
                    <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
                        {/* Header */}
                        <div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
                                    Promoção Exclusiva
                                </h1>
                                <p className="text-sm text-white/80">
                                    Faça login e garanta seu desconto  antes que acabe!
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">XPluggy 19 Ultra</h2>
                                <div className="text-5xl font-black text-white drop-shadow-lg">
                                    <span className="text-yellow-300">20%</span> OFF
                                </div>
                            </div>

                            <div className="mt-4">
                                <LinkWithLoading
                                    to="/login"
                                    className="inline-flex items-center gap-2 py-2 px-4 text-sm font-semibold transition-colors text-white bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20"
                                >
                                    Fazer login </LinkWithLoading>
                            </div>
                        </div>

                        {/* Imagem do produto */}
                        <div className="absolute right-5 bottom-1/2 translate-y-1/2">
                            <div className="w-52 h-52 transition-transform duration-500 group-hover:scale-110">
                                <img
                                    src="/smartphone_xpluggy.png"
                                    alt="Smartphone promocional"
                                    className="w-full h-full object-contain group-hover:rotate-12 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bloco Secundário 1 - Novidades */}
                <div className="relative group overflow-hidden rounded-xl bg-white border-4 border-gray-200 cursor-pointer ">
                    <LinkWithLoading to="/login">
                        <div className="relative p-6 h-full flex flex-col justify-between text-black">
                            {/* Efeitos de fundo */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>

                            {/* Conteúdo */}
                            <div className="relative z-10 space-y-4">
                                {/* Ícone */}
                                <div className="inline-flex items-center justify-center w-12 h-12  bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl backdrop-blur-sm">
                                    <UserCheck2 className="w-6 h-6 text-white" />
                                </div>

                                {/* Texto */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold leading-tight">
                                        Área do Cliente
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Acesse ofertas personalizadas, histórico de pedidos e suporte prioritário
                                    </p>
                                </div>

                                {/* Benefícios em lista */}

                            </div>

                            {/* CTA */}
                            <div className="relative z-10 mt-2">
                                <div className="inline-flex items-center gap-2 text-gray-900 group-hover:text-sky-500 transition-colors text-sm font-semibold">
                                    Acessar minha conta
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </LinkWithLoading>
                </div>

                {/* Bloco Secundário 2 - Frete Grátis */}
                <div className="relative group overflow-hidden rounded-xl bg-white border-4 border-gray-200 cursor-pointer ">
                    <LinkWithLoading to="/forma-de-pagamento">
                        <div className="relative p-6 h-full flex flex-col justify-between text-black">
                            {/* Efeitos de fundo */}
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

                            {/* Conteúdo */}
                            <div className="relative z-10 space-y-4">
                                {/* Ícone */}
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-green-600 via-emerald-700 to-teal-800 shadow-xl border border-green-500/30 rounded-xl backdrop-blur-sm">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>

                                {/* Texto */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold leading-tight">
                                        Pagamento & Entrega
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Compra 100% segura com entrega rápida e parcelamento flexível
                                    </p>
                                </div>

                                {/* Vantagens */}
                                <div className="flex items-center justify-between gap-2 text-sm">
                                    <div className="flex items-center p-2 gap-1">
                                        <Truck className="w-4 h-4 mx-auto" />
                                        <span className="text-gray-600 text-xs">Entrega Grátis</span>
                                    </div>
                                    <div className="flex items-center p-2 gap-1">
                                        <Shield className="w-4 h-4 mx-auto" />
                                        <span className="text-gray-600 text-xs">Compra Segura</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LinkWithLoading>
                </div>
            </div>
        </div>
    );
}