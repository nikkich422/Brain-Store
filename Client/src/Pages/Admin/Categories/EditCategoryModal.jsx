import { Dialog, DialogTitle, DialogContent, TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../../api/api";
import toast from "react-hot-toast";

const EditCategoryModal = ({ open, onClose, category, refreshCategories }) => {

const [name, setName] = useState("");
const [parentId, setParentId] = useState("");
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(false);

    const fetchParentCategories = async () => {
        try {
            const res = await API.get("/api/category/parent-categories");

            setCategories(
                res.data.data || []
            );

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchParentCategories();
        }
    }, [open]);

    useEffect(() => {
        if (category) {
            setName(category.name || "");
            setParentId(category.parentId || "");
        }
    }, [category]);

    const handleUpdateCategory = async () => {

        try {
            setLoading(true);

            console.log("Updating category:", {
                id: category._id,
                name,
                parentId,
            });

            await API.put(`/api/category/${category._id}`,
                {
                    name,
                    parentId:
                    parentId || null,
                }
            );

            toast.success("Category updated");

            await refreshCategories();
            onClose();

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update category");
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
            Edit Category
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
                setParentId(
                    e.target.value
                )
                }
                fullWidth
            >
                <MenuItem value="">
                None
                </MenuItem>

                {categories
                .filter(
                    (cat) =>
                    cat._id !==
                    category?._id
                )
                .map((cat) => (
                    <MenuItem
                    key={cat._id}
                    value={cat._id}
                    >
                    {cat.name}
                    </MenuItem>
                ))}
            </TextField>

            <button
                onClick={handleUpdateCategory}
                disabled={loading}
                className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                {loading ? "Updating..." : "Update Category"}
            </button>
            </div>

        </DialogContent>
        </Dialog>
    );
};

export default EditCategoryModal;