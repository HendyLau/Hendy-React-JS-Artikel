// src/pages/Videos.jsx
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getUser } from "../services/auth";
import { fetchVideos } from "../services/api";
import toast from "react-hot-toast";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res.data);
        return fetchVideos();
      })
      .then((res) => setVideos(res.data?.data || []))
      .catch(() => {
        toast.error("Gagal mengambil data video");
        window.location.href = "/login";
      })
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

  const limit =
    user.membership_type === "A" ? 3 : user.membership_type === "B" ? 10 : videos.length;

  const filtered = videos
    .slice(0, limit)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Video Terbaru</h1>
      <input
        type="text"
        placeholder="Cari video..."
        className="mb-4 w-full p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-200 rounded" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="flex gap-4 p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
              onClick={() => (window.location.href = `/videos/${video.id}`)}
            >
              <div className="w-40 h-24 bg-black rounded overflow-hidden">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold line-clamp-2">{video.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Videos;
