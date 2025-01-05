import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BDLocations } from 'react-bd-location';
import useAuth from "../hooks/useAuth";
import { productApi } from "../redux/apis/productApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { orderApi } from "../redux/apis/orderApi";


const OrderSingleProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data: productData } = productApi.useGetProductByIdQuery(id);
  const { loggedInUser } = useAuth();
  const [ cashOnDeliveryOrder ] = orderApi.useCashOnDeliveryOrderMutation();
  const [ createSslcommerzOrder ] = orderApi.useCreateSslcommerzOrderMutation();


  const product = productData?.data;

  const selectedPayment = watch("paymentMethod", "COD");

    // initially set color and size
    useEffect(() => {
      const firstColor = product?.colors?.length > 0 ? product?.colors[0]: "";
      setSelectedColor(firstColor);
      const firstSize = product?.sizes?.length > 0 ? product?.sizes[0] : "";
      setSelectedSize(firstSize);
      
    }, [product])


  const paymentOptions = [
     { value: "cash_on_delivery", option: "Cash on delivery"},
     { value: "sslcommerz", option:   "SSLCommerze"},
     { value: "bkash", option:   "Bkash"},
     { value: "nagad", option:   "Nagad"}
  ];
 
  const unitPrice = (product?.discountPrice && product?.discountPrice < product?.price ? product?.discountPrice : product?.price)
  const totalPrice =   quantity * unitPrice;
  const deliveryCharge = 100;
  const totalAmount = totalPrice + deliveryCharge;
  const products = [
    {
        product: product?._id,
        name: product?.name,
        quantity,
        size: selectedSize,
        color: selectedColor,
        price: unitPrice,
        totalPrice
    }
  ]

  // handle order
  const handleOrder = async(data) => {
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
      deliveryCharge,
      totalAmount,
      subtotal: totalPrice,
      paymentMethod: data?.paymentMethod,
      orderNotes: data?.orderNotes,
    };

    try{
      let res;
      if(selectedPayment === "cash_on_delivery"){
        res = await cashOnDeliveryOrder(orderData);
      } else if(selectedPayment === "sslcommerz"){
        res = await createSslcommerzOrder(orderData)
      }
        if(res?.data?.success){
            toast.success(res?.data?.message)
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

  // handel quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
        if(prevQuantity + change > product?.stock){
            toast.error(`The product stock limit is ${product?.stock}`);
            return prevQuantity;
        }
       return Math.max(1, prevQuantity + change)
    });
  };


  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Left Section: Form */}
      <div className="w-full  bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(handleOrder)}>
           <div className=" flex flex-col md:flex-row gap-4">
            
            {/* product details */}
           <div className=" flex-1">
            <h2 className=" text-xl font-semibold mb-4">Product details</h2>
            <div className=" flex gap-3">
                <img src={product?.images[0]} alt={product?.name} className=" w-32 h-28 lg:w-56 lg:h-48 " />
                <span>
                <p className=" font-semibold">{product?.name}</p>
                <p> Brand: {product?.brandName}</p>
                <p className=" flex gap-2">Price:  <span className=' flex items-center gap-2'>
                                  <p className={`  flex items-center ${ product?.discountPrice && product?.discountPrice < product?.price ? 'line-through text-gray-500':' text-black' }`}> <FaBangladeshiTakaSign className=' text-[14px]'/> {product?.price}</p>
                  <p className={` text-black flex items-center ${ product?.discountPrice && product?.discountPrice < product?.price ? 'block':' hidden' }`}> <FaBangladeshiTakaSign className=' text-[14px]'/> {product?.discountPrice}</p>
                 </span>
                 </p>
                 <p className=" flex items-center">Total price:  {`${quantity} * ${ unitPrice } = ${totalPrice}`} <FaBangladeshiTakaSign  className=" text-sm"/> </p>
                </span>                
            </div>

                    {/* Size Selector */}
         
       <div className="flex flex-wrap items-center gap-2 mt-2">
            <p className="text-sm sm:text-base">
              <strong>Size:</strong>
            </p>
              {product?.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
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
              {product?.colors?.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
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
                <p className=" font-semibold">Quantity: </p>
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

            <div>
               <p className=" flex items-center ">Dalivery charge : 100 <FaBangladeshiTakaSign className=" text-[14px]"/></p>
               <p className=" flex items-center">Total Payble amount: {`${totalPrice} + ${100} = ${totalAmount}`} <FaBangladeshiTakaSign className=" text-[14px]"/></p>
            </div>
           </div>

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
        
           </div>
      
    
        </form>
      </div>

    </div>
  );
};

export default OrderSingleProduct;
