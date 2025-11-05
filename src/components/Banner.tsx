import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ShoppingCart } from "lucide-react";

export default function Banner() {
    const banner = [
        { id: 1, text: "XPluggy GTX Ultra Controle sem fio", img: "./controle_da_pluggy.png", alt: "Banner 3" },
        { id: 2, text: "Fone de Ouvido XPluggy Pro ", img: "./fantasy-anime-style-scene.jpg", alt: "Banner 1" },
        { id: 3, text: "Laptop XPluggy Force", img: "./laptop_da_pluggy.png", alt: "Banner 2" },
    ];

    return (
        <div className="relative max-w-6xl mx-auto h-[60vh] bg-[#f7f7f8] overflow-hidden border-l-2 border border-gray-200 rounded-xl">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                speed={1000}
                pagination={{ clickable: true }}
                className="w-full h-full custom-swiper"
            >
                {banner.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 px-6">
                            <div className="flex-1 flex flex-col justify-center lg:text-left">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-14 font-bold inter text-gray-700">
                                    {item.text}
                                </h1>
                                <p className="mt-4 text-base sm:text-lg md:text-xl w-[80%] text-gray-600">
                                    Compre agora e receba em até 3x sem juros
                                </p>
                                <button className="bg-[#FF7A00] text-white px-6 py-3 rounded-md mt-6 flex items-center gap-1 w-40 ">
                                    Colocar no <ShoppingCart />
                                </button>
                            </div>
                            <div className="flex-1 flex items-center justify-center h-full">
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="w-full max-w-lg h-auto object-contain opacity-60 md:opacity-100 "
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
