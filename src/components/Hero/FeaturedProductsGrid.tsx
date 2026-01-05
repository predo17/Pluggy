import ProductCard from "./ProductCars";

interface FeaturedProductsGridProps {
    title: string;
    products: any[];
}


export default function FeaturedProductsGrid({ title, products }: FeaturedProductsGridProps) {
    return (
        <section className="mt-16 max-w-7xl mx-auto bg-white rounded-md p-6">
            <h1 className="text-xl text-gray-950 tracking-wide font-medium mb-6">
                {title}
            </h1>
            <div
                className="max-w-7xl mx-auto grid gap-y-8 gap-x-4.5 grid-cols-[repeat(auto-fit,minmax(160px,160px))]"
            >
                {products.map((item) => (
                    <div key={item.id} className="">
                        <ProductCard {...item} />
                    </div>
                ))}
            </div>
        </section>

    )
}
