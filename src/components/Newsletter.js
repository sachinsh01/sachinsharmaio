import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from './Toast';
import './Newsletter.css';

const Newsletter = () => {
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
        <section id="newsletter" className="newsletter-section">
            <div className="container">
                <motion.div
                    className="newsletter-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2>Subscribe to my Newsletter</h2>
                    <p>Get the latest updates on my projects and tech articles.</p>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Enter your email" required />
                        <button type="submit" disabled={status === 'submitting'}>
                            {status === 'submitting' ? '...' : 'Subscribe'}
                        </button>
                    </form>
                </motion.div>
            </div>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </section>
    );
};

export default Newsletter;
