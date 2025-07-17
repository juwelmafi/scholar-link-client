import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import useAxiosSecurity from "../../hooks/UseAxiosSecurity";
const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecurity();
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["scholarshipReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const {
    scholarshipName,
    universityName,
    universityImage,
    country,
    city,
    worldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFee,
    applicationFee,
    serviceCharge,
    deadline,
    postDate,
    postedBy,
  } = scholarship;

  return (
    <div className="max-w-7xl mx-auto py-10 pt-34 px-6">
      <div className="grid md:grid-cols-2 items-start gap-10">
        <div className="w-full">
          <img
            src={universityImage}
            alt={scholarshipName}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary">
            {scholarshipName}
          </h2>
          <p className="text-lg mt-2">
            <strong>University:</strong> {universityName} ({worldRank})
          </p>
          <p className="mt-1">
            <strong>Location:</strong> {city}, {country}
          </p>
          <p className="mt-1">
            <strong>Subject:</strong> {subjectCategory} |{" "}
            <strong>Degree:</strong> {degree}
          </p>
          <p className="mt-1">
            <strong>Type:</strong> {scholarshipCategory}
          </p>
          {tuitionFee && (
            <p className="mt-1">
              <strong>Tuition Fee:</strong> ${tuitionFee}
            </p>
          )}
          <p className="mt-1">
            <strong>Application Fee:</strong> ${applicationFee}
          </p>
          <p className="mt-1">
            <strong>Service Charge:</strong> ${serviceCharge}
          </p>
          <p className="mt-1">
            <strong>Deadline:</strong> {deadline?.slice(0, 10)}
          </p>
          <p className="mt-1">
            <strong>Posted:</strong> {new Date(postDate).toLocaleDateString()}
          </p>
          <p className="mt-1">
            <strong>Posted By:</strong> {postedBy}
          </p>
          <Link to={`/checkout/${id}`}>
            <button className="btn bg-primary text-white mt-6">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full mt-20">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="container flex flex-col w-full max-w-lg p-2 md:p-6 mx-auto rounded-md bg-white text-gray-800 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500 mb-2">
                    <FaStar className="mr-1" />
                    <span>{review.rating} / 5</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-4">
                    {review.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 py-10">
              No reviews yet for this scholarship.
            </p>
          )}
        </Swiper>
      </div>
    </div>
  );
};
export default ScholarshipDetails;
