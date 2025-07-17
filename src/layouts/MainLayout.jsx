import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const MainLayout = () => {
  return (
    <div className="bg-[#F3F4F6]">
      <Navbar />
      <div className="min-h-[calc(100vh-117px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
