import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-full md:w-1/5 bg-gray-800 text-white h-screen p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="block hover:text-gray-400">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/products" className="block hover:text-gray-400">
              Products
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block hover:text-gray-400">
              Orders
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

