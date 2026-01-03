import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Explore.css';

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
    // Track which item is hovered (0, 1, 2) or null
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(".explore-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
                .fromTo(".explore-item",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
                    "-=0.4"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const options = [
        { title: "About", path: "/about" },
        { title: "Work", path: "/work" },
        { title: "Projects", path: "/projects" }
    ];

    return (
        <section className="explore-section" ref={containerRef}>
            <h2 className="explore-header">What would you like to explore?</h2>

            <div className="explore-menu">
                {options.map((option, index) => (
                    <motion.div
                        key={index}
                        className="explore-item"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Link to={option.path} className="explore-link">
                            <span
                                className={`explore-text ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
                            >
                                {option.title}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Explore;
