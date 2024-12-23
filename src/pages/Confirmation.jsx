import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center text-green-600 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Thank you for your order. We’ve received your details and will
          begin processing your order shortly. You’ll receive an email
          confirmation soon.
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Number:</span>
            <span className="text-gray-800 font-medium">#123456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-gray-800 font-medium">$15.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Method:</span>
            <span className="text-gray-800 font-medium">Standard Shipping</span>
          </div>
        </div>

        <Link
          to="/"
          className="block bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
