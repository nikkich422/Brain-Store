import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
  } from "@mui/material";
  
  import React, { useEffect, useState } from "react";
  import API from "../../../api/api";
  import toast from "react-hot-toast";
  
  const CreateCategoryModal = ({
    open,
    onClose,
    refreshCategories,
  }) => {
  
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
  
    const fetchParentCategories = async () => {
      try {
        const res = await API.get(
          "/api/category/parent-categories"
        );
  
        setCategories(res.data.data || []);
  
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if(open){
        fetchParentCategories();
      }
    }, [open]);
  
    const handleCreateCategory = async () => {
      try {
  
        if(!name.trim()){
          return toast.error(
            "Category name is required"
          );
        }
  
        setLoading(true);
  
        let uploadedImages = [];
  
        // Upload image first
        if(image){
  
          const formData = new FormData();
  
          formData.append(
            "images",
            image
          );
  
          const uploadRes = await API.post(
            "/api/category/uploadImages",
            formData,
            {
              headers:{
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );
  
          uploadedImages =
            uploadRes.data.images || [];
        }
  
        await API.post(
          "/api/category/createCategory",
          {
            name,
            parentId:
              parentId || null,
            images: uploadedImages,
          }
        );
  
        toast.success(
          "Category created successfully"
        );
  
        refreshCategories();
  
        setName("");
        setParentId("");
        setImage(null);
  
        onClose();
  
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to create category"
        );
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create Category
        </DialogTitle>
  
        <DialogContent>
  
          <div className="flex flex-col gap-4 mt-4">
  
            <TextField
              label="Category Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              fullWidth
            />
  
            <TextField
              select
              label="Parent Category"
              value={parentId}
              onChange={(e) =>
                setParentId(e.target.value)
              }
              fullWidth
            >
              <MenuItem value="">
                None (Main Category)
              </MenuItem>
  
              {categories.map((cat) => (
                <MenuItem
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
  
            <input
            type="file"
            onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);

                if (file) {
                    setPreview(URL.createObjectURL(file));
                }
            }}/>

            {preview && (
            <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-lg object-cover border"
            />)}
  
            <button
              onClick={
                handleCreateCategory
              }
              disabled={loading}
              className="
                bg-indigo-600
                text-white
                py-3
                rounded-xl
                hover:bg-indigo-700
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating..."
                : "Create Category"}
            </button>
  
          </div>
  
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CreateCategoryModal;