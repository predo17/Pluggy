import Banner from "../components/Hero/Banner";
import HomepageHighlights from "../components/Hero/HomepageHighlights";
import FeaturedProducts from "../components/Hero/FeaturedProducts";
import ProductBrand from "../components/ProductPluggy/ProductBrand";
import FeaturedProductsGroup from "../components/Hero/FeaturedProductsGroups";

import { smartphones, templates, ebooks } from "../data/products.json";

export default function Home() {
  return (
    <>
      <Banner />
      <HomepageHighlights />

      <FeaturedProducts products={smartphones} title="Produtos em Destaque" />

      <ProductBrand />

      <FeaturedProducts products={[...ebooks.slice(0, 4), ...templates.slice(10, 14) , ...smartphones.slice(4, 8)]} title="Mais Vendidos" />
      
      <FeaturedProductsGroup
        groups={[
          { title: "Acessórios", products: ebooks },
          { title: "Produtos que você possa gostar", products: templates },
        ]}
      />
    </>
  )
}
