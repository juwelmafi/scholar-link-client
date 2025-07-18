import React from "react";
import { FaUniversity, FaUsers, FaGraduationCap, FaStarHalf, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../shared/Loading";

const OurImpact = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load stats.</p>;

  const stats = [
    {
      icon: <FaUniversity className="text-primary text-4xl" />,
      label: "Total Scholarships",
      value: data.scholarshipsCount,
    },
    {
      icon: <FaUsers className="text-primary text-4xl" />,
      label: "Total Applications",
      value: data.applicationsCount,
    },
    {
      icon: <FaStar className="text-primary text-4xl" />,
      label: "Total Reviews",
      value: data.reviewsCount,
    },
  ];

  return (
    <div className="bg-gray-100  py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Our <span className="text-primary">Impact</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 px-4 lg:px-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center  px-6 py-8 bg-white  rounded shadow"
            >
              <div className="flex justify-center mb-4">{s.icon}</div>
              <h3 className="text-4xl font-bold lg:text-5xl xl:text-6xl text-primary">
                <CountUp
                  enableScrollSpy={true}
                  scrollSpyDelay={0}
                  end={s.value}
                  duration={3}
                  separator=","
                  suffix="+"
                />
              </h3>
              <p className="text-sm font-medium tracking-widest text-gray-800  uppercase mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurImpact;
