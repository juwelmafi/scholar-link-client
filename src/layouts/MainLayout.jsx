import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const MainLayout = () => {
  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="min-h-[calc(100vh-575px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
