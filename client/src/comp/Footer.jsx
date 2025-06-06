import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2025 E-Courier. All rights reserved.</p>
            <ul className="footer-links">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
        </footer>
    );
}

export default Footer;