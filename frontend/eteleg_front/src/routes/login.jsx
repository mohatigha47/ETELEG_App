import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const naviagte = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
            });
            // // Handle successful login (e.g., store token, redirect)
            // console.log('Login successful:', response.data);
            // Handle successful login
            const token = response.data.token;
            // localStorage.setItem('token', token); // Store the token in localStorage
            Cookies.set('token', token, { expires: 1 });
            // Decode the token to get user information
            const decodedToken = jwtDecode(token);
            // console.log('User information:', decodedToken);
            naviagte("/")
        } catch (err) {
            // Handle error (e.g., show error message)
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={handleEmailChange}
                        type="email"
                        id="email"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        id="password"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="text-red-500 mb-4">
                    {error}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={login}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                    <a href="#" className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
