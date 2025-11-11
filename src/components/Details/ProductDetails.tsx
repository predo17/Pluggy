import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DataProducts from "../../data/products.json";
import exclusiveProducts from "../../data/exclusiveProducts.json";
import {
  ChevronRight,
  RotateCcw,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  badge: string;
  img: string | string[];
  imgColor: string | string[];
  star: number;
  cor: string[];
  features: string[];
  description: string;
  quantity?: number;
  property?: string;
  category?: string;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const property = searchParams.get("property");
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageColor, setSelectedImageColor] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 🔹 Extrai produtos genéricos
  const extractProducts = (data: any): any[] =>
    Array.isArray(data) ? data : Object.values(data).flat();

  const allProducts = useMemo(
    () => [...extractProducts(DataProducts), ...exclusiveProducts],
    []
  );

  // 🔹 Busca o produto correto
  useEffect(() => {
    const base =
      property === "exclusive" ? exclusiveProducts : extractProducts(DataProducts);
    const found = base.find((item) => item.id === Number(id));
    setProduct(found || null);
  }, [id, property, allProducts]);

  // 🔹 Tratamento de valores
  const details = useMemo(() => {
    if (!product)
      return { formattedPrice: "", installmentPrice: "", fullStars: 0, halfStar: false };

    const fullStars = Math.floor(product.star);
    const halfStar = product.star % 1 !== 0;

    return {
      formattedPrice: product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      installmentPrice: (product.price / 12).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      fullStars,
      halfStar,
    };
  }, [product]);

  // 🔹 Imagens principais e de cores
  const productImages = useMemo(
    () =>
      Array.isArray(product?.img)
        ? product.img
        : product?.img
        ? [product.img]
        : [],
    [product?.img]
  );

  const productImagesColors = useMemo(
    () =>
      Array.isArray(product?.imgColor)
        ? product.imgColor
        : product?.imgColor
        ? [product.imgColor]
        : [],
    [product?.imgColor]
  );

  // 🔹 Features fixas
  const features = [
    { icon: Truck, text: "Frete grátis para todo o Brasil" },
    { icon: Shield, text: "Garantia de 12 meses" },
    { icon: RotateCcw, text: "Devolução em até 30 dias" },
  ];

  if (!product)
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Carregando produto...
      </p>
    );

  // 🔹 Produtos relacionados (mesma categoria)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 mt-6">
      {/* 🔹 Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-blue-500 mb-6">
        <Link to="/" className="hover:text-blue-600 transition">
          Voltar
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-500">Pluggy</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700 truncate max-w-40">
          {product.name || product.title}
        </span>
      </nav>

      {/* 🔹 Seção Principal */}
      <section className="grid xl:grid-cols-14 gap-8 bg-white rounded-md p-6">
        {/* 🖼️ Galeria */}
        <div className="lg:col-span-6 flex flex-col md:flex-row gap-4">
          {/* Miniaturas */}
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {productImages.map((img, i) => (
              <button
                key={i}
                onMouseEnter={() => setSelectedImage(i)}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden transition-all duration-200 ${
                  selectedImage === i
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={img} alt={`${product.title}-${i}`} className="w-full p-1 object-cover" />
              </button>
            ))}
          </div>

          {/* Imagem Principal */}
          <div className="order-1 xl:order-2 md:h-100">
            <img
              src={productImages[selectedImage]}
              alt={product.title}
              className="w-full h-full max-lg:p-2 object-contain transition-opacity duration-300"
            />
          </div>
        </div>

        {/* 💬 Informações */}
        <div className="lg:col-span-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  product.badge?.includes("OFF")
                    ? "text-orange-400 border-orange-400/40"
                    : "text-blue-400 border-blue-400/40"
                }`}
              >
                {product.badge}
              </span>
              <span className="text-sm text-gray-500">+10 mil vendidos</span>
            </div>
            <button className="text-blue-500 hover:text-blue-600 transition">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>

          {/* Título e estrelas */}
          <h1 className="text-2xl font-bold text-gray-900">{product.title || product.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: details.fullStars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              {details.halfStar && (
                <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
              )}
            </div>
            <span className="text-sm text-gray-600">
              {product.star} • (6.489 avaliações)
            </span>
          </div>

          {/* Preço */}
          <div>
            <div className="text-4xl font-medium text-gray-900 mb-1">
              {details.formattedPrice}
            </div>
            <p className="text-sm text-emerald-500">
              ou 12x de {details.installmentPrice} sem juros
            </p>
          </div>

          {/* Cores */}
          <div>
            <span className="font-medium text-gray-600">
              Cor:{" "}
              <strong className="text-gray-900">
                {hoveredColor || product.cor[selectedImageColor]}
              </strong>
            </span>
            <div className="flex items-center gap-2 mt-3">
              {productImagesColors.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageColor(i)}
                  onMouseEnter={() => setHoveredColor(product.cor[i])}
                  onMouseLeave={() => setHoveredColor(null)}
                  className={`w-12 h-12 border-2 rounded-md overflow-hidden transition-all duration-200 ${
                    selectedImageColor === i
                      ? "border-blue-500 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt={`${product.title}-${i}`} className="w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-2">
            {product.features?.map((f, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Lateral de compra */}
        <div className="lg:col-span-4 bg-gray-50 rounded-md p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-gray-900">
              {details.formattedPrice}
            </h2>
            <p className="text-sm text-emerald-500">
              ou 12x de {details.installmentPrice} sem juros
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Qtd:</span>
            <div className="flex items-center gap-2 border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                -
              </button>
              <span className="px-4 py-2 text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition">
            <ShoppingBag className="w-5 h-5" />
            Comprar agora
          </button>

          <button className="w-full bg-blue-100 text-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Adicionar ao carrinho
          </button>

          {features.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <Icon className="w-4 h-4 text-green-500" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Descrição completa */}
      <section className="bg-white p-6 space-y-3">
        <h2 className="text-2xl font-medium text-gray-900">Descrição do produto</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </section>

      {/* 🔹 Produtos relacionados */}
      <section className="bg-white rounded-md p-6 space-y-6">
        <h2 className="text-2xl font-medium text-gray-900">Produtos relacionados</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {relatedProducts.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}${p.property ? `?property=${p.property}` : ""}`}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <img src={Array.isArray(p.img) ? p.img[0] : p.img} alt={p.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="text-sm font-medium text-gray-900 truncate">{p.title}</h3>
              <p className="text-gray-600 text-sm">{p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔹 Opiniões dos usuários */}
      <section className="bg-white rounded-md p-6 space-y-6">
        <h2 className="text-2xl font-medium text-gray-900">Opiniões dos clientes</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <p className="font-semibold text-gray-800">João Silva</p>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              Excelente produto! Entrega rápida e qualidade incrível.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-semibold text-gray-800">Maria Souza</p>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              Gostei bastante, só achei o cabo um pouco curto.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
