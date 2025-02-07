import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({ firstName: "", email: "", password: "", latitude: "", longitude: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    if (window.google) {
      setGoogle(window.google);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogle(window.google);
      document.body.appendChild(script);
    }
  }, []);

  const getLocation = () => {
    if (!google) {
      setError("Google Maps API is not loaded yet.");
      return;
    }

    const geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setData({ ...data, latitude: lat, longitude: lng });

          const latLng = new google.maps.LatLng(lat, lng);
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
              console.log("Address: ", results[0].formatted_address);
            } else {
              setError("Geocoder failed due to: " + status);
            }
          });
        },
        () => {
          setError("Failed to get location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (error.response) setError(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-11/12 max-w-4xl shadow-lg rounded-2xl bg-white">
        <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center p-10">
          <h1 className="text-white text-3xl font-bold">Welcome Back</h1>
          <Link to="/login">
            <button className="bg-white text-blue-500 mt-6 px-6 py-2 rounded-lg hover:bg-gray-200">
              Sign In
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-700">Create Account</h2>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
              type="button"
              onClick={getLocation}
            >
              Get Location
            </button>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" type="submit">
              Sign Up
            </button>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
