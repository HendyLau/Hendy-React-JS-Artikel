import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getUser } from "../services/auth";
import { fetchArticles } from "../services/api";
import toast from "react-hot-toast";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res.data);
        return fetchArticles();
      })
      .then((res) => setArticles(res.data?.data || []))
      .catch(() => {
        toast.error("Gagal mengambil data artikel");
        window.location.href = "/login";
      })
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

  const limit =
    user.membership_type === "A"
      ? 3
      : user.membership_type === "B"
      ? 10
      : articles.length;

  const filtered = articles
    .slice(0, limit)
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Berita Terbaru</h1>

        <input
          type="text"
          placeholder="Cari artikel..."
          className="mb-6 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-24 bg-gray-200 rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">Artikel tidak ditemukan.</p>
        ) : (
          <div className="space-y-6">
            {filtered.map((article) => (
              <div
                key={article.id}
                className="flex gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => (window.location.href = `/articles/${article.id}`)}
              >
                <img
                  src={
                    article.image
                      ? `http://localhost:8000/storage/${article.image}`
                      : "https://via.placeholder.com/150x100?text=No+Image"
                  }
                  alt={article.title}
                  className="w-36 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold line-clamp-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {article.short_description || "Tidak ada deskripsi"}
                  </p>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Articles;
