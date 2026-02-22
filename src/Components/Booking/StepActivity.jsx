import {
  GiBasketballBall,
  GiSoccerBall,
  GiTennisRacket,
  GiVolleyballBall,
} from "react-icons/gi";
import { FaTableTennis } from "react-icons/fa";
import { TbPlayHandball, TbSwimming } from "react-icons/tb";

export default function StepActivity({ ground, updateData, nextStep }) {
  if (!ground.activities || ground.activities.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No activities available for this ground.
      </div>
    );
  }

  const icons = {
    Football: <GiSoccerBall />,
    Tennis: <GiTennisRacket />,
    Basketball: <GiBasketballBall />,
    Volleyball: <GiVolleyballBall />,
    Handball: <TbPlayHandball />,
    Badminton: <img src="/badminton.png" alt="" srcset="" />,
    Swimming: <TbSwimming />,
    "Table Tennis": <FaTableTennis />,
  };

  const handleSelect = (id) => {
    updateData("activityId", id);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Activity</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ground.activities.map((act) => (
          <button
            key={act.id}
            onClick={() => handleSelect(act.id)}
            className="flex flex-col items-center justify-center p-6 bg-zinc-700 hover:bg-green-600 rounded-lg transition-colors border border-transparent hover:border-green-400"
          >
            <span className="text-4xl mb-2">{icons[act.name]}</span>
            <span className="font-semibold">{act.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
