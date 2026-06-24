import React from "react";
import {
  FiShield,
  FiUserCheck,
  FiUsers,
  FiUserX,
  FiMail,
  FiUserMinus,
} from "react-icons/fi";

const UserStatsCards = ({ stats }) => {

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: FiUsers,
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
      icon: FiUserCheck,
    },
    {
      title: "Suspended",
      value: stats?.suspendedUsers || 0,
      icon: FiUserX,
    },
    {
      title: "Admins",
      value: stats?.adminUsers || 0,
      icon: FiShield,
    },
    {
      title: "Verified Users",
      value: stats?.verifiedUsers || 0,
      icon: FiMail,
    },
    {
      title: "Inactive Users",
      value: stats?.inactiveUsers || 0,
      icon: FiUserMinus,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {card.value}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
              <card.icon className="text-2xl text-indigo-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStatsCards;