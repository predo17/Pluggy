import { useRef } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import exclusiveProducts from "../../data/exclusiveProducts.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import LinkWithLoading from "../LinkWithLoading";

export default function ProfessionalBanner() {
    const products = exclusiveProducts.slice(1, 4);
    const swiperRef = useRef<any | null>(null);

    // função que ativa animações apenas no slide ativo
    const animateActiveSlide = (swiper: any) => {
        if (!swiper || !swiper.slides) return;

        // remove is-animated de todas as slides (e de elementos internos)
        swiper.slides.forEach((slideEl: HTMLElement) => {
            slideEl.querySelectorAll(".is-animated").forEach((el) => {
                el.classList.remove("is-animated");
            });
        });

        // pega a slide ativa (quando loop:true o activeIndex aponta para o slide DOM correto)
        const activeSlide = swiper.slides[swiper.activeIndex] as HTMLElement | undefined;
        if (!activeSlide) return;

        // seleciona elementos que devem animar e adiciona a classe
        const elemsToAnimate = activeSlide.querySelectorAll(
            ".fade-slide-up, .fade-slide-up-delay-1, .fade-slide-up-delay-2, .fade-slide-up-delay-3, .fade-slide-up-link"
        );

        elemsToAnimate.forEach((el) => {
            // força reflow opcional para reiniciar animação em alguns browsers:
            void (el as HTMLElement).offsetWidth;
            el.classList.add("is-animated");
        });
    };

    return (
        <div className="relative max-w-7xl mx-auto sm:h-[40vh] md:h-[70vh] min-h-[255px] max-h-[480px] bg-linear-to-br from-[#0078FF] via-[#0099FF] to-[#00CCFF] sm:rounded-2xl sm:px-4 overflow-hidden cursor-default">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={1200}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-bullet',
                    bulletActiveClass: 'custom-bullet-active',
                    renderBullet: (className) => `<span class="${className}"><div class="bullet-progress"></div></span>`,
                }}
                className="w-full h-full"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // anima o slide inicial
                    // esperar um tick para garantir que DOM esteja pronto
                    setTimeout(() => animateActiveSlide(swiper), 50);
                }}
                onSlideChange={(swiper) => {
                    // anima quando muda de slide
                    animateActiveSlide(swiper);
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="relative w-full h-full flex flex-row items-center justify-between p-2 md:p-8">

                            {/* TEXTO */}
                            <div className="relative z-20 flex-1 max-w-2xl py-10 text-left">

                                {/* Título */}
                                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-2 md:mb-4">
                                    <span className="fade-slide-up tracking-tight ">{product.name}</span>

                                    <span className="block text-base md:text-xl lg:text-2xl text-blue-100 font-light mt-0.5 fade-slide-up fade-slide-up-delay-1">
                                        {product.text_banner}
                                    </span>
                                </h1>

                                {/* Preços */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-start sm:gap-4 mb-4">
                                    <div className="text-2xl md:text-4xl font-bold text-white fade-slide-up fade-slide-up-delay-2">
                                        {product.price.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </div>

                                    {product.oldPrice && (
                                        <div className="text-base md:text-xl text-blue-200 line-through opacity-80 fade-slide-up fade-slide-up-delay-3">
                                            {product.oldPrice.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Botão CTA */}
                                <LinkWithLoading
                                    to={`/checkout/${product.id}?property=exclusive`}
                                    className="
                                            text-xs md:text-base fade-slide-up fade-slide-up-delay-3
                                            group bg-linear-to-r from-orange-500 to-orange-600
                                            hover:from-orange-600 hover:to-orange-700 
                                            text-white px-4 py-2 md:px-8 md:py-4 rounded md:rounded-xl font-semibold
                                            flex items-center gap-2 shadow-2xl hover:shadow-orange-500/40
                                            transition-all duration-300 hover:scale-105 active:scale-95
                                            w-max"
                                >
                                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                    Comprar Agora
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </LinkWithLoading>
                            </div>

                            {/* IMAGEM */}
                            <div className="absolute max-sm:-right-5 sm:relative flex md:flex-1 justify-center ">
                                <div className="relative w-full max-w-2xl max-sm:opacity-80">
                                    <img
                                        src={product.img?.[0]}
                                        alt={product.alt}
                                        className="
                                                relative w-50 h-50 sm:w-full md:h-auto md:max-h-[300px] lg:max-h-[450px] p-2 object-contain
                                                fade-slide-up fade-slide-up-delay-3
                                            "
                                    />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
