import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

// Sample data
const messages = [
  { name: "Debron Rasure", subject: "What could easily give a couple times before the prorated manner", status: "SEEN", Description:'' },
  { name: "Linwood Lockhart", subject: "I have a question", status: "PENDING", Description:'' },
  { name: "JohnSerne", subject: "Aloha, wrote about your prices", status: "PENDING", Description:'' },
  { name: "Business Registry", subject: "Add your company details for the Yellow Pages Web edition!", status: "PENDING", Description:'' },
  { name: "Amanda Zonstymnb", subject: "Searching for a Gentleman Who Knows What He Wants", status: "PENDING", Description:'' },
  { name: "Malakia Debeck", subject: "Ahead I just hope that shithole of picking officers and other Approximate", status: "PENDING", Description:'' },
  { name: "Debron Rasure", subject: "What could easily give a couple times before the prorated manner", status: "SEEN", Description:'' },
];

const Message = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 5; // Number of rows per page

  // Calculate pagination
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);

  // Functions
  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Messages</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Subject</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Status</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-2 font-medium text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-gray-600">{item.subject}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      item.status === "SEEN" ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  {/* Preview Button */}
                  <button
                    onClick={() => openModal(item)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    aria-label="Preview"
                  >
                    <FaEye />
                  </button>
                  {/* Delete Button */}
                  <button
                    className=" text-white "
                    aria-label="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Message Preview</h3>
            <p>
              <span className="font-semibold">Name:</span> {selectedMessage.name}
            </p>
            <p>
              <span className="font-semibold">Subject:</span> {selectedMessage.subject}
            </p>
            <p>
            <span className="font-semibold">Description:</span> {selectedMessage.Description || "No description available"}
              {/* Update the status  */}
              {/* <span
                className={`px-2 py-1 rounded-full text-white text-sm ${
                  selectedMessage.status === "SEEN" ? "bg-green-400" : "bg-yellow-400"
                }`}
              >
                {selectedMessage.status}
              </span> */}
            </p>

            {/* Close Button */}
            <div className="text-right mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
