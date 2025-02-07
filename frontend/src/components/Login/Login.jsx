import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/auth/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
				<h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
					>
						Sign In
					</button>
				</form>
				<div className="mt-4 text-center">
					<h2 className="text-gray-600">New Here?</h2>
					<Link to="/signup">
						<button className="mt-2 bg-white border border-gray-400 text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-50">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
