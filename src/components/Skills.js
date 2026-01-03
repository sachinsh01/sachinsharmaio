import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: "LANGUAGES",
            skills: ["JAVA", "JAVASCRIPT (ES6+)", "TYPESCRIPT"]
        },
        {
            title: "BACKEND",
            skills: ["SPRING BOOT", "SPRING WEBFLUX", "PROJECT REACTOR", "LLM INTEGRATION", "KAFKA", "HIBERNATE/JPA", "MYSQL", "NODE.JS", "RESTFUL APIS"]
        },
        {
            title: "FRONTEND",
            skills: ["REACT", "REACT HOOKS", "REDUX", "REDUX SAGA", "REDUX THUNK", "STYLED COMPONENTS"]
        },
        {
            title: "TESTING & DEVOPS",
            skills: ["JUNIT", "MOCKITO", "DOCKER", "JENKINS", "CI/CD PIPELINES"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    return (
        <section id="skills" className="skills-section">
            <div className="blueprint-grid"></div>
            <div className="skills-wrapper contents-container">
                <div className="spec-header">
                    <span className="spec-label">FIG. 02</span>
                    <span className="spec-label">REF: TECH_ARSENAL</span>
                    <span className="spec-label">CAPACITY: MAX</span>
                </div>

                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="skills-title">TECHNICAL <br /> <span className="hollow-text">SPECIFICATIONS</span></h2>
                </motion.div>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="skill-card"
                            variants={itemVariants}

                        >
                            <h3 className="card-title">{category.title}</h3>

                            <div className="card-tags">
                                {category.skills.map((skill, i) => (
                                    <span key={i} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Decorative Tech Markers */}
            <div className="marker m-bl">+</div>
            <div className="marker m-br">+</div>
        </section>
    );
};

export default Skills;
