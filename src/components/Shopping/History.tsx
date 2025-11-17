import Bag from "./Bag";
import Cart from "./Cart";

export default function History() {
    return (
        <section className="max-w-7xl mx-auto h-[70vh]">
            <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white rounded-md p-6">
                    <h2 className="text-xl">Carrinho</h2>
                    <div className="mt-4">
                        <Cart />
                    </div>
                </div>
                <div className="bg-white rounded-md p-6">
                    <h2 className="text-xl">Comprados & Entregues</h2>
                    <div className="mt-4">
                        <Bag />
                    </div>
                </div>

            </div>
        </section>
    )
}
