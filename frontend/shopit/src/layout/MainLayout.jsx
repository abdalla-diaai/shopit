import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


function MainLayout({numCartItems}) {
  return (
    <>
      <NavBar numCartItems={numCartItems}/>
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;