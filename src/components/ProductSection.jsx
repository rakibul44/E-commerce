import React from "react";
import { Link } from "react-router-dom";
import TNF from "../assets/TNF.jpg";
import gant from "../assets/gant.jpg";
// Sample Data for Products
const productData = [
  {
    category: "New Products",
    items: [
      {
        id: 1,
        image: TNF,
        title: "Chic Crop Top",
        price: "$9.50",
        oldPrice: "$10.00",
        rating: 4.5,
      },
      {
        id: 2,
        image: gant,
        title: "Crew Neck T-shirts",
        price: "$9.80",
        oldPrice: "$10.00",
        rating: 4.0,
      },
      {
        id: 3,
        image: TNF,
        title: "Chic Denim",
        price: "$5.94",
        oldPrice: "$6.00",
        rating: 4.2,
      },
    ],
  },
  {
    category: "Feature Product",
    items: [
      {
        id: 4,
        image: gant,
        title: "Classic Jacket",
        price: "$7.84",
        oldPrice: "$8.00",
        rating: 4.8,
      },
      {
        id: 5,
        image :TNF,
        title: "Versatile Shacket",
        price: "$7.70",
        oldPrice: "$10.00",
        rating: 4.3,
      },
      {
        id: 6,
        image: gant,
        title: "Black Joggers Pants",
        price: "$22.50",
        oldPrice: "$25.00",
        rating: 4.7,
      },
    ],
  },
  {
    category: "Best Deal",
    items: [
      {
        id: 4,
        image: TNF,
        title: "Classic Jacket",
        price: "$7.84",
        oldPrice: "$8.00",
        rating: 4.8,
      },
      {
        id: 5,
        image : gant,
        title: "Versatile Shacket",
        price: "$7.70",
        oldPrice: "$10.00",
        rating: 4.3,
      },
      {
        id: 6,
        image: TNF,
        title: "Black Joggers Pants",
        price: "$22.50",
        oldPrice: "$25.00",
        rating: 4.7,
      },
    ],
  },
  {
    category: "On Sell",
    items: [
      {
        id: 4,
        image: gant,
        title: "Classic Jacket",
        price: "$7.84",
        oldPrice: "$8.00",
        rating: 4.8,
      },
      {
        id: 5,
        image:TNF,
        title: "Versatile Shacket",
        price: "$7.70",
        oldPrice: "$10.00",
        rating: 4.3,
      },
      {
        id: 6,
        image: gant,
        title: "Black Joggers Pants",
        price: "$22.50",
        oldPrice: "$25.00",
        rating: 4.7,
      },
    ],
  },
  // More categories...
];

const ProductSection = () => {
  return (
    <section className="py-8 px-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productData.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-medium border-b border-gray-300 pb-2 mb-4">
              {category.category}
            </h2>
            <div className="space-y-6">
              {category.items.map((product) => (
                <div key={product.id} className="flex gap-6">
                  <Link
                    to={`/${product.title.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div>
                    <h3 className="text-lg font-medium">{product.title}</h3>
                    <div className="flex items-center space-x-2 text-lg">
                      <span className="text-orange-500 font-bold">
                        {product.price}
                      </span>
                      <span className="line-through text-gray-500">
                        {product.oldPrice}
                      </span>
                    </div>
                    <div className="text-yellow-500">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to={`/${category.category.toLowerCase().replace(/ /g, "-")}`}
              className="block mt-4 text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-lg"
            >
              View More
              <span className="ml-2">→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
