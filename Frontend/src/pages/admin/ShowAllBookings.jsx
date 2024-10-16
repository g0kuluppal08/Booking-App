import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShowAllBookings() {
  const apiurl = import.meta.env.VITE_API_BASE_URL;
  const [bookings, setBookings] = useState([]); // All bookings
  const [filteredBookings, setFilteredBookings] = useState([]); // Filtered bookings to display
  const [error, setError] = useState(null); // Error handling state
  const [loading, setLoading] = useState(true); // Loading state to show when fetching data
  const [deleting, setDeleting] = useState(false); 
  const formatedDate = (bookingDate) => {
    const date = new Date(bookingDate);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date in 'YYYY-MM-DD' format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };// Delete action state

  // Fetch bookings from the API on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(apiurl + "/api/admin/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if(data.message=="No bookings found"){
          setBookings([]);
          setLoading(false);
          return ;
        }
        setBookings(data);
        setFilteredBookings(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings.");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Handle filter changes

  // Apply filters to bookings when filters or bookings change


  // Delete booking handler
  const handleDelete = async (bookingId) => {
    try {
      setDeleting(true);
      const response = await fetch(apiurl + `/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking["_id"] !== bookingId)
        );
        setFilteredBookings((prevFiltered) =>
          prevFiltered.filter((booking) => booking["_id"] !== bookingId)
        );  
        alert(`Booking with booking Id ${bookingId} deleted sucessfully`)
        setError("");
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

        

        {/* Booking Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {bookings.length === 0 ? (
            <p className="text-gray-600">
              No bookings found.
            </p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking["_id"]}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 border border-gray-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  {booking.court_name}
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>City:</strong> {booking.centre}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> {formatedDate(booking.date)}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Time:</strong> {booking.startTime + "-" + booking.endTime}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Price:</strong> ${booking.price}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Sport:</strong> {booking.sport}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Booking ID:</strong> {booking["_id"]}
                </p>
                <button
                  onClick={() => handleDelete(booking["_id"])}
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
