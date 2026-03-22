import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Keep the component mounted just slightly longer for GSAP to finish its exit cleanly
                setTimeout(onComplete, 100);
            }
        });

        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .to(textRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            delay: 0.5,
            ease: "power3.in"
        })
        .to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        });

    }, [onComplete]);

    return (
        <div className="preloader" ref={containerRef}>
            <div className="preloader-text" ref={textRef}>
                <span>{"<BexDev />"}</span>
            </div>
        </div>
    );
}
