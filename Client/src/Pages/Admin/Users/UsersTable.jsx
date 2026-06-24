import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const UsersTable = ({
  users,
  loading,
  totalUsers,
  paginationModel,
  setPaginationModel,
  handleUserAction,
  handleViewUser,
  selectedRows,
  setSelectedRows,
  sortModel,
  setSortModel,
}) => {
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 90,

      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <img
          src={
            params.row.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(params.row.name)}&background=random&color=fff&bold=true`
          }
          alt={params.row.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 240,
    },
    {
      field: "role",
      headerName: "Role",
      width: 140,

      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              params.row.role === "Admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >
          {params.row.role}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,

      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              params.row.status === "Active"
                ? "bg-green-100 text-green-700"
                : params.row.status === "Suspended"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Joined",
      width: 140,

      renderCell: (params) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
    
      renderCell: (params) => (
        <div className="flex items-center gap-2 h-full">
          
          <button
            className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200 transition"
            onClick={() => handleViewUser(params.row)}
          >
            View
          </button>
    
          {params.row.status === "Suspended" ? (
            <button
              className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold hover:bg-green-200 transition"
              onClick={() =>
                handleUserAction(params.row, "activate")
              }
            >
              Activate
            </button>
          ) : (
            <button
              className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition"
              onClick={() =>
                handleUserAction(params.row, "suspend")
              }
            >
              Suspend
            </button>
          )}
        </div>
      ),
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div style={{width: "auto" }}>
        {console.log({
          users,
          totalUsers,
          paginationModel,
          selectedRows,
          sortModel,
        })}
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}

          checkboxSelection
          disableRowSelectionOnClick
          keepNonExistentRowsSelected

          paginationMode="server"
          rowCount={Number(totalUsers || 0)}

          sortingMode="server"
          sortModel={sortModel || []}
          onSortModelChange={setSortModel}

          rowSelectionModel={selectedRows || []}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection || []);
          }}

          paginationModel={
            paginationModel || {
              page: 0,
              pageSize: 10,
            }
          }
          onPaginationModelChange={setPaginationModel}

          pageSizeOptions={[5, 10, 20, 50]}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton"
            },
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: "bold",
            },

            "& .MuiDataGrid-cell": {
              borderColor: "#f1f5f9",
            },

            "& .MuiCheckbox-root": {
              color: "#6366f1",
            },
          }}
        />
      </div>
    </div>
  );
};

export default UsersTable;