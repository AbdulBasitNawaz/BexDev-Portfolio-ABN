import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './FloatingCV.css';

export const FloatingCV = () => {
    const hitAreaRef = useRef(null);
    const arrowRef = useRef(null);
    const contentRef = useRef(null);
    const iconRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const arrow = arrowRef.current;
        
        // THE "HIDE" LOGIC:
        // xPercent: 100 -> Moves the element 100% of its width to the right (fully hidden).
        // x: -40       -> Pulls it back by 40px so only a small portion "peeks" out.
        // CHANGE THE -40 BELOW TO HIDE IT MORE (e.g. -30) OR LESS (e.g. -60).
        gsap.set(arrow, { xPercent: 100, x: -50 });

        const onMouseEnter = () => {
            setIsExpanded(true);
            gsap.to(arrow, {
                xPercent: 0,
                x: 0,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto"
            });
            gsap.to(iconRef.current, {
                scale: 1.1,
                x: -3,
                duration: 0.4,
                ease: "back.out(1.7)",
                overwrite: "auto"
            });
            // Hide vertical text on expansion
            gsap.to(".cv-vertical-text", { opacity: 0, duration: 0.2, overwrite: "auto" });
        };

        const onMouseLeave = () => {
            setIsExpanded(false);
            gsap.to(arrow, {
                xPercent: 100,
                x: -50, // Retracts to the peek position
                duration: 0.5,
                ease: "power3.inOut",
                overwrite: "auto"
            });
            gsap.to(iconRef.current, {
                scale: 1,
                x: 0,
                duration: 0.3,
                ease: "power2.in",
                overwrite: "auto"
            });
            // Show vertical text back
            gsap.to(".cv-vertical-text", { 
                opacity: 1, 
                duration: 0.4, 
                delay: 0.2, 
                overwrite: "auto" 
            });
        };

        arrow.addEventListener('mouseenter', onMouseEnter);
        arrow.addEventListener('mouseleave', onMouseLeave);

        return () => {
            arrow.removeEventListener('mouseenter', onMouseEnter);
            arrow.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    const handleClick = (e) => {
        // If not expanded, expand it first and prevent download
        if (!isExpanded) {
            e.preventDefault();
            setIsExpanded(true);
            gsap.to(arrowRef.current, {
                xPercent: 0,
                x: 0,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto"
            });
            gsap.to(iconRef.current, {
                scale: 1.1,
                x: -3,
                duration: 0.4,
                ease: "back.out(1.7)",
                overwrite: "auto"
            });
            gsap.to(".cv-vertical-text", { opacity: 0, duration: 0.2, overwrite: "auto" });
        }
        // If already expanded, let the default download behavior happen
    };

    return (
        <div className="floating-cv-container" ref={hitAreaRef}>
            <a 
                href="/resume.pdf" 
                download="Resume.pdf"
                className="floating-cv-arrow"
                ref={arrowRef}
                onClick={handleClick}
            >
                <div className="cv-arrow-tip" ref={iconRef}>
                    <span className="cv-vertical-text">RESUME</span>
                    <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="cv-icon"
                    >
                        <path 
                            d="M12 15L12 3M12 15L8 11M12 15L16 11" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="cv-arrow-body" ref={contentRef}>
                    <span className="cv-text">Download Resume</span>
                </div>
            </a>
        </div>
    );
};
