import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="text-white text-lg font-bold">Electric Management</div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Dashboard</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Projects</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Clients</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Reports</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Settings</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
