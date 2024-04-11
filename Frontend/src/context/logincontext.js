import React, { createContext, useContext, useState } from "react";

// Create LoginContext
const LoginContext = createContext();

// Custom hook to use LoginContext
export const useLogin = () => {
  return useContext(LoginContext);
};

// LoginProvider component
export const LoginProvider= ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
