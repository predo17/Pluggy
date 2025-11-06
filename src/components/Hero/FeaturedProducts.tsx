import ProductCard from "./ProductCars";
import { smartphones } from "../../data/products.json";

export default function FeaturedProducts() {
    return (
        <section className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {smartphones.map((items: { id: any; }) => (
                    <ProductCard key={items.id} {...items} />
                ))}
            </div>
        </section>
    )
}


