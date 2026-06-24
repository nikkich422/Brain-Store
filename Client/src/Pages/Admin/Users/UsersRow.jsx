import React from 'react'

const UsersRow = ({ user }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
        <td className='px-6 py-4'>
            <div className='flex items-center gap-3'>
                <img
                    src={user.avatar || './avatar.png'}
                    alt={user.name}
                    className='w-11 h-11 rounded-full object-cover'
                />
                <div>
                    <h3 className="font-semibold text-gray-800">
                    {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                    {user.email}
                    </p>
                </div>
            </div>
        </td>
        {/* Role */}
        <td className="px-6 py-4">
            <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.role === "Admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
            >
            {user.role}
            </span>
        </td>

        {/* Status */}
        <td className="px-6 py-4">
            <StatusBadge status={user.status} />
        </td>

        {/* Joined */}
        <td className="px-6 py-4 text-sm text-gray-500">
            {new Date(user.createdAt).toLocaleDateString()}
        </td>

        {/* Actions */}
        <td className="px-6 py-4">
            <div className="flex justify-end gap-2">
                <button className="px-3 py-1.5 text-sm rounded-xl border border-gray-300 hover:bg-gray-100">
                    Edit
                </button>
                <button className="px-3 py-1.5 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600">
                    Suspend
                </button>
            </div>
        </td>
    </tr>
  )
}

export default UsersRow;
