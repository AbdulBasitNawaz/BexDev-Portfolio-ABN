import React from "react";
import { FadeIn } from "../Common/FadeIn";

const styles = {
    section: { padding: "110px 64px", background: "#0d0d12" },
    sectionTag: {
        fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#7fffb2", marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
        fontWeight: 700, lineHeight: 1.2, margin: 0,
    },
    aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginTop: 56 },
    aboutText: { fontSize: "0.9rem", lineHeight: 1.95, color: "rgba(232,230,223,0.55)", margin: "0 0 20px" },
    codeBlock: {
        background: "#0f1117", border: "1px solid rgba(127,255,178,0.1)",
        borderRadius: "12px", padding: "28px 32px", fontFamily: "inherit",
        fontSize: "0.8rem", lineHeight: 1.9,
    },
    codeLine: (color) => ({ color, margin: 0 }),
};

export function About() {
    return (
        <section id="about" style={styles.section}>
            <FadeIn>
                <div style={styles.sectionTag}>// about_me</div>
                <h2 style={styles.sectionTitle}>The developer<br />behind the code</h2>
            </FadeIn>
            <div style={styles.aboutGrid}>
                <FadeIn delay={0.1}>
                    <p style={styles.aboutText}>
                        Hey, I'm Abdul Basit Nawaz — a full-stack developer with 6+ years turning complex problems into elegant, performant software. I care deeply about code quality, developer experience, and products that genuinely delight users.
                    </p>
                    <p style={styles.aboutText}>
                        My work spans frontend architecture, API design, and DevOps automation. I'm passionate about open source and have contributed to several major projects in the React and Node.js ecosystems.
                    </p>
                    <p style={{ ...styles.aboutText, marginBottom: 0 }}>
                        When I'm not coding, I'm writing dev blog posts, mentoring junior developers, or exploring new programming languages.
                    </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div style={styles.codeBlock}>
                        <p style={styles.codeLine("#6e7a8a")}>// alex_carter.config.js</p>
                        <p style={styles.codeLine("#7fffb2")}>const developer = {"{"}</p>
                        <p style={styles.codeLine("#e8e6df")}>  &nbsp;name: <span style={{ color: "#ff9966" }}>"Alex Carter"</span>,</p>
                        <p style={styles.codeLine("#e8e6df")}>  &nbsp;role: <span style={{ color: "#ff9966" }}>"Full Stack Dev"</span>,</p>
                        <p style={styles.codeLine("#e8e6df")}>  &nbsp;location: <span style={{ color: "#ff9966" }}>"San Francisco, CA"</span>,</p>
                        <p style={styles.codeLine("#e8e6df")}>  &nbsp;available: <span style={{ color: "#7fffb2" }}>true</span>,</p>
                        <p style={styles.codeLine("#e8e6df")}>  &nbsp;coffee: <span style={{ color: "#7fffb2" }}>Infinity</span>,</p>
                        <p style={styles.codeLine("#e8e6df")}>  &nbsp;passion: <span style={{ color: "#ff9966" }}>"clean code"</span>,</p>
                        <p style={styles.codeLine("#7fffb2")}>{"}"}<span style={{ color: "#e8e6df" }}>;</span></p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
