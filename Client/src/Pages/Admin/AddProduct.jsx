import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import ImageUploader from "../../Components/ImageUploader";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    original_price: "",
    discount: "",
    stock_count: "",
    category: "",
    subCategory: "",
    image: "",
    size: "",
    tags: "",
  });
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title === "") return toast.error("Please Enter Title");
    if (formData.price === "") return toast.error("Please Enter Price");
    if (formData.stock_count === "")
      return toast.error("Please Enter Stock Count");
    if (formData.category === "") return toast.error("Please Enter Category");
    if (formData.subCategory === "")
      return toast.error("Please Enter SubCategory");
    if (files.length === 0) return toast.error("Please Enter Image");

    const formDataToSend = new FormData();

    // normal fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    })

    // images
    files.forEach((file) => {
      formDataToSend.append("images", file);
    })

    try {
      await API.post("/api/product", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      toast.success("Product Created");

      navigate("/admin/products/list");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error creating product");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Create Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <TextField
          size="small"
          label="Title *"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          label="Brand"
          variant="outlined"
          name="brand"
          value={formData.brand}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          type="number"
          label="Price *"
          variant="outlined"
          name="price"
          value={formData.price}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          type="number"
          label="Original Price"
          variant="outlined"
          name="original_price"
          value={formData.original_price}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          label="Discount (e. g. 20% off)"
          variant="outlined"
          name="discount"
          value={formData.discount}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          type="number"
          label="Stock *"
          variant="outlined"
          name="stock_count"
          value={formData.stock_count}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          label="Category *"
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          label="SubCategory *"
          variant="outlined"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          label="Sizes (comma seperated: S,M,L)"
          variant="outlined"
          name="size"
          value={formData.size}
          onChange={handleFormChange}
        />
        <TextField
          size="small"
          label="Tags (comma seperated)"
          variant="outlined"
          name="tags"
          value={formData.tags}
          onChange={handleFormChange}
        />
        <div className="col-span-4">
          <label className="mb-2 inline-block">Upload Image *</label>
          <ImageUploader files={files} setFiles={setFiles} />
        </div>
        <div className="col-span-3">
          <button type="submit" className="btn-primary font-bold">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
