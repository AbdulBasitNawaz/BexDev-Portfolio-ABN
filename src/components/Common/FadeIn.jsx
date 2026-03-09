import React from "react";
import { useInView } from "../../hooks/useInView";

export function FadeIn({ children, delay = 0, style = {} }) {
    const [ref, visible] = useInView();
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(36px)",
            transition: `opacity 0.75s ${delay}s, transform 0.75s ${delay}s`,
            ...style,
        }}>
            {children}
        </div>
    );
}
