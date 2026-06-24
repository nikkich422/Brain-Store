import React, { useEffect, useState } from "react";
import API from "../../../api/api";
import toast from "react-hot-toast";

import CategoriesTable from "./CategoriesTable";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { TextField } from "@mui/material";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/category");

      setCategories(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenEdit(true);
  };

  const handleDelete = async (category) => {
    try {
      const confirmed = window.confirm(`Delete ${category.name}?`);

      if (!confirmed) return;

      await API.delete(`/api/category/${category._id}`);

      toast.success("Category deleted successfully");

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>

          <p className="text-gray-500">Manage store categories</p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
        >
          Add Category
        </button>
      </div>
      <TextField
        label="Search Category"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-5 mb-6 mt-2">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3>Total Categories</h3>
          <h2 className="text-3xl font-bold">{categories.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3>Main Categories</h3>
          <h2 className="text-3xl font-bold">
            {categories.filter((c) => !c.parentId).length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3>Sub Categories</h3>
          <h2 className="text-3xl font-bold">
            {categories.filter((c) => c.parentId).length}
          </h2>
        </div>
      </div>

      <CategoriesTable
        categories={filteredCategories}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <CreateCategoryModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refreshCategories={fetchCategories}
      />
      <EditCategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        category={selectedCategory}
        refreshCategories={fetchCategories}
      />
    </div>
  );
};

export default Categories;
