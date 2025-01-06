import { useState } from "react";
import { useForm } from "react-hook-form";
import { BDLocations } from 'react-bd-location';
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { cartsApi } from "../redux/apis/cartsApi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { orderApi } from "../redux/apis/orderApi";
import { Link } from "react-router-dom";


const Payment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const { loggedInUser } = useAuth();
  const { data: cartsData, refetch: refetchCarts} = cartsApi.useGetAllCartsByUserIdQuery(loggedInUser?._id);
  const carts = cartsData?.data?.result || [];
  const subTotalPrice = cartsData?.data?.subTotalPrice;
  const [ cashOnDeliveryOrder ] = orderApi.useCashOnDeliveryOrderMutation();
  const [ createSslcommerzOrder ] = orderApi.useCreateSslcommerzOrderMutation();

  const selectedPayment = watch("paymentMethod", "COD");
  const paymentOptions = [
    { value: "cash_on_delivery", option: "Cash on delivery"},
    { value: "sslcommerz", option: "SSLCommerze"},
    { value: "bkash", option: "Bkash"},
    { value: "nagad", option: "Nagad"}
 ];


 if (carts?.length === 0) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <p className="text-lg font-medium text-gray-700">
        Your cart is empty. Start adding some amazing products!
      </p>
      <Link
        className="bg-btnbg hover:bg-btnbghover text-white px-4 py-2 rounded-md shadow-md transition-all duration-200"
        to="/product"
      >
        Browse Products
      </Link>
    </div>
  );
}



 console.log("selectedPayment: " , selectedPayment)


  const deliveryCharge = 100;
  const totalAmount = subTotalPrice + deliveryCharge;

  const products = carts?.map((cart) => {
    return {
      product: cart?.productId,
      name: cart?.productName,
      quantity: cart?.quantity,
      size: cart?.size,
      color: cart?.color,
      price: cart?.price,
      totalPrice: cart?.totalPrice,
    };
  });


  // handle order
  const handleOrder = async(data) => {
    console.log(data);
    const orderData = {
      client: loggedInUser?._id,
      clientName: data?.fullName,
      clientPhone: data?.clientPhone,
      clientEmail: loggedInUser?.email,
      products: products,
      address: data?.address,
      shippingAddress: {
        division,
        district,
        upazila,
      },
      subtotal: subTotalPrice,
      deliveryCharge,
      totalAmount,
      paymentMethod: data?.paymentMethod,
      orderNotes: data?.orderNotes,
    };

    try{
        let res;
        if(selectedPayment === "cash_on_delivery"){
          res = await cashOnDeliveryOrder(orderData);
        } else if(selectedPayment === "sslcommerz"){
          res = await createSslcommerzOrder(orderData);
        }
        console.log("api response: ", res)
        if(res?.data?.success){
            toast.success(res?.data?.message);
            refetchCarts();
            reset();
        }
    } catch(error){
        console.log(error)
    }
    console.log("order data: ", orderData);
  };



    // Handle location change
    const handleLocationChange = (location) => {
      console.log(location)
      if(location.id){
        setDivision(location?.name)
      }
     if(location.division_id){
      setDistrict(location?.name)
     }
     setUpazila(location?.name)
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Left Section: Form */}
      <div className="w-full lg:w-[60%] bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(handleOrder)}>
             {/* contact details */}
             <div className=" flex-1">
            <h2 className="text-2xl font-semibold mb-6">Contact Details</h2>


        {/* Full Name Field */}
          <input
            type="text"
            {...register("fullName", { required: true })}
            placeholder="Full name"
            defaultValue={loggedInUser?.name}
            className="border w-full p-2 rounded mt-4 mr-6"
          />
          {errors.fullName && <p className="text-red-500 text-sm">Full name is required.</p>}

          {/* Email Field */}
          <input
            type="email"
            {...register("email")}
            disabled 
            value={loggedInUser?.email}
            className="w-full border p-2 rounded mt-4"
          />

          {/* Phone number Field */}
          <input
            type="number"
            {...register("clientPhone", { required: true })}
            placeholder="Enter your phone number"
            className="border w-full p-2 rounded mt-4 mr-6"
          />
          {errors.clientPhone && <p className="text-red-500 text-sm">Phone number is required.</p>}



         {/* address selectior */}
          <div className=" my-3">
          <h1> Select Your Address</h1>
          <BDLocations onChange={handleLocationChange} bn={false} showLable={false} className =" my-2"/>
        </div>
        
          {/* Address Field */}
          <input
            type="text"
            {...register("address", { required: true })}
            placeholder="Full Address"
            className="w-full border p-2 rounded mb-6"
          />
          {errors.address && <p className="text-red-500 text-sm">Address is required.</p>}
 
          {/* Save Info Checkbox */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              {...register("saveInfo")}
              id="saveInfo"
              className="w-4 h-4"
            />
            <label htmlFor="saveInfo" className="text-sm">
              Save this information for next time
            </label>
          </div>

          <h2 className="text-2xl font-semibold mt-6">Payment Methods</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {paymentOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:shadow-md"
              >
                <input
                  type="radio"
                  {...register("paymentMethod", {required: true})}
                  value={option?.value}
                  defaultChecked={selectedPayment === option?.option}
                  className="w-4 h-4"
                />
                <span className="text-sm">{option?.option}</span>
              </label>
            ))}
         {errors.paymentMethod && <p className="text-red-500 text-sm">Payment method is required.</p>}

          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-orange-600 text-white py-3 px-4 w-full text-center rounded hover:bg-orange-700"
            >
              Proceed to Confirmation
            </button>
          </div>
           </div>
        </form>
      </div>

      {/* Right Section: Cart Summary */}
      <div className="w-full lg:w-[40%] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        {carts?.map((item) => (
          <div key={item._id} className="flex items-center gap-4 mb-6">
            <img
              src={item?.images[0]}
              alt={item?.productName}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{item?.productName}</h3>
              <p className="text-sm text-gray-500">
                size: {item?.size} / color: {item?.color}
              </p>
            </div>
            <span>
            <p> {item?.quantity} * {item?.price} </p>
            <p className="font-medium text-lg flex gap-1 items-center">  <FaBangladeshiTakaSign className=" text-sm"/> {item?.totalPrice}</p>
            </span>
          </div>
        ))}

        <div className="border-t pt-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-medium flex gap-1 items-center">
              <FaBangladeshiTakaSign className=" text-sm"/>{subTotalPrice}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Delivery Charge</span>
            <span className="text-gray-800 font-medium flex gap-1 items-center">
              <FaBangladeshiTakaSign className=" text-sm"/>{100}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className=" flex items-center gap-1">
              <FaBangladeshiTakaSign className=" text-sm"/>{totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
