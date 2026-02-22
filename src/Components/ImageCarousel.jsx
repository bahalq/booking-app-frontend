import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcNext, FcPrevious } from "react-icons/fc";

export default function ImageCarousel({ images,details }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  if (!images || images.length === 0) {
    return (
      <div className="h-40 bg-gray-800 flex items-center justify-center text-gray-400">
        No image
      </div>
    );
  }

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded">
      <img
        src={`http://localhost/booking-app%20-%20Copy/backend/uploads/grounds/${images[index]}`}
        alt="ground"
        className= {!details ? "w-[30vw] object-cover" : "h-100 m-auto object-cover rounded"}

      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2  text-white px-2 rounded"
          >
            <FcPrevious className="text-2xl cursor-pointer" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white px-2 rounded"
          >
            <FcNext className="text-2xl cursor-pointer" />
          </button>
        </>
      )}
    </div>
  );
}
