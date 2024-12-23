import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Denim Regular Fit Shorts",
      price: 15.0,
      size: "S",
      color: "Outer Space",
      material: "Denim",
      quantity: 1,
      image: "https://via.placeholder.com/80x80", // Replace with actual image link
    },
    {
      id: 1,
      name: "Denim Regular Fit Shorts",
      price: 15.0,
      size: "S",
      color: "Outer Space",
      material: "Denim",
      quantity: 1,
      image: "https://via.placeholder.com/80x80", // Replace with actual image link
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setCartItems([]); // Clears all items
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        {/* Title and Clear All Button */}
        <div className="flex mt-10 justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Your Shopping Cart
          </h2>
          <button
            onClick={handleClearAll}
            className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
          >
            Clear All
          </button>
        </div>

        {/* Cart Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 text-gray-700 mt-4 font-semibold uppercase text-sm border-b pb-2">
          <span className="col-span-2">Product</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b py-4"
          >
            {/* Product Image & Details */}
            <div className="col-span-2 flex flex-col md:flex-row items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded mb-2 md:mb-0 md:mr-4"
              />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                  Size: {item.size} | Color: {item.color} | Material:{" "}
                  {item.material}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex justify-center md:justify-start items-center">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="border px-2 py-1 text-lg"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="border px-2 py-1 text-lg"
              >
                +
              </button>
            </div>

            {/* Total */}
            <div className="text-center md:text-left text-gray-800 font-semibold">
              ${item.price * item.quantity}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:text-red-700 text-center"
            >
              🗑️
            </button>
          </div>
        ))}

        {/* Subtotal and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <div>
            <Link
              to="/product"
              className="bg-orange-500 text-white py-3 px-4 rounded hover:bg-orange-800 text-center"
            >
              Continue Shopping
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold">
              Subtotal:{" "}
              <span className="text-gray-800">${calculateSubtotal()} USD</span>
            </p>
            <p className="text-sm mb-4 text-gray-500">
              Taxes and shipping calculated at checkout
            </p>
            <Link
              to="/payment"
              className="bg-orange-600 text-white py-3 px-6 text-center rounded hover:bg-orange-800 block"
            >
              Check Out
            </Link>
          </div>
        </div>

        {/* Discount Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-end items-center gap-2">
          <input
            type="text"
            placeholder="Discount code..."
            className="border py-2 px-4 rounded w-full md:w-64"
          />
          <button className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-800">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
