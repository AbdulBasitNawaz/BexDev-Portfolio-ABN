import React from "react";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                {"<BexDev />"} © 2026
            </div>

            <div className="footer-links">
                {["GitHub", "LinkedIn", "Twitter", "Dev.to"].map(l => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
                ))}
            </div>
        </footer>
    );
}
