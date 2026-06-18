import React from "react";
import "./Footer.css";

export function Footer() {
    const socialLinks = [
        { label: "GitHub", url: "https://github.com/AbdulBasitNawaz" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/abdul-basit-nwz-310383278" },
        { label: "X", url: "https://x.com/AbdulNwz74208" },
        { label: "YouTube", url: "https://www.youtube.com/@abdulbasitnwz3519" },
        { label: "TikTok", url: "https://www.tiktok.com/@abdulbasitnwz?_r=1&_t=ZS-97K1x9z8TvW" }
    ];

    return (
        <footer className="footer">
            <div className="footer-logo">
                {"<BexDev />"} © 2026
            </div>

            <div className="footer-links">
                {socialLinks.map(link => (
                    <a 
                        key={link.label} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="footer-link"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </footer>
    );
}
