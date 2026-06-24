import { Avatar, Box, Chip, Divider, Drawer, Typography, Button } from '@mui/material';
import React from 'react'

const UserDetailsDrawer = ({ open, onClose, user, updateUser }) => {
    if(!user) return null;    

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box className="w-100 h-full flex flex-col bg-white">
        
        {/* Header */}
        <div className="p-6 flex items-center gap-4 border-b">
          <Avatar
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&bold=true`}
            alt={user.name}
            sx={{
              width: 72,
              height: 72,
            }}
          />

          <div>
            <Typography variant="h6" fontWeight="bold">
              {user.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-auto space-y-5">

          {/* Status */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Status
            </Typography>

            <Chip
              label={user.status}
              color={
                user.status === "Active"
                  ? "success"
                  : user.status === "Suspended"
                  ? "error"
                  : "warning"
              }
              className="mt-2"
            />
          </div>

          <Divider />

          {/* Role */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Role
            </Typography>

            <Typography fontWeight="600">
              {user.role}
            </Typography>
          </div>

          <Divider />

          {/* Provider */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Login Provider
            </Typography>

            <Typography fontWeight="600">
              {user.provider}
            </Typography>
          </div>

          <Divider />

          {/* Mobile */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Mobile
            </Typography>

            <Typography fontWeight="600">
              {user.mobile || "Not Added"}
            </Typography>
          </div>

          <Divider />

          {/* Email Verification */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Email Verification
            </Typography>

            <Chip
              label={
                user.isEmailVerified
                  ? "Verified"
                  : "Not Verified"
              }
              color={
                user.isEmailVerified
                  ? "success"
                  : "warning"
              }
              className="mt-2"
            />
          </div>

          <Divider />

          {/* Last Login */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Last Login
            </Typography>

            <Typography fontWeight="600">
              {user.lastLoginDate
                ? new Date(
                    user.lastLoginDate
                  ).toLocaleString()
                : "Never"}
            </Typography>
          </div>

          <Divider />

          {/* Joined */}
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Joined At
            </Typography>

            <Typography fontWeight="600">
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </Typography>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t flex gap-3">
          {user.status === "Suspended" ? (
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() =>
                updateUser(user._id, {
                  status: "Active",
                })
              }
            >
              Activate User
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() =>
                updateUser(user._id, {
                  status: "Suspended",
                })
              }
            >
              Suspend User
            </Button>
          )}
          <Button
            fullWidth
            variant="outlined"
            onClick={() =>
                updateUser(user._id, {
                role: user.role === "Admin" ? "User" : "Admin",
                })
            }
            >
            {user.role === "Admin"
                ? "Remove Admin"
                : "Make Admin"}
            </Button>
        </div>
      </Box>
    </Drawer>
  )
}

export default UserDetailsDrawer
