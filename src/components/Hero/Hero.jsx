import React, { useState, useEffect, useRef } from "react";
import developerImg from "../../assets/developer.png";

const styles = {
    hero: {
        minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
        alignItems: "center", padding: "0 64px", gap: 60,
        paddingTop: 100,
    },
    heroLeft: { display: "flex", flexDirection: "column", gap: 24 },
    badge: {
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(127,255,178,0.08)", border: "1px solid rgba(127,255,178,0.2)",
        borderRadius: "100px", padding: "6px 16px",
        fontSize: "0.7rem", letterSpacing: "0.12em", color: "#7fffb2",
        width: "fit-content",
    },
    heroName: {
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: "clamp(3rem, 5.5vw, 5rem)", fontWeight: 700,
        lineHeight: 1.05, margin: 0,
        background: "linear-gradient(135deg, #e8e6df 30%, #7fffb2)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    },
    typeRow: { display: "flex", alignItems: "center", gap: 10, height: 36 },
    typeLabel: { fontSize: "1.1rem", color: "rgba(232,230,223,0.55)", fontFamily: "inherit" },
    typeText: { fontSize: "1.1rem", color: "#7fffb2", fontFamily: "inherit" },
    cursor: { display: "inline-block", width: 2, height: "1.1rem", background: "#7fffb2", animation: "blink 1s step-end infinite" },
    heroDesc: {
        fontSize: "0.92rem", lineHeight: 1.85, color: "rgba(232,230,223,0.5)",
        maxWidth: 460, margin: 0,
    },
    heroActions: { display: "flex", gap: 16, alignItems: "center", marginTop: 8 },
    btnPrimary: {
        background: "#7fffb2", color: "#0a0a0f",
        padding: "14px 32px", borderRadius: "4px",
        fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: 700,
        cursor: "pointer", border: "none", textTransform: "uppercase",
        transition: "all 0.25s", fontFamily: "inherit",
    },
    btnOutline: {
        background: "transparent", color: "#e8e6df",
        padding: "13px 32px", borderRadius: "4px",
        fontSize: "0.8rem", letterSpacing: "0.1em",
        cursor: "pointer", border: "1px solid rgba(232,230,223,0.15)",
        transition: "all 0.25s", fontFamily: "inherit",
    },
    statRow: {
        display: "flex", gap: 40, paddingTop: 32,
        borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 8,
    },
    statNum: {
        fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: 700,
        color: "#7fffb2", lineHeight: 1,
    },
    statLabel: {
        fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
        color: "rgba(232,230,223,0.4)", marginTop: 4,
    },
    heroRight: {
        position: "relative", display: "flex",
        alignItems: "center", justifyContent: "center",
        height: "100%",
        overflow: "visible",
    },
    heroImg: {
        position: "relative", zIndex: 2,
        width: "90%",
        maxWidth: 400,
        height: "auto",
        objectFit: "contain",
        display: "block",
        filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
    },
    floatCard: (isLeft) => ({
        position: "absolute", zIndex: 3,
        background: "rgba(15,15,20,0.95)",
        border: "1px solid rgba(127,255,178,0.15)",
        borderRadius: "12px", padding: "12px 16px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        ...(isLeft ? { top: "25%", left: "-5%" } : { bottom: "25%", right: "-5%" }),
    }),
    floatLabel: { fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(232,230,223,0.4)", textTransform: "uppercase" },
    floatVal: { fontSize: "0.85rem", fontWeight: 600, color: "#7fffb2", marginTop: 2 },
};

export function Hero({ scrollTo }) {
    const [typed, setTyped] = useState("");
    const roles = ["Full Stack Developer", "Open Source Enthusiast", "API Architect", "React Specialist"];
    const roleIdx = useRef(0);
    const charIdx = useRef(0);
    const deleting = useRef(false);

    useEffect(() => {
        const tick = () => {
            const word = roles[roleIdx.current];
            if (!deleting.current) {
                charIdx.current++;
                setTyped(word.slice(0, charIdx.current));
                if (charIdx.current === word.length) { deleting.current = true; return 2000; }
            } else {
                charIdx.current--;
                setTyped(word.slice(0, charIdx.current));
                if (charIdx.current === 0) {
                    deleting.current = false;
                    roleIdx.current = (roleIdx.current + 1) % roles.length;
                    return 300;
                }
            }
            return deleting.current ? 60 : 80;
        };
        let timer;
        const loop = () => { const delay = tick(); timer = setTimeout(loop, delay); };
        timer = setTimeout(loop, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="hero" style={styles.hero}>
            <div style={styles.heroLeft}>
                <div style={{ opacity: 0, animation: "fadeUp 0.8s 0.1s forwards" }}>
                    <span style={styles.badge}>🟢 Available for new projects</span>
                </div>
                <h1 style={{ ...styles.heroName, opacity: 0, animation: "fadeUp 0.8s 0.3s forwards" }}>
                    Abdul Basit
                </h1>
                <div style={{ ...styles.typeRow, opacity: 0, animation: "fadeUp 0.8s 0.5s forwards" }}>
                    <span style={styles.typeLabel}>I'm a </span>
                    <span style={styles.typeText}>{typed}</span>
                    <span style={styles.cursor} />
                </div>
                <p style={{ ...styles.heroDesc, opacity: 0, animation: "fadeUp 0.8s 0.65s forwards" }}>
                    I build fast, scalable, and beautifully crafted web applications. From pixel-perfect frontends to resilient backend systems — I ship things that work.
                </p>
                <div style={{ ...styles.heroActions, opacity: 0, animation: "fadeUp 0.8s 0.8s forwards" }}>
                    <button className="btn-primary" style={styles.btnPrimary} onClick={() => scrollTo("projects")}>View Projects</button>
                    <button className="btn-outline" style={styles.btnOutline} onClick={() => scrollTo("contact")}>Get In Touch →</button>
                </div>
                <div style={{ ...styles.statRow, opacity: 0, animation: "fadeUp 0.8s 1s forwards" }}>
                    {[["6+", "Years Exp"], ["48", "Projects"], ["12k+", "GitHub Stars"]].map(([n, l]) => (
                        <div key={l}>
                            <div style={styles.statNum}>{n}</div>
                            <div style={styles.statLabel}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.heroRight}>
                <div style={{ ...styles.floatCard(true), animation: "float 4s ease-in-out infinite" }}>
                    <div style={styles.floatLabel}>Current Stack</div>
                    <div style={styles.floatVal}>React · Node · TS</div>
                </div>

                <img src={developerImg} alt="Alex Carter" style={styles.heroImg} />

                <div style={{ ...styles.floatCard(false), animation: "float 4s ease-in-out 1.5s infinite" }}>
                    <div style={styles.floatLabel}>Open Source</div>
                    <div style={styles.floatVal}>⭐ 12k+ Stars</div>
                </div>
            </div>
        </section>
    );
}
