import { useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    return (
        <header className="header-container">
            <h1 className="brand-name" onClick={() => navigate('/')} >-COURIER</h1>
            <ul className="navbar">
                <li><a href="/services" >Services</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/track">Track</a></li>
            </ul>
        </header>
    );
}

export default Header;