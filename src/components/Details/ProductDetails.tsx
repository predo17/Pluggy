import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAllProducts, useProductById, } from "../../hooks/useProducts";
import { Check, CheckIcon, ChevronRight, ChevronRightIcon, RotateCcw, Shield, ShoppingBag, ShoppingCart, Star, Truck } from "lucide-react";
import ProductFichaTecnica from "./TechnicalSheet";

import type { CartItem } from "../../types/Product";
import RelatedProductsCarousel from "./RelatedProductsCarousel";
import { useCart } from "../../context/CartContext";
import BackButton from "../BackButton";
import LinkWithLoading from "../LinkWithLoading";
import { useAuth } from "../../context/AuthContext";
import Modal from "../Modal";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const property = searchParams.get("property");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageColor, setSelectedImageColor] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  // Extrai produtos genéricos
  const product = useProductById(Number(id), property ?? undefined);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"envio" | "pagamento" | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const [quantity, setQuantity] = useState(() => {
    if (!product?.id) return 1;

    const saved = localStorage.getItem(`product_quantity_${product.id}`);
    return saved ? Number(saved) : 1;
  });
  const [isOpen, setIsOpen] = useState(false);
  // Tratamento de valores
  const details = useMemo(() => {
    if (!product)
      return { formattedPrice: "", formattedOldPrice: "", installmentPrice: "", fullStars: 0, halfStar: false };

    const fullStars = Math.floor(product.star);
    const halfStar = product.star % 1 !== 0;

    return {
      formattedPrice: product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      formattedOldPrice: product.oldPrice?.toLocaleString("pt-BR", {
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

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  function openModal(type: "envio" | "pagamento") {
    setModalType(type);
    setLoadingModal(true);
    setModalOpen(true);

    setTimeout(() => {
      setLoadingModal(false);
    }, 1000);
  }

  function closeModal() {
    setModalOpen(false);
    setModalType(null);
  }

  // 🔹 Features fixas
  const features = [
    { icon: Truck, text: "Frete grátis para todo o Brasil", color: "text-green-500" },
    { icon: RotateCcw, text: "Devolução em até 30 dias", color: "text-purple-500" },
    { icon: Shield, text: String(product?.guarantee), color: "text-blue-500" },
  ];

  // 🔹 Produtos relacionados (mais próximos por ID)
  const isExclusiveProduct = product?.property === "exclusive";
  const allProducts = useAllProducts() ?? [];

  const relatedProducts = allProducts
    .filter((p) => {
      if (!product) return false;

      if (p.id === product.id) return false;
      if (p.category !== product.category) return false;

      return isExclusiveProduct
        ? p.property === "exclusive"
        : p.property !== "exclusive";
    })
    //  ordena pelos IDs mais próximos
    .sort((a, b) => {
      if (!product) return 0;
      return Math.abs(a.id - product.id) - Math.abs(b.id - product.id);
    })

    .slice(0, 8);

  // 🔹 Adiciona ao carrinho
  const { addToCart, isInCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product?.quantity === 0;
  const quantityMax = product?.quantity ?? 1;

  function handleAddToCart() {
    if (!user) {
      window.location.href = "/Auth";
      return false;
    }

    if (!product) return;

    var item: CartItem = {
      id: product.id,
      property: product.property,
      img: product.img,
      name: product.name,
      flash_description: product.flash_description,
      star: product.star,
      features: product.features,
      quantity: quantity,
      price: product.price,
    };

    addToCart(item);
    setAdded(true);
  }

  function handleBuyNow() {
    if (!user) {
      window.location.href = "/Auth";
      return false;
    }

    if (!product) return;

    const item: CartItem = {
      ...product,
      quantity: quantity,
    };
    if (!isInCart(item.id, item.property)) {
      addToCart(item);
    }
  }

  useEffect(() => {
    if (!product) return;

    const exists = isInCart(product.id, product.property);
    setAdded(exists);
  }, [product, cart]);

  useEffect(() => {
    if (!product?.id) return;

    localStorage.setItem(
      `product_quantity_${product.id}`,
      String(quantity)
    );
  }, [quantity, product?.id]);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);


  // 🔹 Verifica se o produto foi encontrado
  if (!product)
    return;

  return (
    <main className="max-w-7xl mx-auto xl:px-4 xl:mt-0">
      {/* 🔹 Breadcrumb */}
      <nav className="hidden xl:flex items-center gap-2 text-sm text-blue-500 mb-3">
        <BackButton />
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-500">Pluggy</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700 truncate max-w-40">
          {product.name}
        </span>
      </nav>

      <Modal
        isOpen={modalOpen}
        type={modalType}
        loading={loadingModal}
        onClose={closeModal}
      />

      <div className="flex xl:hidden flex-col justify-between w-full space-y-2 xl:px-4 p-2 bg-white rounded-t-md">
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
              <span className="text-xs text-gray-300 ">|</span>
              <span className="text-xs text-gray-500 ">+10 mil vendidos</span>
            </div>
          </div>
          <div className="flex items-center gap-1 ">
            {product.star === 0 || product.star === undefined ? (
              <span className="text-gray-400">sem avaliação</span>
            ) : (
              <div className="flex items-center gap-1">
                {Array.from({ length: details.fullStars }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                {details.halfStar && (
                  <Star className="w-3 h-3 text-yellow-400 fill-current opacity-50" />
                )}
              </div>
            )}
            <span className="text-xs text-gray-600">
              {product.star}
            </span>
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-900">{product.name}</h1>

      </div>
      <div className="bg-white xl:rounded-md max-xl:py-4 xl:p-6 space-y-20">
        {/* 🔹 Seção Principal */}
        <section className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-14 gap-8">
          {/* 🖼️ Galeria */}
          <div className="lg:col-span-4 xl:col-span-6 flex flex-col justify-center xl:flex-row gap-4 px-2">
            {/* Miniaturas */}
            <div className="flex xl:flex-col gap-2 order-2 xl:order-1">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onMouseEnter={() => {
                    setSelectedImage(i);
                  }}
                  className={`w-16 h-16 border-2 rounded-md overflow-hidden transition-all duration-200 ${selectedImage === i
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <img src={img} alt={`${product.name}-${i}`} className="w-full h-full flex items-center justify-center p-1 object-contain" />
                </button>
              ))}
            </div>

            {/* Imagem Principal */}
            <div className="order-1 xl:order-2 w-full text-center h-100 lg:border-b-2 xl:border-0 border-gray-100">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full p-1 object-contain transition-opacity duration-300"
              />
            </div>
          </div>

          {/* 💬 Informações */}
          <div className="lg:col-span-4 space-y-4 px-2">
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
                {product.star} • (6.489)
              </span>
            </div>

            {/* Preço */}
            <div className="hidden xl:block">
              <div className="flex items-center gap-2 text-4xl font-medium text-gray-900 mb-1">
                {details.formattedPrice}
                <span className="text-xl font-normal text-gray-600 line-through">{details.formattedOldPrice}</span>
              </div>
              <button
                onClick={() => openModal("pagamento")}
                className="text-sm text-blue-500 cursor-pointer">
                Ver meios de pagamento
              </button>
            </div>

            {/* Cores */}
            <div>
              {product?.cor && (
                <span className="font-medium text-gray-600">
                  Cor:{" "}
                  <strong className="text-gray-900">
                    {hoveredColor || product.cor?.[selectedImageColor]}
                  </strong>
                </span>
              )}
              <div className="flex items-center gap-2 mt-3">
                {productImagesColors.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageColor(i)}
                    onMouseEnter={() => setHoveredColor(product.cor[i])}
                    onMouseLeave={() => setHoveredColor(null)}
                    className={`w-12 h-12 border-2 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${selectedImageColor === i
                      ? "border-blue-500 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <img src={img} alt={`${product.name}-${i}`} className="w-full h-full flex items-center justify-center p-1 object-contain" />
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
          <div className="lg:col-span-4 bg-gray-50 xl:rounded-md max-xl:py-3 xl:p-6">
            <form
              action=""
              onSubmit={(e) => e.preventDefault()} className="space-y-4 px-2">

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-3xl font-medium text-gray-900">
                  {details.formattedPrice}
                  <span className="text-xl font-normal text-gray-600 line-through  xl:hidden">{details.formattedOldPrice}</span>
                </div>
                <p className="text-emerald-500 font-medium">
                  ou 12x de {details.installmentPrice} sem juros
                </p>
              </div>

              <div className={`mb-4 ${added ? "opacity-80 pointer-events-none" : ""}`}>
                <span className="font-semibold text-gray-700 block mb-1">
                  Quantidade :
                </span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => !isOutOfStock && setIsOpen(!isOpen)}
                    disabled={isOutOfStock}
                    className={`w-full max-w-xs p-2.5 rounded-md border text-left font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 
                      ${isOutOfStock
                        ? "border-red-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-800 hover:border-gray-400 cursor-pointer"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {isOutOfStock
                          ? "Produto indisponível"
                          : `${quantity} ${quantity === 1 ? "unidade" : "unidades"}`
                        }
                      </span>
                      {!isOutOfStock && (
                        <ChevronRightIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                      )}
                    </div>
                  </button>

                  {/* Dropdown menu (substitui as options) */}
                  {isOpen && !isOutOfStock && (
                    <div className="absolute z-10 mt-1 w-full max-w-xs bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        {Array.from({ length: quantityMax }, (_, i) => i + 1).map((value) => (
                          <div
                            key={value}
                            onClick={() => {
                              setQuantity(value);
                              setIsOpen(false);
                            }}
                            className={`px-3 py-2.5 cursor-pointer transition-colors ${value === quantity
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                {value} {value === 1 ? "unidade" : "unidades"}
                              </span>
                              {value === quantity && (
                                <CheckIcon className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Botões de Ação */}
              <div>
                <LinkWithLoading
                  to="/checkout"
                  className={isOutOfStock ? "pointer-events-none" : ""}>
                  <div
                    onClick={() => !isOutOfStock && handleBuyNow()}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 mb-2
                      ${isOutOfStock
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                      }`}>
                    <ShoppingBag className="w-5 h-5" />
                    {isOutOfStock ? "Indisponível" : "Comprar Agora"}
                  </div>
                </LinkWithLoading>

                <button
                  onClick={() => !isOutOfStock && handleAddToCart()}
                  disabled={!product}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 border-2 
                    ${isOutOfStock
                      ? "bg-gray-300 text-gray-500 border-gray-300 pointer-events-none"
                      : `${added ? "bg-green-400 text-white border-green-400 pointer-events-none" : "bg-white hover:bg-blue-50 text-blue-600 border-blue-600 cursor-pointer"}`
                    }
  `}
                >
                  {isOutOfStock ? (
                    <>Esgotado</>

                  ) : (
                    added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Adicionado!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Adicionar ao Carrinho
                      </>
                    ))}
                </button>
              </div>

            </form>
            {/* Benefícios */}
            <div className="space-y-4 pt-4 max-xl:px-2">
              {features.map(({ icon: Icon, text, color }, index) => (
                <div key={index} className="flex gap-2 text-sm text-gray-700">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="w-full">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 🔹 Ficha Técnica */}
        <section className="space-y-3 max-xl:px-2 ">
          <h2 className="text-2xl font-medium text-gray-900 border-b border-gray-200 pb-4">Ficha Técnica</h2>

          <ProductFichaTecnica product={product} />
        </section>
        {/* 🔹 Descrição completa */}
        <section className="space-y-3 max-xl:px-2 rounded-b-md">
          <h2 className="text-2xl font-medium text-gray-900 border-b border-gray-200 pb-4">Descrição do produto</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
        </section>
      </div>
      {/* 🔹 Relacionados */}
      <RelatedProductsCarousel relatedProducts={relatedProducts} />
    </main>
  );
}