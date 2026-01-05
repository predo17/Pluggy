import DataProducts from "../data/products.json";
import exclusiveProducts from "../data/exclusiveProducts.json";
import type { Product } from "../types/Product";

function extract(data: any): any[] {
  return Array.isArray(data) ? data : Object.values(data).flat();
}

export function useAllProducts(): Product[] {
  const raw = [...extract(DataProducts), ...extract(exclusiveProducts)];

  return raw.map((p: any) => ({
    ...p,
    property: p.property ?? "",
    name: p.name ?? "",
    features: p.features ?? [],
    flash_description: p.flash_description ?? "",
  }));
}

export function useProductById(id: number, property?: string): Product | null {
  const allProducts = useAllProducts();

  // Se for exclusivo → busca primeiro em exclusive
  if (property === "exclusive") {
    const ex = extract(exclusiveProducts).find((p: any) => p.id === id);
    if (ex) return ex;
  }

  // Caso contrário, busca no conjunto geral
  return allProducts.find((p) => p.id === id) || null;
}
