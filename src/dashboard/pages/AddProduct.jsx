import React, { useState } from "react";

const AddProduct = () => {
  const sizes = ["S - 38.5", "M - 39", "L - 40", "XL - 41.5", "XXL - 42", "3XL - 43"];
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    regularPrice: "",
    discountPrice: "",
    stock: "",
    colors: [],
  });
  const [colorInput, setColorInput] = useState("");

  // Image Upload
  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages([...images, ...uploadedFiles]);
  };

  // Image Delete
  const handleImageDelete = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  // Handle Input Change for Product Details
  const handleInputChange = (field, value) => {
    setProductDetails({ ...productDetails, [field]: value });
  };

  // Add Color
  const handleAddColor = () => {
    if (colorInput.trim() && !productDetails.colors.includes(colorInput)) {
      setProductDetails({ ...productDetails, colors: [...productDetails.colors, colorInput] });
      setColorInput("");
    }
  };

  // Delete Color
  const handleDeleteColor = (color) => {
    setProductDetails({
      ...productDetails,
      colors: productDetails.colors.filter((c) => c !== color),
    });
  };

  return (
    <div className="md:p-8 flex flex-col lg:flex-row gap-6">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Product name *</label>
          <input
            type="text"
            placeholder="Enter product name"
            maxLength="20"
            className="w-full border p-2 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">Do not exceed 20 characters.</p>
        </div>

        {/* Category */}
        <div className="flex gap-4 mb-4">
          <div className="w-full">
            <label className="block  font-medium text-sm">Category *</label>
            <select className="w-full border p-2 rounded-md">
              <option>Choose category</option>
              <option>Winter Jacket</option>
              <option>Denim Jacket</option>
              <option>Denim Jeans</option>
            </select>
          </div>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Brand *</label>
          <select className="w-full border p-2 rounded-md">
            <option>Choose category</option>
            <option>The North Face</option>
            <option>Gant</option>
          </select>
        </div>

        {/* Regular Price, Discount Price, Stock */}
        {["regularPrice", "discountPrice", "stock"].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block font-medium text-sm capitalize">{field.replace(/([A-Z])/g, " $1")} *</label>
            <input
              type="number"
              placeholder={`Enter ${field}`}
              value={productDetails[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full border p-2 rounded-md"
            />
          </div>
        ))}

        {/* Colors */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Colors *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Enter color"
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {productDetails.colors.map((color, idx) => (
              <div
                key={idx}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-md"
              >
                {color}
                <button
                  onClick={() => handleDeleteColor(color)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm">Description *</label>
          <textarea
            placeholder="Description"
            maxLength="100"
            className="w-full border p-2 rounded-md"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Do not exceed 100 characters.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
        {/* Image Upload */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Upload images</h3>
          <div className="flex gap-4 mt-2 flex-wrap">
            {images.length < 4 && (
              <label className="border-2 border-dashed flex items-center justify-center w-28 h-28 rounded-md cursor-pointer">
                <input type="file" multiple onChange={handleImageUpload} className="hidden" />
                <span className="text-blue-500">+ Upload</span>
              </label>
            )}
            {images.map((file, idx) => (
              <div key={idx} className="relative w-28 h-28">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full rounded-md object-cover"
                />
                <button
                  onClick={() => handleImageDelete(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Add at least 4 images. Ensure they meet dimension requirements.
          </p>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Add size</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {sizes.map((size, idx) => (
              <button key={idx} className="border p-2 rounded-md hover:bg-gray-100">
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add product</button>
          <button className="bg-gray-300 px-4 py-2 rounded-md">Save product</button>
          <button className="bg-gray-300 px-4 py-2 rounded-md">Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;