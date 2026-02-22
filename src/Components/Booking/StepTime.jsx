import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function StepTime({ data, updateData, nextStep, prevStep }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.terrainId && data.date) {
      setLoading(true);
      api.getAvailability(data.terrainId, data.date)
        .then((res) => {
          if (res.success) {
            setSlots(res.available_slots || []);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [data.terrainId, data.date]);

  const handleSelect = (time) => {
    updateData("timeSlot", time);
    nextStep();
  };

  if (loading) return <div className="text-gray-400">Checking availability...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Select Time Slot</h2>
      
      {slots.length === 0 ? (
        <div className="text-red-400">No slots available for this date.</div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => handleSelect(slot.time)}
              className="p-3 rounded-lg border transition-all text-sm font-medium bg-zinc-700 hover:bg-green-600 border-zinc-600 hover:border-green-400 text-white"
            >
              {slot.display}
            </button>
          ))}
        </div>
      )}

      <button onClick={prevStep} className="mt-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        &larr; Back
      </button>
    </div>
  );
}
