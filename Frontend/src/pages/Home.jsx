


import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-h-screen flex flex-col w-screen"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')", // Add your image URL here
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="w-full bg-blue-900 text-white py-6 bg-opacity-80">
        <div className="container mx-auto text-center">
          <h1
            className="text-4xl font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Welcome to Court Booking App
          </h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Call to Action */}
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Roboto', sans-serif", color: "#f5f5f5" }}
            >
              Book your favorite courts easily
            </h2>
            <p
              className="text-gray-200 mb-6"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Sign in or create an account to start booking courts near you.
            </p>
            <div className="space-x-4">
              <Link
                to="/signin"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div className="container mx-auto text-center bg-white shadow-lg rounded-lg p-8 max-w-2xl bg-opacity-90">
            <h3
              className="text-2xl font-semibold mb-4 text-gray-900"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              About Us
            </h3>
            <p
              className="text-gray-700 mb-4"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Our court booking app allows users to easily book their preferred
              sports courts, including tennis, badminton, basketball, and more,
              across multiple cities. We offer a seamless experience with quick
              access to available courts, secure booking processes, and flexible
              payment options.
            </p>
            <p
              className="text-gray-700 mb-4"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Whether you're a seasoned athlete or just looking for a
              recreational game, our platform ensures that you find the best
              sports venues available for your schedule. Join our community of
              sports enthusiasts and stay active!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
