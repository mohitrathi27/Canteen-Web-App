import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import img from "./img/small-screen.svg";
import Payment from "./Pages/Payment";
import Register from "./Pages/Register";
import SideBar from "./Components/SideBar";
import TopSect from "./Components/TopSect";
import { CartProvider } from "./context/cartcontext";
import Cart from "./Pages/Cart";
import Details from "./Pages/Details";
import { ToastContainer } from "react-toastify";
import { LoginProvider, useLogin } from "./context/logincontext";
import ProtectedRoute from "./Components/protectedroute";

const App = () => {
  //code to disable app display on screens smaller than 1024px
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { login } = useLogin();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      {isSmallScreen ? (
        <div className="mx-auto container justify-center flex flex-col mt-8">
          <p className="text-center text-black font-bold text-xl">
            Not optimized for smaller screens
          </p>
          <img src={img} className="mt-8" alt="for large screen size only" />
        </div>
      ) : ( 
        <>
          <ToastContainer />
          <CartProvider>
            <Router>
              {login && <TopSect />}

              <div className="flex">
                {login && <SideBar />}

                <div className="flex-1">
                  <section className="flex flex-col ml-24 mt-16 px-8 pt-8  bg-bgColor">
                    <Routes>
                      <Route
                        path=""
                        element={
                          <ProtectedRoute
                            loginreq={true}
                            element={<Details />}
                          />
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <ProtectedRoute 
                          loginreq={true} 
                          element={<Cart />} />
                        }
                      />
                      <Route
                        path="/payment"
                        element={
                          <ProtectedRoute
                            loginreq={true}
                            element={<Payment />}
                          />
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <ProtectedRoute
                            loginreq={true}
                            element={<Register />}
                          />
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <ProtectedRoute
                            loginreq={false}
                            element={<Login />}
                          />
                        }
                      />

                      {/* Other unprotected routes */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    {/* Other code */}
                  </section>
                </div>
              </div>
            </Router>
          </CartProvider>
        </>
      )} 
    </div>
  );
};

export default App;
