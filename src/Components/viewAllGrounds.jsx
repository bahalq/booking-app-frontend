import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageCarousel from "./ImageCarousel";
import { api } from "../services/api"; // Updated to use centralized API

export default function ViewGrounds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGrounds = async () => {
    try {
      setLoading(true);
      const data = await api.getAllGrounds();

      if (data.success) {
        setGrounds(data.grounds);
      } else {
        setError(t(`errors.${data.error}`));
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(t("errors.server_error"));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirm.deleteGround"))) return;
    try {
      // Assuming api.deleteGround exists or we fix it here.
      // Since deleteGround.php is checked earlier, we should add it to api.js or call fetch directly with correct URL.
      // Ideally update api.js, but for now fixed URL:
      const res = await fetch(
        `http://localhost/booking-app - Copy/backend/deleteGround.php?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (data.success) {
        setGrounds((prev) => prev.filter((g) => g.id !== id));
      } else {
        alert(t(`errors.${data.error}`));
      }
    } catch (err) {
      console.error(err);
      alert(t("errors.server_error"));
    }
  };

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 flex flex-col gap-6 text-white">
      <h1 className="text-2xl font-bold">{t("viewGrounds")}</h1>
      {grounds.length === 0 && <p>{t("noGrounds")}</p>}
      {grounds.map((g) => (
        <div key={g.id} className="border p-4 rounded flex gap-4 items-center">
          {/* صورة أولى */}
          {g.images && g.images.length > 0 && (
            <ImageCarousel images={g.images} />
          )}

          {/* معلومات الملعب */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{g.name}</h2>
            <h2 className="text-lg font-semibold">{g.city}</h2>
            <p className="text-green-400 font-bold">
              {g.tuning_price > 0
                ? `From ${g.tuning_price} DH`
                : "Contact for price"}
            </p>

            {/* Google Maps Link */}
            <a
              href={`https://www.google.com/maps?q=${g.latitude},${g.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {t("viewOnMap")}
            </a>
          </div>

          {/* زر الحذف */}
          <button
            onClick={() => handleDelete(g.id)}
            className="bg-red-950 border text-white px-3 py-1 rounded hover:translate-y-0.5 cursor-pointer"
          >
            {t("delete")}
          </button>
          <button
          className="rounded text-white bg-green-950 border px-3 py-1 hover:translate-y-0.5 cursor-pointer"
            onClick={() => navigate(`/admin/grounds/${g.id}/terrains`)}
          >
            Manage pitches
          </button>
        </div>
      ))}
    </div>
  );
}
