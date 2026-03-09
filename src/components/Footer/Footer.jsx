import React from "react";

const styles = {
    footer: {
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 64px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    footerLinks: { display: "flex", gap: 24 },
    footerLink: {
        fontSize: "0.72rem", color: "rgba(232,230,223,0.35)",
        letterSpacing: "0.1em", cursor: "pointer", transition: "color 0.25s"
    },
    logoSmall: { fontSize: "0.82rem", color: "rgba(232,230,223,0.3)" },
};

export function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.logoSmall}>
                {"<BexDev />"} © 2026
            </div>
            <div style={styles.footerLinks}>
                {["GitHub", "LinkedIn", "Twitter", "Dev.to"].map(l => (
                    <span key={l} className="footer-link" style={styles.footerLink}>{l}</span>
                ))}
            </div>
        </footer>
    );
}
