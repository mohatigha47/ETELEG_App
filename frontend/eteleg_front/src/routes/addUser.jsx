import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import axios from 'axios';

const AddUser = () => {

    const [user, setUser] = useState({
        fullName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const addUser = async (userData) => {
        console.log(user)
        try {
            const response = await axios.put(`http://localhost:3001/addUser`, userData);
            navigate("/users");
            return response.data;
        } catch (error) {
            console.error(error.response.data.error || 'Failed to update user.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        addUser(user);
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700">User Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="1">Admin</option>
                                <option value="2">Project Manager</option>
                                <option value="3">Stock Manager</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
                        >
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
