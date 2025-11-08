import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../Hero/ProductCars";
import { smartphones } from "../../data/products.json";

export default function FeaturedProducts() {
    const swiperRef = useRef<any>(null);

    // Função que avança/retrocede conforme slides visíveis
    const handleSlide = (direction: "next" | "prev") => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const slidesPerView = (swiper.params && (swiper.params.slidesPerView as number)) || 1;
        const step = Math.max(Math.floor(slidesPerView), 1);

        if (direction === "next") {
            swiper.slideTo(swiper.activeIndex + step);
        } else {
            swiper.slideTo(Math.max(swiper.activeIndex - step, 0));
        }
    };

    return (
        <section className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl p-6 relative overflow-hidden">
           
            <h1 className="text-xl text-gray-950 tracking-wide font-medium mb-6">
                Produtos em destaque
            </h1>
            {/* Botão Prev */}
            <button
                onClick={() => handleSlide("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-300 active:bg-gray-200 text-gray-800 rounded-full p-2 transition-all shadow-md z-20"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Botão Next */}
            <button
                onClick={() => handleSlide("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-300 active:bg-gray-200 text-gray-800 rounded-full p-2 transition-all shadow-md z-20"
                aria-label="Próximo"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Swiper Carrossel */}
            <Swiper
                modules={[Navigation]}
                onInit={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={7}
                spaceBetween={16}
                breakpoints={{
                    320: { slidesPerView: 1.5 },
                    480: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                    1536: { slidesPerView: 7 },
                }}
                className="overflow-visible"
            >
                {smartphones.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductCard {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
