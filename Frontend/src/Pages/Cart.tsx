import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import question from "../img/user.png";
// import { usePaystackPayment } from 'react-paystack';
import "../styles/checkoutBtn.css";
import { useCart } from "../context/cartcontext";
import axios from "axios";

const Cart = () => {
  const [price, setPrice] = useState(0);

  const [balance, setbalance] = useState<string>("");
  const { cart, handleChange, handleRemove } = useCart();
  const [userid, setUserid] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlePrice = () => {
    let ans = 0;
    cart.forEach((item: any) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  }, [cart]);

  // Purchase Item: || Decrement Balance:
  const handlepayment = async () => {
    if (!userid) {
      alert("Please enter a user ID first");
    } else {
      try {
        const data = { amount: price, collegeId: userid , password:password};
        console.log("data", data);
        // Make a POST request to your login endpoint with form data
        const response = await axios.put(
          "http://localhost:5000/api/admin/user/decrement-balance",
          data
        );

        // Assuming your login API returns a success message or token
        console.log(response.data);

        toast.success("Payment Done Successfully ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        checkbalance();
        alert("Your Receipt is Generated..!!");
      } catch (error) {
        // Handle login error
        console.error("Payment failed:", error);
        toast.error("Payment failed", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const checkbalance = async () => {
    try {
      const data = { collegeId: userid, password:password };
      console.log("data", data);
      // Make a POST request to your login endpoint with form data
      const response = await axios.post(
        "http://localhost:5000/api/admin/user/check-balance",
        data
      );

      // Assuming your login API returns a success message or token
      console.log(response.data);

      setbalance(response.data.balance);
      toast.success("Balance Fetch Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      // Handle login error
      console.error("error checking balance:", error);
      toast.error("Error checking balance", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <section className="w-full align-center items-center mx-auto container flex justify-center">
        <section className="mt-8 px-8 text-black">
          {cart.length === 0 ? (
            <div className="container mx-auto justify-center">
              <p className="text-center text-black font-semibold text-xl">
                No Item Selected
              </p>
              <img src={question} className="" alt="" />
            </div>
          ) : (
            cart.map((item: any) => (
              <div
                className="flex items-center justify-between mt-10 pb-2 border-b-2"
                key={item.id}
              >
                <div className="flex w-80">
                  <img src={item.img} alt="" className="w-20 h-16" />
                  <p className="font-bold ml-5 mt-4">{item.title}</p>
                </div>
                <div className="flex items-center justify-between pb-2 mt-2">
                  <button
                    className="px-2.5 py-1.5 text-lg font-bold mr-1.5"
                    onClick={() => handleChange(item, -1)}
                  >
                    -
                  </button>
                  <button>{item.amount}</button>
                  <button
                    className="px-2.5 py-1.5 text-lg font-bold mr-1.5"
                    onClick={() => handleChange(item, 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <span className="text-brandColor py-1.5 px-2.5 rounded-lg mr-2.5">
                    {" "}
                    Rs. {item.price}
                  </span>
                  <button
                    className="py-2 px-2.5 font-semibold bg-brandColor rounded-lg cursor-pointer text-white "
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash title="Remove from cart" />
                  </button>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <>
              {/* <div className="flex justify-between mt-8">
                <span className="text-lg font-semibold">Meal Price :</span>
                <span className="text-lg font-semibold text-brandColor">  Rs. {price}</span>
              </div> */}
              {/* <div className="flex justify-between mt-4 border-b-2">
                <span className="text-lg font-semibold">Delivery Fee :</span>
                <span className="text-lg font-semibold text-brandColor">  Rs.1000</span>
              </div> */}
              <div className="flex justify-between mt-7 ">
                <span className="text-xl font-bold">Total Cost :</span>
                <span className="text-xl font-bold text-brandColor">
                  Rs. {price}
                </span>
              </div>

              <div className="flex justify-between mt-5">
                <span className="text-xl font-bold">Enter User ID :</span>
                <input
                  id="collegeId"
                  name="collegeId"
                  type="text"
                  autoComplete="college ID"
                  placeholder="Enter UserID here..."
                  required
                  onChange={(e) => setUserid(e.target.value)}
                  className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-brandColor placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-lg sm:leading-6 outline-none px-2"
                />
              </div>
              <div className="flex justify-between mt-5">
                <span className="text-xl font-bold">Enter Password :</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder="Enter password here..."
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-brandColor placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-lg sm:leading-6 outline-none px-2"
                />
              </div>
              <div
                onClick={checkbalance}
                className={`mt-2 text-lg font-bold text-brandColor cursor-pointer ${
                  !userid && "opacity-50 pointer-events-none"
                }`}
              >
                Check Balance:{" "}
                <span className="text-black font-normal ml-10">{balance}</span>
              </div>

              <section className="flex justify-between mt-12">
                <button
                  onClick={handlepayment}
                  disabled={!userid}
                  className={`flex w-full justify-center rounded-md bg-[#4290f5] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0255c2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    !userid && "opacity-50 pointer-events-none"
                  }`}
                >
                  Pay
                </button>
              </section>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default Cart;
