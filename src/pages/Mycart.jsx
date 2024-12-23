import { Link } from "react-router-dom";
import { cartsApi } from "../redux/apis/cartsApi";
import useFunc from "../hooks/useFunc";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const { loggedInUser } = useAuth()
  const { data: cartsData, isLoading, refetch } = cartsApi.useGetAllCartsByUserIdQuery(loggedInUser?._id);
  const { handleCartProductQuantityChange , handleDeleteCart} = useFunc();

   
  //  handle carts loading
  if(isLoading){
    return <p>Loading..</p>
  }

  const carts = cartsData?.data?.result || [];
  const subTotalPrice = cartsData?.data?.subTotalPrice;

  console.log(carts)
 

  return (
    <div className="min-h-screen bg-gray-50 p-4 container mx-auto">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-20 text-center">
          Your Shopping Cart
        </h2>

        {/* Cart Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 text-gray-700 mt-20 font-semibold uppercase text-sm border-b pb-2">
          <span className="col-span-2">Product</span>
          <span>Quantity</span>
          <span>Total</span>
          
        </div>

        {/* Cart Items */}
        {carts?.map((cart) => (
          <div
            key={cart?._id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b py-4"
          >
            {/* Product Image & Details */}
            <div className="col-span-2 flex flex-col md:flex-row items-center">
              <img
                src={cart?.images[0]}
                alt={cart?.productName}
                className="w-24 h-24 object-cover rounded mb-2 md:mb-0 md:mr-4"
              />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">{cart?.productName}</h3>
                <p className="text-gray-600 text-sm">
                  ${cart?.price?.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                  Size: {cart?.size} | Color: {cart?.color} 
                  { cart?.material &&  `| Material:
                  ${cart?.material}`}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex justify-center md:justify-start items-center">
              <button
                onClick={() => handleCartProductQuantityChange(cart?._id, cart?.quantity > 1 && -1, refetch)}
                className="border px-2 py-1 text-lg"
              >
                -
              </button>
              <span className="mx-2">{cart?.quantity}</span>
              <button
                onClick={() => handleCartProductQuantityChange(cart?._id, 1, refetch)}
                className="border px-2 py-1 text-lg"
              >
                +
              </button>
            </div>

            {/* Total */}
            <div className="text-center md:text-left text-gray-800 font-semibold">
              ${cart?.totalPrice?.toFixed(2)}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleDeleteCart(cart?._id, refetch)}
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
              <span className="text-gray-800">${subTotalPrice?.toFixed(2)} USD</span>
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
