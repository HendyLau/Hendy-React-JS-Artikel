// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")); // pastikan data user sudah disimpan di localStorage

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Selamat datang, {user?.name || "User"} 👋</h1>
        <p className="text-sm text-gray-500 mb-6">Tipe Membership: <span className="font-medium text-blue-600">{user?.membership}</span></p>

        <div className="space-y-4">
          {(user?.membership === "A" || user?.membership === "C") && (
            <Link
              to="/articles"
              className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-center transition"
            >
              Lihat Artikel
            </Link>
          )}

          {(user?.membership === "B" || user?.membership === "C") && (
            <Link
              to="/videos"
              className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-center transition"
            >
              Lihat Video
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
