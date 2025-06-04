import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo-section">
                    <img src="./store.jpeg" className="logo-img" alt="Store Logo" />
                    <h1 className="store-title">Dawoud Store</h1>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="home-main">
                <section className="welcome-text">
                    <h2 className="animated-heading">Welcome to Dawoud Store</h2>
                    <p>
                        Your one-stop destination for quality products at unbeatable prices.<br />
                        Shop the latest trends, everyday essentials, and exclusive finds.<br />
                        Enjoy top-notch customer service, fast delivery, and a seamless shopping experience.<br />
                        Sign up or login to start your journey now!
                    </p>
                    <div className="cta-buttons">
                        <Link to="/register" className="btn register-btn">Register</Link>
                        <Link to="/login" className="btn login-btn">Login</Link>
                    </div>
                </section>
                <section className="hero-image">
                    <img src="./storeLogo.jpeg" alt="Dawoud Store" />
                </section>
            </main>

            <footer className="home-footer">
                <p>
                    © 2023 Dawoud Store. All rights reserved.<br />
                    Contact us at:<br />
                    📞 +961 71 721 999<br />
                    📧 Dawoudshop@gmail.com<br />
                    📍 Beirut, Lebanon
                </p>
            </footer>
        </div>
    );
};

export default HomePage;