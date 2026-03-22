import React, { useState } from "react";
import { NAV_LINKS } from "../../constants";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
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
            <div className="logo" onClick={() => scrollTo("hero")}>{"<BexDev />"}</div>
            
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
            </ul>

            <div className="header-actions">
                <ThemeToggle />

                <button className="hire-cta header-hire-btn" onClick={() => scrollTo("contact")}>
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
