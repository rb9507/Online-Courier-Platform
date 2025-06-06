import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    let navigate = useNavigate();

    const onInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let who = localStorage.getItem('who');
        if (who === "user") {
            navigate("/userDashboard")
        }
        else if (who === "admin") {
            navigate("/adminDashboard");
        }
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        let API_URL = process.env.REACT_APP_API_IP;
        try {
            const response = await axios.post(`${API_URL}/login`, loginData);
            if (response.status === 200) {
                if (response.data.who === "user") {
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('uname', response.data.uname);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('who', "user");
                    navigate('/userDashboard');
                }
                else {
                    localStorage.setItem('who', "admin");
                    navigate('/adminDashboard');
                }
            }
        }
        catch (error) {
            if (error.status === 401) {
                toast.warning("Invalid credentials!");
            }
            else {
                console.log(error.message);
                toast.warning(error.message);
            }
        }
    };


    return (
        <>
            <ToastContainer />
            <section className="login-container">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-slogan">"Secure, Fast, and Reliable - Your Journey Starts Here"</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <label className="login-label">Email: </label>
                    <input
                        type="email"
                        className="login-input"
                        placeholder="Enter your email"
                        value={loginData.email}
                        name="email"
                        autoComplete="off"
                        onChange={onInputChange}
                        required
                    />
                    <label className="login-label">Password: </label>
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Enter your password"
                        value={loginData.password}
                        name="password"
                        autoComplete="off"
                        onChange={onInputChange}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                    <p className="form-link-text" onClick={()=>{navigate('/sign-up')}}>
                        Don't have an account? Sign up
                    </p>
                </form>
            </section>
        </>
    );
};

export default Login;
