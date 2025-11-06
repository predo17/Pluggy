import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductCard({ id, img, text, star, price, description }: any) {
    return (
        <article className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-2xl">
            {/* Efeito de Fundo no Hover */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Header do Card */}
            <div className="relative p-4 pb-0">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        EM ESTOQUE
                    </div>
                    <span className="text-orange-500 text-sm font-semibold">⭐ {star}</span>
                </div>

                {/* Imagem */}
                <div className="relative">
                    <img
                        src={img}
                        alt={text}
                        className="w-52 h-52 mx-auto object-contain transform group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
            </div>

            {/* Conteúdo */}
            <div className="relative p-6 pt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {text}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                {/* Informações Adicionais */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span>🛡️ 1 ano garantia</span>
                    <span>🚚 Frete grátis</span>
                </div>

                {/* Preço e Ação */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-gray-900 block">R$ {price.toFixed(2)}</span>
                        <span className="text-sm text-green-500">ou 12x de R$ {(price / 12).toFixed(2)}</span>
                    </div>

                    <Link
                        to={`/product/${id}`}
                        className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform group-hover:scale-105"
                    >
                       <ShoppingCart className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </article>
    )
}
