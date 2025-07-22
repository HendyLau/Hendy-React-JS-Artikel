// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getUser()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <div className="p-4">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
