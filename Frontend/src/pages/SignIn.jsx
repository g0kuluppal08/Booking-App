

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./user/Header";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (roleValue) => {
    setRole(roleValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const apiurl = import.meta.env.VITE_API_BASE_URL;
    try {
      setLoading(true);
      const response = await fetch(`${apiurl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role, // Pass the role ('admin' or 'user') as part of the request
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user details in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            name: data.name,
            email: data.email,
            role: data.role,
          })
        );

        // Redirect based on role
        if (data.role === "admin") {
          navigate("/admin/showallbookings");
        } else {
          navigate("/user/userbookings");
        }
      } else {
        setError(data.message || "Something went wrong");
      }

      setLoading(false);
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center w-screen"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')", // Add your image URL here
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif", // Use Poppins font for the entire page
      }}
    >
      {/* Navbar - sticky at the top */}
      <nav className="w-full py-2 bg-white shadow-md fixed top-0 left-0 z-50">
        {" "}
        {/* Adjusted py-2 for smaller height */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or brand name */}
          <div className="text-xl font-bold text-blue-600 ml-5">
            Court Booking App
          </div>{" "}
          {/* Adjusted text size */}
          {/* Navbar buttons */}
          <div className="flex space-x-4 mr-5">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Add padding at the top to prevent content from being hidden behind the navbar */}
      <div className="pt-14 w-full flex flex-col items-center">
        {" "}
        {/* Adjusted padding to match smaller navbar height */}
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Sign In
          </h2>

          {/* Role Selection - Button Group with Space */}
          <div className="flex justify-center mb-6 space-x-4">
            {" "}
            {/* Added space-x-4 for spacing */}
            <button
              onClick={() => handleRoleChange("user")}
              className={`px-4 py-2 ${
                role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } font-semibold rounded-lg focus:outline-none`}
            >
              User
            </button>
            <button
              onClick={() => handleRoleChange("admin")}
              className={`px-4 py-2 ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } font-semibold rounded-lg focus:outline-none`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" // Placeholder for email
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password" // Placeholder for password
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {loading
                  ? "Logging in..."
                  : `Sign In as ${role === "admin" ? "Admin" : "User"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
