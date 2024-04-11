import { FaShoppingCart } from "react-icons/fa";
import "../styles/sidebar.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontext";

function TopSect() {
  const [firstName, setFirstName] = useState("");
  const { cart } =useCart();
  
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const storedFirstName = localStorage.getItem("firstName");

    setFirstName(searchParams.get("firstName") || storedFirstName || "");
  }, [location]);

  return (
    <>
      <div className="flex justify-between items-center ml-24 px-8 pt-2 pb-4 text-black fixed w-screen  top-0 z-50 bg-[#fdfdfd] shadow-[0_10px_10px_-10px_rgba(0,0,0,0.3)] border-b-[2px] border-bgColor">
        <div className="flex justify-center items-center relative">
          <p className="font-semibold text-base">Welcome To Smart Serve👋</p>
        </div>

        <div className=" mr-28 flex flex-row flex-wrap text-black">
          
        <span
  className=" text-brandColor text-xl cursor-pointer relative"
  onClick={() => {
    navigate("/cart");
  }}
>
  <FaShoppingCart className="text-2xl mt-3" />
  <p className="absolute top-1 left-7   text-brandColor font-bold rounded-full text-xs">{cart.length}</p>
</span>

          
        </div>
      </div>
    </>
  );
}

export default TopSect;
