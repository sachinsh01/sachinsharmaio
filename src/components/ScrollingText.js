import React, { useState, useEffect } from 'react';
import './ScrollingText.css';

const ScrollingText = ({ onComplete }) => {
    const text = "Sachin Sharma";
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className={`loading-screen ${!isVisible ? 'fade-out' : ''}`}
            onTransitionEnd={() => {
                if (!isVisible && onComplete) {
                    onComplete();
                }
            }}
        >
            <div className="scrolling-row scroll-left">
                <div className="scrolling-content">
                    {Array(20).fill(text).map((name, i) => (
                        <span key={i} className="text-item">{name}</span>
                    ))}
                </div>
                <div className="scrolling-content">
                    {Array(20).fill(text).map((name, i) => (
                        <span key={i} className="text-item">{name}</span>
                    ))}
                </div>
            </div>

            <div className="scrolling-row scroll-right">
                <div className="scrolling-content">
                    {Array(20).fill(text).map((name, i) => (
                        <span key={i} className="text-item">{name}</span>
                    ))}
                </div>
                <div className="scrolling-content">
                    {Array(20).fill(text).map((name, i) => (
                        <span key={i} className="text-item">{name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingText;
