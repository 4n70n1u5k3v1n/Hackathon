import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './LoadingSpinner.css'; 

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <FaSpinner className="spinner-icon" />
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
