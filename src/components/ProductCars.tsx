import { Link } from 'react-router-dom'



export default function ProductCard({ id, img, title, price, description }: any) {
    return (
        <article className="rounded-lg p-4 shadow-md bg-white">
            <img src={img} alt={title} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-[#B3B3B3]">{description}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-semibold text-[#0078FF]">R$ {price.toFixed(2)}</span>
                <Link to={`/product/${id}`} className="bg-[#FF7A00] text-white px-3 py-2 rounded">Comprar</Link>
            </div>
        </article>
    )
}
