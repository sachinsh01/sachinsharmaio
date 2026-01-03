import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Work.css';

const workExperience = [
    {
        id: 1,
        role: "SOFTWARE ENGINEER",
        company: "WISSEN",
        client: "Client - Morgan Stanley | Cash Management",
        period: "JULY 2025 — PRESENT",
        stack: ["SPRING BOOT", "KAFKA", "REACT", "REDUX", "ELASTICSEARCH", "OPENAI"],
        description: "Migrated legacy mainframe infrastructure to a modern Spring Boot and Kafka architecture, achieving a 40% reduction in processing latency and significantly improving scalability.",
        achievements: [
            "Identified and resolved memory leaks by analyzing heap usage and object lifecycles, improving application stability and reducing memory consumption.",
            "Developed key features for a firmwide AI search platform, integrating Elasticsearch and OpenAI LLMs to deliver context-aware answers through a RAG-based architecture using organization-wide data sources.",
            "Implemented reactive streams using Project Reactor to process real-time data from Kafka, ensuring back-pressure handling and low-latency delivery across distributed services.",
            "Developed responsive user interfaces using React, implementing robust state management with Redux and React Context API to orchestrate complex data flows in high-traffic applications.",
            "Spearheaded the refactoring of a critical project module to standardize the architecture, implementing design patterns that reduced code complexity and streamlined the onboarding process for new developers.",
            "Took on Scrum Master responsibilities within the Agile squad, facilitating sprint planning, stand-ups, and retrospectives.",
            "Provided technical guidance to junior developers, conducted code reviews to ensure code quality, and contributed to architectural decisions while collaborating with cross-functional global teams."
        ]
    },
    {
        id: 2,
        role: "SOFTWARE ENGINEER",
        company: "INCEDO",
        period: "JULY 2023 — JULY 2025",
        stack: ["SPRING BOOT", "REACT", "REDUX", "RABBITMQ", "REDIS", "SQL", "JWT"],
        description: "Integrated RabbitMQ to decouple microservices through asynchronous event-driven communication, improving system scalability and reducing service coupling in a high-availability environment.",
        achievements: [
            "Optimized system throughput by integrating a Redis-based caching layer, effectively mitigating database bottlenecks and enhancing the scalability of read-heavy microservices.",
            "Implemented a stateless authentication mechanism leveraging JWT, reducing server-side session overhead and integrating automated token rotation to enhance security across the microservice cluster.",
            "Developed robust database routines and stored procedures to orchestrate high-volume data retrieval, ensuring data integrity while leveraging execution plan analysis to optimize query performance.",
            "Built scalable UIs with React.js, leveraging a component-based architecture and Redux/Context API for efficient state management across complex, data-intensive dashboards.",
            "Engineered an efficient search experience by implementing paginated API endpoints, coordinating with the React frontend to handle large-scale data sets with minimal latency"
        ]
    }
];

const Work = () => {
    const [activeJob, setActiveJob] = useState(workExperience[0]);

    return (
        <div className="work-page-container">
            <h1 className="work-page-title">WORK EXPERIENCE</h1>
            <div className="work-grid">
                {/* Sticky Left Panel - Context */}
                <div className="work-sidebar">
                    <div className="sticky-wrapper">
                        <div className="context-block">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeJob.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="context-role">{activeJob.role}</h2>
                                    <h3 className="context-company">@{activeJob.company}</h3>
                                    {activeJob.client && (
                                        <div className="context-client" style={{
                                            marginBottom: '1rem',
                                            opacity: 0.8,
                                            fontFamily: 'monospace',
                                            fontSize: '0.9rem'
                                        }}>
                                            {activeJob.client}
                                        </div>
                                    )}
                                    <div className="context-period">{activeJob.period}</div>

                                    <div className="context-stack">
                                        {activeJob.stack.map(tech => (
                                            <span key={tech} className="ctx-tag">{tech}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="sidebar-decoration">
                            <div className="scanner-line"></div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Right Panel - Content */}
                <div className="work-feed">
                    {workExperience.map((job) => (
                        <Card
                            key={job.id}
                            job={job}
                            setActiveJob={setActiveJob}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
};

const Card = ({ job, setActiveJob }) => {
    return (
        <motion.div
            className="experience-card"
            onViewportEnter={() => setActiveJob(job)}
            viewport={{ amount: 0.5, margin: "0px 0px -20% 0px" }}
        >
            <div className="mobile-work-header">
                <h2 className="m-ctx-role">{job.role}</h2>
                <h3 className="m-ctx-company">@{job.company}</h3>
                {job.client && <div className="m-ctx-client">{job.client}</div>}
                <div className="m-ctx-period">{job.period}</div>
                <div className="m-ctx-stack">
                    {job.stack.map(tech => (
                        <span key={tech} className="m-ctx-tag">{tech}</span>
                    ))}
                </div>
            </div>

            <div className="card-vis-header">
                <span className="card-id">EXP_0{job.id}</span>
                <span className="card-line"></span>
            </div>

            <ul className="card-achievements">
                <li>{job.description}</li>
                {job.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Work;
