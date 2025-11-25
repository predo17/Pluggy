import { useParams } from "react-router-dom";
import ProductDetails from "../components/Details/ProductDetails";
import GridProducts from "../components/Products/GridProducts";
import { useAllProducts } from "../hooks/useAllProducts";

export default function ProductPage() {
  const { id } = useParams();
  const products = useAllProducts();

  return id ? <ProductDetails /> : <GridProducts products={products} />;

}
