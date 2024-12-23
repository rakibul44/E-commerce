import React, { useState } from "react";
import { Link } from "react-router-dom";
import denim from "../assets/denim.jpg";

const Payment = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [formError, setFormError] = useState(false);

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

  const formFields = [
    {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "Email or mobile phone number",
      className: "w-full border p-2 rounded mb-6",
      required: true,
    },
    {
      id: "firstName",
      type: "text",
      name: "firstName",
      placeholder: "First name",
      className: "border w-full p-2 rounded mb-6 mr-6",
      required: true,
    },
    {
      id: "lastName",
      type: "text",
      name: "lastName",
      placeholder: "Last name",
      className: "border w-full p-2 rounded mb-6",
      required: true,
    },
    {
      id: "address",
      type: "text",
      name: "address",
      placeholder: "Address",
      className: "w-full border p-2 rounded mb-6",
      required: true,
    },
    {
      id: "apartment",
      type: "text",
      name: "Size",
      placeholder: "size : S, M, etc.",
      className: "w-full border p-2 rounded mb-6",
      required: false,
    },
    {
      id: "state",
      type: "select",
      name: "District",
      options: [
        { value: "", label: "District" },
        { value: "CA", label: "California" },
        { value: "NY", label: "New York" },
      ],
      className: "border p-2 rounded mb-6",
      required: true,
    },
    {
      id: "city",
      type: "text",
      name: "Thana",
      placeholder: "Thana",
      className: "w-full border p-2 rounded mb-6",
      required: true,
    },
    {
      id: "zip",
      type: "text",
      name: "zip",
      placeholder: "ZIP code",
      className: "w-full border p-2 rounded mb-6",
      required: true,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormComplete = formFields.every(
      (field) => !field.required || formData[field.name]?.trim()
    );
    if (isFormComplete) {
      setFormError(false);
      // Navigate to the confirmation page
      window.location.href = "/confirmation";
    } else {
      setFormError(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Left Section: Form */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        {formFields.map((field) => {
          if (field.type === "select") {
            return (
              <select
                key={field.id}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className={`${field.className} w-full`}
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }
          return (
            <input
              key={field.id}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className={field.className}
              required={field.required}
            />
          );
        })}

        {formError && (
          <p className="text-red-500 text-sm mb-4">You need to fill up all the fields.</p>
        )}

        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="saveInfo" className="w-4 h-4" />
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
                name="payment"
                value={option}
                checked={selectedPayment === option}
                onChange={() => setSelectedPayment(option)}
                className="w-4 h-4"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-orange-600 text-white py-3 px-4 w-full text-center rounded hover:bg-orange-700"
          >
            Proceed to Confirmation
          </button>
        </div>
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
            <span className="text-gray-800 font-medium">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;