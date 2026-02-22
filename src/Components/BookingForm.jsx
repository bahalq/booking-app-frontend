import { useEffect, useState } from "react";

export default function BookingForm({ groundId }) {
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [booked, setBooked] = useState([]);
  const [error, setError] = useState(null);

  const hours = [...Array(24).keys()].map((h) => `${h}:00`);

  useEffect(() => {
    if (!date || !groundId) return;

    fetch(
      `http://localhost/booking-app/backend/getBookedHours.php?ground_id=${groundId}&date=${date}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => setBooked(data))
      .catch(() => setBooked([]));
  }, [date, groundId]);

  const isBooked = (hour) => {
    const h = parseInt(hour);
    return booked.some(
      (b) => h >= parseInt(b.time_from) && h < parseInt(b.time_to)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !from) {
      alert("Please select date and hour");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ground_id", groundId);
      formData.append("date", date);
      formData.append("from", from);
      formData.append("to", to);

      const res = await fetch(
        "http://localhost/booking-app/backend/addBooking.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success) {
        alert("Booking successful!");
        setBooked([...booked, { time_from: from, time_to: to }]);
        setFrom("");
        setTo("");
        setDate("");
      } else {
        alert(data.error || "Failed to book");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {hours.map((h) => (
          <button
            key={h}
            type="button"
            disabled={isBooked(h)}
            onClick={() => {
              setFrom(h);
              setTo(`${parseInt(h) + 1}:00`);
            }}
            className={`p-2 rounded text-white ${
              isBooked(h) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {h}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Book
      </button>
    </form>
  );
}
