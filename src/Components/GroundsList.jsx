import { useEffect, useState } from "react";
import GroundCard from "./GroundCard";
import { api } from "../services/api";
import { useTranslation } from "react-i18next";

export default function GroundsList() {
  const [grounds, setGrounds] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([
      api.getAllGrounds(),
      api.getGroundPrices()
    ]).then(([groundsRes, pricesRes]) => {
      if (groundsRes.success) setGrounds(groundsRes.grounds);
      if (pricesRes.success) setPrices(pricesRes.grounds);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-white">Loading grounds...</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {grounds.map((g) => {
        const priceInfo = prices.find(p => p.id === g.id);
        
        return (
          <GroundCard
            key={g.id}
            ground={g}
            price={priceInfo}
          />
        );
      })}
    </div>
  );
}
