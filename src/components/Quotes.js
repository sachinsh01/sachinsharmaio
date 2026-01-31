import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Quotes.css';

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
];

const Quotes = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.section
            id="quotes"
            className="quotes-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="quotes-container">
                <div className="quote-display">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="quote-content"
                        >
                            <p className="quote-text">"{quotes[index].text}"</p>
                            <p className="quote-author">{quotes[index].author}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="quote-progress">
                    {quotes.map((_, i) => (
                        <div
                            key={i}
                            className={`progress-dot ${i === index ? 'active' : ''}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Quotes;
