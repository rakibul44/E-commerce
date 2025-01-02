/* eslint-disable react/prop-types */
const EditCartModel = ({ props }) => {

   const { closeModal, product, handleColorSelect, selectedColor, handleSizeSelect, selectedSize, handleUpdateCart , handleQuantityChange, quantity } = props
     
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
        <div className="bg-white p-4 sm:p-6 rounded shadow-lg max-w-md w-full relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={closeModal}
          >
            &times;
          </button>
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">{product?.name}</h3>
          <img
            src={ product?.images[0]}
            alt={ product?.name}
            className="w-full h-40 sm:h-48 object-cover rounded mb-2"
          />
          <p className="text-gray-500 mb-2 text-center">{ product?.categoryName}</p>
          <p className="text-black font-bold text-lg sm:text-xl text-center mb-2">
            { product?.price}
          </p>
          {/* Size Selector */}
       
          <div className="flex flex-wrap items-center gap-2 mt-2">
          <p className="text-sm sm:text-base">
            <strong>Size :</strong>
          </p>
            { product?.sizes.map((size, index) => (
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
            { product?.colors?.map((color, index) => (
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
              className="px-3 py-1 border rounded-md text-sm sm:text-base"
            >
              +
            </button>
          </div>
            <button onClick={() => handleUpdateCart(product?._id, {price:  product?.price ,quantity, size:selectedSize ,color: selectedColor })} className="bg-orange-700 hover:bg-orange-400 w-full text-white px-4 py-2 rounded mt-4 text-sm sm:text-base">
              Update cart
             </button>
   
        </div>
      </div>
    );
};

export default EditCartModel;