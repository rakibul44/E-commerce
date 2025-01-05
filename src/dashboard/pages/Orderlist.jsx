import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdPreview } from "react-icons/md";

// Sample Order Data with Product Image, Size, Customer Details (Name, Email, and Phone Number)
const orders = [
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
    status: "Pending",
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
  {
    id: 4,
    orderId: "#357",
    date: "Feb 08, 2021",
    status: "Completed",
    amount: "৳650",
    totalPrice: "৳3,250",
    productImage: "https://via.placeholder.com/100",
    productSize: "Medium",
    productColor: "Black",
    productId: "#P126",
    quantity: "5",
    price: "৳130",
    productName: "Casual Shirt",
    customerName: "Emily White",
    customerEmail: "emily@example.com",
    customerPhone: "+8801112233445",
  },
  {
    id: 5,
    orderId: "#358",
    date: "Feb 09, 2021",
    status: "Pending",
    amount: "৳1,200",
    totalPrice: "৳6,000",
    productImage: "https://via.placeholder.com/100",
    productSize: "Large",
    productColor: "Purple",
    productId: "#P127",
    quantity: "8",
    price: "৳150",
    productName: "Designer Sunglasses",
    customerName: "Anna Green",
    customerEmail: "anna@example.com",
    customerPhone: "+8801234433222",
  },
  {
    id: 6,
    orderId: "#359",
    date: "Feb 10, 2021",
    status: "Completed",
    amount: "৳950",
    totalPrice: "৳4,750",
    productImage: "https://via.placeholder.com/100",
    productSize: "Small",
    productColor: "White",
    productId: "#P128",
    quantity: "10",
    price: "৳475",
    productName: "Bluetooth Headphones",
    customerName: "Michael Black",
    customerEmail: "michael@example.com",
    customerPhone: "+8809871223344",
  },
];

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState("");
  const ordersPerPage = 7;

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType("");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
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
              <th className="text-left p-3 text-gray-600">Edit</th>
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
                    onClick={() => openModal(order, "view")}
                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                  >
                    <MdPreview />
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(order, "edit")}
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center"
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(orders.length / ordersPerPage) },
          (_, i) => (
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
          )
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">
              {modalType === "view" ? "Product Details" : "Edit Order"}
            </h3>
            <div className="flex flex-col md:flex-row space-x-4 overflow-y-auto">
              {/* Product Details Section (View Modal) */}
              {modalType === "view" && (
                <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={selectedOrder.productImage}
                    alt="Product"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}

              {/* Edit Details Section (Edit Modal) */}
              <div className="space-y-2.5  w-full md:w-2/3">
                <h4 className="text-lg font-semibold">
                  {selectedOrder.productName}
                </h4>
                {modalType === "view" && (
                  <div>
                    <p>
                      <strong>Product ID:</strong> {selectedOrder.productId}
                    </p>
                    <p>
                      <strong>Size:</strong> {selectedOrder.productSize}
                    </p>
                    <p>
                      <strong>Color:</strong> {selectedOrder.productColor}
                    </p>
                    <p>
                      <strong>Price:</strong> {selectedOrder.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </p>
                    <p>
                      <strong>Total Price:</strong> {selectedOrder.totalPrice}
                    </p>

                    {/* Adding a bigger gap before 'More Details' */}
                    <div className="mt-6">
                      <h5 className="font-semibold">More Details</h5>
                      <p>
                        Here is some dummy content that will make the modal
                        longer.
                      </p>
                      <p>
                        Keep adding more content here to simulate a longer view
                        modal.
                      </p>
                      <p>Dummy content... Dummy content... Dummy content...</p>
                      <p>Dummy content... Dummy content... Dummy content...</p>
                      <p>Dummy content... Dummy content... Dummy content...</p>
                      <p>Dummy content... Dummy content... Dummy content...</p>
                      <p>Dummy content... Dummy content... Dummy content...</p>
                    </div>
                  </div>
                )}

                {modalType === "edit" && (
                  <>
                    <p>
                      <strong>Product ID:</strong> {selectedOrder.productId}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedOrder.date}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedOrder.status}
                    </p>
                    <p>
                      <strong>Total Price:</strong> {selectedOrder.totalPrice}
                    </p>
                    <label className="block mt-4">
                      <span className="text-gray-700">Change Status:</span>
                      <select
                        className="block w-full mt-1 border rounded-lg px-3 py-2"
                        defaultValue={selectedOrder.status}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Returned">Returned</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </label>
                    <button
                      onClick={() => alert("Status updated")}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                      Update Status
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
