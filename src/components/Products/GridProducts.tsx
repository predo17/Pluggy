import { useSearchParams } from "react-router-dom";
import type { Product } from "../../types/Product";
import LinkWithLoading from "../LinkWithLoading";
import { ArrowLeft, Star } from "lucide-react";

interface GridProductsProps {
    products: Product[];
}

export default function GridProducts({ products }: GridProductsProps) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q")?.toLowerCase() || "";

    // 🔎 Filtra os produtos de acordo com o termo da busca
    const filteredProducts = products.filter((product) => {
        const text =
            `${product?.name}`
                .toLowerCase();
        return text.includes(searchQuery);
    });

    return (
        <>
            {searchQuery && (
                <div className={`max-w-7xl mx-auto px-4 ${filteredProducts.length === 0 ? "hidden" : ""}`}>
                    <LinkWithLoading
                        to="/products"
                        className="flex items-center max-w-max text-blue-500 "
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />  Voltar
                    </LinkWithLoading>
                </div>
            )}
            <div className="max-w-7xl mx-auto h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {filteredProducts.map((product) => (
                    <LinkWithLoading
                        to={
                            product.property === "exclusive"
                                ? `/product/${product.id}?property=exclusive`
                                : `/product/${product.id}`

                        }
                        key={product.id}
                        className="bg-white rounded-lg border border-gray-200 transition-all duration-300 overflow-hidden"
                    >
                        <div className="relative aspect-square overflow-hidden group">
                            <img
                                src={Array.isArray(product.img) ? product.img[0] : product.img}
                                alt={product.name}
                                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            />

                            {product.property === "exclusive" && (
                                <div className="absolute top-2 left-2  border border-gray-200 p-1.5 rounded-full text-xs font-bold">
                                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                                </div>
                            )}
                        </div>

                        <div className="p-3 space-y-2">
                            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
                                {product.name}
                            </h3>

                            <p className="text-gray-500 text-xs line-clamp-2">
                                {product.flash_description}
                            </p>

                            {product.star && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <span>({product.star})</span>
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(Math.floor(product.star))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </span>
                                <span className="text-sm font-medium text-gray-500 line-through">
                                    {product.oldPrice?.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </span>
                            </div>
                        </div>
                    </LinkWithLoading>
                ))}

                {/* Se nenhum produto for encontrado */}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full flex flex-col gap-4 items-center justify-center ">
                        <img src="/imgsnull/no-result.png" alt="Pesquisa sem resultados" />
                        <p className="text-center col-span-full text-gray-500">
                            Nenhum produto encontrado para: <strong>{searchQuery}</strong>
                        </p>
                        <LinkWithLoading
                            to="/products"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Ver todos os produtos
                        </LinkWithLoading>
                    </div>

                )}
            </div>

        </>
    );
}
