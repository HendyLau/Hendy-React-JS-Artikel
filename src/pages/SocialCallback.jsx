// src/pages/SocialCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SocialCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      // Simpan token ke localStorage
      localStorage.setItem("auth_token", token);

      // Set token untuk axios default
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Ambil user info buat validasi
      axios.get("http://localhost:8000/api/user")
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/"); // ⬅️ Balik ke home setelah login
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return <p className="text-center mt-10">Menyambungkan akun...</p>;
};

export default SocialCallback;
