import useAuth from "./useAuth";


const useBaseRoute = () => {
    const { loggedInUser } = useAuth();
    const isSuperAdminOrAdmin = loggedInUser?.role === "superAdmin" || loggedInUser?.role === "Admin";
  
  // Determine base route based on role
  let baseRoute;
  if (isSuperAdminOrAdmin) {
    baseRoute = "/dashboard/admin";
  } else {
    baseRoute = "/dashboard/user";
  }
    return { baseRoute }
};

export default useBaseRoute;