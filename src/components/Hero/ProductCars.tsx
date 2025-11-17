// import { ShieldCheck, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ id, img, text, price, description }: any) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };


    return (
        <article className="group relative w-40">
            <div onClick={handleNavigate} className="focus:outline-none">
                {/* Header do Card */}
                <div>
                    {/* Imagem */}
                    <div className="relative">
                        <img
                            src={img}
                            alt={text}
                            className="w-52 h-52 mx-auto object-contain"
                        />
                    </div>
                </div>
                {/* Conteúdo */}
                <div className="relative">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {text}
                    </h3>

                    <a className="group-hover:text-blue-600 outline-2 focus:outline-blue-600">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 tracking-wide leading-relaxed ">
                            {description}
                        </p>
                    </a>
                    {/* Preço e Ação */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-semibold text-gray-900 block">R$ {price.toFixed(2)}</span>
                            <span className="text-sm text-green-500">ou 12x de R$ {(price / 12).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    )
}
