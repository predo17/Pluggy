import { CreditCard, UserCheck2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomepageHighlights() {
    return (
        <div className="max-w-7xl mx-auto lg:h-60 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-4">

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
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 py-2 px-4 text-sm font-semibold transition-colors text-white bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20"
                                >
                                    Fazer login </Link>
                            </div>
                        </div>

                        {/* Imagem do produto */}
                        <div className="absolute right-5 bottom-1/2 translate-y-1/2">
                            <div className="w-52 h-52 transition-transform duration-500 group-hover:scale-110">
                                <img
                                    src="./controle_da_pluggy.png"
                                    alt="Smartphone promocional"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bloco Secundário 1 - Novidades */}
                <div className="relative group overflow-hidden rounded-xl bg-white border-4 border-gray-200 cursor-pointer ">
                    <Link to="/">
                        <div className="relative p-6 h-full flex flex-col">
                            <UserCheck2 className="w-15 h-15 mb-3" />
                            <h3 className="text-2xl font-bold group-hover:text-sky-500 tracking-wide transition-colors">Entre na sua conta</h3>
                            <p className=" text-md group-hover:text-sky-500 tracking-wide transition-colors">Aproveite ofertas para tudo que queira</p>
                        </div>
                    </Link>
                </div>

                {/* Bloco Secundário 2 - Frete Grátis */}
                <div className="relative group overflow-hidden rounded-xl bg-white border-4 border-gray-200 cursor-pointer ">
                    <Link to="/login">
                        <div className="relative p-6 h-full flex flex-col">
                            <CreditCard className="w-15 h-15 mb-3" />
                            <h3 className="text-2xl font-bold group-hover:text-sky-500 transition-colors">Meios de Pagamento</h3>
                            <p className=" text-md group-hover:text-sky-500 transition-colors">Pague suas compras com rapidez e segurança </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Componente para Promoção Relâmpago

