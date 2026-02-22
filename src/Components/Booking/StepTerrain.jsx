import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function StepTerrain({ ground, data, updateData, nextStep, prevStep }) {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.activityId) {
      api.getTerrainsByActivity(ground.id, data.activityId)
        .then((res) => {
          if (res.success) setTerrains(res.terrains);
        })
        .finally(() => setLoading(false));
    }
  }, [ground.id, data.activityId]);

  const handleSelect = (terrain) => {
    updateData("terrainId", terrain.id);
    updateData("terrainPrice", terrain.price_per_hour);
    nextStep();
  };

  if (loading) return <div>Loading terrains...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Terrain</h2>
      
      {terrains.length === 0 ? (
        <div className="text-gray-400">No terrains found for this activity.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terrains.map((terrain) => (
            <button
              key={terrain.id}
              onClick={() => handleSelect(terrain)}
              className="text-left p-4 bg-zinc-700 hover:bg-green-600 rounded-lg transition-colors border-l-4 border-green-500"
            >
              <h3 className="text-lg font-bold">{terrain.name}</h3>
              <p className="text-sm opacity-80">{terrain.type || "Standard Terrain"}</p>
              <p className="text-green-400 font-bold mt-2">{terrain.price_per_hour} DH/hour</p>
            </button>
          ))}
        </div>
      )}

      <button onClick={prevStep} className="mt-6 text-gray-400 hover:text-white">
        &larr; Back
      </button>
    </div>
  );
}
