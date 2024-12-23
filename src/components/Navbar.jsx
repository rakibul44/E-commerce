import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaRegUser, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import cloth from "../assets/cloth.jpg";
import denim from "../assets/denim.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Versatile Shacket", price: 7.7, quantity: 1, image: cloth },
    { id: 2, name: "Classic Jacket", price: 7.84, quantity: 1, image: denim },
  ]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);

  const handleDeleteItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 w-full">
      <div className="flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image h-10 w-10" />
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
                      <li><Link to="/shop-2-column" className="hover:text-black">Shop 2 Column</Link></li>
                      <li><Link to="/shop-3-column" className="hover:text-black">Shop 3 Column</Link></li>
                      <li><Link to="/shop-4-column" className="hover:text-black">Shop 4 Column</Link></li>
                      <li><Link to="/shop-5-column" className="hover:text-black">Shop 5 Column</Link></li>
                      <li><Link to="/shop-6-column" className="hover:text-black">Shop 6 Column</Link></li>
                      <li><Link to="/shop-left-sidebar" className="hover:text-black">Shop Left Sidebar</Link></li>
                      <li><Link to="/shop-right-sidebar" className="hover:text-black">Shop Right Sidebar</Link></li>
                      <li><Link to="/shop-grid-view" className="hover:text-black">Shop Grid View</Link></li>
                    </ul>
                  </div>
                  {/* Column II */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Column II</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li><Link to="/shop-list-view" className="hover:text-black">Shop List View</Link></li>
                      <li><Link to="/add-to-cart-button" className="hover:text-black">Add To Cart Button</Link></li>
                      <li><Link to="/add-to-cart-icon" className="hover:text-black">Add To Cart Icon</Link></li>
                      <li><Link to="/shop-load-more" className="hover:text-black">Shop Load More</Link></li>
                      <li><Link to="/shop-infinite-scroll" className="hover:text-black">Shop Infinite Scroll</Link></li>
                      <li><Link to="/shop-pagination" className="hover:text-black">Shop Pagination</Link></li>
                      <li><Link to="/container-width" className="hover:text-black">Container Width</Link></li>
                      <li><Link to="/container-fluid" className="hover:text-black">Container Fluid</Link></li>
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
              <span className="relative inline-flex text-lg rounded-full h-4 w-4 bg-red">
                <span className="animate-ping absolute inline-flex h-full w-full bg-red rounded-full"></span>
                <FaRegUser className="text-midnight text-2xl" />
              </span>
            </button>
            {isDropdownOpen && (
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
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="h-10 w-7" onClick={toggleCartModal}>
              <FaShoppingCart />
            </button>
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1">
              {cartItems.length}
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">My Cart ({cartItems.length})</h2>
              <button onClick={toggleCartModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 my-4">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-gray-700">Sub Total:</span>
                  <span className="font-semibold text-orange-500">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Link to='/mycart' className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                    View Cart
                  </Link>
                  <Link to='/payment' className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
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
