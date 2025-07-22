import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
     api.get(`/api/videos/id/${id}`)
      .then((res) => setVideo(res.data))
      .catch(() => setVideo(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Memuat video...</div>;
  if (!video) return <div className="p-4 text-red-500">Video tidak ditemukan.</div>;

  return (
    <MainLayout>
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(video.published_at).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <div className="aspect-video bg-black rounded overflow-hidden mb-4">
          <video
            controls
            autoPlay
            className="w-full h-full object-contain"
            poster={`http://localhost:8000/storage/${video.thumbnail}`}
          >
            <source
              src={`http://localhost:8000/storage/${video.url}`}
              type="video/mp4"
            />
            Browser tidak mendukung tag video.
          </video>
        </div>

        <p className="text-base text-gray-700 leading-relaxed">{video.description}</p>
      </div>
    </MainLayout>
  );
};

export default VideoDetail;
