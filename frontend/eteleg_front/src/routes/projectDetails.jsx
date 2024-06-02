// src/ProjectDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState('')

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
  }, [])

  

  // // Sample project data (in a real app, this would come from an API)
  // const project = {
  //   id: 1,
  //   name: 'Project 1',
  //   client: 'Client A',
  //   status: 'Active',
  //   startDate: '2024-01-01',
  //   endDate: '2024-06-30',
  //   description: 'This is a sample project description. In a real application, you would fetch this data from an API.'
  // };

  return (
    <div>
      <NavBar />
      {project &&
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Details</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Project Name</h3>
              <p className="text-gray-600">{project.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Client</h3>
              <p className="text-gray-600">{project.client}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Status</h3>
              <p className={`text-gray-600 ${project.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{project.status}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Start Date</h3>
              <p className="text-gray-600">{project.startDate}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">End Date</h3>
              <p className="text-gray-600">{project.endDate}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ProjectDetails;
