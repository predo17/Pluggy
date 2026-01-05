import HomepageHighlights from "../components/Hero/HomepageHighlights";
import FeaturedProducts from "../components/Hero/FeaturedProducts";
import ProductBrand from "../components/ProductPluggy/ProductBrand";
import FeaturedProductsGroup from "../components/Hero/FeaturedProductsGroups";

import { smartphones, accessory, others } from "../data/products.json";

export default function Home() {
  return (
    <>
      <HomepageHighlights />

      <FeaturedProducts products={smartphones} title="Produtos em Destaque" />

      <ProductBrand />

      <FeaturedProducts products={[...others.slice(0, 3), ...accessory.slice(0, 3) , ...smartphones.slice(4, 8)]} title="Mais Vendidos" />
      
      <FeaturedProductsGroup
        groups={[
          { title: "Acessórios", products: accessory },
          { title: "Produtos que você possa gostar", products: others },
        ]}
      />
    </>
  )
}
