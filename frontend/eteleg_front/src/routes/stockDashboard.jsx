import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockDashboard = () => {
    const [products, setProducts] = useState([]);
    const [totalStock, setTotalStock] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [averageStockLevel, setAverageStockLevel] = useState(0);
    const [lowStockItems, setLowStockItems] = useState(0);
    const [highestStockedItem, setHighestStockedItem] = useState({});
    const [lowestStockedItem, setLowestStockedItem] = useState({});
    const [recentUpdates, setRecentUpdates] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
                calculateStatistics(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();
    }, []);

    const calculateStatistics = (products) => {
        let totalStock = 0;
        let lowStockItemsCount = 0;
        let highestStock = { name: '', quantity: 0 };
        let lowestStock = { name: '', quantity: Infinity };

        products.forEach((product) => {
            totalStock += product.quantity;

            if (product.quantity < 10) {
                lowStockItemsCount += 1;
            }

            if (product.quantity > highestStock.quantity) {
                highestStock = { name: product.name, quantity: product.quantity };
            }

            if (product.quantity < lowestStock.quantity) {
                lowestStock = { name: product.name, quantity: product.quantity };
            }
        });

        setTotalStock(totalStock);
        setTotalProducts(products.length);
        setAverageStockLevel((totalStock / products.length).toFixed(2));
        setLowStockItems(lowStockItemsCount);
        setHighestStockedItem(highestStock);
        setLowestStockedItem(lowestStock);
        setRecentUpdates(products.slice(0, 5)); // Assuming the first 5 products are the most recent updates
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    // Chart configuration
    const chartData = {
        labels: products.map((product) => product.name),
        datasets: [
            {
                label: 'Stock Quantity',
                data: products.map((product) => product.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Stock Levels by Product',
            },
        },
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Stock Management Dashboard</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                        <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Total Stock</h3>
                                <p className="text-xl">{totalStock}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Total Products</h3>
                                <p className="text-xl">{totalProducts}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Average Stock Level</h3>
                                <p className="text-xl">{averageStockLevel}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Low Stock Items</h3>
                                <p className="text-xl">{lowStockItems}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Highest Stocked Item</h3>
                                <p className="text-xl">
                                    {highestStockedItem.name} - {highestStockedItem.quantity}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Lowest Stocked Item</h3>
                                <p className="text-xl">
                                    {lowestStockedItem.name} - {lowestStockedItem.quantity}
                                </p>
                            </div>

                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                            <h3 className="text-lg font-bold mb-2">Stock Levels Chart</h3>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
                        <h3 className="text-lg font-bold mb-2">Recent Updates</h3>
                        <ul>
                            {recentUpdates.map((update) => (
                                <li key={update._id} className="border-b py-2">
                                    {update.name} - {update.quantity} units (Updated on {formatDate(update.updatedAt)})
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Stock Details</h2>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Product Name</th>
                                    <th className="py-2 px-4 border-b">Quantity</th>
                                    <th className="py-2 px-4 border-b">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((update) => (
                                    <tr key={update._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{update.name}</td>
                                        <td className="py-2 px-4 border-b">{update.quantity}</td>
                                        <td className="py-2 px-4 border-b">{formatDate(update.updatedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDashboard;
