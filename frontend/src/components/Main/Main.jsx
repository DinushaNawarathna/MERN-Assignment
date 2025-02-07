import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Main = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3000/api/users").then((res) => {
			setUsers(res.data);
		});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
				<h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
				<button
					className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
					onClick={handleLogout}
				>
					Logout
				</button>
			</nav>

			<div className="flex-grow p-6">
				<LoadScript googleMapsApiKey="AIzaSyD8QNsp59Fb__I1aRHscWr0eAaFK7qYUH8">
					<GoogleMap
						center={{ lat: 7.8731, lng: 80.7718 }}
						zoom={7}
						mapContainerClassName="w-full h-96 rounded-xl shadow-md"
					>
						{users.map((user, index) => (
							<Marker key={index} position={{ lat: user.latitude, lng: user.longitude }} />
						))}
					</GoogleMap>
				</LoadScript>
			</div>
		</div>
	);
};

export default Main;
