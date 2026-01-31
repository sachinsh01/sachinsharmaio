import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroTextRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(heroTextRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="hero-section" ref={containerRef}>
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
