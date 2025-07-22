import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import toast from "react-hot-toast";

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Berhasil logout");
      navigate("/login");
    } catch (error) {
      toast.error("Gagal logout");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center uppercase">
          {user?.name?.[0] || "U"}
        </div>
        <span>{user?.name || "User"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
