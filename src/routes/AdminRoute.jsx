/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
   const { loggedInUser , logOut , userLoading} = useAuth();

  const location = useLocation();

  if ( userLoading) {
    return <progress className="progress w-56"></progress>;
  }

  const isAdminOrSuperAdmin = loggedInUser?.role === "admin" || loggedInUser?.role === "superAdmin" ;



  if (isAdminOrSuperAdmin) {
    return children;
  } else {
    logOut()
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
   
  

};

export default AdminRoute;
