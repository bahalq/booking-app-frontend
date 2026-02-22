import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useTranslation } from "react-i18next";
import ScheduleEditor from "../Shdule";
import Availability from "../Avaibality";

export default function ManageTerrains() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [terrains, setTerrains] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    width: "",
    length: "",
    price: "",
    activityId: "1", // Default to Football
  });
  const [schedule, setSchedule] = useState({ from: "08:00", to: "23:00" });
  const [days, setDays] = useState([]); // Default all days

  useEffect(() => {
    fetchTerrains();
    api.getActivities().then(res => {
      if (res.success) setActivities(res.activities);
    });
  }, [id]);

  const fetchTerrains = () => {
    api.getTerrainsByGround(id).then((res) => {
      if (res.success) {
        setTerrains(res.terrains);
      }
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ground_id", id);
    formData.append("name", form.name);
    formData.append("width", form.width);
    formData.append("length", form.length);
    formData.append("price", form.price);
    formData.append("activity_id", form.activityId);
    formData.append("schedule_from", schedule.from);
    formData.append("schedule_to", schedule.to);
    formData.append("days", JSON.stringify(days));

    const res = await api.addTerrain(formData);
    if (res.success) {
      setForm({ name: "", width: "", length: "", price: "", activityId: "1" }); // Reset
      setShowForm(false);
      fetchTerrains();
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
        <div className="w-full max-w-5xl">
            <h1 className="text-3xl font-bold mb-6">Manage Terrains</h1>

            {/* List Existing Terrains */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {terrains.map(t => (
                    <div key={t.id} className="bg-zinc-900 p-4 rounded border border-zinc-800 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-xl">{t.name}</h3>
                            <p className="text-gray-400">{t.type}</p>
                            <p className="text-green-400 font-bold">{t.price_per_hour} DH/hr</p>
                        </div>
                        <div className="text-gray-500 text-sm">
                            {/* Actions like delete could go here */}
                            ID: {t.id}
                        </div>
                    </div>
                ))}
                
                {/* Add Button */}
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded hover:border-green-500 hover:bg-zinc-900 transition-all text-gray-400 hover:text-green-500"
                >
                    <span className="text-4xl font-bold">+</span>
                    <span>Add New Pitch</span>
                </button>
            </div>

            {/* Add Terrain Form */}
            {showForm && (
                <div className="bg-zinc-900 p-6 rounded border border-zinc-800 animate-fade-in-up">
                    <h2 className="text-2xl font-bold mb-4 text-green-500">Add New Pitch</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" placeholder="Terrain Name (e.g. Pitch 5)" value={form.name} onChange={handleChange} className="bg-black border border-zinc-700 p-3 rounded" required />
                            <select name="activityId" value={form.activityId} onChange={handleChange} className="bg-black border border-zinc-700 p-3 rounded">
                                {activities.map(a => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="price" type="number" placeholder="Price per Hour (DH)" value={form.price} onChange={handleChange} className="bg-black border border-zinc-700 p-3 rounded" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="width" type="number" placeholder="Width (m)" value={form.width} onChange={handleChange} className="bg-black border border-zinc-700 p-3 rounded" />
                                <input name="length" type="number" placeholder="Length (m)" value={form.length} onChange={handleChange} className="bg-black border border-zinc-700 p-3 rounded" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold">Schedule</label>
                            <ScheduleEditor schedule={schedule} setSchedule={setSchedule} />
                        </div>

                        <div>
                            <label className="block mb-2 font-bold">Available Days</label>
                            <Availability days={days} setDays={setDays} />
                        </div>

                        <button className="bg-green-600 w-full py-3 rounded font-bold hover:bg-green-500 transition-colors">
                            Save Terrain
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
}
