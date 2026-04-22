import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FloatingCV.css';

export const FloatingCV = () => {
    const hitAreaRef = useRef(null);
    const arrowRef = useRef(null);
    const contentRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const hitArea = hitAreaRef.current;
        
        // Initial state: hide the body, keep exactly the 62px tip peaking
        gsap.set(arrowRef.current, { xPercent: 100, x: -62 });

        const onMouseEnter = () => {
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
            // Hide vertical text on expansion
            gsap.to(".cv-vertical-text", { opacity: 0, duration: 0.2, overwrite: "auto" });
        };

        const onMouseLeave = () => {
            gsap.to(arrowRef.current, {
                xPercent: 100,
                x: -62,
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

        hitArea.addEventListener('mouseenter', onMouseEnter);
        hitArea.addEventListener('mouseleave', onMouseLeave);

        return () => {
            hitArea.removeEventListener('mouseenter', onMouseEnter);
            hitArea.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <div className="floating-cv-container" ref={hitAreaRef}>
            <a 
                href="/resume.pdf" 
                download="Resume.pdf"
                className="floating-cv-arrow"
                ref={arrowRef}
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
