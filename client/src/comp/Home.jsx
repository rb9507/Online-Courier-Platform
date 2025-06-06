import homeImg1 from '../images/home-img-1.jpg';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <section className="outer-container">
            <div className="intro-section">
                <div className="hero-section">
                    <h2>Fast & Realiable Courier services</h2>
                    <h4>Book, Track, and Manage Your Shipments</h4>
                    <Link to={'/quotation'} className='getQuoteBtn'>Get a Quote</Link>
                </div>
                <div className="img-section">
                    <img src={homeImg1} alt="img" />
                </div>
            </div>
            <div className='courier-info-section'>
                <p>
                    <span className='highlight-with-red'>Couriers offer</span> a comprehensive shipping solution, catering to both individual consumer <span className='highlight-with-red'>(B2C)</span> and business-to-business <span className='highlight-with-red'>(B2B)</span> needs. Their services are particularly advantageous when dealing with large, bulk orders destined for businesses, as they streamline logistics and ensure efficient <span className='highlight-with-red'>delivery</span>.
                </p>
            </div>
            <div className='ship-now-section'>
                <h2>Experience the operating system for commerce in India</h2>
                <h4>Sign up now to start shipping with Delhivery</h4>
                <Link className='ship-now-btn' to={'/login'}>Ship Now</Link>
            </div>
        </section>
    );
}

export default Home;