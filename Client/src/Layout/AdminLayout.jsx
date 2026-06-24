
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar/AdminSidebar";
import AdminHeader from "../Components/Admin/AdminHeader/AdminHeader";
import { useState } from "react";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">

    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20
      transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <AdminSidebar />
    </div>

    {/* Wrapper (Header + Content together) */}
    <div
      className={`flex-1 transition-all duration-300 ease-in-out
      ${isSidebarOpen ? "ml-64! w-[calc(100%-256px)]" : "ml-0!"}`}
    >

      {/* Header */}
      <div className="h-16 bg-white shadow sticky top-0 z-10">
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <Outlet />
      </div>

    </div>
  </div>
  );
}

export default AdminLayout;