import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="space-y-4">
      {cart.map((p) => (
        <div
          key={p.id}
          className="w-full bg-linear-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200/60 shadow-sm"
        >
          <div className="flex gap-4">

            {/* imagem */}
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
              <img src={Array.isArray(p.img) ? p.img[0] : p.img} alt={p.name} className="w-full h-full object-contain" />
            </div>

            {/* conteúdo */}
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold truncate">{p.name}</h4>

                <button
                  onClick={() => removeFromCart(p.id, p.property)}
                  className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {p.flash_description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {p.flash_description}
                </p>
              )}

              <div className="flex max-lg:flex-col items-start lg:items-center justify-between mt-3">

                <span className="text-lg font-bold ">{p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>

                <div className="flex items-center gap-2"> <a href="/" className="bg-gray-100 hover:bg-gray-200 text-xs text-gray-900 px-6 py-1.5 rounded-sm flex items-center justify-center transition-all duration-300">Ver Produto</a> <a href="/" className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-1.5 rounded-sm flex items-center justify-center transition-all duration-300 cursor-pointer"> <ShoppingBag className="w-5 h-5" /> </a> </div>
              </div>
            </div>

          </div>
        </div>

      ))}
    </div>
  );
}
