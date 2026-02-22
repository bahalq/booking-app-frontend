import { useState } from "react";

export default function StepClientInfo({ data, updateData, nextStep, prevStep }) {
  const [formData, setFormData] = useState(data.client);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData("client", formData);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Information</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <input
          required
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="p-3 bg-zinc-700 rounded border border-zinc-600"
        />
        <input
          required
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="p-3 bg-zinc-700 rounded border border-zinc-600"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 bg-zinc-700 rounded border border-zinc-600"
        />
        <input
          required
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="p-3 bg-zinc-700 rounded border border-zinc-600"
        />
        <input
          required
          name="cin"
          placeholder="National ID (CIN)"
          value={formData.cin}
          onChange={handleChange}
          className="p-3 bg-zinc-700 rounded border border-zinc-600 md:col-span-2"
        />
        
        <div className="md:col-span-2 flex justify-between mt-4">
          <button type="button" onClick={prevStep} className="text-gray-400 hover:text-white">
            &larr; Back
          </button>
          <button type="submit" className="bg-green-600 px-8 py-2 rounded hover:bg-green-500 font-bold">
            Next: Review
          </button>
        </div>
      </form>
    </div>
  );
}
