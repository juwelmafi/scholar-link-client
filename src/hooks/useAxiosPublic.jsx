import React from "react";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://scholar-link-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;