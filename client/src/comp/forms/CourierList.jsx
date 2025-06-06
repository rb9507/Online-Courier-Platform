import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const statusOptions = [
    'Pending',
    'Picked Up',
    'In Transit',
    'Arrived at Destination',
    'Out for Delivery',
    'Delivered'
];

const CourierList = () => {
    const [couriers, setCouriers] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const navigate = useNavigate();
    let API_URL = process.env.REACT_APP_API_IP;

    useEffect(() => {
        const fetchCouriers = async () => {
            try {
                const url = `${API_URL}/api/couriers${status ? `?status=${encodeURIComponent(status)}` : ''}`;
                const response = await axios.get(url);
                setCouriers(response.data);
            } catch (error) {
                console.error("Error fetching couriers:", error);
            }
        };
        fetchCouriers();
    }, [status]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${API_URL}/api/couriers/${id}/status`, {
                status: newStatus
            });
            setCouriers(prev =>
                prev.map(c => (c._id === id ? { ...c, delivery_status: newStatus } : c))
            );
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Courier Report", 14, 10);

        const tableData = couriers.map(c => [
            c._id,
            c.rec_name,
            c.rec_email,
            c.rec_phone,
            c.rec_city,
            new Date(c.pickup_date).toLocaleDateString(),
            c.delivery_date ? new Date(c.delivery_date).toLocaleDateString() : '-',
            c.delivery_status,
            c.charges
        ]);

        autoTable(doc, {
            head: [["ID", "Receiver", "Email", "Phone", "City", "Pickup", "Delivery", "Status", "Charges"]],
            body: tableData,
            startY: 20,
            theme: 'grid',
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: 255,
                fontStyle: 'bold'
            },
            styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                fontSize: 8
            }
        });

        doc.save(`courier_report_${Date.now()}.pdf`);
    };


    return (
        <div className="courier-list-container">
            <button type='button' className='back-button' onClick={() => navigate("/adminDashboard")}>Back</button>
            <h2>Couriers {status ? `- ${status}` : ''}</h2>
            <button onClick={downloadPDF} className="download-btn">Download Report (PDF)</button>
            <div className="table-wrapper">
                <table className="courier-table" border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sender ID</th>
                            <th>Receiver Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Pincode</th>
                            <th>Weight</th>
                            <th>Details</th>
                            <th>Pickup Date</th>
                            <th>Delivery Date</th>
                            <th>Charges</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {couriers.map(c => (
                            <tr key={c._id}>
                                <td>{c._id}</td>
                                <td>{c.sender_id}</td>
                                <td>{c.rec_name}</td>
                                <td>{c.rec_email}</td>
                                <td>{c.rec_phone}</td>
                                <td>{c.rec_address}</td>
                                <td>{c.rec_city}</td>
                                <td>{c.rec_state}</td>
                                <td>{c.rec_pincode}</td>
                                <td>{c.courier_weight}</td>
                                <td>{c.courier_detail}</td>
                                <td>{new Date(c.pickup_date).toLocaleDateString()}</td>
                                <td>{new Date(c.delivery_date).toLocaleDateString()}</td>
                                <td>{c.charges}</td>
                                <td>
                                    <select
                                        value={c.delivery_status}
                                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                    >
                                        {statusOptions.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourierList;
