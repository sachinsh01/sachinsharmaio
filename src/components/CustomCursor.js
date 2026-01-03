import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    // Initialize position to center of screen for the scroll animation
    const [mousePosition, setMousePosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
    const [cursorVariant, setCursorVariant] = useState("default");
    const [caretHeight, setCaretHeight] = useState(24);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });

            const target = e.target;

            // PRIORITY CHECK: Interactive elements always get the circle (default)
            // Using logic that traverses up the DOM to finding link/button wrappers
            const isInteractive = target.closest('a') || target.closest('button') || target.closest('.btn');

            if (isInteractive) {
                setCursorVariant("default");
                return;
            }

            // SECONDARY CHECK: Text elements get the bar (text)
            // Explicitly checking tag names. 
            // NOTE: We deliberately exclude 'SPAN' to prevent false positives inside other elements.
            const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'INPUT', 'TEXTAREA'];
            if (textTags.includes(target.tagName)) {
                setCursorVariant("text");
                const style = window.getComputedStyle(target);
                const fontSize = parseFloat(style.fontSize);
                if (!isNaN(fontSize)) {
                    // Make caret slightly larger than text for better visibility
                    setCaretHeight(fontSize * 1.2);
                }
            } else {
                setCursorVariant("default");
            }
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "#fff",
            borderRadius: "50%",
            mixBlendMode: "difference",
            pointerEvents: "none",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2147483647 // Max Z-Index to stay on top of everything
        },
        text: {
            x: mousePosition.x - 2,
            y: mousePosition.y - caretHeight / 2,
            height: caretHeight,
            width: 4,
            backgroundColor: "#fff",
            borderRadius: 0,
            mixBlendMode: "difference",
            pointerEvents: "none",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2147483647
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={cursorVariant}
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 35,
                mass: 0.5
            }}
        />
    );
};

export default CustomCursor;
