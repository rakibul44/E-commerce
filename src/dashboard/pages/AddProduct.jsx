/* eslint-disable no-unsafe-optional-chaining */
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { usersApi } from "../../redux/apis/usersApi";
import { categoryApi } from "../../redux/apis/categoryApi";
import { brandApi } from "../../redux/apis/brandApi";
import { productApi } from "../../redux/apis/productApi";
import { toast } from "react-toastify";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [description, setDescription] = useState(""); // Initialize description state
  const [postNewProduct] = productApi.usePostNewProductMutation();

  // API data fetching
  const email = localStorage.getItem("email");
  const { data: userData } = usersApi.useGetUserByEmailQuery(email);
  const { data: categoryData } = categoryApi.useGetAllCategoryQuery();
  const { data: brandData } = brandApi.useGetAllBrandsQuery();

  const currentUser = userData?.data;
  const categories = categoryData?.data || [];
  const brands = brandData?.data || [];

  // Handle add new product submission
  const handleAddNewProduct = async (data) => {
    const formData = new FormData();

    // Add brand and category to formData
    if (data?.brand) {
      const [brandId, brandName] = data?.brand?.split(",");
      formData.append("brand", brandId);
      formData.append("brandName", brandName);
    }
    if (data?.category) {
      const [categoryId, categoryName] = data?.category?.split(",");
      formData.append("category", categoryId);
      formData.append("categoryName", categoryName);
    }

    // Add other product data
    formData.append("name", data?.name);
    formData.append("description", description); // Append description state
    formData.append("price", data?.price);
    formData.append("discountPrice", data?.discountPrice);
    formData.append("stock", data?.stock);
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("colors", JSON.stringify(colors));
    images.forEach((image) => formData.append("images", image));
    formData.append("author", currentUser?._id);

    console.log("FormData content:");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const res = await postNewProduct(formData);
      if (res?.data?.success) {
        reset();
        toast.success(res?.data?.message);
        setColorInput("");
        setSelectedSizes([]);
        setColors([]);
        setImages([]);
        setDescription(""); // Reset description
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  // Helper functions for images, colors, and sizes
  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages([...images, ...uploadedFiles]);
  };

  const handleImageDelete = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const handleDeleteColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNewProduct)}
      className="md:p-8 flex flex-col lg:flex-row gap-6"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Product name *</label>
          <input
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required", maxLength: 20 })}
            className="w-full border p-2 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Category *</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat?._id} value={`${cat?._id},${cat?.name}`}>
                {cat?.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Brand *</label>
          <select
            {...register("brand", { required: "Brand is required" })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Choose brand</option>
            {
              brands?.length > 0 && brands?.map((brand) =>  <option key={brand?._id} value={ `${brand?._id},${brand.name}` }>{brand?.name}</option> )
            }

          </select>
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
        </div>

        {/* Regular Price, Stock */}
        {["price", "stock"].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block font-medium text-sm capitalize">{field.replace(/([A-Z])/g, " $1")} *</label>
            <input
              type="number"
              placeholder={`Enter ${field}`}
              {...register(field, {
                required: `${field.replace(/([A-Z])/g, " $1")} is required`,
                min: { value: 1, message: `${field.replace(/([A-Z])/g, " $1")} must be a positive value` },
              })}
              className="w-full border p-2 rounded-md"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]?.message}</p>}
          </div>
        ))}

        {/* Discount Price */}
        <div className="mb-4">
          <label className="block font-medium text-sm capitalize">Discount Price *</label>
          <input
            type="number"
            placeholder="Enter discountPrice"
            {...register("discountPrice", {
              required: "Discount Price is required",
              min: { value: 1, message: "Discount Price must be a positive value" },
            })}
            className="w-full border p-2 rounded-md"
          />
          {errors.discountPrice && <p className="text-red-500 text-sm">{errors.discountPrice?.message}</p>}
        </div>

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
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-btnbg  hover:bg-btnbghover   text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {colors.map((color, idx) => (
              <div key={idx} className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
                {color}
                <button
                  type="button"
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
        <div className="mb-4">
          <label className="block font-medium text-sm">Description *</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={{
              toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ size: [] }],
                ["link"],
              ],
            }}
            className="w-full border p-2 rounded-md"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
         {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
        {/* Image Upload */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Upload images</h3>
          <div className="flex gap-4 mt-2 flex-wrap">
            {images.length < 4 && (
              <label className="border-2 border-dashed flex items-center justify-center w-28 h-28 rounded-md cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
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
                  type="button"
                  onClick={() => handleImageDelete(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Add size</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {sizes.map((size, idx) => (
              <button 
              key={idx}
              type="button" 
              onClick={() => toggleSize(size)}
              className={`border p-2 rounded-md ${
                selectedSizes.includes(size) ? "bg-btnbg hover:bg-btnbghover text-white" : "hover:bg-gray-100"
              }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-btnbg hover:bg-btnbghover text-white px-4 py-2 rounded-md">
            Add product
          </button>
        </div>
      </div>
      </div>
    </form>
  );
};

export default AddProduct;
