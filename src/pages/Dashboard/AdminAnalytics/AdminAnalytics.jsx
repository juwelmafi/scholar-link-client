import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";

const COLORS = ["#10B981", "#6366F1", "#F59E0B"];

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecurity();

  const { data: appPerScholarship = [] } = useQuery({
    queryKey: ["apps-per-scholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/analytics/applications-per-scholarship"
      );
      return res.data;
    },
  });

  const { data: roleDistribution = [] } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/user-roles");
      return res.data;
    },
  });

  useEffect(() => {
      document.title = `Analytics | ScholarLink`;
      window.scroll(0, 0)
      return () => {
        document.title = "ScholarLink";
      };
    }, []);



  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        Admin Analytics Dashboard
      </h2>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Bar Chart: Applications per Scholarship */}
        <div className="bg-base-200 shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-4">
            Applications per Subject Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appPerScholarship}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scholarshipName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#17C5CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Pie Chart: User Role Distribution */}
        <div className="bg-base-200 shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-4">User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {roleDistribution.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
