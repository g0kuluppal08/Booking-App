import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select"; // Import react-select

function AddNewCourt() {
  const [formData, setFormData] = useState({
    city: "",
    sport: "",
    court_name: "",
    price: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courtData, setCourtData] = useState([]);
  const [sportData, setSportData] = useState([]);

  // List of cities
  const cityOptions = [
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bengaluru", label: "Bengaluru" },
    { value: "Hyderabad", label: "Hyderabad" },
  ];

  // Custom styles for react-select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black", // text color
      backgroundColor: state.isSelected ? "blue" : "white", // background color for selected and non-selected options
      "&:hover": {
        backgroundColor: "lightgray", // background color on hover
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: "gray", // border color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // text color for the selected value
    }),
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle city change from React Select
  const handleCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      city: selectedOption ? selectedOption.value : "",
    });
  };

  // Handle sport change from React Select
  const handleSportChange = (selectedOption) => {
    setFormData({
      ...formData,
      sport: selectedOption ? selectedOption.value : "",
    });
  };

  // Fetch sport data based on city
  useEffect(() => {
    const fetchSportData = async () => {
      if (formData.city) {
        try {
          const response = await fetch(`/api/admin/getsport/${formData.city}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const sportsOptions = data.sports.map((sport) => ({
              value: sport,
              label: sport,
            }));
            setSportData(sportsOptions);
          } else {
            console.error("Failed to fetch sports.");
          }
        } catch (err) {
          console.error("Error fetching sports:", err);
        }
      }
    };

    fetchSportData();
  }, [formData.city]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await fetch("/api/admin/createCourt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Court Created Successfully");
        setFormData({
          city: "",
          sport: "",
          court_name: "",
          price: "",
        });
      } else {
        setError(
          data.message ||
            "Failed to create court. Ensure city + sport + court name is unique."
        );
      }

      setLoading(false);
    } catch (err) {
      setError("An error occurred while creating the court.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center w-screen"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')", // Replace with your background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif", // Use Poppins font for the entire page
      }}
    >
      {/* Navigation Bar */}
      <nav className="w-full py-2 bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600 ml-5">
            Court Booking Admin
          </div>
          <div className="space-x-4">
            <Link
              to="/admin/showallbookings"
              className="mr-5 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Show All Bookings
            </Link>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="pt-16 w-full flex flex-col items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Create New Court
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* City Dropdown (with custom styles) */}
            <div>
              <label className="block text-gray-700">City:</label>
              <Select
                options={cityOptions}
                onChange={handleCityChange}
                value={cityOptions.find(
                  (option) => option.value === formData.city
                )}
                placeholder="Select Center"
                isClearable
                styles={customStyles} // Applying custom styles here
              />
            </div>

            {/* Sport Dropdown (Populated based on city selection with search and toggle) */}
            <div>
              <label className="block text-gray-700">Sport:</label>
              <Select
                options={sportData}
                onChange={handleSportChange}
                value={sportData.find(
                  (option) => option.value === formData.sport
                )}
                placeholder="Select Sport"
                isClearable
                styles={customStyles} // Applying custom styles here
              />
            </div>

            {/* Court Name */}
            <div>
              <label className="block text-gray-700">Court Name:</label>
              <input
                type="text"
                name="court_name"
                value={formData.court_name}
                onChange={handleChange}
                required
                placeholder="Enter court name"
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Enter price"
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {loading ? "Creating..." : "Create Court"}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Success Message */}
          {success && (
            <p className="text-green-500 text-center mt-4">{success}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNewCourt;
