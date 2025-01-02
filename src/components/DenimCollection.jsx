import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { BiCartAdd } from 'react-icons/bi';
import { GiSelfLove } from 'react-icons/gi';
import { GrGallery } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5'; // Close Icon
import TNF from '../assets/TNF.jpg';

const products = [
  {
    id: 1,
    image: TNF,
    title: 'The North Face',
    price: '$39.00',
    reviews: '★★★★★',
    availability: 'In Stock',
    sku: 'YX159-54',
    collections: [
      'Best Sellers',
      'Featured Products',
      'New Arrivals',
      'On Sale',
      'Women',
    ],
    tags: ['Accessories', 'Men', 'Tomford', 'Trousers', "Women's"],
    description:
      "Captivate with this shirt's versatile urban look that works as well at happy hour as it does in the back yard.",
    sizes: ['M', 'L', 'XL', 'S'],
    colors: ['#708090', '#f5f5f5', '#ffb6c1', '#ff1493', '#000000', '#87ceeb'],
  },
  {
    id: 2,
    image: TNF,
    title: 'The North Face',
    price: '$39.00',
    reviews: '★★★★★',
    availability: 'In Stock',
    sku: 'YX159-54',
    collections: [
      'Best Sellers',
      'Featured Products',
      'New Arrivals',
      'On Sale',
      'Women',
    ],
    tags: ['Accessories', 'Men', 'Tomford', 'Trousers', "Women's"],
    description:
      "Captivate with this shirt's versatile urban look that works as well at happy hour as it does in the back yard.",
    sizes: ['M', 'L', 'XL', 'S'],
    colors: ['#708090', '#f5f5f5', '#ffb6c1', '#ff1493', '#000000', '#87ceeb'],
  },
  {
    id: 3,
    image: TNF,
    title: 'The North Face',
    price: '$39.00',
    reviews: '★★★★★',
    availability: 'In Stock',
    sku: 'YX159-54',
    collections: [
      'Best Sellers',
      'Featured Products',
      'New Arrivals',
      'On Sale',
      'Women',
    ],
    tags: ['Accessories', 'Men', 'Tomford', 'Trousers', "Women's"],
    description:
      "Captivate with this shirt's versatile urban look that works as well at happy hour as it does in the back yard.",
    sizes: ['M', 'L', 'XL', 'S'],
    colors: ['#708090', '#f5f5f5', '#ffb6c1', '#ff1493', '#000000', '#87ceeb'],
  },
  {
    id: 4,
    image: TNF,
    title: 'The North Face',
    price: '$39.00',
    reviews: '★★★★★',
    availability: 'In Stock',
    sku: 'YX159-54',
    collections: [
      'Best Sellers',
      'Featured Products',
      'New Arrivals',
      'On Sale',
      'Women',
    ],
    tags: ['Accessories', 'Men', 'Tomford', 'Trousers', "Women's"],
    description:
      "Captivate with this shirt's versatile urban look that works as well at happy hour as it does in the back yard.",
    sizes: ['M', 'L', 'XL', 'S'],
    colors: ['#708090', '#f5f5f5', '#ffb6c1', '#ff1493', '#000000', '#87ceeb'],
  },
  // Additional products can go here...
];

const DenimCollection = () => {
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size

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
      <div className="w-full cursor-pointer lg:w-1/2">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
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
            <SwiperSlide key={product.id}>
              <div className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-between min-h-[400px] p-2">
                <div className="relative group w-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                    <Link to="/add-to-cart">
                      <div className="text-white text-2xl p-2 bg-gray-800 rounded-full hover:bg-gray-600">
                        <BiCartAdd />
                      </div>
                    </Link>
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
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-gray-600">{product.reviews}</p>
                  <p className="text-xl font-semibold text-black">{product.price}</p>
                </div>
                <Link to="/add-to-cart">
                  <button className="mt-4 text-sm font-bold text-white py-2 px-6 rounded bg-orange-500 hover:bg-orange-600">
                    Add to Cart
                  </button>
                </Link>
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
                src={modalProduct.image}
                alt={modalProduct.title}
                className="rounded-lg w-full h-auto"
              />
            </div>

            {/* Right Section: Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-2xl font-bold">{modalProduct.title}</h2>
              <p>
                <strong>Availability :</strong>{' '}
                <span className="text-green-500">{modalProduct.availability}</span>
              </p>
              <p>
                <strong>SKU :</strong> {modalProduct.sku}
              </p>
              <p>
                <strong>Collections :</strong> {modalProduct.collections.join(', ')}
              </p>
              <p>
                <strong>Tags :</strong> {modalProduct.tags.join(', ')}
              </p>
              <p className="text-gray-600">{modalProduct.description}</p>
              {/* Color code  */}
              <p>
                <strong>Color:</strong> {modalProduct.colors[0]}
              </p>
              <div className="flex items-center gap-2">
                {modalProduct.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              <p>
                <strong>Size :</strong>
              </p>
              <div className="flex items-center gap-2">
                {modalProduct.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeSelect(size)} // Update size on click
                    className={`px-3 py-1 border rounded-md hover:bg-gray-200 ${
                      selectedSize === size ? 'bg-gray-300' : ''
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
                <Link to="/add-to-cart">
                  <button className="w-full py-2 px-6 bg-gray-300 rounded-md hover:bg-gray-400">
                    Add to Bag
                  </button>
                </Link>
                <Link
                    to="/payment"
                    className="bg-orange-600 text-white py-2 px-6 mt-2 w-full text-center rounded-md hover:bg-orange-700 block"
                  > 
                  Online Pay
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