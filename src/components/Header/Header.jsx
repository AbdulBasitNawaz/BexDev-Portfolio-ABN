import React from "react";
import { NAV_LINKS } from "../../constants";

const styles = {
    nav: {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 64px",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
    },
    logo: {
        fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.05em",
        color: "#7fffb2", cursor: "pointer",
    },
    navLinks: { display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 },
    navLink: (isActive) => ({
        fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
        cursor: "pointer", color: isActive ? "#7fffb2" : "rgba(232,230,223,0.5)",
        transition: "color 0.25s", textDecoration: "none",
    }),
    hireCta: {
        background: "transparent", border: "1px solid #7fffb2",
        color: "#7fffb2", padding: "8px 22px", borderRadius: "4px",
        fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
        cursor: "pointer", transition: "all 0.25s",
    },
};

export function Header({ active, setActive, scrollTo }) {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo} onClick={() => scrollTo("hero")}>{"<BexDev />"}</div>
            <ul style={styles.navLinks}>
                {NAV_LINKS.map(n => (
                    <li key={n}>
                        <span
                            style={styles.navLink(active === n)}
                            onClick={() => { setActive(n); scrollTo(n); }}
                        >
                            {n}
                        </span>
                    </li>
                ))}
            </ul>
            <button className="hire-cta" style={styles.hireCta} onClick={() => scrollTo("contact")}>
                Hire Me
            </button>
        </nav>
    );
}
