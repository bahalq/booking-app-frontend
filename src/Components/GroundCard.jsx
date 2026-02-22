import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiGooglemaps } from "react-icons/si";

export default function GroundCard({ ground,price }) {
  const { t } = useTranslation();

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden shadow">
      <img
        src={`http://localhost/booking-app%20-%20Copy/backend/uploads/grounds/${ground.images?.[0] || "default.jpg"}`}
        alt={ground.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4 text-white flex flex-col gap-2">
        <h3 className="text-lg font-bold">{ground.name}</h3>
        <p className="flex items-center gap-1">
          {ground.city}{" "}
          <abbr title={t("viewOnMap")}>
            <a
              href={`https://www.google.com/maps?q=${ground.latitude},${ground.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 "
            >
              <SiGooglemaps />
            </a>
          </abbr>
        </p>
        <p className="text-sm text-gray-400">
          {t("pricePerHour")}: {price.min_price > 0 ? `Starting from ${price.min_price}` : "Contact for price"} DH
        </p>

        <Link
          to={`/grounds/${ground.id}`}
          className="mt-2 bg-green-600 text-center py-2 rounded hover:bg-green-700"
        >
          {t("bookNow")}
        </Link>
      </div>
    </div>
  );
}
