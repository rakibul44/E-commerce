import { useState } from "react";
import { Link } from "react-router-dom";

// Sample Order Data
const orders = [
  { id: 1, orderId: "#354", date: "Feb 05, 2021", status: "Completed", amount: "$757" },
  { id: 2, orderId: "#355", date: "Feb 06, 2021", status: "Pending", amount: "$480" },
  { id: 3, orderId: "#356", date: "Feb 07, 2021", status: "Completed", amount: "$1,200" },
  { id: 4, orderId: "#357", date: "Feb 08, 2021", status: "Cancelled", amount: "$320" },
  { id: 5, orderId: "#358", date: "Feb 09, 2021", status: "Completed", amount: "$2,100" },
  { id: 6, orderId: "#359", date: "Feb 10, 2021", status: "Completed", amount: "$980" },
  { id: 7, orderId: "#360", date: "Feb 11, 2021", status: "Pending", amount: "$400" },
  { id: 8, orderId: "#361", date: "Feb 12, 2021", status: "Completed", amount: "$600" },
  { id: 9, orderId: "#362", date: "Feb 13, 2021", status: "Completed", amount: "$350" },
  { id: 10, orderId: "#363", date: "Feb 14, 2021", status: "Cancelled", amount: "$150" },
];

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const ordersPerPage = 7; // Number of orders per page

  // Calculate indexes for slicing the data
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          {/* Table Header */}
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 text-gray-600">Order</th>
              <th className="text-left p-3 text-gray-600">Date</th>
              <th className="text-left p-3 text-gray-600">Status</th>
              <th className="text-left p-3 text-gray-600">Amount</th>
              <th className="text-left p-3 text-gray-600">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-700">{order.orderId}</td>
                <td className="p-3 text-gray-700">{order.date}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{order.amount}</td>
                <td className="p-3">
                  <Link
                    to="#"
                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
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

export default OrderList;
