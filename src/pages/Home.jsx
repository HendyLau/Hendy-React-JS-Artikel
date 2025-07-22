import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchArticles, fetchVideos } from "../services/api";
import { getUser } from "../services/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res.data);
        return Promise.all([fetchArticles(), fetchVideos()]);
      })
      .then(([articleRes, videoRes]) => {
        setArticles(articleRes.data?.data || []);
        setVideos(videoRes.data?.data || []);
      })
      .catch(() => {
        toast.error("Gagal memuat data");
      })
      .finally(() => setLoading(false));
  }, []);

  const limit =
    user?.membership_type === "A"
      ? 3
      : user?.membership_type === "B"
      ? 10
      : Number.MAX_SAFE_INTEGER;

  return (
    <MainLayout>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Artikel */}
        <div>
          <h2 className="text-xl text-center font-bold mb-4">ARTIKEL</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <>
            {articles.slice(0, limit).map((article) => (
                <Link
                  to={`/articles/${article.id}`}
                  key={article.id}
                  className="block"
                >
                  <div className="flex gap-4 mb-4 bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer min-h-[112px]">
                    <img
                      src={`http://localhost:8000/storage/${article.image || "default.jpg"}`}
                      alt={article.title}
                      className="w-28 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-base font-semibold line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}


              {articles.length > limit && (
                <Link
                  to="/articles"
                  className="inline-block mt-2 text-blue-600 text-sm hover:underline"
                >
                  Lihat semua artikel →
                </Link>
              )}
            </>
          )}
        </div>

        {/* Video */}
        <div>
          <h2 className="text-xl text-center font-bold mb-4">VIDEO</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <>
              {videos.slice(0, limit).map((video) => (
                <Link
                  to={`/videos/${video.id}`}
                  key={video.id}
                  className="flex gap-4 mb-4 bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer min-h-[112px]"
                >
                 <div className="w-28 h-20 bg-black rounded overflow-hidden">
                    <video controls className="w-full h-full object-cover rounded">
                      <source
                        src={`http://localhost:8000/storage/${video.url}`}
                        poster={`http://localhost:8000/storage/${video.thumbnail}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(video.published_at).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </Link>
              ))}

              {videos.length > limit && (
                <Link
                  to="/videos"
                  className="inline-block mt-2 text-blue-600 text-sm hover:underline"
                >
                  Lihat semua video →
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
