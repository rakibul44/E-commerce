import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { BiCartAdd } from 'react-icons/bi';
import { GiSelfLove } from 'react-icons/gi';
import { GrGallery } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5'; // Close Icon
import { productApi } from '../redux/apis/productApi';
import { TbCurrencyTaka } from "react-icons/tb";
import useFunc from '../hooks/useFunc';


const DenimCollection = () => {
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useFunc();
  const { data: productData } = productApi.useGetDenimCollectionsQuery();
  const swiperRef = useRef(null); 

  const products = productData?.data || [];

    // initially set color and size
    useEffect(() => {
      const firstColor = modalProduct?.colors?.length > 0 ? modalProduct?.colors[0]: "";
      setSelectedColor(firstColor);
      const firstSize = modalProduct?.sizes?.length > 0 ? modalProduct?.sizes[0] : "";
      setSelectedSize(firstSize);
      
    }, [modalProduct])
  
  const handleOpen = (product) => {
    setModalProduct(product);
    setOpen(!open);
    setSelectedSize(null); // Reset selected size when modal opens
  };

  const handleQuantityChange = (value) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + value, 1));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size); // Set the selected size
  };

  
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };


  // handle add to cart 
  const handleAddToCartFunc =  (product) => {
    console.log("hitt")

    const price = product?.discountPrice && product?.discountPrice < product?.price ? product?.discountPrice : product?.price 
    const size = selectedSize?.length > 0 ? selectedSize : product?.sizes[0];
    const color = selectedColor?.length > 0 ? selectedColor : product?.colors[0];

    const cartInfo = { 
      product:product?._id, 
      price, 
      quantity,
      size,
      color
    }
    handleAddToCart(cartInfo)
  }
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-6 bg-gray-50">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col  items-center text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Denim Collection</h2>
        <p className="text-gray-700 mb-6">
          Discover the collection of denim - Shop top designers and SaleHub
          design! Get personalized size recommendations with SaleHub fit
          assistant.
        </p>
        <Link to="/product">
          <button className="text-sm font-bold text-white py-2 px-6 rounded bg-orange-500 hover:bg-orange-600">
            View All Collection
            <span className="ml-2">→</span>
          </button>
        </Link>
      </div>

      {/* Right Section - Swiper Slider */}
      <div 
      className="w-full cursor-pointer lg:w-1/2"
      onMouseEnter={() => swiperRef.current?.autoplay.stop()} // Stop autoplay on hover
      onMouseLeave={() => swiperRef.current?.autoplay.start()} // Resume autoplay on leave
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={3}
          spaceBetween={15}
          grabCursor={true}
          pagination={{ clickable: true }}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1 },
            390: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product?._id}>
              <div className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-between h-full w-full p-1">
                <div className="relative group w-full">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button onClick={() => handleAddToCartFunc(product)}>
                      <div className="text-white text-2xl p-2 bg-gray-800 rounded-full hover:bg-gray-600">
                        <BiCartAdd />
                      </div>
                    </button >
                    <Link to="/wishlist">
                      <div className="text-white text-2xl p-2 bg-gray-800 rounded-full hover:bg-gray-600">
                        <GiSelfLove />
                      </div>
                    </Link>
                    <button
                      onClick={() => handleOpen(product)}
                      className="text-white text-2xl p-2 bg-gray-800 rounded-full hover:bg-gray-600"
                    >
                      <GrGallery />
                    </button>
                  </div>
                </div>
                <div className="text-center mt-4 flex-grow flex flex-col justify-between">
                  <h3 className="text-lg font-medium">{product?.name}</h3>
                  <p className="text-gray-600">{product?.reviews}</p>
                  <span className=' flex items-center gap-2'>
                  <p className={`text-xl font-semibold  flex items-center ${ product?.discountPrice && product?.discountPrice < product?.price ? 'line-through text-gray-500':' text-black' }`}> <TbCurrencyTaka className=' text-[16px]'/> {product?.price}</p>
                  <p className={`text-xl font-semibold text-black flex items-center ${ product?.discountPrice && product?.discountPrice < product?.price ? 'block':' hidden' }`}> <TbCurrencyTaka className=' text-[16px]'/> {product?.discountPrice}</p>
                  </span>
                </div>
      
                  <button 
                    onClick={() => handleAddToCartFunc(product)}
                    className="mt-4 text-sm font-bold text-white py-2 px-6 rounded bg-orange-500 hover:bg-orange-600">
                    Add to Cart
                  </button>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {modalProduct && (
        <Dialog open={open} handler={() => setOpen(false)} size="lg">
          <DialogBody className="flex flex-col lg:flex-row gap-6 relative">
            {/* Close Icon */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-black text-2xl"
            >
              <IoClose />
            </button>

            {/* Left Section: Product Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={modalProduct?.image}
                alt={modalProduct?.name}
                className="rounded-lg w-full md:h-[450px]"
              />
            </div>

            {/* Right Section: Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-2xl font-bold">{modalProduct?.name}</h2>
              <p>
                <strong>Availability: </strong>
                <span className="text-green-500">{'in-stock'}</span>
              </p>
              
              <span className=' flex items-center gap-2'>
                  price: {" "}
                  <p className={` font-semibold  flex items-center ${ modalProduct?.discountPrice && modalProduct?.discountPrice < modalProduct?.price ? 'line-through text-gray-500':' text-black' }`}> <TbCurrencyTaka className=' text-[16px]'/> {modalProduct?.price}</p>
                  <p className={` font-semibold text-black flex items-center ${ modalProduct?.discountPrice && modalProduct?.discountPrice < modalProduct?.price ? 'block':' hidden' }`}> <TbCurrencyTaka className=' text-[16px]'/> {modalProduct?.discountPrice}</p>
              </span>
        
  
              <p className="text-gray-600">{modalProduct?.description}</p>
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
                  className="px-3 py-1 border rounded-md"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 border rounded-md"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-4">
                  <button
                  onClick={() => {
                   handleAddToCartFunc(modalProduct)
                   setModalProduct(null);
                 }}                
                 className="w-full py-2 px-6 bg-gray-300 rounded-md hover:bg-gray-400"
                 >
                    Add to Cart
                  </button>
         
                <Link
                    to="/payment"
                    className="bg-btnbg text-white py-2 px-6 mt-2 w-full text-center rounded-md hover:bg-btnbghover block"
                  > 
                  Buy now
                  </Link>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )}
    </div>
  );
};

export default DenimCollection;