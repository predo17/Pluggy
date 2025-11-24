import { CreditCard, Rocket, Shield, ShieldCheck, Star } from "lucide-react";
import exclusiveProducts from "../../data/exclusiveProducts.json";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";

export default function ProductMarca() {
    const navigate = useNavigate();

    const { startLoading, stopLoading } = useLoading();

    async function handleNavigate(id: number) {
        startLoading();

        await new Promise(res => setTimeout(res, 1000));

        navigate(`/product/${id}?property=exclusive`);

        stopLoading();
    };

    const extractProducts = (data: any): any[] =>
        Array.isArray(data) ? data : Object.values(data).flat();

    const exclusives = extractProducts(exclusiveProducts);

    return (
        <section className="max-w-7xl mx-auto mt-20">
            <div className="mb-16 relative">
                {/* Fundo com gradiente mais suave */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-blue-900/95 to-purple-900/90 md:rounded-3xl transform -skew-y-1 shadow-2xl"></div>

                {/* Efeitos de luz de fundo */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2"></div>

                <div className="relative bg-linear-to-br from-gray-800/80 via-blue-800/80 to-purple-800/80 md:rounded-3xl p-4 md:p-8 lg:p-12 text-white backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                    {/* Conteúdo Principal */}
                    <div className="flex flex-col gap-12 relative z-10">

                        {/* Header com CTA */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium tracking-wide">COLECÃO EXCLUSIVA</span>
                                </div>

                                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                    Descubra a{' '}
                                    <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Inovação
                                    </span>
                                </h2>

                                <p className="text-blue-100 text-lg lg:text-xl max-w-2xl leading-relaxed">
                                    Tecnologia de ponta selecionada para elevar sua experiência digital
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 mt-6">
                                    {[
                                        { value: '4.7', label: 'Avaliação Média' },
                                        { value: '2K+', label: 'Clientes Satisfeitos' },
                                        { value: '24h', label: 'Suporte' }
                                    ].map((stat, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span className="text-white font-semibold">{stat.value}</span>
                                            <span className="text-blue-200 text-sm">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Grid de Produtos Destacados */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                            {exclusives.map((product, index) => (
                                <div
                                    onClick={() => handleNavigate(product.id)}
                                    key={product.id}
                                    className={`group relative backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-500 hover:duration-300 overflow-hidden cursor-pointer
                                ${index === 0 ? 'md:col-span-2 md:row-span-2 bg-linear-to-br from-blue-500/10 to-purple-500/10' :
                                            'bg-white/5 hover:bg-white/10'}
                                hover:border-white/20 hover:scale-105 hover:shadow-2xl
                            `}
                                >
                                    <div className="p-6 max-h-max flex flex-col">

                                        {/* Header do Card */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border
                                        ${product.badge.includes('OFF') ?
                                                    'bg-linear-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30' :
                                                    product.badge.includes('LAN') ?
                                                        'bg-linear-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30' :
                                                        'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30'
                                                }`}
                                            >
                                                <Shield className="w-3 h-3" />
                                                {product.badge}
                                            </div>

                                            <div className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-xs font-medium text-white">{product.star}</span>
                                            </div>
                                        </div>

                                        {/* Conteúdo do Produto */}
                                        <div className="flex flex-col flex-1 gap-4">
                                            {/* Imagem */}
                                            <div
                                                className={`relative flex items-center justify-center overflow-hidden rounded-xl group ${index === 0 ? "md:h-[450px] xl:h-[350px]" : "md:h-[250px]"} `}
                                            >
                                                {/* Iluminação suave */}
                                                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none"></div>

                                                {/* Imagem */}
                                                <img
                                                    src={product.img?.[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 p-4 "
                                                />
                                            </div>


                                            {/* Informações */}
                                            <div className="flex-1 flex flex-col gap-2">
                                                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className={`text-sm  leading-relaxed ${index === 0 ? "lg:max-h-40 line-clamp-6 " : "line-clamp-2"
                                                    }`}>
                                                    {product.description}
                                                </p>

                                                {/* Preço (se disponível) */}
                                                {product.price && (
                                                    <div className="mt-auto pt-4">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-2xl font-bold text-white">
                                                                {product.price.toLocaleString("pt-br",
                                                                    { style: "currency", currency: "BRL" })}
                                                            </span>
                                                            {product.oldPrice && (
                                                                <span className="text-sm text-blue-200/60 line-through">
                                                                    {product.oldPrice.toLocaleString("pt-br",
                                                                        { style: "currency", currency: "BRL" })}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Efeito de brilho no hover */}
                                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer da Seção */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                            <p className="flex lg:items-center gap-1 text-blue-200 text-sm">
                                <Rocket className="w-4 h-4 max-lg:mt-1" /> Frete grátis para todo Brasil em compras acima de R$ 199
                            </p>
                            <div className="flex items-center gap-4 text-blue-200 text-sm">
                                <span className="flex lg:items-center gap-1">
                                    <ShieldCheck className="w-4 h-4 max-lg:mt-1" />
                                    Garantia de 12 meses
                                </span>
                                <span className="flex lg:items-center gap-1">
                                    <CreditCard className="w-4 h-4 max-lg:mt-1" />
                                    Parcele em até 12x
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
