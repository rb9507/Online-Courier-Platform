import React, { useState } from 'react';
import axios from 'axios';
import '../style/trackCourier.css';
import { toast, ToastContainer } from 'react-toastify';

const TrackCourier = () => {
    const [courierId, setCourierId] = useState('');
    const [courier, setCourier] = useState(null);
    let API_URL = process.env.REACT_APP_API_IP;

    const handleTrack = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${API_URL}/api/couriers/${courierId}`);
            setCourier(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Courier not found or error fetching.");
            setCourier(null);
        }
    };

    return (
        <div className="track-container">
            <ToastContainer />
            <h2>Track Your Courier</h2>
            <form onSubmit={handleTrack} className="track-form">
                <input
                    type="text"
                    placeholder="Enter Courier ID"
                    value={courierId}
                    onChange={(e) => setCourierId(e.target.value)}
                    required
                />
                <button type="submit">Track</button>
            </form>

            {courier && (
                <div className="courier-info">
                    <h3>Tracking Details</h3>
                    <p><strong>Receiver:</strong> {courier.rec_name}</p>
                    <p><strong>Status:</strong> {courier.delivery_status}</p>
                    <p><strong>Pickup Date:</strong> {courier.pickup_date?.split('T')[0]}</p>
                    <p><strong>Expected Delivery:</strong> {courier.delivery_date?.split('T')[0]}</p>
                    <p><strong>City:</strong> {courier.rec_city}</p>
                    <p><strong>Charges:</strong> ₹{courier.charges}</p>
                </div>
            )}
        </div>
    );
};

export default TrackCourier;
