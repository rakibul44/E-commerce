import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const addresses = [
  {
    id: 1,
    name: "Shuvo Khan",
    email: "rafiqulislamsuvobd@gmail.com",
    phone: "01792166627",
    country: "Dhaka, Bangladesh",
    state: "Barishal",
    postcode: "12345",
    city: "Banaripara",
  },
  {
    id: 2,
    name: "Shuvo Khan",
    email: "rafiqulislamsuvobd@gmail.com",
    phone: "01792166627",
    country: "Dhaka, Bangladesh",
    state: "Barishal",
    postcode: "12345",
    city: "Banaripara",
  },
];

const Address = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    postcode: "",
    city: "",
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setShowModal(false); // Close the modal after submission
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white shadow rounded-lg p-6 relative"
          >
            {/* Delete Button */}
            <Link
              to={`/delete-address/${address.id}`}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <span><MdDeleteForever size={25} /></span>
            </Link>

            {/* Address Details */}
            <h2 className="text-lg font-bold mb-2">Address #{address.id}</h2>
            <p className="text-sm text-gray-700">
              <strong>Name:</strong> {address.name}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {address.email}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> {address.phone}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Country:</strong> {address.country}
            </p>
            <p className="text-sm text-gray-700">
              <strong>State:</strong> {address.state}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Postcode:</strong> {address.postcode}
            </p>
            <p className="text-sm text-gray-700">
              <strong>City:</strong> {address.city}
            </p>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-700 transition inline-block"
        >
          Add New Address
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
