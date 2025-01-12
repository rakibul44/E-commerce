import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import {  MdOutlineSupportAgent, MdOutlineMessage } from "react-icons/md";
import { BsBoxFill } from "react-icons/bs";
import { GiRoyalLove, GiCampingTent } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillNotification, AiOutlineProduct } from "react-icons/ai";
import useBaseRoute from "../../hooks/useBaseRoute";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar
  const [activeIndex, setActiveIndex] = useState(null); // State to track active menu item
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // State for Product Update Sub-menu
  const { baseRoute } = useBaseRoute();
  const { loggedInUser } = useAuth();
  const isSuperAdminOrAdmin = loggedInUser?.role === "superAdmin" || loggedInUser?.role === "Admin";
  const isUser = loggedInUser?.role === "user";
  
  // Menu items data
  const menuItems = [
    isSuperAdminOrAdmin && { name: "Dashboard", icon: <FaHome />, link: {baseRoute} },
    isSuperAdminOrAdmin && {
      name: "Product management",
      icon: <AiOutlineProduct />,
      isSubMenu: true, // Flag for submenu
      subMenu: [
        { name: "Add Product", link: `${baseRoute}/add-product` },
        { name: "Product List", link: `${baseRoute}/productlist` },
      ],
    },
    isSuperAdminOrAdmin && {
      name: "Category & Brands",
      icon: <AiOutlineProduct />,
      isSubMenu: true, // Flag for submenu
      subMenu: [
        { name: "Categories", link: `${baseRoute}/categories` },
        { name: "Add Category", link: `${baseRoute}/add-category` },
        { name: "Brands ", link: `${baseRoute}/brands` },
        { name: "Add Brand ", link: `${baseRoute}/add-brand` },
      ],
    },
    isSuperAdminOrAdmin && {
      name: "Order",
      icon: <BsBoxFill />,
      isSubMenu: true, // Flag for submenu
      subMenu: [
        { name: "Order List", link: `${baseRoute}/orders/order-list` },
        { name: "Pending", link: `${baseRoute}/orders/pending` },
        { name: "Shipped", link: `${baseRoute}/orders/shipped` },
        { name: "Delivered", link: `${baseRoute}/orders/delivered` },
        { name: "Cancelled", link: `${baseRoute}/orders/cancelled` },
        { name: "Returned", link: `${baseRoute}/orders/returned` },
      ],
    },
    isUser && { name: "Dashboard", icon: <FaHome />, link: {baseRoute} },
   { name: "My orders", icon: <BsBoxFill />, link: `${baseRoute}/orders/my-orders` },
    isSuperAdminOrAdmin && { name: "Scroll Notice", icon: <AiFillNotification />, link: `${baseRoute}/notice` },
    isSuperAdminOrAdmin && { name: "Newsletter", icon: <AiFillNotification />, link: `${baseRoute}/newsletter` },
    { name: "Personal Info", icon: <FaUser />, link: `${baseRoute}/profileupdate` },
    isSuperAdminOrAdmin && { name: "Customers", icon: <FaUserGroup />, link: `${baseRoute}/customer` },
    // isUser && { name: "Payment Method", icon: <MdPayment />, link: `${baseRoute}/payment` },

    { name: "Wishlist", icon: <GiRoyalLove />, link: `${baseRoute}/wishcart` },
    isSuperAdminOrAdmin &&  { name: "Messages", icon: <MdOutlineMessage />, link: `${baseRoute}/message` },
    isSuperAdminOrAdmin &&  { name: "Contact us", icon: <FaMapMarkerAlt />, link: `${baseRoute}/contact-us` },
    isSuperAdminOrAdmin &&  { name: "Support Ticket", icon: <MdOutlineSupportAgent />, link: `${baseRoute}/support` },
    isSuperAdminOrAdmin &&  { name: "Messages", icon: <MdOutlineMessage />, link: `${baseRoute}/message` },
    isSuperAdminOrAdmin &&  { name: "Address", icon: <FaMapMarkerAlt />, link: `${baseRoute}/address` },
    isSuperAdminOrAdmin &&  { name: "Campaigns", icon: <GiCampingTent />, link: `${baseRoute}/camp` },
    isSuperAdminOrAdmin &&  { name: "Support", icon: <MdOutlineSupportAgent />, link: `${baseRoute}/support` },
    { name: "Logout", icon: <LuLogOut />, link: "/logout" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`w-64 h-screen overflow-y-auto bg-white shadow-lg fixed md:relative top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <Link to={"/"} className="text-2xl font-bold mb-6 p-4">
        {isSuperAdminOrAdmin ? "Admin" : "User" }  Dashboard
        </Link>
        <ul className="space-y-2">
          {menuItems.map(
            (item, index) =>
              item && (
                <li key={index} className="group">
                  {/* Check for Sub-menu */}
                  {item.isSubMenu ? (
                    <>
                      <button
                        onClick={() => {
                          if (activeIndex === index) {
                            setIsSubMenuOpen(!isSubMenuOpen);
                          } else {
                            setActiveIndex(index);
                            setIsSubMenuOpen(true);
                          }
                        }}
                        className={`flex items-center px-4 py-2 space-x-3 w-full text-left rounded-md transition-all duration-300 ${
                          activeIndex === index && isSubMenuOpen
                            ? "bg-gray-200 text-black font-bold"
                            : "text-gray-700 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>
                          
                        </span>
                        <span>{item.name}</span>
                        <span className="">{activeIndex === index && isSubMenuOpen ? "▲" : "▼"}</span>
                      </button>

                      {/* Sub-menu */}
                      {activeIndex === index && isSubMenuOpen && (
                        <ul className="ml-6 mt-2 space-y-1">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.link}
                                className="flex items-center px-4 py-1 space-x-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-300"
                              >
                                <span>{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsSubMenuOpen(false);
                      }}
                      className={`flex items-center px-4 py-2 space-x-3 rounded-md transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-gray-200 text-black font-bold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              )
          )}
        </ul>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;


