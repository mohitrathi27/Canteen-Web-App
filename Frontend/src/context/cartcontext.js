import React, { createContext, useState, useContext } from "react";

import {  toast } from 'react-toastify';
// Create a new context for the cart
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const handleClick = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
        toast.success('Item already exist, add another', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }else{
        setCart((prevCart) => [...prevCart, item]);
        toast.success('Item has been added to cart', {
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

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
   // handlePrice();
    toast.error("Item removed from cart", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // Function to update the quantity of an item in the cart
  const handleChange = (item, amount) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, amount: Math.max(1, cartItem.amount + amount) }
          : cartItem
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, handleClick,handleRemove, handleChange }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the cart context
export const useCart = () => {
  return useContext(CartContext);
};
