import React from 'react';

export const StatCard = ({ title, value, color, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div><p className="text-gray-500 text-sm">{title}</p><p className="text-3xl font-bold mt-2">{value}</p></div>
        <div className={`${color} text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>{icon}</div>
      </div>
    </div>
  );
};