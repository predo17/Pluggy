import Cart from "./Cart";
// import Bag from "./Bag";

export default function History() {
    return (
        <section className="max-w-4xl mx-auto h-[80vh] overflow-hidden">
            <div className="h-full overflow-y-auto">
                <div className="bg-white rounded-md p-6">
                    <h2 className="text-xl">Carrinho</h2>
                    <div className="mt-4">
                        <Cart />
                    </div>
                </div>
                {/* <div className="bg-white rounded-md p-6">
                    <h2 className="text-xl">Comprados & Entregues</h2>
                    <div className="mt-4">
                        <Bag />
                    </div>
                </div> */}

            </div>
        </section>
    )
}
