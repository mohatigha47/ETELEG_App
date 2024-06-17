import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotAuthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-8">You do not have permission to view this page.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotAuthorized;
