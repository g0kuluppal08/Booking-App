import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutocompleteSelect from "../AutoCompleteSelect";

function UserBooking() {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    city: "",
    sport: "",
    date: "",
  });
  const [courts, setCourts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (Search for courts)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCourts([]);
    setLoading(true);

    try {
      const response = await fetch("/api/user/getCourtForBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setCourts(data); // Set available courts
        setLoading(false);
      } else {
        setError(data.message || "Failed to fetch available courts.");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred while fetching the courts.");
      setLoading(false);
    }
  };

  // Handle Create Booking (Navigate to CreateABooking page with court details)
  const handleCreateBooking = (court) => {
    navigate("/createBooking", {
      state: {
        courtId: court["court Id"],
        courtName: court["court name"],
        courtPrice: court["court price"],
        startTime: formData.startTime,
        endTime: formData.endTime,
        date: formData.date,
      },
    });
  };

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const sports = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const timing = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  return (
    <div className="min-h-screen bg-white p-8 w-screen">
      {/* Navigation Bar */}
      <nav className="w-full bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="space-x-4 text-lg font-bold">
            <Link
              to="/user/createabooking"
              className="hover:underline text-white"
            >
              Create Booking
            </Link>
            <Link to="/user/mybookings" className="hover:underline text-white">
              My Bookings
            </Link>
          </div>
        </div>
      </nav>

      <h2 className="text-2xl font-semibold mb-6">Search Available Courts</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 m-20">
        {/* City */}
        <div>
          <AutocompleteSelect options={cities} field={"City"} />
        </div>

        {/* Sport */}
        <div>
          <AutocompleteSelect options={sports} field={"Sport"} />
        </div>

        {/*Time */}
        <div>
          <AutocompleteSelect options={timing} field={"time Slot"} />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70"
        >
          {loading ? "Searching..." : "Search Courts"}
        </button>
      </form>

      {/* Court Listings */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.length === 0 ? (
          <p className="text-center">
            No courts available for the selected criteria.
          </p>
        ) : (
          courts.map((court) => (
            <div
              key={court["court Id"]}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="text-xl font-bold mb-2">{court["court name"]}</h3>
              <p>
                <strong>Price:</strong> ${court["court price"]}
              </p>
              <button
                onClick={() => handleCreateBooking(court)}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Create Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserBooking;
