import DataProducts from "../data/products.json";
import exclusiveProducts from "../data/exclusiveProducts.json";
import type { Product } from "../types/Product";

export function useAllProducts(): Product[] {
  // junta todos os produtos
  const rawProducts = [
    ...Object.values(DataProducts).flat(),
    ...Object.values(exclusiveProducts).flat(),
  ] as any[];

  // normaliza
  const products: Product[] = rawProducts.map((p) => ({
    ...p,
    property: p.property ?? "",
    title: p.title ?? p.name ?? "",
    features: p.features ?? [],
    flash_description: p.flash_description ?? "",
  }));

  return products;
}
