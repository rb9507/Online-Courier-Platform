import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/courierForm.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CourierForm = () => {
    const [formData, setFormData] = useState({
        rec_name: '',
        rec_email: '',
        rec_phone: '',
        rec_address: '',
        rec_city: '',
        rec_state: '',
        rec_pincode: '',
        courier_weight: '',
        courier_detail: '',
        pickup_date: ''
    });
    const userId = localStorage.getItem("userId");
    let who = localStorage.getItem('who');
    const navigate = useNavigate();
    let API_URL = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (!who) {
            navigate('/login')
        }
    }, [navigate, who])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/couriers`, { formData, userId });
            setFormData({
                rec_name: '',
                rec_email: '',
                rec_phone: '',
                rec_address: '',
                rec_city: '',
                rec_state: '',
                rec_pincode: '',
                courier_weight: '',
                courier_detail: '',
                pickup_date: ''
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    return (
        <form className="courier-form" onSubmit={handleSubmit}>
            <ToastContainer />
            <button type='button' className='back-button' onClick={() => navigate("/userDashboard")}>Back</button>
            <h2>Add New Courier</h2>
            {Object.keys(formData).map((key) => (
                <div key={key} className="form-group">
                    <label>{key.replace(/_/g, ' ')}:</label>
                    <input
                        type={key.includes('date') ? 'date' : key === 'courier_weight' ? 'number' : 'text'}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                        required
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default CourierForm;
