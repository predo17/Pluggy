import { ShoppingBag } from "lucide-react";
import { PiTrashDuotone } from "react-icons/pi";

export default function Cart() {
  return (
    <div className="w-full bg-gray-100 p-3 rounded-md flex gap-3">
      <div className="max-w-15 h-15 w-full ">
        <img src="" alt="imagem de um produto" className="w-full h-full border" />
      </div>

      <div className="w-full flex md:flex-col ">
        <h4>Produto</h4>
        <p className="line-clamp-1 leading-relaxed tracking-wide">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorum provident itaque corrupti cupiditate iure. Laudantium, fuga repudiandae? Tenetur suscipit facilis id quae voluptates hic nostrum laudantium delectus. Officiis, ipsam.</p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button className="bg-emerald-400 hover:bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"><ShoppingBag size={20}/></button>
        <button className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"><PiTrashDuotone size={20}/></button>
      </div>

    </div>
  )
}
