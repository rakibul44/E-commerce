import React from "react";
import { FaShippingFast, FaUndoAlt, FaLock, FaPercent } from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaShippingFast size={25} />,
      title: "Free shipping",
      description: "on all orders over $49.00",
    },
    {
      id: 2,
      icon: <FaUndoAlt size={25} />,
      title: "15 days returns",
      description: "moneyback guarantee",
    },
    {
      id: 3,
      icon: <FaLock size={25} />,
      title: "Secure checkout",
      description: "100% protected by Paypal",
    },
    {
      id: 4,
      icon: <FaPercent size={25} />,
      title: "100% free warranty",
      description: "moneyback guarantee",
    },
  ];

  return (
    <section className="py-10 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col items-center justify-center p-6 bg-white opacity-90 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="text-gray-700 mb-4 ">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 transition duration-300 hover:text-blue-600">
                {benefit.title}
              </h3>
              <p className="text-gray-500 transition duration-300 hover:text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
