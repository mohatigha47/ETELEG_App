// src/EditProject.js
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import axios from 'axios';


const EditProject = () => {
    const { projectId } = useParams();

    // Sample project data (in a real app, this would come from an API)
    const [project, setProject] = useState({
        id: projectId,
        name: '',
        client: '',
        status: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const navigate = useNavigate();


    const updateProject = async (id, projectData) => {
        try {
            const response = await axios.put(`http://localhost:3001/updateProject/${id}`, projectData);
            navigate("/projects")
            return response.data;
        } catch (error) {
            throw error.response.data.error || 'Failed to update project.';
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/projects/${projectId}`);
                setProject(response.data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProject(projectId,project)
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Project</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Project Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={project.name}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="client" className="block text-gray-700">Client</label>
                            <input
                                type="text"
                                id="client"
                                name="client"
                                value={project.client}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={project.status}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="startDate" className="block text-gray-700">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formatDate(project.startDate)}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-gray-700">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formatDate(project.endDate)}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
                        >
                            Update Project
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
