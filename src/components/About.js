import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="blueprint-grid"></div>
            <div className="about-container">
                <div className="spec-header">
                    <span className="spec-label">FIG. 01</span>
                    <span className="spec-label">REF: SACHIN_DEV</span>
                    <span className="spec-label">STATUS: AVAILABLE</span>
                </div>

                <div className="main-content-grid">
                    <motion.div
                        className="title-block"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="blueprint-title">
                            SOFTWARE <br />
                            <span className="hollow-text">ENGINEER</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="spec-details"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >

                        <div className="spec-body">
                            <p>
                                Software Engineer with 3+ years of experience in full-stack development and enterprise AI integration.
                                B.Tech graduate with expertise in Java (Spring Boot/WebFlux), React, and Kafka.
                            </p>
                            <p>
                                Proven ability to build CI/CD pipelines, optimize and modernize legacy systems, and deliver secure,
                                context-aware AI solutions and high-performance UIs.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Tech Markers */}
            <div className="marker m-tl">+</div>
            <div className="marker m-tr">+</div>
            <div className="marker m-bl">+</div>
            <div className="marker m-br">+</div>
        </section>
    );
};

export default About;
