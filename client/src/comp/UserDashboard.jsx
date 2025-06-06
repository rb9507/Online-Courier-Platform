import React, { useEffect, useState } from 'react';
import '../style/userDash.css';
import userLogo from '../images/user-dah-logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDashboard = () => {
    const [courierHistory, setCourierHistory] = useState([]);
    let uname = localStorage.getItem('uname');
    let userId = localStorage.getItem('userId');
    let who = localStorage.getItem('who');
    let navigate = useNavigate();
    let API_URL = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (!who) {
            navigate('/login')
        }
    }, [navigate, who])
    useEffect(() => {
        getCourierHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let getCourierHistory = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/couriers/${userId}`)
            if (response.status === 200) {
                setCourierHistory(response.data);
            }
            else {
                toast.warning("Something went wrong.")
            }
        }
        catch (error) {
            console.log(error.message);
            localStorage.clear();
            navigate("/login");
        }
    }


    const handleNewCourier = () => {
        navigate("/userDashboard/add-courier");
    };

    return (
        <div className="user-dashboard">
            <img className="user-pfp-img" src={userLogo} width="10%" alt="User Profile" />
            <h1 className="user-heading">Welcome {uname ? uname.split(" ")[0] : " "}!</h1>

            <div className="ord-hist-main-container">
                <div className="order-history">
                    <h2>Courier History</h2>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Courier ID</th>
                                <th>Receiver Name</th>
                                <th>Status</th>
                                <th>Pick-up Date</th>
                                <th>Delivery Date</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courierHistory.length > 0 ? courierHistory.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.rec_name}</td>
                                    <td className={`status ${item.delivery_status ? item.delivery_status.toLowerCase().replace(' ', '-') : ''}`}>
                                        {item.delivery_status || 'N/A'}
                                    </td>
                                    <td>{item.pickup_date.split("T")[0]}</td>
                                    <td>{item.delivery_date.split("T")[0]}</td>
                                    <td>{item.rec_city}</td>
                                </tr>
                            )) : <tr className='no-history-row'><td>No History</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="new-courier" onClick={handleNewCourier}>
                New Courier
            </button>
            <button className="user-logout-button" onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>
                Logout
            </button>
        </div>
    );
};

export default UserDashboard;
