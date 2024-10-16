import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select"; // Import react-select
import AutocompleteSelect from "../AutoCompleteSelect";

function AddNewCourt() {
  const apiurl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    centre: "",
    sport: "",
    name: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [centers, setCentres] = useState([]);
  const [sport, setSport] = useState([]);



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

     const fetchdata = async () => {
       try {
         const response = await fetch(apiurl + "/api/centres/all", {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         });
         const data = await response.json();
         console.log(data);
         if (!response.ok) {
         } else {
           setCentres(data);
         }
       } catch (error) {
         console.log("error fectching centers");
       }
     };
     useEffect(() => {
       fetchdata();
     }, []);
     const fectchSportData = async () => {
       try {
         const response = await fetch(
           apiurl + `/api/centres/${formData.centre}/sports`,
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
         );
         const data = await response.json();
         console.log(data);
         // return ;
         if (!response.ok) {
         } else {
           setSport(data);
         }
       } catch (error) {
         console.log("error fectching Sports");
       }
     };
     useEffect(() => {
       fectchSportData();
     }, [formData.centre]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await fetch(apiurl + "/api/admin/courts/add", {
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
              <AutocompleteSelect options={centers} field={"centre"} formData={formData} setFormData={setFormData}/>
            </div>

            {/* Sport Dropdown (Populated based on city selection with search and toggle) */}
            <div>
              <AutocompleteSelect options={sport} field={"sport"} formData={formData} setFormData={setFormData}/>
            </div>

            {/* Court Name */}
            <div>
              <label className="block text-gray-700">Court Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
