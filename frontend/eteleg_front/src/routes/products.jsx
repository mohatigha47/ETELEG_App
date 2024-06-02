// src/AllProducts.js
import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
            } catch (err) {
                console.log(err)
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        navigate(`/products/edit/${id}`)
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteProduct/${id}`);
            window.location.reload(); // Reload the page after successful deletion
            return response.data;
        } catch (error) {
            throw error.response.data.error || 'Failed to delete project.';
        }
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">All Products</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Product Name</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                                    <td className="py-2 px-4 border-b">{product.price}</td>
                                    <td className="py-2 px-4 border-b">{product.description}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEdit(product._id)}
                                            className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
