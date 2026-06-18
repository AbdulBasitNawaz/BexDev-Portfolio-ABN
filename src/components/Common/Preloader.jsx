import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 100);
            }
        });

        // Let the beautiful CSS loader spin for 1.8 seconds, then animate out
        tl.to(loaderRef.current, {
            opacity: 1,
            duration: 1.8,
        })
        .to(loaderRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
        })
        .to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut"
        });

    }, [onComplete]);

    return (
        <div className="preloader" ref={containerRef}>
            <div className="loader" ref={loaderRef}></div>
        </div>
    );
}
