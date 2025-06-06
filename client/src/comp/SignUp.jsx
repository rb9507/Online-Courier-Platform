import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import 'dotenv/config';

export default function SignUp() {
    let [userData, setUserData] = useState({
        uname: '',
        email: '',
        phone: undefined,
        password: '',
        address: '',
        city: '',
        state: '',
        pincode: undefined
    });
    let [checkPass, setCheckPass] = useState('');
    let navigate = useNavigate()
    let API_URL = process.env.REACT_APP_API_IP;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        let newUserData = ({
            uname: userData.uname,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            address: userData.address,
            city: userData.city,
            state: userData.state,
            pincode: userData.pincode
        });
        try {
            console.log(process.env.REACT_APP_API_IP);
            if (checkPass === userData.password) {
                const response = await axios.post(`${API_URL}/users`, newUserData);
                let resStatus = response.status;
                toast.success("Done!");
                if (resStatus === 200) {
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                }
                else {
                    toast.error(response.data.message);
                    setUserData({
                        uname: userData.uname,
                        email: '',
                        phone: userData.phone,
                        password: userData.password,
                        address: userData.address,
                        city: userData.city,
                        state: userData.state,
                        pincode: userData.pincode
                    });
                }
            }
            else {
                setUserData({
                    uname: userData.uname,
                    email: userData.email,
                    phone: userData.phone,
                    password: '',
                    address: userData.address,
                    city: userData.city,
                    state: userData.state,
                    pincode: userData.pincode
                });
                setCheckPass('');
                toast.warning("Passwords don't match.")
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <section className="sign-up-container">
            <ToastContainer />
            <h2>Sign-up to start shipping</h2>
            <form className="sign-up-inp" onSubmit={handleSubmit}>
                <span>Name: </span>
                <input type="text" placeholder="Enter your name" value={userData.uname} name="uname" autoComplete="off" autoCorrect="on" onChange={onInputChange} required />
                <span>Email: </span>
                <input type="email" placeholder="Enter your email" value={userData.email} name="email" autoComplete="off" onChange={onInputChange} required />
                <span>Phone: </span>
                <input type="tel" placeholder="Enter your phone number" value={userData.phone} name="phone" autoComplete="off" onChange={onInputChange} required />
                <span>Password: </span>
                <input type="password" placeholder="Enter password" value={userData.password} name="password" autoComplete="off" onChange={onInputChange} required />
                <span>Confirm password: </span>
                <input type="password" placeholder="Re-enter password" value={checkPass} onChange={(e) => setCheckPass(e.target.value)} autoComplete="off" required />
                <span>Address: </span>
                <input type="text" placeholder="Enter your address" value={userData.address} name="address" autoComplete="off" onChange={onInputChange} required />
                <span>City: </span>
                <input type="text" placeholder="Enter your city" value={userData.city} name="city" autoComplete="off" onChange={onInputChange} required />
                <span>State: </span>
                <input type="text" placeholder="Enter your state" value={userData.state} name="state" autoComplete="off" onChange={onInputChange} required />
                <span>Pincode: </span>
                <input type="text" placeholder="Enter your pincode" value={userData.pincode} name="pincode" autoComplete="off" onChange={onInputChange} required />
                <button className="sign-up-btn">Sign up</button>
                <p className="form-link-text" onClick={() => { navigate('/login') }}>
                    Already have an account? Login
                </p>
            </form>
        </section>
    );
}