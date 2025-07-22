// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Login berhasil!");
      navigate("/");
    } catch (err) {
      toast.error("Login gagal. Cek email dan password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">ATAU</div>

        <a
          href="http://localhost:8000/api/auth/google/redirect"
          className="w-full inline-block bg-red-500 text-white py-3 rounded-md text-center mb-2 hover:bg-red-600"
        >
          Login dengan Google
        </a>
        <a
          href="http://localhost:8000/api/auth/auth/facebook"
          className="w-full inline-block bg-blue-700 text-white py-3 rounded-md text-center hover:bg-blue-800"
        >
          Login dengan Facebook
        </a>

        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
