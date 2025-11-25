import type { Product } from "../../types/Product";
import LinkWithLoading from "../LinkWithLoading";
import { Star } from "lucide-react";

interface GridProductsProps {
    products: Product[];
}

export default function GridProducts({ products }: GridProductsProps) {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {products.map((product) => (
                <LinkWithLoading
                    to={
                        product.property === "exclusive"
                            ? `/product/${product.id}?property=exclusive`
                            : `/product/${product.id}`
                    }
                    key={product.id}
                    className="group bg-white rounded-lg border border-gray-200 transition-all duration-300 overflow-hidden"
                >

                    {/* Imagem */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <img
                            src={Array.isArray(product.img) ? product.img[0] : product.img}
                            alt={product.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Badge Exclusivo */}
                        {product.property === "exclusive" && (
                            <div className="absolute top-2 left-2 bg-white border border-gray-200 p-1.5 rounded-full text-xs font-bold">
                                <Star className="w-4 h-4 text-yellow-300  fill-current" />
                            </div>
                        )}
                    </div>

                    {/* Conteúdo */}
                    <div className="p-3 space-y-2">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
                            {product.name || product.title}
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
                                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL",})}
                            </span>
                            <span className="text-sm font-medium text-gray-500 line-through">
                                {product.oldPrice?.toLocaleString("pt-BR",{ style: "currency", currency: "BRL", })}
                            </span>
                        </div>
                    </div>
                </LinkWithLoading>
            ))}
        </div>
    );
}
