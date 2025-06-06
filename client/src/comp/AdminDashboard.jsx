import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/adminDash.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();
    const who = localStorage.getItem('who');
    let API_URL = process.env.REACT_APP_API_IP;

    // const sidebarItems = ['Dashboard', 'Manage Courier', 'Tickets', 'Reports'];

    useEffect(() => {
        if (!who && !who === "admin") {
            navigate("/login");
        }

        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/stats`);
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [navigate, who]);

    const getPathForStat = (title) => {
        switch (title) {
            case 'Total Courier':
                return '/couriers';
            case 'Total Courier Pickup':
                return '/couriers?status=Picked Up';
            case 'Intransit Courier':
                return '/couriers?status=In Transit';
            case 'Arrived at Destination':
                return '/couriers?status=Arrived at Destination';
            case 'Out for Delivery':
                return '/couriers?status=Out for Delivery';
            case 'Delivered Courier':
                return '/couriers?status=Delivered';
            default:
                return '/';
        }
    };

    return (
        <div className="admin-layout">
            <div className="main-content">
                <div className="topbar">
                    <h1>Admin Dashboard</h1>
                    <div className="profile-icon">👤</div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.title} className="stat-card">
                            <h3>{stat.title}</h3>
                            <p>{stat.count}</p>
                            <button
                                className="view-button"
                                onClick={() => navigate(getPathForStat(stat.title))}
                            >
                                View List
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button className="logout-button" onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>
                Logout
            </button>

        </div>
    );
};

export default AdminPanel;
