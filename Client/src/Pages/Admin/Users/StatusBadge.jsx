import React from 'react'

const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Inactive: "bg-yellow-100 text-yellow-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  )
}

export default StatusBadge;
