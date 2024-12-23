import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/Header";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header (Fixed at the top) */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Children Pages (Main Content) */}
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
