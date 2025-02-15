import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../api/items';
import { getUserPoints, redeemItem } from '../api/user';
import './RedeemPoints.css';

const RedeemPoints = ({ userID }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [redeeming, setRedeeming] = useState(false);

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const userPoints = await getUserPoints(userID);
                setPoints(userPoints);
            } catch (err) {
                console.error('Error fetching user points:', err);
                setPoints(0);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await getAllItems();
                if (response.success && response.data) {
                    setProducts(response.data);
                } else {
                    setProducts(response);
                }
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserPoints();
        fetchProducts();
    }, [userID]);

    const handleRedeem = async (itemID, itemPoints) => {
        if (points < itemPoints) {
            alert("Not enough points to redeem this item.");
            return;
        }

        setRedeeming(true);
        try {
            const response = await redeemItem(userID, itemID);

            if (response.success) {
                setPoints((prevPoints) => prevPoints - itemPoints);
                alert("Item successfully redeemed!");
            } else {
                alert(response.message || "Failed to redeem item. Please try again.");
            }
        } catch (err) {
            console.error("Error redeeming item:", err);
            alert("Error processing redemption.");
        } finally {
            setRedeeming(false);
        }
    };

    return (
        <div className="redeemPoints-container">
            <button className="redeemPoints-backButton" onClick={() => navigate(-1)}>
                Back
            </button>

            <div className="redeemPoints-pointsContainer">
                <div className="redeemPoints-pointsCard">
                    <h2>{points} Points</h2>
                </div>
                <div className="redeemPoints-warningCard">
                    <p>⚠️points will expire on 31 Dec 2025 23:59 SGT</p>
                </div>
            </div>

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
                            <button 
                                className="redeemPoints-redeemButton"
                                onClick={() => handleRedeem(product.item_id, product.item_gc)}
                                disabled={redeeming}
                            >
                                {redeeming ? "Redeeming..." : "Redeem"}
                            </button>
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
