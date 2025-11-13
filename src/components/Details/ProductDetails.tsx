import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DataProducts from "../../data/products.json";
import exclusiveProducts from "../../data/exclusiveProducts.json";
import {
  Check,
  ChevronRight,
  RotateCcw,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import ProductFichaTecnica from "./TechnicalSheet";

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
  guarantee?: string;
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

  const quantityMax = product?.quantity || 1;

  // 🔹 Features fixas
  const features = [
    { icon: Truck, text: "Frete grátis para todo o Brasil", color: "text-green-500" },
    { icon: RotateCcw, text: "Devolução em até 30 dias", color: "text-purple-500" },
    { icon: Shield, text: String(product?.guarantee), color: "text-blue-500" },
  ];

  // 🔹 Produtos relacionados (mesma categoria)
  const relatedProducts = allProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // 🔹 Verifica se o produto foi encontrado
  if (!product)
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Carregando produto...
      </p>
    );

  return (
    <main className="max-w-7xl mx-auto xl:px-4 -mt-6 xl:mt-6">
      {/* 🔹 Breadcrumb */}
      <nav className="hidden xl:flex items-center gap-2 text-sm text-blue-500 mb-6">
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

      <div className="flex xl:hidden flex-col justify-between w-full space-y-2 px-4 py-1 bg-gray-50">
        <div className="flex items-center justify-between space-x-2">
          <div className=" items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold  ${product.badge?.includes("OFF")
                  ? "text-orange-400"
                  : "text-blue-400"
                  }`}
              >
                {product.badge}
              </span>
              <span className="text-xs text-gray-500">+10 mil vendidos</span>
            </div>
          </div>
          <div className="flex items-center gap-1 ">
            <div className="flex items-center gap-1">
              {Array.from({ length: details.fullStars }).map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
              {details.halfStar && (
                <Star className="w-3 h-3 text-yellow-400 fill-current opacity-50" />
              )}
            </div>
            <span className="text-xs text-gray-600">
              {product.star} • (6.489)
            </span>
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-900">{product.title || product.name}</h1>

      </div>

      {/* 🔹 Seção Principal */}
      <section className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-14 gap-8 bg-white rounded-md p-6">
        {/* 🖼️ Galeria */}
        <div className="lg:col-span-4 xl:col-span-6 flex flex-col justify-center xl:flex-row gap-4">
          {/* Miniaturas */}
          <div className="flex xl:flex-col gap-2 order-2 xl:order-1">
            {productImages.map((img, i) => (
              <button
                key={i}
                onMouseEnter={() => setSelectedImage(i)}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden transition-all duration-200 ${selectedImage === i
                  ? "border-blue-500 scale-105"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <img src={img} alt={`${product.title}-${i}`} className="w-full h-full flex items-center justify-center p-1 object-cover" />
              </button>
            ))}
          </div>

          {/* Imagem Principal */}
          <div className="order-1 xl:order-2 w-full text-center h-100 lg:border-b-2 xl:border-0 border-gray-100">
            <img
              src={productImages[selectedImage]}
              alt={product.title}
              className="w-full h-full p-1 object-contain transition-opacity duration-300"
            />
          </div>
        </div>

        {/* 💬 Informações */}
        <div className="lg:col-span-4 space-y-4">
          {/* Header */}
          <div className="hidden xl:flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${product.badge?.includes("OFF")
                  ? "text-orange-400 border-orange-400/40"
                  : "text-blue-400 border-blue-400/40"
                  }`}
              >
                {product.badge}
              </span>
              <span className="text-sm text-gray-500">+10 mil vendidos</span>
            </div>
          </div>

          {/* Título e estrelas */}
          <h1 className="hidden xl:block text-2xl font-bold text-gray-900">{product.title || product.name}</h1>
          <div className="hidden xl:flex items-center gap-3">
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
          <div className="hidden xl:block">
            <div className="text-4xl font-medium text-gray-900 mb-1">
              {details.formattedPrice}
            </div>
            <button className="text-sm text-blue-500 cursor-pointer">
              Ver meios de pagamento
            </button>
          </div>

          {/* Cores */}
          <div>
            <span className="font-medium text-gray-600">
              Cor:{" "}
              <strong className="text-gray-900">
                {hoveredColor || product.cor?.[selectedImageColor]}
              </strong>
            </span>
            <div className="flex items-center gap-2 mt-3">
              {productImagesColors.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageColor(i)}
                  onMouseEnter={() => setHoveredColor(product.cor[i])}
                  onMouseLeave={() => setHoveredColor(null)}
                  className={`w-12 h-12 border-2 rounded-md overflow-hidden transition-all duration-200 ${selectedImageColor === i
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <img src={img} alt={`${product.title}-${i}`} className="w-full h-full flex items-center justify-center object-cover p-1" />
                  {selectedImageColor === i && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="hidden xl:flex flex-col space-y-2">
            <span className=" font-medium text-gray-800 ">Informações do produto:</span>
            <ul className="space-y-2 ">
              {product.features?.map((f, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lateral de compra */}
        <div className="lg:col-span-4 bg-gray-50 rounded-md p-6">
          <form
            action=""
            onSubmit={(e) => e.preventDefault()} className="space-y-4">

            <div className="space-y-2">
              <div className="text-3xl font-medium text-gray-900">
                {details.formattedPrice}
              </div>
              <p className="text-emerald-500 font-medium">
                ou 12x de {details.installmentPrice} sem juros
              </p>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Quantidade:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    -
                  </button>
                  {quantity === quantityMax ? (
                    <span className="flex items-center px-6 py-3 text-gray-900 font-semibold min-w-12 text-center">
                      {quantity}
                      <span className="text-xs text-gray-600 mt-0.5 ml-1">MAX</span>
                    </span>
                  ) : (
                    <span className="px-6 py-3 text-gray-900 font-semibold min-w-12 text-center">
                      {quantity}
                    </span>
                  )}
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className={`px-3 py-2 text-gray-600 hover:text-gray-800 cursor-pointer ${quantity === quantityMax ? 'hidden' : ''}`}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {quantity} {quantity === 1 ? 'unidade' : 'unidades'}
                </span>
              </div>
            </div>
          </form>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <ShoppingBag className="w-5 h-5" />
              Comprar Agora
            </button>

            <button className="w-full bg-white text-blue-600 border-2 border-blue-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-blue-50 hover:shadow-md">
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>
          </div>

          {/* Benefícios */}
          <div className="space-y-4 pt-4">
            {features.map(({ icon: Icon, text, color }, index) => (
              <div key={index} className="flex gap-2 text-sm text-gray-700">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="w-full">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white p-6 space-y-3">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">
          Ficha Técnica
        </h2>

        <ProductFichaTecnica product={product} informacoes={[]} />
      </section>

      {/* 🔹 Descrição completa */}
      <section className="bg-white p-6 space-y-3">
        <h2 className="text-2xl font-medium text-gray-900">Descrição do produto</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
      </section>

      <section className="bg-white rounded-md p-6 space-y-6 mt-12">
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

    </main>
  );
}