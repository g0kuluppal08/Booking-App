import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ShowAllBookings from "./pages/admin/ShowAllBookings.jsx";
import AddNewCourt from "./pages/admin/AddNewCourt.jsx";
// import CreateABooking from "./pages/user/CreateABooking.jsx";
import UserBookings from "./pages/user/UserBooking.jsx";
import MyBookings from "./pages/user/MyBookings.jsx";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Common Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Routes */}
        <Route path="/admin/showallbookings" element={<ShowAllBookings />} />
        <Route path="/admin/addnewcourt" element={<AddNewCourt />} />

        {/* User Routes */}
        {/* <Route path="/user/createabooking" element={<CreateABooking />} /> */}
        <Route path="/user/userbookings" element={<UserBookings />} />
        <Route path="/user/mybookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
