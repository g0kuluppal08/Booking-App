// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Header } from './user/Header';

// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     password: '',
//     role: 'user',
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify({
//           username: data.username,
//           name: data.name,
//           email: data.email,
//           role: data.role,
//         }));

//         if (data.role === 'admin') {
//           navigate('/admin/showallbookings');
//         } else {
//           navigate('/user/createabooking');
//         }
//       } else {
//         setError(data.message || 'Something went wrong');
//       }
//     } catch (err) {
//       setError('An error occurred while signing up. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 w-screen">
//     <Header/>

//       {/* Sign Up Form */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-8">
//         <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <label className="block text-gray-700">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Role:</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className="flex gap-2 justify-center mt-5">
//           <p>Have an account?</p>
//           <Link to="/signin">
//             <span className="text-blue-700">Sign in</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./user/Header";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            name: data.name,
            email: data.email,
          })
        );

        navigate("/user/createabooking");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred while signing up. Please try again.");
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
          <div className="text-xl font-bold text-blue-600">
            Court Booking App
          </div>{" "}
          {/* Adjusted text size */}
          {/* Navbar buttons */}
          <div className="flex space-x-4">
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
        {/* Sign Up Form */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
