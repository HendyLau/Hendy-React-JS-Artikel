import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialLoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi ambil user session
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          credentials: "include", // agar sanctum cookie terbaca
        });
        const user = await res.json();
        console.log("User dari Google login:", user);

        if (user) {
          // Simpan user ke localStorage atau context
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Gagal fetch user:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return <div>Logging you in via Google...</div>;
};

export default SocialLoginRedirect;
