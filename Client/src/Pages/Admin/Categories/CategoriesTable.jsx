import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const CategoriesTable = ({
  categories,
  loading,
  handleEdit,
  handleDelete,
}) => {

  const rows = categories.map((cat) => ({
    id: cat._id,
    ...cat,
  }));

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
  
      renderCell: (params) => (
        <img
          src={
            params.row.images?.[0] ||
            "https://placehold.co/80x80"
          }
          alt={params.row.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
  
    {
      field: "name",
      headerName: "Category",
      flex: 1,
      minWidth: 200,
    },
  
    {
      field: "parentName",
      headerName: "Parent Category",
      width: 180,
  
      renderCell: (params) =>
        params.row.parentName || "-",
    },
  
    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      minWidth: 180,
    },
  
    {
      field: "isActive",
      headerName: "Status",
      width: 140,
  
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            params.row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {params.row.isActive
            ? "Active"
            : "Inactive"}
        </span>
      ),
    },
  
    {
      field: "createdAt",
      headerName: "Created",
      width: 140,
  
      renderCell: (params) =>
        new Date(
          params.row.createdAt
        ).toLocaleDateString(),
    },
  
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
  
      sortable: false,
  
      renderCell: (params) => (
        <div className="flex gap-2 relative top-3">
  
          <button
            type="button"
            onClick={() =>
              handleEdit(params.row)
            }
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs"
          >
            Edit
          </button>
  
          <button
            type="button"
            onClick={() =>
              handleDelete(params.row)
            }
            className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs"
          >
            Delete
          </button>
  
        </div>
      ),
    },
  ];

  return (
    <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5,10,20]}
        sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            fontWeight: "bold",
            },

            "& .MuiDataGrid-cell": {
            borderColor: "#f1f5f9",
            },
        }}
        />
  );
};

export default CategoriesTable;