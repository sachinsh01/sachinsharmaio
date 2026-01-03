import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
    const heroTextRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(heroTextRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
        );
    }, []);

    return (
        <section id="hero" className="hero-section">
            <div className="hero-content">
                <h1 ref={heroTextRef} className="hero-title">
                    I’m a Software Developer that has a burning passion to stand out.
                </h1>
            </div>
            <div className="hero-background">
                {/* Abstract background elements can go here */}
                <div className="glow-orb"></div>
            </div>
        </section>
    );
};

export default Hero;
