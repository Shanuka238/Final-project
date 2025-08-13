import React from "react";

export default function MyProfile({ staff }) {
  if (!staff) return null;
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-3xl font-bold text-purple-700 mb-3">
          <span className="text-4xl text-gray-400">+</span>
      </div>
      <div className="font-semibold text-lg text-purple-900">{staff.name}</div>
      <div className="text-gray-500 text-sm mb-1">{staff.email}</div>
      <div className="text-purple-700 text-xs font-medium mb-1">{staff.role}</div>
      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
        Staff Member since {staff.since}
      </span>
    </div>
  );
}
