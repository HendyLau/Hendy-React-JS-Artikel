import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/posts/id/${id}`)
      .then((res) => setArticle(res.data))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <MainLayout><div className="p-4">Loading...</div></MainLayout>;
  if (!article) return <MainLayout><div className="p-4 text-red-600">Artikel tidak ditemukan.</div></MainLayout>;

  return (
            <MainLayout>
            <div className="p-4 md:p-6">
              <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(article.published_at).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {article.image && (
                <img
                  src={`http://localhost:8000/storage/${article.image}`}
                  alt={article.title}
                  className="w-full max-h-[500px] object-cover rounded mb-4"
                />
              )}

              <div
                className="text-base leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </MainLayout>

  );
};

export default ArticleDetail;
