import { ChevronLeft, ChevronRight, Shield, Star } from "lucide-react";
import exclusiveProducts from "../../data/exclusiveProducts.json";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import { useEffect, useRef, useState } from "react";

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
    const products = exclusives.slice(1, 5);
    const exclusiveId = 0;

    const filterId = exclusives.find((p: any) => p.id === exclusiveId) ?? exclusives[0];

    const containerRef = useRef<HTMLDivElement>(null);
    const [isEnd, setIsEnd] = useState(false);

    const scrollContainer = (direction: 'left' | 'right') => {
        if (!containerRef.current) return;

        const scrollAmount = 600;
        const currentScroll = containerRef.current.scrollLeft;

        if (direction === 'left') {
            containerRef.current.scrollTo({
                left: currentScroll - scrollAmount,
                behavior: 'smooth'
            });
        } else {
            containerRef.current.scrollTo({
                left: currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const updateButtons = () => {
        const el = containerRef.current;
        if (!el) return;
        const epsilon = 1; // tolerância para pixels fracionários
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - epsilon;
        setIsEnd(isAtEnd);
    };
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateButtons, { passive: true });
        window.addEventListener("resize", updateButtons);
        updateButtons(); // inicializa
        return () => {
            el.removeEventListener("scroll", updateButtons);
            window.removeEventListener("resize", updateButtons);
        };
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-12 md:mt-20">
            <div className="mb-16">
                <div className="relative">
                    {/* Conteúdo Principal */}
                    <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 relative z-10">
                        {/* Header com CTA */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2  backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gray-200">
                                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                                    <span className="text-sm font-medium tracking-wide text-gray-700">
                                        COLEÇÃO EXCLUSIVA
                                    </span>
                                </div>
                                <p className="text-gray-700 text-base md:text-lg max-w-2xl leading-relaxed">
                                    Tecnologia de ponta selecionada para elevar sua experiência digital
                                </p>
                            </div>
                        </div>
                        {/* Container Principal dos Cards */}
                        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 min-h-[600px] lg:max-h-[800px]">

                            {/* Card Principal (Lado Esquerdo) */}
                            <div className="w-full lg:w-3/5 max-w-xl mx-auto lg:mx-0">
                                {filterId && (() => {
                                    return (
                                        <div
                                            onClick={() => handleNavigate(filterId.id)}
                                            className={`relative rounded-2xl overflow-hidden border h-full transition-all duration-300 bg-white border-gray-200`}
                                        >

                                            <div className="group flex flex-col p-6 gap-5 h-full cursor-pointer hover:shadow-lg">
                                                {/* Badge com status */}
                                                <div className="flex items-start justify-between">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                                                    ${filterId.badge.includes('LAN')
                                                            ? 'bg-green-50 text-green-600 border border-green-200'
                                                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                                                        }`}
                                                    >
                                                        <Shield className="w-4 h-4" />
                                                        <span>{filterId.badge}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1 rounded-full px-3 py-1 bg-gray-50 text-gray-700 border border-gray-200">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-xs font-medium">{filterId.star}</span>
                                                    </div>
                                                </div>

                                                {/* Imagem com watermark */}
                                                <div className="relative flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 w-full aspect-4/3">
                                                    <img
                                                        src={filterId.img?.[0]}
                                                        alt={filterId.name}
                                                        className="w-full h-full object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Informações */}
                                                <div className="flex flex-col grow">
                                                    <div className="text-left mb-3">
                                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
                                                            {filterId.name}
                                                        </h3>
                                                        <p className="text-sm leading-relaxed line-clamp-4 mt-2 text-gray-600"
                                                        >
                                                            {filterId.description}
                                                        </p>
                                                    </div>

                                                    {/* Preço e ações */}
                                                    <div className="mt-auto">
                                                        <span className="text-xl md:text-2xl font-bold text-gray-900">
                                                            {filterId.price.toLocaleString("pt-br", {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </div>

                            {/* Carrossel (Lado Direito) */}
                            <div className="w-full lg:w-3/5 h-[500px] lg:h-[600px] xl:h-auto relative bg-white rounded-xl p-2 md:p-4 border border-gray-200 shadow-lg">
                                {/* Botão Esquerdo */}
                                <div className="absolute inset-y-0 left-0 hidden xl:flex items-center z-10">
                                    <button
                                        onClick={() => scrollContainer('left')}
                                        className={`p-3 md:p-4 rounded-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-all duration-200 -translate-x-1/2 shadow-lg hover:shadow-xl cursor-pointer ${!isEnd && 'hidden'}`}
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Container do Carrossel */}
                                <div className="w-full h-full max-w-4xl mx-auto p-2 md:p-3 ">
                                    <div
                                        ref={containerRef}
                                        className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth py-4 px-2 -mx-2 h-full items-center"
                                        style={{
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                        }}
                                    >
                                        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

                                        {products.map((product) => {

                                            return (
                                                <div
                                                    key={product.id}
                                                    onClick={() => handleNavigate(product.id)}
                                                    className="relative rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 shrink-0 w-64 md:w-72 lg:w-80 mx-2 snap-start"
                                                >
                                                    <div className="group flex flex-col p-4 md:p-5 lg:p-6 gap-4 h-full cursor-pointer hover:shadow-lg">
                                                        {/* Badge + Estrela */}
                                                        <div className="flex items-start justify-between">
                                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border
                                                            ${product.badge.includes('OFF') ?
                                                                    'bg-linear-to-r from-orange-500/12 to-red-500/10 text-orange-400 border-orange-500/30' :
                                                                    product.badge.includes('LAN') ?
                                                                        'bg-linear-to-r from-green-500/12 to-emerald-500/10 text-green-400 border-green-500/30' :
                                                                        'bg-linear-to-r from-blue-500/12 to-purple-500/10 text-blue-400 border-blue-500/30'
                                                                }`}
                                                            >
                                                                <Shield className="w-4 h-4" />
                                                                {product.badge}
                                                            </div>
                                                            <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1">
                                                                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                                                                <span className="text-xs font-medium text-gray-700">{product.star}</span>
                                                            </div>
                                                        </div>

                                                        {/* Imagem */}
                                                        <div className="relative flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 h-40 md:h-48 lg:h-52">
                                                            <img
                                                                src={product.img?.[0]}
                                                                alt={product.name}
                                                                className="w-full h-full object-contain p-3 md:p-4group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>

                                                        {/* Informações */}
                                                        <div className="flex flex-col grow">
                                                            <button className="text-left px-0.5 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 mb-2">
                                                                <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-500 transition-colors line-clamp-2">
                                                                    {product.name}
                                                                </h3>
                                                                <p className="text-sm leading-relaxed line-clamp-3 mt-2 text-gray-600">
                                                                    {product.description}
                                                                </p>
                                                            </button>
                                                            {product.price && (
                                                                <div className="mt-auto pt-3 border-t border-gray-100">
                                                                    <div className="flex items-baseline gap-2">
                                                                        <span className="text-lg md:text-xl text-gray-900 font-bold">
                                                                            {product.price.toLocaleString("pt-br", {
                                                                                style: "currency",
                                                                                currency: "BRL",
                                                                            })}
                                                                        </span>

                                                                        <span className="text-sm text-gray-400 line-through">
                                                                            {product.oldPrice?.toLocaleString("pt-br", {
                                                                                style: "currency",
                                                                                currency: "BRL",
                                                                            })}
                                                                        </span>


                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Botão Direito */}
                                <div className="absolute inset-y-0 right-0 hidden xl:flex items-center z-10">
                                    <button
                                        onClick={() => scrollContainer('right')}
                                        className={`p-3 md:p-4 rounded-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-all duration-200 translate-x-1/2 shadow-lg hover:shadow-xl cursor-pointer ${isEnd && 'hidden'}`}
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}