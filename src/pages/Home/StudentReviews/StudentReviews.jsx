import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import Loading from "../../../shared/Loading";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";

const StudentReviews = () => {
  const axiosSecure = useAxiosSecurity();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load reviews.</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className="text-gray-600">
            Hear from students who secured scholarships and global education
            opportunities.
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <div
            ref={prevRef}
            className="p-2 border rounded text-primary cursor-pointer hover:bg-primary hover:text-white transition"
          >
            <FaArrowLeft />
          </div>
          <div
            ref={nextRef}
            className="p-2 border rounded text-primary cursor-pointer hover:bg-primary hover:text-white transition"
          >
            <FaArrowRight />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="container flex flex-col w-full max-w-lg p-2 md:p-6 mx-auto rounded-md bg-white text-gray-800 shadow-md">
              <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="object-cover w-12 h-12 rounded-full bg-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm md:text-base">{review.userName.split(" ")[0]}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {review.universityName}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {new Date(review.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-yellow-400">
                  <FaStar></FaStar>
                  <span className="text-xl font-bold">{review.rating}</span>
                </div>
              </div>

              <div className="p-4 text-sm text-gray-600">
                <p className="line-clamp-3">{review.comment}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StudentReviews;
