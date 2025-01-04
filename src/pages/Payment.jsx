import { useState } from "react";
import { useForm } from "react-hook-form";
import denim from "../assets/denim.jpg";
import { BDLocations } from 'react-bd-location';
import useAuth from "../hooks/useAuth";


const Payment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const { loggedInUser } = useAuth()

  const selectedPayment = watch("payment", "COD");
  const cartItems = [
    {
      id: 1,
      name: "Denim Regular Fit Shorts",
      price: 15.0,
      size: "Size : S",
      color: "Color : Outer Space",
      image: denim, // Replace with your image URL
    },
  ];

  const paymentOptions = [
    "PayPal",
    "Bank Transfer",
    "Bkash",
    "PhonePe",
    "Rocket",
    "Nagad",
  ];


  const products = []

  // handle order
  const handleOrder = async(data) => {
    console.log(data);
    const orderData = {
      client: loggedInUser?._id,
      clientName: data?.name,
      clientPhone: data?.phone,
      clientEmail: loggedInUser?.email,
      products: products,
      address: data?.address,
      shippingAddress: {
        division,
        district,
        upazila,
      },
      shippingCost: 20,
      paymentMethod: data?.paymentMethod,
      orderNotes: data?.orderNotes,
    };

  

    console.log(orderData);
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
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <form onSubmit={handleSubmit(handleOrder)}>
          {/* Email Field */}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email or mobile phone number"
            className="w-full border p-2 rounded mb-6"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}

          {/* Full Name Field */}
          <input
            type="text"
            {...register("fullName", { required: true })}
            placeholder="Full name"
            className="border w-full p-2 rounded mb-6 mr-6"
          />
          {errors.fullName && <p className="text-red-500 text-sm">Full name is required.</p>}


         {/* address selectior */}
          <div className=" my-3">
          <h1> Select Your Address</h1>
          <BDLocations onChange={handleLocationChange} bn={false} className =""/>
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

          <h2 className="text-2xl font-semibold mt-6">Payment Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {paymentOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:shadow-md"
              >
                <input
                  type="radio"
                  {...register("payment")}
                  value={option}
                  defaultChecked={selectedPayment === option}
                  className="w-4 h-4"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-orange-600 text-white py-3 px-4 w-full text-center rounded hover:bg-orange-700"
            >
              Proceed to Confirmation
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: Cart Summary */}
      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.size} / {item.color}
              </p>
            </div>
            <p className="font-medium text-lg">${item.price.toFixed(2)}</p>
          </div>
        ))}

        <div className="border-t pt-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-medium">
              ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>
              ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
