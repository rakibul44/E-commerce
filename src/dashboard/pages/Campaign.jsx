import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample Campaign Data
const campaigns = [
  {
    id: 1,
    title: "Monitor progress in Real Time Value",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.",
    date: "Jan 20 → Jan 27",
    status: "One-Time",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Monitor progress in Real Time Value",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.",
    date: "Jan 20 → Jan 27",
    status: "Off-Track",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    title: "Monitor progress in Real Time Value",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.",
    date: "Jan 20 → Jan 27",
    status: "At Risk",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
];

const campaign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Create Campaign
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >

            {/* Title */}
            <h2 className="font-semibold text-lg mb-2">{campaign.title}</h2>

            {/* Description */}
            <p className="text-gray-600 mb-4">{campaign.description}</p>

            {/* Date */}
            <div className="text-gray-400 mb-4">{campaign.date}</div>

            {/* Status */}
            <div className="flex justify-between items-center">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md ${campaign.statusColor}`}
              >
                {campaign.status}
              </span>

              <Link to={`/campaign/${campaign.id}`} className="text-blue-600">
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>

            <input
              type="text"
              placeholder="Campaign Name"
              className="border w-full px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              placeholder="Description"
              rows="3"
              className="border w-full px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default campaign;