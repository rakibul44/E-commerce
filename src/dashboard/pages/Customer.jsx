import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample data for customers
const customers = [
  {
    id: 1,
    name: "Patricia Semklo",
    email: "patricia.semklo@app.com",
    location: "London, UK",
    country: "GB",
    orders: 24,
    lastOrder: "#123567",
    totalSpent: "$2,890.66",
    refunds: "-",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Dominik Lamakani",
    email: "dominik.lamakani@gmail.com",
    location: "Dortmund, DE",
    country: "DE",
    orders: 77,
    lastOrder: "#779912",
    totalSpent: "$14,767.04",
    refunds: "4",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Ivan Mesaros",
    email: "imivanmes@gmail.com",
    location: "Paris, FR",
    country: "FR",
    orders: 44,
    lastOrder: "#889924",
    totalSpent: "$4,996.00",
    refunds: "1",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Maria Martinez",
    email: "martinezhome@gmail.com",
    location: "Bologna, IT",
    country: "IT",
    orders: 29,
    lastOrder: "#897726",
    totalSpent: "$3,220.66",
    refunds: "2",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 5,
    name: "Vicky Jung",
    email: "itsvicky@contact.com",
    location: "London, UK",
    country: "GB",
    orders: 22,
    lastOrder: "#123567",
    totalSpent: "$2,890.66",
    refunds: "-",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 6,
    name: "John Doe",
    email: "johndoe@example.com",
    location: "New York, US",
    country: "US",
    orders: 15,
    lastOrder: "#989812",
    totalSpent: "$1,200.00",
    refunds: "3",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 7,
    name: "Jane Smith",
    email: "janesmith@example.com",
    location: "Berlin, DE",
    country: "DE",
    orders: 34,
    lastOrder: "#889912",
    totalSpent: "$7,100.50",
    refunds: "0",
    image: "https://via.placeholder.com/40",
  },
];

const PAGE_SIZE = 5;

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(customers.length / PAGE_SIZE);

  // Get customers for the current page
  const currentCustomers = customers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Navigate to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-lg font-semibold my-4">
        All Customers <span className="text-gray-500">{customers.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left">ORDER</th>
              <th className="py-3 px-4 text-left">EMAIL</th>
              <th className="py-3 px-4 text-left">LOCATION</th>
              <th className="py-3 px-4 text-center">ORDERS</th>
              <th className="py-3 px-4 text-center">LAST ORDER</th>
              <th className="py-3 px-4 text-right">TOTAL SPENT</th>
              <th className="py-3 px-4 text-center">REFUNDS</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <Link to="#" className="font-semibold text-gray-800 hover:underline">
                    {customer.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{customer.email}</td>
                <td className="py-3 px-4">
                  <span className="uppercase font-medium">{customer.country}</span>{" "}
                  {customer.location}
                </td>
                <td className="py-3 px-4 text-center">{customer.orders}</td>
                <td className="py-3 px-4 text-center text-blue-500 hover:underline">
                  <Link to="#">{customer.lastOrder}</Link>
                </td>
                <td className="py-3 px-4 text-right text-green-500 font-semibold">
                  {customer.totalSpent}
                </td>
                <td className="py-3 px-4 text-center">{customer.refunds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customer;
