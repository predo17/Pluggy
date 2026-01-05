import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import LinkWithLoading from "../LinkWithLoading";


export default function RelatedProductsCarousel({ relatedProducts }: any) {
    const [visibleCount, setVisibleCount] = useState(4);
    const [startIndex, setStartIndex] = useState(0);
    // Detecta quantidade de itens visíveis por tamanho de tela
    useEffect(() => {
        function updateVisibleCount() {
            const width = window.innerWidth;

            if (width >= 1280) setVisibleCount(4);
            else if (width >= 1024) setVisibleCount(3);
            else if (width >= 768) setVisibleCount(2);
            else setVisibleCount(1);
        }

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const maxIndex = Math.max(0, relatedProducts.length - visibleCount);

    function next() {
        setStartIndex((prev) => Math.min(prev + visibleCount, maxIndex));
    }

    function prev() {
        setStartIndex((prev) => Math.max(prev - visibleCount, 0));
    }

    const visibleProducts = relatedProducts.slice(startIndex, startIndex + visibleCount);

    return (
        <section className="mt-12 space-y-4 px-3 xl:px-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium text-gray-900">Produtos relacionados</h2>

                <div className="flex gap-3">
                    <button
                        onClick={prev}
                        disabled={startIndex === 0}
                        className="p-3 rounded-xl border border-gray-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    <button
                        onClick={next}
                        disabled={startIndex >= maxIndex}
                        className="p-3 rounded-xl border border-gray-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((p?: any) => (
                    <LinkWithLoading
                        key={p.id}
                        to={`/product/${p.id}${p.property ? `?property=${p.property}` : ""}`}
                        className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 "
                    >

                        <div className="w-full aspect-4/3 border-b border-gray-200 flex items-center justify-center p-3 bg-white rounded-t-xl">
                            <img
                                src={Array.isArray(p.img) ? p.img[0] : p.img}
                                alt={p.title}
                                className="object-contain w-full h-full"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 text-base truncate">
                                {p.title || p.name}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-3">
                                {p.description}
                            </p>

                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-semibold text-gray-900">
                                    {p.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </span>

                                <p className="text-sm text-emerald-500 font-medium">
                                    12x de {(p.price / 12).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })} sem juros
                                </p>
                            </div>
                        </div>
                    </LinkWithLoading>
                ))}
            </div>
        </section>
    );
}
