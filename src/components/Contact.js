import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from './Toast';
import './Contact.css';

const Contact = () => {
    const [status, setStatus] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        setStatus('submitting');

        try {
            const response = await fetch("https://formspree.io/f/xzdzjrkp", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                setToast({ show: true, message: "Message sent successfully!", type: "success" });
                form.reset();
            } else {
                const data = await response.json();
                setStatus('error');
                let msg = "Oops! There was a problem submitting your form";
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
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <h2 className="contact-title">Get In Touch</h2>
                </motion.div>

                <motion.form
                    className="contact-form"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="How can we collaborate?" rows="1" required></textarea>
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </motion.form>
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

export default Contact;
