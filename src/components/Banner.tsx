import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { ShoppingCart, ArrowRight, Star, Shield } from "lucide-react";

export default function ProfessionalBanner() {
    const bannerItems = [
        { 
            id: 1, 
            text: "XPluggy GTX Ultra", 
            subtitle: "Controle sem fio premium",
            img: "./controle_da_pluggy.png", 
            alt: "Controle XPluggy GTX Ultra",
            features: ["Bluetooth 5.2", "40h de bateria", "Feedback háptico"],
            price: "R$ 299,90",
            oldPrice: "R$ 399,90",
            badge: "30% OFF"
        },
        { 
            id: 2, 
            text: "XPluggy Pro", 
            subtitle: "Fone de ouvido over-ear",
            img: "./fantasy-anime-style-scene.jpg", 
            alt: "Fone XPluggy Pro",
            features: ["ANC Ativo", "Som 360°", "30h bateria"],
            price: "R$ 599,90",
            oldPrice: "R$ 799,90",
            badge: "LANÇAMENTO"
        },
        { 
            id: 3, 
            text: "XPluggy Force", 
            subtitle: "Laptop gamer profissional",
            img: "./laptop_da_pluggy.png", 
            alt: "Laptop XPluggy Force",
            features: ["RTX 4070", "32GB RAM", "SSD 1TB"],
            price: "R$ 8.999,90",
            oldPrice: "R$ 10.999,90",
            badge: "ESGOTANDO"
        },
    ];

    return (
        <div className="relative max-w-7xl mx-auto h-[70vh] min-h-[600px] bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden rounded-2xl shadow-2xl">
            {/* Elementos de fundo decorativos */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-position[60px_60px]" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ 
                    delay: 5000,
                    disableOnInteraction: false 
                }}
                speed={1200}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-bullet',
                    bulletActiveClass: 'custom-bullet-active',
                }}
                className="w-full h-full"
            >
                {bannerItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative w-full h-full flex items-center justify-between px-8 lg:px-16">
                            {/* Conteúdo textual */}
                            <div className="flex-1 max-w-2xl z-10">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg cursor-default">
                                    <Shield className="w-4 h-4" />
                                    {item.badge}
                                </div>

                                {/* Título principal */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                                    {item.text}
                                    <span className="block text-xl md:text-2xl text-blue-200 font-light mt-2">
                                        {item.subtitle}
                                    </span>
                                </h1>

                                {/* Features */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {item.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span className="text-white text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Preço */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-3xl font-bold text-white">{item.price}</div>
                                    <div className="text-xl text-gray-300 line-through">{item.oldPrice}</div>
                                </div>

                                {/* Botão CTA */}
                                <button className="group bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                                    <ShoppingCart className="w-5 h-5" />
                                    Comprar Agora
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Garantia */}
                                <div className="flex items-center gap-2 mt-6 text-sm text-gray-300">
                                    <Shield className="w-4 h-4" />
                                    Garantia de 12 meses • Entrega em todo Brasil
                                </div>
                            </div>

                            {/* Imagem do produto */}
                            <div className="md:flex-1 flex items-center justify-center h-full relative">
                                <div className="relative w-full max-w-2xl">
                                    {/* Efeito de brilho atrás da imagem */}
                                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-150" />
                                    
                                    <img
                                        src={item.img}
                                        alt={item.alt}
                                        className="relative w-full h-auto max-h-[500px] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
                                    />
                                    
                                    {/* Efeito de partículas */}
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full blur-sm animate-pulse" />
                                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full blur-sm animate-pulse delay-1000" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Paginação customizada */}
            <div className="custom-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2" />

            {/* Estilos customizados para a paginação */}
            <style>{`
                .custom-bullet {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .custom-bullet-active {
                    background: linear-gradient(45deg, #FF7A00, #FF5E00);
                    transform: scale(1.2);
                    box-shadow: 0 0 10px rgba(255, 122, 0, 0.5);
                }
            `}</style>
        </div>
    );
}