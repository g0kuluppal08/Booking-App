import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShowAllBookings() {
  const [bookings, setBookings] = useState([]); // All bookings
  const [filteredBookings, setFilteredBookings] = useState([]); // Filtered bookings to display
  const [filters, setFilters] = useState({
    city: "",
    court: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null); // Error handling state
  const [loading, setLoading] = useState(true); // Loading state to show when fetching data
  const [deleting, setDeleting] = useState(false); // Delete action state

  // Fetch bookings from the API on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/admin/getBookings");
        const data = await response.json();
        setBookings(data);
        setFilteredBookings(data); // Initially set the filtered list to all bookings
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings.");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Apply filters to bookings when filters or bookings change
  useEffect(() => {
    let filtered = bookings;

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(
        (booking) => booking.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Filter by court
    if (filters.court) {
      filtered = filtered.filter(
        (booking) => booking.sport.toLowerCase() === filters.court.toLowerCase()
      );
    }

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter((booking) => booking.bd === filters.date);
    }

    // Filter by time
    if (filters.time) {
      filtered = filtered.filter((booking) => booking.bt === filters.time);
    }

    setFilteredBookings(filtered);
  }, [filters, bookings]);

  // Delete booking handler
  const handleDelete = async (bookingId) => {
    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/getBooking/${bookingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted booking from the state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking["booking Id"] !== bookingId)
        );
        setFilteredBookings((prevFiltered) =>
          prevFiltered.filter((booking) => booking["booking Id"] !== bookingId)
        );
        setError(null); // Clear any error message
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete booking");
      }
    } catch (err) {
      setError("An error occurred while trying to delete the booking");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading bookings...</p>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center w-screen bg-white"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')", // Add background image if needed
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif", // Consistent font style with SignIn
      }}
    >
      {/* Embedded custom CSS for <option> elements */}
      <style>{`
        select option {
          color: black; /* Text color for the options */
          background-color: white; /* Optional: changes the background to white */
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="w-full py-2 bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600 ml-5">
            Court Booking Admin
          </div>
          <div className="space-x-4">
            <Link
              to="/admin/addNewCourt"
              className="mr-5 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Court
            </Link>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="pt-16 w-full bg-white p-8 rounded-lg shadow-lg border border-gray-300 mt-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Admin Bookings
        </h2>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
          {/* City Dropdown */}
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-700">
              City:
            </label>
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-600 text-white"
            >
              <option value="">All Cities</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          {/* Court Dropdown */}
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-700">
              Court:
            </label>
            <select
              name="court"
              value={filters.court}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-600 text-white"
            >
              <option value="">All Courts</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Squash">Squash</option>
              <option value="Basketball">Basketball</option>
              <option value="Volleyball">Volleyball</option>
            </select>
          </div>

          {/* Date Input */}
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-700">
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-600 text-white"
            />
          </div>

          {/* Time Input (with predefined 1-hour intervals) */}
          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-700">
              Time:
            </label>
            <select
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-600 text-white"
            >
              <option value="">Select Time Slot</option>
              <option value="08:00">08:00 AM - 09:00 AM</option>
              <option value="09:00">09:00 AM - 10:00 AM</option>
              <option value="10:00">10:00 AM - 11:00 AM</option>
              <option value="11:00">11:00 AM - 12:00 PM</option>
              <option value="12:00">12:00 PM - 01:00 PM</option>
              <option value="13:00">01:00 PM - 02:00 PM</option>
              <option value="14:00">02:00 PM - 03:00 PM</option>
              <option value="15:00">03:00 PM - 04:00 PM</option>
              <option value="16:00">04:00 PM - 05:00 PM</option>
              <option value="17:00">05:00 PM - 06:00 PM</option>
              <option value="18:00">06:00 PM - 07:00 PM</option>
              <option value="19:00">07:00 PM - 08:00 PM</option>
              <option value="20:00">08:00 PM - 09:00 PM</option>
            </select>
          </div>
        </div>

        {/* Booking Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredBookings.length === 0 ? (
            <p className="text-gray-600">
              No bookings found for the selected filters.
            </p>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking["booking Id"]}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 border border-gray-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  {booking.court_name}
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>City:</strong> {booking.city}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Location:</strong> {booking.location}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> {booking.bd}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Time:</strong> {booking.bt}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Price:</strong> ${booking.price}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Sport:</strong> {booking.sport}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Booking ID:</strong> {booking["booking Id"]}
                </p>
                <button
                  onClick={() => handleDelete(booking["booking Id"])}
                  disabled={deleting}
                  className={`w-full py-2 rounded-lg ${
                    deleting ? "bg-gray-400" : "bg-red-500"
                  } text-white font-semibold hover:bg-red-600 transition-colors`}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}
      </div>
    </div>
  );
}

export default ShowAllBookings;
