import  { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaRegUser, FaTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import { cartsApi } from "../redux/apis/cartsApi";
import useFunc from "../hooks/useFunc";
import { categoryApi } from "../redux/apis/categoryApi";
import { GiSelfLove } from "react-icons/gi";
import { wishlistApi } from "../redux/apis/wishlistApi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { loggedInUser } = useAuth();
  const { handleDeleteCart } = useFunc();
  const { data: cartsData } = cartsApi.useGetAllCartsByUserIdQuery(loggedInUser?._id);
  const { data: categoryData } = categoryApi.useGetAllCategoryQuery();
  const { loggedInUser: currentUser} = useAuth();
  const {data: wishlistProductData } = wishlistApi.useGetAllWishlistsByUserIpQuery();
  const location = useLocation();
  const email = localStorage.getItem("email")
  const categories = categoryData?.data || [];

  const midIndex = Math.ceil(categories.length / 2);
  const firstHalfCategories = categories.slice(0, midIndex);
  const secondHalfCategories = categories.slice(midIndex);
  
  
  const wishlists = wishlistProductData?.data || [];


  useEffect(()=> { setIsDropdownOpen(false)}, [location])

  const carts = cartsData?.data?.result || [];
  const subTotalPrice = cartsData?.data?.subTotalPrice || 0;


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);



  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 w-full">
      <div className=" container mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image h-10 w-10  rounded-tl-md rounded-br-md" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 font-semibold hover:text-black">
            Home
          </Link>
          <div className="relative group">
            <button className="text-gray-700 font-semibold hover:text-black">
              Category
            </button>
            {/* Dropdown */}
        <div className="absolute left-0 hidden group-hover:block bg-white shadow-md p-5 w-64 md:w-96">
          <div className="grid grid-cols-2 gap-6">
            {/* Column I */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Column I</h4>
                    <ul className="space-y-2 text-gray-600">
                      { firstHalfCategories?.length > 0 && firstHalfCategories?.map((cat) =>  <li key={cat?._id}><Link to={`/product?category=${cat?._id}`} className="hover:text-black">{cat?.name}</Link></li>) }
                    </ul>
                  </div>
                  {/* Column II */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Column II</h4>
                    <ul className="space-y-2 text-gray-600 ">
                      { secondHalfCategories?.length > 0 && secondHalfCategories?.map((cat) => <li key={cat?._id}><Link to={`/product?category=${cat?._id}`} className="hover:text-black">{cat?.name}</Link></li>) }
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          <Link to="/product" className="text-gray-700 font-semibold hover:text-black">
            Shop
          </Link>
          <Link to="/blog" className="text-gray-700 font-semibold hover:text-black">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-700 font-semibold hover:text-black">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search entire store here..."
              className="border-b border-gray-400 focus:outline-none focus:border-black px-2 py-1 text-sm"
            />
            <button className="font-semibold text-lg">
              <FaSearch />
            </button>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="p-2 relative flex items-center justify-center">
             { 
              !email ? 
              <span className="relative inline-flex text-lg rounded-full h-4 w-4 bg-red">
              <span className="animate-ping absolute inline-flex h-full w-full bg-red rounded-full"></span>
              <FaRegUser className="text-midnight text-2xl" />
            </span>
            : 
            <img src={currentUser?.profilePicture} alt={currentUser?.name} className="w-8 h-8 rounded-full object-cover" />
          }
            </button>
            {isDropdownOpen && (
              !currentUser ?
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-10">
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Signup
              </Link>
            </div>
            :
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-10">
            <h2
          
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              { currentUser?.name}
            </h2>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="h-10 w-7" onClick={toggleCartModal}>
              <FaShoppingCart />
            </button>
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] rounded-full px-1">
              {carts?.length}
            </span>
          </div>
          <div className="relative">
              <Link to={"/wishlist"} className=" text-xl">
                <GiSelfLove />
              </Link>
            <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[10px] rounded-full px-1">
              {wishlists?.length}
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="text-gray-700 font-semibold hover:text-black">
              Home
            </Link>
            <Link to="/product" className="text-gray-700 font-semibold hover:text-black">
              Shop
            </Link>
            <Link to="#" className="text-gray-700 font-semibold hover:text-black">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 font-semibold hover:text-black">
              Contact
            </Link>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">My Cart ({carts?.length})</h2>
              <button onClick={toggleCartModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            {carts?.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
            ) : (
              <>
                {carts?.map((item) => (
                  <div key={item?._id} className="flex items-center space-x-4 my-4">
                    <img src={item?.images[0]} alt={item?.productName} className="w-14 h-14 rounded object-cover" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-sm">{item?.productName}</h3>
                      <p className="text-gray-600 text-sm">${item?.price.toFixed(2)}</p>
                    </div>
                    <p> {item?.quantity} </p>
                    <button
                      onClick={() => handleDeleteCart(item?._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-gray-700">Sub Total:</span>
                  <span className="font-semibold text-orange-500">${subTotalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Link to='/mycart' onClick={() => setIsCartModalOpen(false)} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                    View Cart
                  </Link>
                  <Link to='/payment' onClick={() => setIsCartModalOpen(false)} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
