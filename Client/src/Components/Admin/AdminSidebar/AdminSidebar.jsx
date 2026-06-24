import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdSlideshow } from "react-icons/md";
import { Collapse } from 'react-collapse';
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  const navigate = useNavigate();
  
  return (
    <div className="w-64 h-screen shadow-md shadow-gray-400 p-4">
      <h2 className="text-2xl font-bold mb-10 text-center">Admin</h2>
      <ul className="space-y-2">
        {/* Dashboard */}
        <li className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer" onClick={() => navigate('/admin')}>
          <MdOutlineDashboard />
          Dashboard
        </li>
        
        {/* Home Slides */}
        <li
          onClick={() => toggleMenu("homeSlides")}
          className="flex justify-between items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
        >
          <div className="flex items-center gap-3" onClick={() => navigate('/admin/banner')}>
            <MdSlideshow />
            Home Slides
          </div>
        </li>

        {/* Users */}
        <li className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer" onClick={() => navigate('/admin/users')}>
          <FaUser />
          Users
        </li>

        {/* Products */}
        <li
          onClick={() => toggleMenu("products")}
          className="flex justify-between items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <AiFillProduct />
            Products
          </div>

          {openMenu === "products" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </li>
          <Collapse isOpened={openMenu === "products"}>
          <ul className="ml-8! space-y-2! text-sm text-gray-700">
            <li className="hover:text-black cursor-pointer" onClick={() => navigate('/admin/products/list')}>
              Product List
            </li>
            <li className="hover:text-black cursor-pointer" onClick={() => navigate('/admin/products/add')}>
              Add Product
            </li>
          </ul>
          </Collapse>

        {/* Category */}
        <li
          onClick={() => toggleMenu("category")}
          className="flex justify-between items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <MdOutlineCategory />
            Category
          </div>

          {openMenu === "category" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </li>

        <Collapse isOpened={openMenu === "category"}>
          <ul className="ml-8! space-y-2! text-sm text-gray-700">
            <li className="hover:text-black cursor-pointer" onClick={() => navigate('/admin/categories')}>
              Category List
            </li>
          </ul>
          </Collapse>
        {/* Orders */}
        <li className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer" onClick={() => navigate('/admin/orders')}>
          <IoBagCheckSharp />
          Orders
        </li>
      </ul>

    </div>);
};

export default AdminSidebar;