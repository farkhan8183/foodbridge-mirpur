import { useState } from "react";
import axios from "axios";

function Createdonation() {
  const [formData, setFormData] = useState({
    Donor_ID: "",
    Quantity: "",
    Quality_Score: "",
    DateTime: "",
    Expiry_Date: "",
    Event_Type: "",
    Current_Status: "",
    Field_Type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust URL based on your backend setup
      await axios.post("http://localhost/your-api/createDonation.php", formData);
      alert("Donation created successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">Create Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "Donor_ID", label: "Donor ID", type: "number" },
          { name: "Quantity", label: "Quantity", type: "number" },
          { name: "Quality_Score", label: "Quality Score", type: "number" },
          { name: "DateTime", label: "Date & Time", type: "datetime-local" },
          { name: "Expiry_Date", label: "Expiry Date", type: "date" },
          { name: "Event_Type", label: "Event Type", type: "text" },
          { name: "Current_Status", label: "Current Status", type: "text" },
          { name: "Field_Type", label: "Field Type", type: "text" },
        ].map((input) => (
          <div key={input.name}>
            <label className="block text-sm font-medium mb-1">{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default Createdonation;
