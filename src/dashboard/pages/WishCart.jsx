import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample Wishlist Data
const wishlistItems = [
  {
    id: 1,
    name: "iPhone 12 Pro Max 128GB",
    price: 38,
    stock: 23,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21 Ultra",
    price: 45,
    stock: 15,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    name: "Google Pixel 5",
    price: 30,
    stock: 10,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 4,
    name: "OnePlus 9 Pro",
    price: 40,
    stock: 12,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 5,
    name: "Sony Xperia 1 II",
    price: 50,
    stock: 7,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 6,
    name: "iPhone SE (2020)",
    price: 25,
    stock: 30,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 7,
    name: "Xiaomi Mi 11",
    price: 35,
    stock: 18,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 8,
    name: "Oppo Find X3 Pro",
    price: 42,
    stock: 5,
    image: "https://via.placeholder.com/80",
  },
];

const Wishcart = () => {
  const [quantities, setQuantities] = useState(wishlistItems.map(() => 1)); // Initialize quantity
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 4; // Number of items per page

  // Calculate indexes for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);

  // Handle quantity increment
  const incrementQuantity = (index) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  // Handle quantity decrement
  const decrementQuantity = (index) => {
    setQuantities((prev) => {
      const updated = [...prev];
      if (updated[index] > 1) updated[index] -= 1;
      return updated;
    });
  };

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600">
              <th className="p-3">PRODUCT</th>
              <th className="p-3">STOCK STATUS</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">QUANTITY</th>
              <th className="p-3">TOTAL</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                {/* Product Image and Name */}
                <td className="p-3 flex items-center space-x-3">
                  <Link to="#">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </Link>
                  <span className="text-gray-700">{item.name}</span>
                </td>

                {/* Stock Status */}
                <td className="p-3 text-green-600">
                  In Stock ({item.stock})
                </td>

                {/* Price */}
                <td className="p-3 text-gray-700">${item.price}</td>

                {/* Quantity Controls */}
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(index)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="text-gray-700">{quantities[index]}</span>
                    <button
                      onClick={() => incrementQuantity(index)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Total */}
                <td className="p-3 text-gray-700">
                  ${item.price * quantities[index]}
                </td>

                {/* Remove Button */}
                <td className="p-3">
                  <button className="text-gray-500 hover:text-red-600 text-xl">
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(wishlistItems.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button className="text-red-600 font-medium hover:underline">
          Clean Wishlist
        </button>
        <Link
          to="#"
          className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-700 transition"
        >
          Add to Cart All
        </Link>
      </div>
    </div>
  );
};

export default Wishcart;
