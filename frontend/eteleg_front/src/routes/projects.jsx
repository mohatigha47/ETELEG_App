// src/ProjectManagement.js
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../components/sidePanel';

const Projects = () => {

  const [projects, setProjects] = useState()



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/projects');
        setProjects(response.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchProjects();
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Management</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Project Name</th>
                <th className="py-2 px-4 border-b">Client</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            {projects &&
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{project.name}</td>
                    <td className="py-2 px-4 border-b">{project.client}</td>
                    <td className="py-2 px-4 border-b">{project.status}</td>
                    <td className="py-2 px-4 border-b">{formatDate(project.startDate)}</td>
                    <td className="py-2 px-4 border-b">{formatDate(project.endDate)}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <Link to={`/projects/${project._id}`} className="text-blue-500 hover:underline">View</Link>
                        <Link to={`/projects/edit/${project._id}`} className="text-green-500 hover:underline">Edit</Link>
                        <button className="text-red-500 hover:underline" onClick={() => deleteProject(project._id)}>Delete</button>
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

export default Projects;
