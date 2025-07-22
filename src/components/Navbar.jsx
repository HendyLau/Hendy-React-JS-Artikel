
import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api"; // dari services
import { Link } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Gagal ambil kategori:", err));
  }, []);

  return (
   
        <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-2 flex gap-6 text-sm">
        <Link to="/">Home</Link>
        
        </div>
      </nav>
   
  );
};

export default Navbar;
