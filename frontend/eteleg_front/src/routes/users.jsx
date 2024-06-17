
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../components/sidePanel';

const Users = () => {

    const [users, setUsers] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                console.log(response.data)
                setUsers(response.data);
            } catch (err) {
                console.log(err)
            }
        };

        fetchUsers();
    }, [])

    const deleteProject = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteProject/${id}`);
            window.location.reload(); // Reload the page after successful deletion
            return response.data;
        } catch (error) {
            throw error.response.data.error || 'Failed to delete project.';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };


    const showRole = (roleNumber) => {
        var role = ""
        switch (roleNumber) {
            case 1:
                role = 'Admin';
                break;
            case 2:
                role = 'Project manager';
                break;
            case 3:
                role = 'Stock manager';
                break;
            default:
                role = 'Invalid role';
        }
        return role;
    }


    return (
        <div>
            <NavBar />
            {/* SIDE PANEL */}
            <div className='h-full w-16'>
            </div>
            <div className='absolute h-full '>
                <SidePanel />
            </div>
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Users Management</h2>
                    <button
                        onClick={() => navigate("/users/add")}
                        className="bg-gray-900 text-white py-2 px-4 rounded-xl my-4"
                    >
                        Add user
                    </button>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">User Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Created Date</th>

                            </tr>
                        </thead>
                        {users &&
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{user.fullName}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">{showRole(user.role)}</td>
                                        <td className="py-2 px-4 border-b">{formatDate(user.createdAt)}</td>
                                        <td className="py-2 px-4 border-b">
                                            <div className="flex space-x-2">
                                                {/* <Link to={`/projects/${user._id}`} className="text-blue-500 hover:underline">View</Link> */}
                                                <Link to={`/users/edit/${user._id}`} className="text-green-500 hover:underline">Edit</Link>
                                                <button className="text-red-500 hover:underline" onClick={() => deleteProject(user._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
