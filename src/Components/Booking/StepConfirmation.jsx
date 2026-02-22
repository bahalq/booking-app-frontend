import { useState } from "react";
import { api } from "../../services/api";

export default function StepConfirmation({ data, prevStep, ground }) {
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [error, setError] = useState("");

  const handleConfirm = () => {
    setStatus("submitting");
    api.createBooking({
      terrain_id: data.terrainId,
      date: data.date,
      start_time: data.timeSlot,
      client_first_name: data.client.firstName,
      client_last_name: data.client.lastName,
      client_email: data.client.email,
      client_phone: data.client.phone,
      client_cin: data.client.cin,
      // You can pass user_id if you have it in context, but for now we rely on client info
    })
    .then((res) => {
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(res.message || "Booking failed");
      }
    })
    .catch(() => {
      setStatus("error");
      setError("Network error");
    });
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-500">Booking Confirmed!</h2>
        <p className="text-gray-400 mt-2">Check your email for details.</p>
        <button onClick={() => window.location.href = '/'} className="mt-8 bg-zinc-700 px-6 py-2 rounded hover:bg-zinc-600">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review Booking</h2>
      
      <div className="bg-zinc-900 p-6 rounded-lg mb-6 space-y-3">
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="text-gray-400">Ground</span>
          <span>{ground.name}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="text-gray-400">Date</span>
          <span>{data.date}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="text-gray-400">Time</span>
          <span>{data.timeSlot}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="text-gray-400">Total Price</span>
          <span className="font-bold text-green-400 text-lg">{data.terrainPrice} DH</span>
        </div>
        <div className="pt-2">
           <span className="text-gray-400 block mb-1">Client</span>
           <span className="block font-medium">{data.client.firstName} {data.client.lastName}</span>
           <span className="block text-sm text-gray-500">{data.client.email}</span>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-900/50 text-red-200 p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button onClick={prevStep} className="text-gray-400 hover:text-white" disabled={status === "submitting"}>
          &larr; Back
        </button>
        <button 
          onClick={handleConfirm} 
          disabled={status === "submitting"}
          className="bg-green-600 px-8 py-3 rounded hover:bg-green-500 font-bold disabled:opacity-50"
        >
          {status === "submitting" ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
