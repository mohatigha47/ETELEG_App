import React, { useState, useEffect } from 'react';
import Dashboard from '../components/dashBoard';
import NavBar from '../components/navbar';
import axios from 'axios';
import ProjectMetricsChart from '../components/projectMetrics';
import SidePanel from '../components/sidePanel'; // Import the SidePanel component
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function Main() {
  const [projects, setProjects] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    pendingProjects: 0,
    completedProjects: 0,
    activeClients: 0
  });
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);

  const toggleSidePanel = () => {
    setSidePanelVisible(!isSidePanelVisible);
  };

  const extractProjectMetrics = (projects) => {
    const totalProjects = projects.length;
    const pendingProjects = projects.filter(project => project.status === 'pending').length;
    const completedProjects = projects.filter(project => project.status === 'completed').length;
    const activeClients = [...new Set(projects.map(project => project.client))].length;
    setMetrics({
      totalProjects,
      pendingProjects,
      completedProjects,
      activeClients
    });
  };

  const getMostRecentProjects = (projects) => {
    return projects
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
      .slice(0, 3);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/projects');
        const projects = response.data;
        setProjects(projects);
        const recentProjects = getMostRecentProjects(projects);
        setRecentProjects(recentProjects);
        extractProjectMetrics(projects);
        const token = Cookies.get('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          // console.log(decodedToken)
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="App h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        {/* SIDE PANEL */}
        <div className='h-full w-16'>
        </div>
        <div className='absolute h-full '>
          <SidePanel />
        </div>
        {/* MAIN CONTENT */}
        <div className="container mx-auto p-4 flex-1">
          <div className="grid grid-cols-2">
            <div>
              <Dashboard metrics={metrics} projects={recentProjects} />
            </div>
            <div>
              <ProjectMetricsChart metrics={metrics} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
