import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    className={`toast toast-${type}`}
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="toast-content">
                        {type === 'success' && <span className="toast-icon">✓</span>}
                        {type === 'error' && <span className="toast-icon">!</span>}
                        <span className="toast-message">{message}</span>
                    </div>
                    <button className="toast-close" onClick={onClose}>×</button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
