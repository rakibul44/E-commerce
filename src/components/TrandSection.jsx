import  { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { productApi } from "../redux/apis/productApi";
import useFunc from "../hooks/useFunc";


const TrandSection = () => {
  const [filter, setFilter] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useFunc();

  const { data: categoryData } = productApi.useGetTopDiscountCategoriesQuery();
  const { data: productData, isLoading } = productApi.useGetTrandingProductsQuery(filter);
  

  // initially set color and size
  useEffect(() => {
    const firstColor = modalProduct?.colors?.length > 0 ? modalProduct?.colors[0]: "";
    setSelectedColor(firstColor);
    const firstSize = modalProduct?.sizes?.length > 0 ? modalProduct?.sizes[0] : "";
    setSelectedSize(firstSize);
    
  }, [modalProduct])


  if(isLoading){
    return <p>Loading..</p>
  }
  const trandingProducts = productData?.data || [];
  const categories = categoryData?.data || [];



  const openModal = (product) => {
    setModalProduct(product);
    setSelectedSize(null); // Reset size selection
    setSelectedColor(null); // Reset color selection
    setQuantity(1); // Reset quantity
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold mb-4">
        Trendsetter's Picks
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            filter === null
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-black hover:text-white"
          }`}
          onClick={() => setFilter(null)}
        >
          All
        </button>


        {
          categories?.length > 0 && categories?.map((cat) => (
            <button
            key={ cat?.category}
            className={`px-4 py-2 rounded text-sm sm:text-base ${
              filter === cat?.category
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-black hover:text-white"
            }`}
            onClick={() => setFilter(cat?.category)}
          >
            {cat?.categoryName}
          </button>
          ))
        }

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        { trandingProducts?.map((product) => (
          <div
            key={product?._id}
            className="border p-4 rounded shadow-sm hover:shadow-lg transition"
          >
            <div className="relative group">
              {/* Image with Link */}
              <Link to={`/${product?._id}`}>
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded"
                />
              </Link>

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
              <button 
              onClick={() => handleAddToCart({ product:product?._id ,price: product?.price, quantity: 1, size: product?.sizes[0], color: product?.colors[0] })}
               className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                <FaCartPlus />
              </button>
            </div>
            {/* Product Details */}
            <h3 className="text-lg font-semibold mt-4  sm:text-lg">{product?.name}</h3>
            <p className="text-gray-500 text-xs sm:text-sm">{product?.categoryName}</p>
            <p className="text-black font-bold text-sm sm:text-base">{product?.price}</p>
          </div>
        ))}
      </div>

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
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">{modalProduct?.name}</h3>
            <img
              src={modalProduct?.images[0]}
              alt={modalProduct?.name}
              className="w-full h-40 sm:h-48 object-cover rounded mb-2"
            />
            <p className="text-gray-500 mb-2 text-center">{modalProduct?.categoryName}</p>
            <p className="text-black font-bold text-lg sm:text-xl text-center mb-2">
              {modalProduct?.price}
            </p>

            {/* Size Selector */}
         
            <div className="flex flex-wrap items-center gap-2 mt-2">
            <p className="text-sm sm:text-base">
              <strong>Size:</strong>
            </p>
              {modalProduct?.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-3 py-1 border rounded-md text-sm sm:text-base  ${
                    selectedSize === size ?  "bg-btnbg text-white hover:bg-btnbghover" : "hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>


               {/* Color Selector */}
       
            <div className="flex flex-wrap items-center gap-2 mt-2">
            <p className="text-sm sm:text-base ">
              <strong>Color:</strong>
            </p>
              {modalProduct?.colors?.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  className={`px-3 py-1 border rounded-md text-sm sm:text-base  ${
                    selectedColor === color ? "bg-btnbg text-white hover:bg-btnbghover" : "hover:bg-gray-200"
                  }`}
                >
                  {color}
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
                className="px-3 py-1 border rounded-md m-4 text-sm sm:text-base"
              >
                +
              </button>
            </div>

            <Link className="bg-orange-700 hover:bg-orange-400 text-white px-4 py-2 rounded mt-4 text-sm sm:text-base">
              Buy Now
            </Link>
        
              <button onClick={() => handleAddToCart({ product:modalProduct?._id ,price: modalProduct?.price ,quantity, size:selectedSize ,color: selectedColor })} className="bg-orange-700 hover:bg-orange-400 w-full text-white px-4 py-2 rounded mt-4 text-sm sm:text-base">
               Add to Cart
               </button>
     
          </div>
        </div>
      )}
    </div>
  );
};

export default TrandSection;