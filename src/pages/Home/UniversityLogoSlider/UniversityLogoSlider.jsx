import React from "react";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../shared/Loading";

const UniversityLogoSlider = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch scholarships to get university images
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-scholarships");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Extract unique university images
  const universityImages = [
    ...new Map(
      scholarships.map((item) => [item.universityName, item.universityImage])
    ).values(),
  ];

  return (
    <section className="py-12 border-gray-300 dark:bg-base-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Trusted by <span className="text-primary">Global Universities</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          Our partners across the world
        </p>
      </div>

      <Marquee
        direction="left"
        speed={50}
        pauseOnHover={true}
        gradient={false}
        className="flex items-center"
      >
        {universityImages.map((logo, index) => (
          <div key={index} className="mx-12 w-24 flex items-center justify-center">
            <img
              src={logo}
              alt={`University ${index + 1}`}
              className=" w-full h-24 object-cover rounded-full"
              
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default UniversityLogoSlider;
