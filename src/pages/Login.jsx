import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify";
import { usersApi } from "../redux/apis/usersApi";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { signIn , googleSignIn} = useAuth();
  const navigate  = useNavigate();
  const [ createUsers ] = usersApi.useCreateUsersMutation();

  // handle login user
 const handleLoginWithEmailPass = async(data) =>{
   try{
     await signIn(data?.email, data?.password);
     reset();
     navigate("/")
   } catch(err){
    console.log(err)
   }
 }


     // handle google sign in function
     const handleGooogleSignIn = async () => {
      try {
        const result = await googleSignIn();
        if(result?.user){
          const userInfo = {
            name: result.user?.displayName,
            email: result.user?.email,
            profilePicture: result.user?.photoURL,
          };
  
         const res =  await createUsers(userInfo);
         if(res){
          navigate("/");
         }
        
        }
  
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        toast.error("Error during Google sign-in")
      }
    };
  return (
 
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          {/* Logo */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLoginWithEmailPass)}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true})}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", { required:true})}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-500 text-center inline-block text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="text-sm text-gray-500 mx-4">OR</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login Button */}
           {/* Social Media Icons */}
           <div className=" flex gap-3 items-center justify-center mt-3">
            <p className=" text-gray-600"> Or login with</p>
            <div onClick={handleGooogleSignIn} className="flex justify-center items-center gap-2 space-x-4 px-3 py-2 border rounded-md hover:bg-gray-100 ">
              <FcGoogle className=" text-2xl"></FcGoogle>
              Google

            </div>
          </div>

          {/* Register Link */}
          <p className="text-sm text-gray-600 mt-4 text-center">
           {" Don't have an account? "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
 
  );
};

export default Login;
