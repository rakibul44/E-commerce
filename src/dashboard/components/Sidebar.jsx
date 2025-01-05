import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment, MdOutlineSupportAgent, MdOutlineMessage } from "react-icons/md";
import { BsBoxFill } from "react-icons/bs";
import { GiRoyalLove, GiCampingTent } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillNotification, AiOutlineProduct } from "react-icons/ai";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar
  const [activeIndex, setActiveIndex] = useState(null); // State to track active menu item
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // State for Product Update Sub-menu
  const isAdmin = true;
  const isUser = true;

  // Menu items data
  const menuItems = [
    isAdmin && { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    isAdmin && {
      name: "Product management",
      icon: <AiOutlineProduct />,
      isSubMenu: true, // Flag for submenu
      subMenu: [
        { name: "Add Product", link: "/dashboard/add-product" },
        { name: "Product List", link: "/dashboard/productlist" },
      ],
    },
    isAdmin && {
      name: "Category & Brands",
      icon: <AiOutlineProduct />,
      isSubMenu: true, // Flag for submenu
      subMenu: [
        { name: "Categories", link: "/dashboard/categories" },
        { name: "Add Category", link: "/dashboard/add-category" },
        { name: "Brands ", link: "/dashboard/brands" },
        { name: "Add Brand ", link: "/dashboard/add-brand" },
      ],
    },
    isUser && { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    isAdmin && { name: "Scroll Notice", icon: <AiFillNotification />, link: "/dashboard/notice" },
    isAdmin && { name: "Newsletter", icon: <AiFillNotification />, link: "/dashboard/newsletter" },
    { name: "Personal Info", icon: <FaUser />, link: "/dashboard/profileupdate" },
    isAdmin && { name: "Customers", icon: <FaUserGroup />, link: "/dashboard/customer" },
    isUser && { name: "Payment Method", icon: <MdPayment />, link: "/dashboard/payment" },
    {
      name: "Order",
      icon: <BsBoxFill />,
      isSubMenu: true, // Flag for submenu
      subMenu: [
        { name: "Oederlist", link: "/dashboard/order" },
        { name: "Pending", link: "/dashboard/orders/pending" },
        { name: "Shipped", link: "/dashboard/orders/shipped" },
        { name: "Delivered", link: "/dashboard/orders/delivered" },
        { name: "Cancelled", link: "/dashboard/orders/cancelled" },
        { name: "Returned", link: "/dashboard/orders/returned" },
      ],
    },
    { name: "Wishlist", icon: <GiRoyalLove />, link: "/dashboard/wishcart" },
    { name: "Messages", icon: <MdOutlineMessage />, link: "/dashboard/message" },
    { name: "Address", icon: <FaMapMarkerAlt />, link: "/dashboard/address" },
    { name: "Campaigns", icon: <GiCampingTent />, link: "/dashboard/camp" },
    { name: "Support Ticket", icon: <MdOutlineSupportAgent />, link: "/dashboard/support" },
    { name: "Logout", icon: <LuLogOut />, link: "/logout" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-lg h-auto fixed md:relative top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <Link to={"/"} className="text-2xl font-bold mb-6 p-4">
          Admin Dashboard
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
                        <span>{item.name}</span>
                        <span className="ml-auto">{activeIndex === index && isSubMenuOpen ? "▲" : "▼"}</span>
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
