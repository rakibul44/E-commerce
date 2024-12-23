import React from "react";
import { Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";

// Static data for the cards
const cardsData = [
  { id: 1, icon: <GiShoppingCart />, title: "New Orders", count: 656, link: "/orders" },
  { id: 2, icon: <FaTruck />, title: "Pending Deliveries", count: 120, link: "/deliveries" },
  { id: 3, icon: <IoMdSettings />, title: "Settings", count: 3, link: "/settings" },
];

// Static data for personal and shop info
const infoData = [
  { label: "Name", value: "Shuvo Khan" },
  { label: "Email", value: "rafiqislamsuvobd@gmail.com" },
  { label: "Phone", value: "01792166627" },
  { label: "City", value: "Dhaka, Bangladesh" },
  { label: "Zip", value: "4040" },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Welcome to your Profile</h1>

        {/* Dynamic Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cardsData.map((card) => (
            <Link
              to={card.link}
              key={card.id}
              className="bg-orange-500 text-white p-6 rounded-md flex flex-col items-center hover:bg-orange-700 transition"
            >
              <span className="text-white text-4xl">{card.icon}</span>
              <p className="mt-2 text-lg">{card.title}</p>
              <h2 className="text-3xl font-bold">{card.count}</h2>
            </Link>
          ))}
        </div>

        {/* Personal and Shop Info */}
        <div className="bg-white p-6 rounded-md shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold mb-2">Personal Information</h3>
            {infoData.map((item, index) => (
              <p key={index}>
                <span className="font-semibold ml-2">{item.label}:</span> {item.value}
              </p>
            ))}
          </div>

          {/* Shop Info */}
          <div> 
            <h3 className="text-lg font-bold mb-2">Shop Info</h3>
            {infoData.map((item, index) => (
              <p key={index}>
                <span className="font-semibold ml-2">{item.label}:</span> {item.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
