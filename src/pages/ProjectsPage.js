import React from 'react';
import Projects from '../components/Projects';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '100vh', background: '#000' }}
        >
            <Projects />
        </motion.div>
    );
};

export default ProjectsPage;
