import React, { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

export function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
            
            // Immediate update for dot for zero latency via CSS Variables
            if (dotRef.current) {
                dotRef.current.style.setProperty("--x", `${e.clientX}px`);
                dotRef.current.style.setProperty("--y", `${e.clientY}px`);
            }
        };

        const onMouseOver = (e) => {
            const target = e.target;
            if (!target) return;
            
            const isClickable = 
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('.proj-card') || 
                target.closest('.nav-link') ||
                target.closest('.hire-cta') ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(!!isClickable);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        // Animation loop for the following ring
        let rafId;
        const animate = () => {
            // Smoothly move ring towards mouse (lerp)
            const lerp = 0.15;
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

            if (ringRef.current) {
                ringRef.current.style.setProperty("--x", `${ringPos.current.x}px`);
                ringRef.current.style.setProperty("--y", `${ringPos.current.y}px`);
            }
            
            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, [isVisible]);

    return (
        <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
            <div 
                ref={dotRef}
                className={`cursor-dot ${isHovering ? "hover" : ""}`}
            />
            <div 
                ref={ringRef}
                className={`cursor-ring ${isHovering ? "hover" : ""}`}
            />
        </div>
    );
}
