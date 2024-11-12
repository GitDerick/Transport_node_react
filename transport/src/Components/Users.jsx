import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login.jsx';
import UpdateUser from './UpdateUser';
import useLogout from './Logout.jsx';
import './test.css';
import hero from '../assets/Images/slide1.jpg'
import service1 from '../assets/Images/service1.jpg'
import service2 from '../assets/Images/service2.jpg'
import service3 from '../assets/Images/service3.jpg'
import pricing from '../assets/Images/pricing.jpg'
import Logo from './Accueil.jsx';

function Users() {
    const logout = useLogout();

    return (
        <div>
            <main>
                <section id="hero">
                    <img src={hero} alt="Hero Image" className="hero-image" />
                    <div className="hero-text">
                        <h2>Fast and Reliable Taxi Service</h2>
                        <p>Get to your destination safely and on time.</p>
                        <button>Book Now</button>
                    </div>
                </section>
                <section id="services">
                    <h2>Our Services</h2>
                    <div className="service">
                        <img src={service1} alt="Service 1" />
                        <h3>City Rides</h3>
                        <p>Reliable city transportation available 24/7.</p>
                    </div>
                    <div className="service">
                        <img src={service2} alt="Service 2" />
                        <h3>Airport Transfers</h3>
                        <p>On-time airport pickups and drop-offs.</p>
                    </div>
                    <div className="service">
                        <img src={service3} alt="Service 3" />
                        <h3>Outstation Rides</h3>
                        <p>Comfortable long-distance rides at affordable rates.</p>
                    </div>
                </section>
                <section id="pricing">
                    <h2>Pricing</h2>
                    <p>Affordable and transparent pricing.</p>
                    <img src={pricing} alt="Pricing" />
                </section>
                <section id="contact">
                    <h2>Contact Us</h2>
                    <form id="contact-form">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 ALPHA-TRANSPORT. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Users;
