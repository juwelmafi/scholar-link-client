import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import slider1 from "../../../assets/graduate.jpg";
import slider2 from "../../../assets/harbard.jpg";
import slider3 from "../../../assets/convocation.jpg";
import { useNavigate } from "react-router";

const sliderImages = [slider1, slider2, slider3];

const Banner = () => {
  const navigate = useNavigate();

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
      <div className="absolute inset-0 z-20 max-w-7xl mx-auto flex items-center px-6">
        <div className="max-w-xl text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Study <span className="text-primary">Abroad</span>{" "}
            <span className="text-primary">Partner</span> ScholarLink
          </h1>
          <p className="text-sm md:text-base text-gray-100">
            Connecting You to Top Universities Worldwide, Scholarships, and
            Expert Guidance to Fulfill Your Dreams.
          </p>
          <button
            onClick={() => navigate("/all-scholarships")}
            className=" btn btn-primary text-white px-6 rounded-full"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
