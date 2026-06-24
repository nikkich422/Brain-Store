import React, { useEffect, useState } from 'react'
import API from '../../../api/api';
import toast from 'react-hot-toast';
import UsersTable from './UsersTable';
import { MenuItem, TextField } from '@mui/material';
import UserDetailsDrawer from './UserDetailsDrawer';
import UserStatsCards from './UserStatsCards';
import { useDebounce } from "use-debounce";
import ConfirmDialog from './ConfirmDialog';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalUsers, setTotalUsers] = useState(0);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [stats, setStats] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [actionData, setActionData] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState({
        type: "include",
        ids: new Set(),
    });
    const [sortModel, setSortModel] = useState([
        {
            field: "createdAt",
            sort: "desc",
        }
    ])

    const [debouncedSearch] = useDebounce(search, 500);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const [userRes, statsRes] = await Promise.all([
                API.get("/api/admin/users", {
                    params: {
                        page: paginationModel.page + 1,
                        limit: paginationModel.pageSize,
                        search: debouncedSearch,
                        status: statusFilter,
                        role: roleFilter,

                        sortField: sortModel[0]?.field || "createdAt",
                        sortOrder: sortModel[0]?.sort || "desc",
                    }
                }),
                API.get("/api/admin/users/stats")
            ])

            setUsers(userRes.data.data || []);
            setTotalUsers(userRes.data.pagination.total || 0);

            setStats(statsRes.data.data);
        } catch (error) {
            console.error(error);

            toast.error(error?.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [paginationModel, debouncedSearch, statusFilter, roleFilter, sortModel]);

    useEffect(() => {
        setPaginationModel((prev) => ({
            ...prev,
            page: 0,
        }))
    }, [search, statusFilter, roleFilter]);

    const updateUser = async (userId, body) => {
        try {
            if(body.status){
                await API.patch(`/api/admin/users/${userId}/status`, {
                    status: body.status,
                })
            }
            if(body.role){
                await API.patch(`/api/admin/users/${userId}/role`, {
                    role: body.role,
                })
            }

            toast.success("User Updated");
            fetchUsers();

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setDrawerOpen(true);
    }

    const handleUserAction = (user, action) => {
        setActionData({
            user,
            action,
        });

        setConfirmOpen(true);
    }

    const confirmUserAction = async () => {
        try {
            
            setActionLoading(true);
            const userId = actionData.user._id;

            if(actionData.action === "suspend"){
                await updateUser(userId, {
                    status: "Suspended",
                })
            } else if(actionData.action === "activate"){
                await updateUser(userId, {
                    status: "Active",
                })
            }

            setConfirmOpen(false);

        } catch (error) {
            toast.error("something went wrong");
        } finally{
            setActionLoading(false);
        }
    }

    const handleBulkAction = async (status) => {
        try {
            setLoading(true);

            await Promise.allSettled(
                [...selectedRows.ids].map((id) =>
                  API.patch(`/api/admin/users/${id}/status`, {
                    status,
                  })
                )
            );

            toast.success(`Users Updated Successfully`);
            setSelectedRows({
                type: "include",
                ids: new Set(),
            });

            fetchUsers();

        } catch (error) {
            setLoading(false);
        }
    }

  return (
    <div className="px-5 bg-gray-50">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Users Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all platform users
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-3">
          <p className="text-md text-gray-500 font-bold">
            Total Users :
          </p>

          <h2 className="text-2xl font-bold text-indigo-600">
            {totalUsers}
          </h2>
        </div>
      </div>

      {stats && <UserStatsCards stats={stats} />}

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-5 mt-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* SEARCH */}
          <TextField
            type="text"
            label="Search users by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-2/7'
            size='small'
          />

          {/* FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3 w-2/5">
            <TextField
              select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              size='small'
              className='w-1/2'
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </TextField>

            <TextField
              select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Role"
              size='small'
              className='w-1/2'
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </div>
        </div>
      </div>

      {selectedRows.ids.size > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-4 flex items-center justify-between">
            
            <p className="font-medium text-gray-700">
            {selectedRows.ids.size} users selected
            </p>

            <div className="flex gap-3">

            <button
                onClick={() =>
                handleBulkAction("Active")
                }
                className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
            >
                Activate Selected
            </button>

            <button
                onClick={() =>
                handleBulkAction("Suspended")
                }
                className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
            >
                Suspend Selected
            </button>

            </div>
        </div>
        )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <UsersTable
          users={users}
          loading={loading}
          totalUsers={totalUsers}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          handleUserAction={handleUserAction}
          handleViewUser={handleViewUser}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          sortModel={sortModel}
          setSortModel={setSortModel}
        />
      </div>

      <UserDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={selectedUser}
        updateUser={updateUser}
       />

        <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmUserAction}
        loading={actionLoading}
        title={
            actionData?.action === "suspend"
            ? "Suspend User"
            : "Activate User"
        }
        description={
            actionData?.action === "suspend"
            ? `Are you sure you want to suspend ${actionData?.user?.name}?`
            : `Are you sure you want to activate ${actionData?.user?.name}?`
        }
        confirmText={
            actionData?.action === "suspend"
            ? "Suspend"
            : "Activate"
        }
        confirmColor={
            actionData?.action === "suspend"
            ? "error"
            : "success"
        }
        />
    </div>
  )
}

export default Users;