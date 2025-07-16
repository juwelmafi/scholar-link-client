import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const sliderImages = [
  "https://i.ibb.co/Gftkbknk/pexels-thirdman-5649518.jpg",
  "https://i.ibb.co/sMCGVF2/pexels-enginakyurt-1498273.jpg",
  "https://i.ibb.co/JwmHsQtF/pexels-karolina-grabowska-7296382.jpg",
];

const Banner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        {sliderImages.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* ✅ Left content fixed over slider */}
      <div className="absolute inset-0 z-20 flex items-center px-6 md:px-16">
        <div className="max-w-xl text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Study <span className="text-emerald-400">Abroad</span>{" "}
            <span className="text-emerald-400">Partner</span> Graduate
          </h1>
          <p className="text-sm md:text-base text-gray-100">
            Connecting You to Top Universities Worldwide, Scholarships, and
            Expert Guidance to Fulfill Your Dreams.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search Courses, Universities..."
              className="w-full py-3 px-5 pl-12 rounded-full shadow-lg focus:outline-none"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 rounded-full">
              Search
            </button>
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Stats */}
          
        </div>
      </div>
    </div>
  );
};

export default Banner;
