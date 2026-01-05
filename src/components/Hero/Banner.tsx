import { useRef } from "react";
import exclusiveProducts from "../../data/exclusiveProducts.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import LinkWithLoading from "../LinkWithLoading";

export default function ProfessionalBanner() {
  const products = exclusiveProducts.slice(1, 4);
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative w-full h-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1200}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-full "
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full">
              <LinkWithLoading
                to={`/product/${product.id}?property=exclusive`}
                aria-label={`Ver detalhes do ${product.alt}`}>
                <div
                  data-animate
                  className="h-full w-full max-w-[1920px] mx-auto"
                >
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={product.img_banner?.[1]}
                    />

                    <img
                      src={product.img_banner?.[0]}
                      alt={product.alt}
                      className="w-full h-full object-contain"
                    />
                  </picture>
                </div>
              </LinkWithLoading>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
