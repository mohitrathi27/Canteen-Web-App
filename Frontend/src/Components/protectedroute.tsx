import { Route, Navigate } from "react-router-dom";
import { useLogin } from "../context/logincontext";

// ProtectedRoute component
const ProtectedRoute = ({loginreq, element}: {loginreq:boolean, element: JSX.Element }) => {
  const { login } = useLogin();

  // return login ? element  :<Navigate to="/login" />;
  if(loginreq){
    return login ? element  :<Navigate to="/login" />;
  }else{
    return !login ? element  :<Navigate to="/" />;
  }
};

export default ProtectedRoute;
