// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    membership_type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await axios.get("/sanctum/csrf-cookie"); 
      await axios.post("/api/register", {
        ...form,
        password_confirmation: form.password,
      });

      toast.success("Registrasi berhasil. Silakan login.");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 422) {
        Object.values(error.response.data.errors).forEach((err) => toast.error(err[0]));
      } else {
        toast.error("Registrasi gagal.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="membership_type"
            value={form.membership_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Membership</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
