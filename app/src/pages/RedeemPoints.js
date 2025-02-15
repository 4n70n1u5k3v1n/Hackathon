import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../api/items'; // Adjust the import path as needed
import './RedeemPoints.css';

const RedeemPoints = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [points, setPoints] = useState(4900); // You can replace this with a dynamic API call if available
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllItems();
                // If your API returns an object like { success: true, data: [...] }
                // you may need to access response.data; otherwise, adjust accordingly.
                if (response.success && response.data) {
                    setProducts(response.data);
                } else {
                    // Fallback if response is simply the products array
                    setProducts(response);
                }
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts().then(r => console.log('Products fetched'));
    }, []);

    return (
        <div className="redeemPoints-container">
            {/* Back Button */}
            <button className="redeemPoints-backButton" onClick={() => navigate(-1)}>
                &larr; Back
            </button>

            {/* Points Display */}
            <div className="redeemPoints-pointsContainer">
                <div className="redeemPoints-pointsCard">
                    <h2>{points} Points</h2>
                </div>
                <div className="redeemPoints-warningCard">
                    <p>Your points will expire on 31 Dec 2025 23:59 SGT</p>
                </div>
            </div>

            {/* Product Listing */}
            <div className="redeemPoints-productList">
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.item_id} className="redeemPoints-productCard">
                            <img
                                src={product.item_photo}
                                alt={product.item_name}
                                className="redeemPoints-productImage"
                            />
                            <h3>{product.item_name}</h3>
                            <p>{product.item_gc} Points</p>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default RedeemPoints;
