import React from "react";
import { Link } from "react-router-dom";
import winter from "../assets/winter.jpg";
import DenimJacket from "../assets/DenimJacket.jpg";
import TNF from "../assets/TNF.jpg";
import gant from "../assets/gant.jpg"

const promoItems = [
  {
    id: 1,
    image: winter,
    discount: "30%off",
    title: "Best Winter Collection",
    button: "Shop Now",
    link: "/product",
  },
  {
    id: 2,
    image: gant,
    title: "Jacket",
    offer: "Weekend Offer",
    link: "/product",
  },
  {
    id: 3,
    image: DenimJacket,
    title: "Best DenimJacket Collection",
    offer: "Special Offer",
    link: "/product",
  },
  {
    id: 4,
    image: TNF,
    title: "The North Face",
    offer: "Limited Offer",
    link: "/product",
  },
  {
    id: 5,
    image: DenimJacket,
    discount: "50%off",
    title: "Boomber Jacket",
    button: "Shop Now",
    link: "/product",
  },
  {
    id: 6,
    image: winter,
    discount: "20%off",
    title: "Stylish Gant Jacket",
    button: "Shop Now",
    link: "/product",
  },
  {
    id: 7,
    image: TNF,
    discount: "20%off",
    title: "Prada Jacket",
    button: "Shop Now",
    link: "/product",
  },
];

const PromoSection = () => {
  return (
    <section className="p-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Large vertical card */}
        <div className="row-span-2 relative bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in">
          <Link to={promoItems[0].link}>
            <img
              src={promoItems[0].image}
              alt={promoItems[0].title}
              className="w-full h-full object-cover"
            />
            {/* Overlay content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
              <p className="text-red-500 text-sm mb-1">
                Save up to {promoItems[0].discount}
              </p>
              <h3 className="text-lg font-bold mb-2">{promoItems[0].title}</h3>
              <Link
                to={promoItems[0].link}
                className="mt-4 text-black py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600"
              >
                {promoItems[0].button}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </Link>
        </div>

        {/* Smaller horizontal cards */}
        {promoItems.slice(1).map((item, index) => (
          <div
            key={item.id}
            className={`relative bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in`}
            style={{ animationDelay: `${index * 0.2}s` }} // Staggered fade-in
          >
            <Link to={item.link}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              {/* Overlay content */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
                {item.offer && (
                  <p className="text-red-500 text-sm mb-1">{item.offer}</p>
                )}
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                {item.discount && (
                  <p className="text-gray-300 text-sm mb-2">
                    Save up to {item.discount}
                  </p>
                )}
                {item.button && (
                  <Link
                    to={item.link}
                    className="mt-4 text-white py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600"
                  >
                    {item.button}
                    <span className="ml-2">→</span>
                  </Link>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
