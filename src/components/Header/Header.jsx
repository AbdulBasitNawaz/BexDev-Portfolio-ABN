import React, { useState } from "react";
import { NAV_LINKS } from "../../constants";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import bdLogo from "../../assets/BDLogo1.png";
import bdLogoLight from "../../assets/BDLogo1White.png";
import "./Header.css";

export function Header({ active, setActive, scrollTo }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (link) => {
        setActive(link);
        scrollTo(link);
        setIsMenuOpen(false);
    };

    return (
        <nav className="nav">
            <div className="logo" onClick={() => { scrollTo("hero"); setActive(""); }}>
                <img src={bdLogo} alt="BexDev Logo" className="logo-img logo-dark" />
                <img src={bdLogoLight} alt="BexDev Logo" className="logo-img logo-light" />
            </div>
            
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                {NAV_LINKS.map(n => (
                    <li key={n}>
                        <span
                            className={`nav-link ${active === n ? "active" : ""}`}
                            onClick={() => handleNavClick(n)}
                        >
                            {n}
                        </span>
                    </li>
                ))}
                <li className="mobile-only">
                    <span className="nav-link" onClick={() => handleNavClick("contact")}>
                        Hire Me
                    </span>
                </li>
                <li className="mobile-only mobile-socials-item">
                    <div className="mobile-socials">
                        <a href="https://github.com/AbdulBasitNawaz" target="_blank" rel="noopener noreferrer" className="mobile-social-link" aria-label="GitHub">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/abdul-basit-nwz-310383278" target="_blank" rel="noopener noreferrer" className="mobile-social-link" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <button 
                            onClick={() => handleNavClick("contact")} 
                            className="mobile-social-link btn-link" 
                            aria-label="Email"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </button>
                        <a href="https://x.com/AbdulNwz74208" target="_blank" rel="noopener noreferrer" className="mobile-social-link" aria-label="X (formerly Twitter)">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </li>
            </ul>

            <div className="header-actions">
                <div className="header-socials">
                    <a href="https://github.com/AbdulBasitNawaz" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/abdul-basit-nwz-310383278" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>
                    <button 
                        onClick={() => handleNavClick("contact")} 
                        className="header-social-link btn-link" 
                        aria-label="Email"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </button>
                    <a href="https://x.com/AbdulNwz74208" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="X (formerly Twitter)">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </div>

                <ThemeToggle />

                <button className="hire-cta header-hire-btn" onClick={() => handleNavClick("contact")}>
                    Hire Me
                </button>

                <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </nav>
    );
}
