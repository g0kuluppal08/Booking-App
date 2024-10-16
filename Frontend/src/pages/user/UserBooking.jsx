import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutocompleteSelect from "../AutoCompleteSelect";

function UserBooking() {
  const apiurl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    centre: "",
    sport: "",
    date: "",
  });
  const [completeData,setCompleteData] = useState([]);
  const [centres, setCentres] = useState([]);
  const [sport, setSport] = useState([]);
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
   const fetchdata = async ()=>{
    try{
      const response = await fetch(apiurl + '/api/centres/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      const data = await response.json();
      console.log(data);
      if(!response.ok){

      }
      else{
        setCentres(data);
      }
    }
    catch(error){
      console.log("error fectching centers")
    }
  }
  useEffect(()=>{
    fetchdata();
  },[]);
  const fectchSportData = async ()=>{
    try{
      const response = await fetch(apiurl + `/api/centres/${formData.centre}/sports`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      const data = await response.json();
      console.log(data);
      // return ;
      if(!response.ok){

      }
      else{
        setSport(data);
      }
    }
    catch(error){
      console.log("error fectching Sports")
    }
  }
  useEffect(()=>{
    fectchSportData();
  },[formData.centre])
  // Handle form submission (Search for courts)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCourts([]);
    setLoading(true);

    try {
      const response = await fetch(`${apiurl}/api/courts/showcourt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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
const handleCreateBooking =async  (court) => {
    try{
      const form1 = formData;
      form1.courtId = court['_id'];
      form1.price = court['price'];
      const response = await fetch(apiurl + '/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const filteredCourts = courts.filter(court1 => court1._id !== court._id);
      setCourts(filteredCourts);
      alert("Your Booking Successful go to My Bookings to check it");
    }
    catch(error){
      console.log("Error in Creating Booking");
    }
  };

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await fetch("/api/bookings/", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         setCompleteData(data);
  //         setLoading(false);
  //       } else {
  //         setError(data.message || "Failed to fetch bookings.");
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching the bookings.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookings();

  //   completeData.map((data) => {
  //     setcentre([...centre, data["centre"]]);
  //     setSport([...sport,data['sport']]);
  //   })
  // },[])

   const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

  const sports = ['Badminton', 'Tennis', 'Squash', 'Basketball', 'Volleyball', 'Soccer', 'Cricket', 'Table Tennis', 'Swimming', 'Hockey'];
  
  const timing = [
    '0:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00', 
    '5:00-6:00', '6:00-7:00', '7:00-8:00', '8:00-9:00', '9:00-10:00', 
    '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', 
    '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', 
    '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'
  ];
  return (
    <div className="min-h-screen bg-white p-8 w-screen">
      {/* Navigation Bar */}
      <nav className="w-full bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="space-x-4 text-lg font-bold">
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
          <AutocompleteSelect
            options={centres}
            field={"centre"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>

        {/* Sport */}
        <div>
          <AutocompleteSelect options={sport} field={"sport"} setFormData={setFormData} formData={formData}/>
        </div>

        {/*Time */}
        <div>
          <AutocompleteSelect options={timing} field={"time Slot"} setFormData={setFormData} formData={formData} />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-600 text-white"
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
              key={court["_id"]}
              className="bg-black shadow-md rounded-lg p-4"
            >
              <h3 className="text-xl font-bold mb-2">{court["name"]}</h3>
              <p>
                <strong>Price:</strong> ${court["price"]}
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
