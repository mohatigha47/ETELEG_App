
import React from 'react';
import { CheckCircleIcon, ExclamationIcon, UsersIcon, ClipboardListIcon } from '@heroicons/react/solid';

const Dashboard = (props) => {

  const getDaysDifference = (date) => {
    const today = new Date();
    const projectDate = new Date(date);
    const timeDiff = Math.abs(today - projectDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };



  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <ClipboardListIcon className="h-10 w-10 text-blue-500 mr-4" />
          <div>
            <h3 className="text-lg font-bold mb-1">Total Projects</h3>
            <p className="text-3xl font-semibold">{props.metrics.totalProjects}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <UsersIcon className="h-10 w-10 text-green-500 mr-4" />
          <div>
            <h3 className="text-lg font-bold mb-1">Active Clients</h3>
            <p className="text-3xl font-semibold">{props.metrics.activeClients}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <ExclamationIcon className="h-10 w-10 text-yellow-500 mr-4" />
          <div>
            <h3 className="text-lg font-bold mb-1">Pending Reports</h3>
            <p className="text-3xl font-semibold">{props.metrics.pendingProjects}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <CheckCircleIcon className="h-10 w-10 text-purple-500 mr-4" />
          <div>
            <h3 className="text-lg font-bold mb-1">Completed Projects</h3>
            <p className="text-3xl font-semibold">{props.metrics.completedProjects}</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
        <div className="grid grid-cols-1 gap-4">
          {props.projects && props.projects.map((project) =>
            <div key={project._id} className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between hover:bg-gray-100 transition duration-300">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-500">{getDaysDifference(project.startDate)} Days ago</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">{project.client}</span>
                <span className={`text-sm font-semibold ${project.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>{project.status}</span>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
