import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../context/LoadingContext';
import { PackageX } from 'lucide-react';

export default function ProductCard({ id, img, name, price, quantity, description }: any) {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();

    async function handleNavigate() {
        startLoading();

        await new Promise(res => setTimeout(res, 1000));

        navigate(`/product/${id}`);

        stopLoading();
    }

    return (
        <article className="group relative w-40 flex flex-col items-center justify-center">
            <div onClick={handleNavigate} className="cursor-pointer">
                {/* Header do Card */}
                <div>
                    {/* Imagem */}
                    <div className="relative">
                        <img
                            src={img?.[0]}
                            alt={name}
                            className="w-52 h-52 mx-auto object-contain"
                        />
                    </div>
                </div>
                {/* Conteúdo */}
                <div className="relative">
                    <button className="group focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200 w-full text-start">
                        <h3 className="text-[15px] font-bold line-clamp-1 transition-colors mb-2">
                            {name}
                        </h3>

                        <p className="text-gray-600 text-sm mb-2 line-clamp-2 tracking-wide ">
                            {description}
                        </p>
                    </button>
                    {/* Preço e Ação */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-semibold text-gray-900 block">{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            <span className="text-sm text-green-500">ou 12x de R$ {(price / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    </div>
                </div>
            </div>
            {quantity === 0 && (
                <div className="absolute bottom-1/2 left-0 transform translate-y-1/2 w-full h-full flex items-center justify-center ">
                    <div className="text-center">
                        <PackageX className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">Esgotado</p>
                    </div>
                </div>
            )}
        </article >
    )
}
