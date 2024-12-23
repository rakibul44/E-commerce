import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import TNF from '../assets/TNF.jpg';

const Wishlist = () => {
  // State to store wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Transition jacket with hood",
      price: "$113.00",
      image: TNF, // Replace with real image URL
      link: "/product",
    },
    {
      id: 2,
      name: "Stylish winter coat",
      price: "$150.00",
      image: TNF, // Replace with real image URL
      link: "/product",
    },
    {
      id: 3,
      name: "Casual hoodie for men",
      price: "$89.99",
      image: TNF, // Replace with real image URL
      link: "/product",
    },
  ]);

  // Function to handle item removal
  const handleRemove = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="relative h-64 bg-midnight text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold uppercase tracking-wider">
          Page Wishlist
        </h1>
      </div>

      {/* Wishlist Table */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 text-gray-700 font-semibold uppercase text-sm border-b">
            <span className="col-span-2">Your Favorite Products</span>
            <span>Price</span>
            <span>Remove</span>
            <span>Add to Bag</span>
          </div>

          {/* Product List */}
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center gap-4 p-4 hover:bg-gray-50 border-b"
              >
                {/* Product Image and Name */}
                <div className="col-span-2 flex items-center">
                  <Link to={item.link}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-25 h-20 object-cover rounded mr-4"
                    />
                  </Link>
                  <Link
                    to={item.link}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    {item.name}
                  </Link>
                </div>

                {/* Price */}
                <div className="text-gray-800">{item.price}</div>

                {/* Remove Button */}
                <div>
                  <button
                    onClick={() => handleRemove(item.id)} // Remove item on click
                    className="text-gray-600 hover:text-red-500 flex items-center"
                  >
                    <span class='text-2xl'><AiOutlineDelete /></span>
                  </button>
                </div>

                {/* Add to Bag Button */}
                <div>
                  <Link to ='/payment' className="bg-orange-600 text-white py-3 px-4 rounded hover:bg-orange-800 transition duration-300">
                    Buy Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-600">
              Your wishlist is empty!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
