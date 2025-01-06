import React, { useState } from "react";
import { MdPreview } from "react-icons/md";

const orders = [
  // Sample data from before
  {
    id: 1,
    orderId: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "৳757",
    totalPrice: "৳3,785",
    productImage: "https://via.placeholder.com/100",
    productSize: "Medium",
    productColor: "Red",
    productId: "#P123",
    quantity: "5",
    price: "৳150",
    productName: "TNF Jacket",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+8801234567890",
  },
  {
    id: 2,
    orderId: "#355",
    date: "Feb 06, 2021",
    status: "Shipped",
    amount: "৳480",
    totalPrice: "৳2,400",
    productImage: "https://via.placeholder.com/100",
    productSize: "Large",
    productColor: "Blue",
    productId: "#P124",
    quantity: "4",
    price: "৳200",
    productName: "Winter Coat",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+8809876543210",
  },
  {
    id: 3,
    orderId: "#356",
    date: "Feb 07, 2021",
    status: "Completed",
    amount: "৳1,200",
    totalPrice: "৳6,000",
    productImage: "https://via.placeholder.com/100",
    productSize: "Small",
    productColor: "Green",
    productId: "#P125",
    quantity: "10",
    price: "৳600",
    productName: "Running Shoes",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    customerPhone: "+8801122334455",
  },
];

const ShippedOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7;

  // Filter shipped orders
  const shippedOrders = orders.filter((order) => order.status === "Shipped");

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = shippedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Shipped Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 text-gray-600">Order</th>
              <th className="text-left p-3 text-gray-600">Date</th>
              <th className="text-left p-3 text-gray-600">Status</th>
              <th className="text-left p-3 text-gray-600">Amount</th>
              <th className="text-left p-3 text-gray-600">Customer Details</th>
              <th className="text-left p-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-700">{order.orderId}</td>
                <td className="p-3 text-gray-700">{order.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{order.amount}</td>
                <td className="p-3 text-gray-700">
                  <p>{order.customerName}</p>
                  <p>{order.customerEmail}</p>
                  <p>{order.customerPhone}</p>
                </td>
                <td className="p-3">
                  <button
                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                  >
                    <MdPreview />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(shippedOrders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShippedOrders;
