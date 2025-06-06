import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Header() {
    let navigate = useNavigate();
    return (
        <header className="header-container">
            <h1 className="brand-name" onClick={() => navigate('/')} >-COURIER</h1>
            <ul className="navbar">
                <li><Link to={'/services'}>Services</Link></li>
                <li><Link to={'/about'}>About us</Link></li>
                <li><Link to={'/contact'}>Contact</Link></li>
                <li><Link to={'/track'}>Track</Link></li>
            </ul>
        </header>
    );
}

export default Header;