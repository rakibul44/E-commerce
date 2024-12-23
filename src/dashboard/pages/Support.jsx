import React, { useState } from "react";
import { Link } from "react-router-dom";

const Support = () => {
  // Data
  const data = [
    {
      id: "#354",
      time: "Feb 05,2021",
      report:
        "Printing and typesetting industry standard dummy text ever since",
    },
    {
      id: "#355",
      time: "Feb 06,2021",
      report:
        "Lorem Ipsum has been the industry's standard dummy text ever since.",
    },
    {
      id: "#356",
      time: "Feb 07,2021",
      report:
        "It has survived not only five centuries, but also the leap into electronic.",
    },
    {
      id: "#357",
      time: "Feb 08,2021",
      report:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
      id: "#358",
      time: "Feb 09,2021",
      report: "The standard chunk of Lorem Ipsum used since the 1500s.",
    },
    {
      id: "#359",
      time: "Feb 10,2021",
      report:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum.",
    },
    {
      id: "#360",
      time: "Feb 11,2021",
      report:
        "Various versions have evolved over the years, sometimes by accident.",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Rows per page

  // Calculate indexes for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full px-4 py-6">
      {/* Add New Support Button */}
      <div className="mb-4">
        <Link
          to="/add-support"
          className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-800"
        >
          Contact with us 
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="px-4 py-3 font-semibold text-gray-600">No</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Time</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Report</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 border-t transition duration-300"
              >
                {/* Table Cells */}
                <td className="px-4 py-3 font-medium">
                  <Link
                    to={`/details/${index}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.time}</td>
                <td className="px-4 py-3 text-gray-600">{item.report}</td>
                {/* Action Buttons */}
                <td className="px-4 py-3 flex space-x-2">
                  <Link
                    to={`/delete/${index}`}
                    className="text-red-500 hover:bg-gray-100 p-2 rounded-full transition duration-300"
                    aria-label="Delete"
                  >
                    🗑️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Support;
