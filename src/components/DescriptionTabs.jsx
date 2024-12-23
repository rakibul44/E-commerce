import React, { useState } from "react";

const DescriptionTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => handleTabClick("description")}
          className={`py-2 px-4 text-sm font-semibold ${
            activeTab === "description"
              ? "text-black border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => handleTabClick("delivery")}
          className={`py-2 px-4 text-sm font-semibold ${
            activeTab === "delivery"
              ? "text-black border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          DELIVERY POLICY
        </button>
        <button
          onClick={() => handleTabClick("returns")}
          className={`py-2 px-4 text-sm font-semibold ${
            activeTab === "returns"
              ? "text-black border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          RETURNS & EXCHANGES POLICY
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "description" && (
          <div>
            <p className="text-gray-700 mb-6">
              Captivate with this shirt’s versatile urban look that works as well
              at happy hour as it does in the backyard. The real mother of pearl
              buttons and embroidered crocodile complete its elegant appeal.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            {/* Icons Section */}
            <div className="flex gap-6 items-center mb-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">30°</span>
                <span className="text-xs text-gray-500">Machine Wash</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">✕</span>
                <span className="text-xs text-gray-500">No Bleach</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">••</span>
                <span className="text-xs text-gray-500">No Tumble Dry</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>MACHINE WASH AT MAX. TEMP. 30° C - NORMAL PROCESS</li>
              <li>DO NOT BLEACH</li>
              <li>DO NOT TUMBLE DRY</li>
              <li>IRON AT MAX. TEMP. OF 110° C WITHOUT STEAM</li>
              <li>DO NOT DRY CLEAN</li>
            </ul>

            {/* Sample Ordered List */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Sample Ordered List</h3>
              <ol className="list-decimal ml-6 text-gray-700">
                <li>Comodus in tempor ullamcorper malesuada.</li>
                <li>Pellentesque vitae neque mollis urna mattis laoreet.</li>
                <li>Divamus sit amet purus justo.</li>
                <li>Proin molestie egestas orci ac suscipit risus posuere loremous.</li>
              </ol>
            </div>

            {/* Sample Paragraph Text */}
            <div>
              <h3 className="font-bold mb-2">Sample Paragraph Text</h3>
              <p className="text-gray-600 italic border-l-4 pl-4 border-gray-300">
                Faded short sleeves t-shirt with high neckline. Soft and stretchy
                material for a comfortable fit. Accessorize with a straw hat and
                you're ready for summer!
              </p>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div>
            <p className="text-gray-700">
              Delivery is processed within 2-3 business days. Please refer to our
              shipping policy for international deliveries and additional
              timelines.
            </p>
          </div>
        )}

        {activeTab === "returns" && (
          <div>
            <p className="text-gray-700">
              Returns and exchanges are accepted within 30 days of purchase.
              Products must be in original condition with tags intact.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionTabs;
