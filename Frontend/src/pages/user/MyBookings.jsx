import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      const apiurl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await fetch(`${apiurl}/api/bookings/mybookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBookings(data);
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch bookings.");
          setLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching the bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 w-screen">
      {/* Navigation Bar */}
      <nav className="w-full bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="space-x-4 text-lg font-bold">
            {/* <Link to="/user/createabooking" className="hover:underline">
              Create Booking
            </Link> */}
            <Link to="/user/userbookings" className="hover:underline">
              Search Courts
            </Link>
          </div>
        </div>
      </nav>

      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      {/* Loading Spinner */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Booking Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && bookings.length === 0 ? (
          <p className="text-center">You have no previous bookings.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking["booking Id"]}
              className="bg-orange-500 rounded-lg p-4"
            >
              <h3 className="text-xl font-bold mb-2">
                {booking["court"]}
              </h3>
              <p>
                <strong>Booking ID:</strong> {booking["_id"]}
              </p>
              <p>
                <strong>City:</strong> {booking.centre}
              </p>
              <p>
                <strong>Sport:</strong> {booking.sport}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.startTime+ "-"+booking.endTime}
              </p>
              <p>
                <strong>Price:</strong> ${booking.price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;
