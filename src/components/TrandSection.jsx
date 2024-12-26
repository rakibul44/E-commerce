import  { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import cloth from "../assets/cloth.jpg";
import TNF from "../assets/TNF.jpg";
import denim from "../assets/denim.jpg";
import woman from "../assets/woman.jpg";
import { productApi } from "../redux/apis/productApi";

const products = [
  {
    id: "tshirts",
    category: "T-Shirts",
    name: "Sleek Slim Fit Suit",
    price: "$25.00",
    image: cloth,
    status: "",
    link: "/product/tshirts",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "jeans",
    category: "Jeans",
    name: "Denim Skinny Jeans",
    price: "$21.00",
    image: TNF,
    link: "/product/jeans",
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: "jackets",
    category: "Shirts",
    name: "Quilted Puffer Jacket",
    price: "$20.00",
    image: denim,
    link: "/product/jackets",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "pants",
    category: "Accessories",
    name: "Men's Classic Chino Pants",
    price: "$15.00",
    image: woman,
    link: "/product/pants",
    sizes: ["30", "32", "34", "36"],
  },
];

const TrandSection = () => {
  const [filter, setFilter] = useState("all");
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading } = productApi.useGetTrandingProductsQuery();
  

  if(isLoading){
    return <p>Loading..</p>
  }
  
  const trandingProducts = productData?.data || [];
  console.log(trandingProducts)


  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.id === filter);

  const openModal = (product) => {
    setModalProduct(product);
    setSelectedSize(null); // Reset size selection
    setQuantity(1); // Reset quantity
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold mb-4">
        {"Trendsetter's Picks"}
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            filter === "all"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-black hover:text-white"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            filter === "tshirts"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-black hover:text-white"
          }`}
          onClick={() => setFilter("tshirts")}
        >
          T-Shirts
        </button>
        <button
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            filter === "jeans"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-black hover:text-white"
          }`}
          onClick={() => setFilter("jeans")}
        >
          Jeans
        </button>
        <button
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            filter === "jackets"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-black hover:text-white"
          }`}
          onClick={() => setFilter("jackets")}
        >
          Jackets
        </button>
        <button
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            filter === "pants"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-black hover:text-white"
          }`}
          onClick={() => setFilter("pants")}
        >
          Pants
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow-sm hover:shadow-lg transition"
          >
            <div className="relative group">
              {/* Image with Link */}
              <Link to={product.link}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded"
                />
              </Link>

              {/* Button on Hover */}
              <button
                onClick={() => openModal(product)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition"
              >
                <span className="bg-white text-midnight p-2 hover:bg-orange-700 rounded-full">Quickshop</span>
              </button>

              {/* Status Badge */}
              {product.status && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.status}
                </span>
              )}

              {/* Favorite Icon */}
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                <FaCartPlus />
              </button>
            </div>
            {/* Product Details */}
            <h3 className="text-lg font-semibold mt-4  sm:text-lg">{product.name}</h3>
            <p className="text-gray-500 text-xs sm:text-sm">{product.category}</p>
            <p className="text-black font-bold text-sm sm:text-base">{product.price}</p>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <Link to='/product' className="flex justify-center mt-8">
        <button className="bg-orange-700 hover:bg-orange-400 text-white px-6 py-2 rounded text-sm sm:text-base">
          View More
          <span className="ml-2">→</span>
        </button>
        
      </Link>

      {/* Modal */}
      {modalProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-4 sm:p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">{modalProduct.name}</h3>
            <img
              src={modalProduct.image}
              alt={modalProduct.name}
              className="w-full h-40 sm:h-48 object-cover rounded mb-4"
            />
            <p className="text-gray-500 mb-4 text-center">{modalProduct.category}</p>
            <p className="text-black font-bold text-lg sm:text-xl text-center mb-4">
              {modalProduct.price}
            </p>
            {/* Size Selector */}
            <p className="text-sm sm:text-base">
              <strong>Size :</strong>
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {modalProduct.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeSelect(size)} // Update size on click
                  className={`px-3 py-1 border rounded-md text-sm sm:text-base hover:bg-gray-200 ${
                    selectedSize === size ? "bg-gray-300" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border rounded-md text-sm sm:text-base"
              >
                -
              </button>
              <span className="text-lg sm:text-xl">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border rounded-md text-sm sm:text-base"
              >
                +
              </button>
            </div>

            <Link to="/payment" >
              <button className="bg-orange-700 w-full hover:bg-orange-400 text-white px-4 py-2 rounded  mt-4 text-sm sm:text-base">
              Buy Now 
              </button>
            </Link>
            <Link to="/mycart" >
              <button className="bg-orange-700 hover:bg-orange-400 w-full text-white px-4 py-2 rounded mt-4 text-sm sm:text-base">
               Add to Cart </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrandSection;
