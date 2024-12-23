import React from "react";
import { Link } from "react-router-dom";
import { FaCcMastercard } from "react-icons/fa";

// Updated payment methods with React icon components
const paymentMethods = [
  {
    id: 1,
    icon: <FaCcMastercard size={40} />, // Adjust size for better responsiveness
    name: "Datch Bangla Bank Ltd",
    card: "**********5535",
    status: "Verified",
  },
  {
    id: 2,
    icon: <FaCcMastercard size={40} />,
    name: "Datch Bangla Bank Ltd",
    card: "**********5535",
    status: "Verified",
  },
  {
    id: 3,
    icon: <FaCcMastercard size={40} />,
    name: "Datch Bangla Bank Ltd",
    card: "**********5535",
    status: "Verified",
  },
];

const PaymentMethod = () => {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Payment Methods
      </h1>

      {/* Payment Method List */}
      <div className="bg-white rounded-lg shadow">
        {paymentMethods.map((method, index) => (
          <div
            key={method.id}
            className={`flex flex-col sm:flex-row items-center justify-between p-4 ${
              index !== paymentMethods.length - 1 && "border-b"
            }`}
          >
            {/* Logo and Details */}
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-4 sm:mb-0">
              {/* Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4 flex items-center justify-center bg-yellow-400 shrink-0">
                {method.icon} {/* React Icon Component */}
              </div>

              {/* Bank Details */}
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-bold break-words">{method.name}</h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Bank {method.card}
                </p>
                <span className="text-green-500 text-sm">{method.status}</span>
              </div>
            </div>

            {/* Manage Button */}
            <button className="bg-orange-500 text-black px-4 py-2 w-full sm:w-auto rounded hover:bg-orange-700 transition">
              Manage
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="#"
          className="bg-orange-500 text-white px-6 py-2 rounded w-full sm:w-auto text-center hover:bg-orange-800 transition"
        >
          Add Card
        </Link>
        <Link
          to="#"
          className="border-2 border-black text-black px-6 py-2 rounded w-full sm:w-auto text-center hover:bg-orange-200 transition"
        >
          Add Bank
        </Link>
      </div>
    </div>
  );
};

export default PaymentMethod;
