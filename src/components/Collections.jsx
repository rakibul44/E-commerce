import React from "react";
import { Link } from "react-router-dom";
import woman from "../assets/woman.jpg";
import man from "../assets/man.jpg";


const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "Women's collection",
      subtitle: "Save up to 50% off",
      buttonText: "SHOP NOW",
      image: woman, // Replace with actual image URL
    },
    {
      id: 2,
      title: "Men's collection",
      subtitle: "Save up to 50% off",
      buttonText: "SHOP NOW",
      image:man, // Replace with actual image URL
    },
  ];

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="relative bg-gray-100 rounded-lg overflow-hidden group"
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-50 object-cover sm:h-auto"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6 bg-white/20 group-hover:bg-white/50 transition">
                <p className="text-orange-500 text-lg font-semibold">
                  {collection.subtitle}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {collection.title}
                </h2>
                <Link to='/product'>
                <button className="flex items-center bg-orange-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-orange-600 transition">
                  {collection.buttonText}
                  <span className="ml-2">→</span>
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections; 
