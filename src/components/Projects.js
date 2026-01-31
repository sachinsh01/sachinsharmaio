import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './Projects.css';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: "01",
        title: 'AI_INTERVIEW',
        desc: 'Autonomous voice chatbot for interviews using OpenAI GPT & Whisper.',
        specs: ['REACT', 'NODE', 'OPENAI', 'WHISPER', 'CHART.JS'],
        status: 'NOT LIVE',
        statValue: 'REAL',
        statLabel: 'TIME',
        details: [
            "Developed an AI-powered voice chatbot that autonomously joined virtual interviews, conducted question-answer sessions using preset logic, and provided real-time evaluation summaries of candidates.",
            "Integrated Natural Language Processing (NLP) models using OpenAI’s GPT and Whisper APIs to analyze spoken responses and extract key evaluation points, sentiment, and candidate performance metrics.",
            "Built real-time voice interaction system using Text-to-Speech (TTS) engines with Indian and American accent support, enhancing candidate experience and system reliability.",
            "Implemented voice recognition and auto-attendance feature, allowing the bot to join scheduled interviews via calendar integration and conduct sessions without human intervention.",
            "Built a dashboard for recruiters to review summarized reports, analytics, and decision suggestions post-interview using React and Chart.js."
        ]
    },
    {
        id: "02",
        title: 'CRYPTO_ALERT',
        desc: 'Real-time price alert system managing user thresholds via Node.js microservices.',
        specs: ['NODE.JS', 'RABBITMQ', 'REDIS', 'REST_API'],
        status: 'NOT LIVE',
        statValue: 'REAL',
        statLabel: 'TIME',
        details: [
            "Designed and implemented back-end APIs to manage crypto price alerts, supporting creation, modification, and deletion of user alerts.",
            "Built backend services in Node.js with Express to handle real-time alert configurations for cryptocurrencies.",
            "Contributed to integrating RabbitMQ as a message broker to facilitate asynchronous communication between microservices, enhancing system responsiveness and scalability.",
            "Contributed to integrating Redis as a caching layer to optimize an endpoint, reducing database load and improving response times"
        ]
    }
];

const Projects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const progressRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const wrapper = sectionRef.current;
        const getScrollAmount = () => -((projectsData.length - 1) * window.innerWidth);

        const scrollTween = gsap.to(wrapper, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: () => `+=${(projectsData.length - 1) * window.innerWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressRef.current) {
                        progressRef.current.style.width = `${self.progress * 100}%`;
                    }
                }
            }
        });

        const panels = gsap.utils.toArray('.project-panel');
        panels.forEach((panel) => {
            const title = panel.querySelector('.p-title');
            const specs = panel.querySelector('.p-specs');

            if (title) {
                gsap.fromTo(title,
                    { x: 100, opacity: 0.5 },
                    {
                        x: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: scrollTween,
                            start: "left center",
                            end: "center center",
                            scrub: true
                        }
                    }
                );
            }
            if (specs) {
                gsap.fromTo(specs,
                    { x: 50, opacity: 0.5 },
                    {
                        x: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: scrollTween,
                            start: "left center",
                            end: "center center",
                            scrub: true
                        }
                    }
                );
            }
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="scroll-container-outer" ref={triggerRef}>
            <div className="scanlines"></div>
            <div className="project-progress-container">
                <div className="project-progress-bar" ref={progressRef}></div>
            </div>

            <div className="projects-scroll-wrapper" ref={sectionRef}>
                {projectsData.map((project, index) => (
                    <div
                        className="project-panel"
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="panel-content clickable-panel">
                            <div className="blueprint-bg"></div>

                            <div className="panel-header">
                                <span className="p-fig">FIG.{project.id}</span>
                                <span className="p-status">
                                    <span className="blink">●</span> STATUS :: {project.status}
                                </span>
                            </div>

                            <div className="panel-main">
                                <h2 className="p-title glitch-hover" data-text={project.title}>
                                    {project.title.split('_')[0]}<span className="hollow">{project.title.split('_')[1]}</span>
                                </h2>
                                <p className="p-desc">{project.desc}</p>
                                <p className="click-hint">[ CLICK TO EXPAND ]</p>

                                <div className="p-specs">
                                    <div className="spec-list">
                                        <span className="spec-label">TECH_STACK:</span>
                                        {project.specs.map(spec => (
                                            <span key={spec} className="spec-item">{spec}</span>
                                        ))}
                                    </div>
                                    <div className="p-stat">
                                        <span className="stat-value">{project.statValue}</span>
                                        <span className="stat-label">{project.statLabel}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-footer">
                                <div className="footer-line"></div>
                                <span className="p-ref">REF_ID: XJ-{Math.floor(Math.random() * 9000) + 1000}</span>
                            </div>

                            <div className="tech-marker tech-marker-tl"></div>
                            <div className="tech-marker tech-marker-br"></div>
                        </div>
                    </div>
                ))}
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default Projects;
