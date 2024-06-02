// src/AddProduct.js
import React, { useState } from 'react';
import NavBar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send product data to API
        try {
            await axios.post('http://localhost:3001/addProduct', product);
            navigate('/products'); // Redirect to the projects page after adding the project
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={product.quantity}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
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
                                value={product.description}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
