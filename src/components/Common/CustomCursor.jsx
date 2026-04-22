import React, { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";
import cursorNormal from '../../assets/cursor-normal.png';
import cursorHover from '../../assets/cursor-hover.png';

export function CustomCursor() {
    const cursorRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });
    
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [tooltipText, setTooltipText] = useState("");

    // Handle theme detection for the cursor
    useEffect(() => {
        const checkTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(currentTheme);
        };
        
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        
        return () => observer.disconnect();
    }, []);

    // Mouse events
    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
            
            if (cursorRef.current) {
                // Apply a small manual offset (-6px, -4px) so the tip matches the literal mouse pointer exactly
                cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 4}px, 0)`;
            }
        };

        const onMouseOver = (e) => {
            const target = e.target;
            if (!target) return;
            // Define all selectors that should trigger the "hover" cursor state
            const hoverSelectors = 'button, a, .proj-card, .nav-link, .hire-cta, input, textarea, select, [role="button"]';
            const isClickable = target.closest(hoverSelectors);
            setIsHovering(!!isClickable);

            // Tooltip Check
            const tooltipSource = target.closest('[data-cursor-tooltip]');
            if (tooltipSource) {
                setTooltipText(tooltipSource.dataset.cursorTooltip);
            } else {
                setTooltipText("");
            }
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);
        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [isVisible]);

    return (
        <div 
            ref={cursorRef} 
            className={`custom-cursor-wrapper theme-${theme}`}
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div className={`cursor-tooltip ${tooltipText ? 'visible' : ''}`}>
                {tooltipText}
            </div>
            <img 
                src={isHovering ? cursorHover : cursorNormal}
                alt="cursor"
                className={`cursor-icon ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
            />
        </div>
    );
}

export default CustomCursor;
