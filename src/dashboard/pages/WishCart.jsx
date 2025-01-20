import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useFunc from "../../hooks/useFunc";
import { wishlistApi } from "../../redux/apis/wishlistApi";

const WishCart = () => {   
  const { handleDeleteWishlist, handleAddToCart } = useFunc();
  const [ deletewishlistById  ] = wishlistApi.useDeletewishlistByIdMutation();
  const {data: wishlistProductData, refetch } = wishlistApi.useGetAllWishlistsByUserIpQuery();

  const products = wishlistProductData?.data || [];
  console.log("wishlistProductData: ", wishlistProductData);

  // handle wishlist to cart data
  const handleWishlistToCart = async(id, data) => {
   const price = data?.discountPrice && data?.discountPrice < data?.price ?  data?.discountPrice : data?.price;
   const size = data?.sizes?.length > 0 ? data?.sizes[0] : "";
   const color = data?.colors?.length > 0 ? data?.colors[0] : "";
    const cartData = { 
      product: data?._id,
      price,
      quantity: 1,
      size,
      color
    }
    handleAddToCart(cartData);
    await deletewishlistById(id);
    refetch();
  }


  return (
    <div className="min-h-screen bg-gray-50">
 

      {/* Wishlist Table */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-4 text-gray-700 font-semibold uppercase text-sm border-b">
            <span className="col-span-2">Your Favorite Products</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {/* Product List */}
          {products?.length > 0 ? (
            products?.map((item) => (
              <div
                key={item?._id}
                className="grid grid-cols-6 items-center gap-4 p-4 hover:bg-gray-50 border-b"
              >
                {/* Product Image and Name */}
                <div className="col-span-2 flex items-center">
                  <Link to={item?.product?._id}>
                    <img
                      src={item?.product?.images}
                      alt={item?.product?.name}
                      className="w-25 h-20 object-cover rounded mr-4"
                    />
                  </Link>
                  <Link
                    to={item?.product?._id}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    {item?.product?.name}
                  </Link>
                </div>

                {/* Price */}
                <div className= "col-span-2 text-gray-800 flex flex-col">
                  <span className={`flex gap-1 items-center ${  item?.product?.discountPrice < item?.product?.price ? 'line-through text-gray-500':' text-gray-800'}`}>
                  <FaBangladeshiTakaSign  className=" text-sm"/>
                  {item?.product?.price}
                  </span>
                  { 
                   item?.product?.discountPrice < item?.product?.price && 
                   <span className=" flex gap-1 items-center">
                    <FaBangladeshiTakaSign className=" text-sm"/>
                   {item?.product?.discountPrice}
                   </span> 
                  }
     
                </div>

            

                {/* Add to Bag Button  & remove */}
                <div className=" col-span-2 flex gap-3">
                <button
                    onClick={() => handleDeleteWishlist(item?._id, refetch)} // Remove item on click
                    className="text-gray-600 hover:text-red-500 flex items-center"
                  >
                    <span className='text-2xl'><AiOutlineDelete /></span>
                  </button>
                  <button 
                   onClick={() => handleWishlistToCart(item?._id, item?.product)}
                   className="bg-btnbg text-white py-1 px-2 rounded hover:bg-btnbghover transition duration-300">
                <FaCartPlus />
                  </button>
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

export default WishCart;
