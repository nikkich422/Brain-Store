import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/api';
import toast from 'react-hot-toast';
import { TextField } from '@mui/material';
import ImageUploader from '../../Components/ImageUploader';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    original_price: "",
    discount: "",
    stock_count: "",
    category: "",
    subCategory: "",
    size: "",
    tags: "",
  })

  const [files, setFiles] = useState([]);
  const [existingImage, setExistingImage] = useState("");

  const fetchProduct = async () => {
    try {
      const {data} = await API.get(`/api/product/id/${id}`);

      const p = data.data;
      setFormData({
        title: p.title || "",
        brand: p.brand || "",
        price: p.price || "",
        original_price: p.original_price || "",
        discount: p.discount || "",
        stock_count: p.stock_count || "",
        category: p.category || "",
        subCategory: p.subCategory || "",
        size: p.size?.join(", ") || "",
        tags: p.tags?.join(", ") || "",
      })

      setExistingImage(p.image || "");
    } catch (error) {
      toast.error("Failed to load product");
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // append fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      })

      files.forEach((file) => {
        formDataToSend.append("images", file);
      });

      await API.put(`/api/product/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Updated Successfully");
      navigate('/admin/products/list');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  if(loading){
    return <div className='p-6'>Loading Product...</div>
  }

  return (
    <div className="px-6 py-1">

      <div className="bg-white shadow rounded-xl px-6 py-2">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button
            onClick={() => navigate("/admin/products/list")}
            className="btn-secondary font-bold"
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">

          {/* Title */}
          <TextField
            label="Title"
            name="title"
            size='small'
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          {/* Brand */}
          <TextField
            label="Brand"
            name="brand"
            size='small'
            value={formData.brand}
            onChange={handleChange}
            fullWidth
          />

          {/* Price */}
          <TextField
            label="Price"
            type="number"
            name="price"
            size='small'
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />

          {/* Original Price */}
          <TextField
            label="Original Price"
            type="number"
            size='small'
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
            fullWidth
          />

          {/* Discount */}
          <TextField
            label="Discount"
            name="discount"
            size='small'
            value={formData.discount}
            onChange={handleChange}
            fullWidth
          />

          {/* Stock */}
          <TextField
            label="Stock Count"
            type="number"
            size='small'
            name="stock_count"
            value={formData.stock_count}
            onChange={handleChange}
            fullWidth
          />

          {/* Category */}
          <TextField
            label="Category"
            name="category"
            size='small'
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />

          {/* SubCategory */}
          <TextField
            label="SubCategory"
            name="subCategory"
            size='small'
            value={formData.subCategory}
            onChange={handleChange}
            fullWidth
          />

          {/* Size */}
          <TextField
            label="Sizes (comma separated)"
            name="size"
            size='small'
            value={formData.size}
            onChange={handleChange}
            fullWidth
          />

          {/* Tags */}
          <TextField
            label="Tags (comma separated)"
            name="tags"
            size='small'
            value={formData.tags}
            onChange={handleChange}
            fullWidth
          />

          {/* Existing Image */}
          <div className="col-span-3 mt-1">
            <p className="text-sm text-gray-600 mb-2">Current Image</p>
            {existingImage ? (
              <img
                src={existingImage}
                alt="product"
                className="w-28 h-28 object-cover rounded border"
              />
            ) : (
              <p className="text-gray-400 text-sm">No image</p>
            )}
          </div>

          {/* Upload New Image */}
          <div className="col-span-3 mt-1">
            <p className="text-sm text-gray-600 mb-2">Replace Image</p>
            <ImageUploader files={files} setFiles={setFiles} />
          </div>

          {/* Submit */}
          <div className="col-span-3 mt-1">
            <button
              type="submit"
              className="btn-secondary font-bold"
            >
              Update Product
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default EditProduct;
