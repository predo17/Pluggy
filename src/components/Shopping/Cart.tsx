import { ShoppingBag, Star, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useLoading } from "../../context/LoadingContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { startLoading, stopLoading } = useLoading();

  async function handleRemove(id: number, property: string) {
    startLoading();

    await new Promise(res => setTimeout(res, 1000));

    removeFromCart(id, property);

    stopLoading();
  }

  return (
    <div className="space-y-4">
      {cart.map((p) => (
        <div
          key={p.id}
          className="w-full bg-linear-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200/60 shadow-sm"
        >
          <div className="flex gap-4 max-md:grid max-md:grid-cols-1 max-md:gap-4">

            {/* imagem */}
            <div className="w-xs h-80 bg-gray-100 rounded-xl overflow-hidden max-md:w-full max-md:h-64 max-md:order-1">
              <img src={Array.isArray(p.img) ? p.img[0] : p.img} alt={p.name} className="w-full h-full object-contain p-1" />
            </div>

            {/* conteúdo */}
            <div className="flex-1 space-y-1 max-md:order-2 max-md:space-y-3">

              <div className="flex items-start justify-between max-md:items-center">
                <h4 className="font-semibold truncate max-md:text-lg max-md:flex-1">{p.name}</h4>

                <button
                  onClick={() => handleRemove(p.id, p.property)}
                  className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-gray-600 max-md:space-y-3">
                <p className="max-md:text-sm">{p.flash_description}</p>

                <div className="flex items-center gap-2">
                  {p.star}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: p.star }, (_, i) => i + p.star).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    {p.star <= 2 && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
                    )}
                  </div>
                  (6.489)
                </div>

                <ul className="flex flex-col gap-2 my-4 max-md:my-3">
                  {p.features?.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="max-md:text-sm">Quantidade no Carrinho: <strong>{p.quantity === 1 ? p.quantity + " unidade" : p.quantity + " unidades"}</strong></p>

              </div>

              <div className="flex max-lg:flex-col items-start lg:items-center justify-between mt-3 max-md:flex-col max-md:gap-3">

                <span className="text-lg font-bold max-md:text-xl">{p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>

                <div className="flex items-center gap-2 max-md:w-full max-md:justify-stretch">
                  <Link to={
                    p.property === "exclusive"
                      ? `/product/${p.id}?property=exclusive`
                      : `/product/${p.id}`
                  } className="bg-gray-100 hover:bg-gray-200 text-xs text-gray-900 px-6 py-1.5 rounded-sm flex items-center justify-center transition-all duration-300 max-md:flex-1 max-md:py-2.5">
                    Ver Produto
                  </Link>
                  <a href="/" className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-1.5 rounded-sm flex items-center justify-center transition-all duration-300 cursor-pointer max-md:flex-1 max-md:py-2.5">
                    <ShoppingBag className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      ))
      }
    </div >
  );
}
