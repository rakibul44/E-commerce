import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import denim from "../assets/denim.jpg";
import DescriptionTabs from "../components/DescriptionTabs";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const images = Array(4).fill(denim);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Black", code: "#000000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Red", code: "#FF0000" },
    { name: "Green", code: "#008000" },
  ];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <img
            src={denim}
            alt="Black Denim Jacket"
            className="w-full rounded-lg shadow-lg mb-4"
          />
          <div className="flex gap-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-20 rounded-lg border cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-2xl font-bold mb-4">Black Denim Jacket</h1>
          <p className="text-xl text-gray-700 mb-4">$85.00</p>
          <p className="text-gray-600 mb-6">
            Captivate with this shirt's versatile urban look that works as well at happy hour as
            it does in the backyard. The real mother of pearl buttons and embroidered crocodile...
          </p>

          {/* Size Selection */}
          <div className="mb-6">
            <span className="text-sm text-gray-500 block mb-2">Select Size:</span>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size ? "bg-orange-600 text-white" : "bg-gray-200"
                  } hover:bg-orange-400`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-sm text-gray-600 mt-2">
                Selected Size: <span className="font-bold">{selectedSize}</span>
              </p>
            )}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <span className="text-sm text-gray-500 block mb-2">Select Color:</span>
            <div className="flex gap-2">
              {colors.map((color) => (
                <div
                  key={color.name}
                  onClick={() => handleColorClick(color)}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                    selectedColor?.name === color.name
                      ? "border-orange-600"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.code }}
                ></div>
              ))}
            </div>
            {selectedColor && (
              <p className="text-sm text-gray-600 mt-2">
                Selected Color:{" "}
                <span className="font-bold">{selectedColor.name}</span>
              </p>
            )}
          </div>

          <textarea
            placeholder="Write here your notes for the order"
            className="w-full border p-2 rounded-lg mb-4"
          ></textarea>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button className="px-4 py-2 bg-gray-200">-</button>
              <input
                type="number"
                className="w-16 text-center border-none focus:ring-0"
                defaultValue={1}
              />
              <button className="px-4 py-2 bg-gray-200">+</button>
            </div>
          </div>

          <Link
            to="/payment"
            className="bg-orange-500 text-white px-6 py-2 inline-block text-center rounded w-full animate-pulse hover:bg-orange-700"
          >
            Buy Now
          </Link>

          <div className="mt-6 flex gap-4">
            <div className="flex gap-2">
              <Link to="https://facebook.com" className="text-gray-500 text-lg hover:text-blue-800">
                <FaFacebook />
              </Link>
              <Link to="https://pinterest.com" className="text-gray-500 text-lg hover:text-pink-800">
                <BsInstagram />
              </Link>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            * Orders ship within 2 to 3 business days.
          </p>
        </div>
      </div>

      <DescriptionTabs />
    </div>
  );
};

export default ProductDetails;
