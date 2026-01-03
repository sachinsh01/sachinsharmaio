import React from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const workHistory = [
    {
        id: 1,
        role: 'Senior Frontend Developer',
        company: 'Tech Corp',
        duration: '2022 - Present',
        description: 'Leading the frontend team, architecting new features, and optimizing performance.',
        type: 'Work'
    },
    {
        id: 2,
        role: 'Web Developer',
        company: 'Creative Agency',
        duration: '2020 - 2022',
        description: 'Developed responsive websites and interactive experiences for various clients.',
        type: 'Work'
    },
];

const education = [
    {
        id: 3,
        degree: 'B.S. in Computer Science',
        school: 'University of Technology',
        duration: '2016 - 2020',
        type: 'Education'
    },
];

const allItems = [...workHistory, ...education];

const Resume = () => {
    return (
        <section id="resume" className="resume-section">
            <div className="container">
                <motion.h2
                    className="section-title center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Resume Timeline
                </motion.h2>

                <div className="resume-timeline">
                    {allItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="timeline-item"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <span className="item-type">{item.type}</span>
                                <h4>{item.role || item.degree}</h4>
                                <span className="company">{item.company || item.school}</span>
                                <span className="duration">{item.duration}</span>
                                {item.description && <p>{item.description}</p>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resume;
