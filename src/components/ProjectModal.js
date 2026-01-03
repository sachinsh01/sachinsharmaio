import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            <motion.div
                className="project-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="project-modal-content"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-modal-btn" onClick={onClose}>
                        <FaTimes />
                    </button>

                    <h2 className="modal-title">
                        {project.title.replace('_', ' ')}
                    </h2>

                    <div className="modal-specs">
                        {project.specs.map(spec => (
                            <span key={spec} className="modal-spec-tag">{spec}</span>
                        ))}
                    </div>

                    <ul className="modal-details">
                        {project.details.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default ProjectModal;
