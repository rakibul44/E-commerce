import React, { useState } from "react";
import { Link } from "react-router-dom";

const ScrollNotice = () => {
  const [notices, setNotices] = useState([
    { id: 1, text: "50% discount going on " },
    { id: 2, text: "New updates are coming soon!" },
    { id: 3, text: "Remember to check your notifications daily." },
  ]);

  const [newNotice, setNewNotice] = useState("");

  const handleAddNotice = () => {
    if (newNotice.trim()) {
      const updatedNotices = [
        ...notices,
        { id: notices.length + 1, text: newNotice },
      ];
      setNotices(updatedNotices);
      setNewNotice("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      {/* Header */}
      <label className="block text-gray-800 font-semibold mb-2">
        Enter your scrollable notice here
      </label>

      {/* Textarea */}
      <textarea
        value={newNotice}
        onChange={(e) => setNewNotice(e.target.value)}
        rows="4"
        className="w-full p-4 border rounded-lg text-gray-700 resize-none focus:outline-blue-400"
        placeholder="Enter your notice here..."
      ></textarea>

      {/* Update Button */}
      <button
        onClick={handleAddNotice}
        className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-800"
      >
        Update 
      </button>
    </div>
  );
};

export default ScrollNotice;
