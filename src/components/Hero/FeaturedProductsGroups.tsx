import FeaturedProductsGrid from "./FeaturedProductsGrid";

interface FeaturedProductsGroupProps {
    groups: {
        title: string;
        products: any[];
    }[];
}
export default function FeaturedProductsGroup({ groups }: FeaturedProductsGroupProps) {
    return (
        <section className="max-w-7xl mx-auto mt-16 space-y-16">
            {groups.map((group, index) => (
                <FeaturedProductsGrid key={index} title={group.title} products={group.products} />
            ))}
        </section>
    );
}
