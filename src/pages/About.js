import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '../components/About';
import Skills from '../components/Skills';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                paddingTop: '100px',
                minHeight: '100vh',
                background: '#050505',
                color: '#ffffff'
            }}
        >
            <h1 className="about-page-title">ABOUT</h1>
            <AboutSection />
            <Skills />
        </motion.div>
    );
};

export default About;
