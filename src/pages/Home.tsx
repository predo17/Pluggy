import Banner from "../components/Banner";
import ProductCars from "../components/ProductCars";


interface Product {
  id: number
  img: string
  title: string
  price: number
  description?: string
}

interface Props {
  DataProducts: Product[]
}

export default function Home({ DataProducts }: Props) {
  return (
    <div>
      <Banner />
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl text-gray-700 font-semibold mb-4">
          Produtos em Destaques
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DataProducts.map((product) => (
            <ProductCars
              key={product.id}
              id={product.id.toString()}
              img={product.img}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
