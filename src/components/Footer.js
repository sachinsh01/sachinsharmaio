import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toast from './Toast';
import './Footer.css';

const Footer = () => {
    const [status, setStatus] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        setStatus('submitting');

        try {
            const response = await fetch("https://formspree.io/f/xjgkawaj", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                setToast({ show: true, message: "Subscribed successfully!", type: "success" });
                form.reset();
            } else {
                const data = await response.json();
                setStatus('error');
                let msg = "Subscription failed";
                if (data.errors) {
                    // Check if error is related to email
                    const isEmailError = data.errors.some(err => err.field === 'email' || err.message.toLowerCase().includes('email'));
                    if (isEmailError) {
                        msg = "Please enter a valid email address.";
                    } else {
                        msg = data.errors.map(error => error.message).join(", ");
                    }
                }
                setToast({ show: true, message: msg, type: "error" });
            }
        } catch (error) {
            setStatus('error');
            setToast({ show: true, message: "Network error. Please try again later.", type: "error" });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-header">
                <motion.h1
                    className="footer-title"
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    Engineering is Art
                </motion.h1>
            </div>

            <div className="footer-content">
                <div className="footer-grid">
                    <div className="newsletter-section">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Subscribe to the Newsletter
                        </motion.h2>
                        <p>Sign up with your email address to receive news and exclusive content</p>
                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="email" name="email" placeholder="Email Address" required />
                                <button type="submit" aria-label="Subscribe" disabled={status === 'submitting'}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="footer-links">
                        <div className="link-column">
                            <h3>Pages</h3>
                            <Link to="/about">About</Link>
                            <Link to="/work">Work</Link>
                            <Link to="/projects">Projects</Link>
                        </div>
                        <div className="link-column">
                            <h3>Socials</h3>
                            <a href="https://github.com/sachinsh01" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-info">
                        <p>Bengaluru, India</p>
                    </div>
                    <div className="copyright">
                        <p>&copy; Copyright SachinSharma {new Date().getFullYear()}</p>
                    </div>
                    <div className="coordinates">
                        <p>12.9716° N,</p>
                        <p>77.5946° E</p>
                    </div>
                </div>
            </div>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </footer>
    );
};

export default Footer;
