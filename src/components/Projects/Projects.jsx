import React from "react";
import { FadeIn } from "../Common/FadeIn";
import { PROJECTS } from "../../constants";

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
    projectsGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginTop: 56 },
    projectCard: (color) => ({
        borderRadius: "20px", overflow: "hidden",
        background: color, border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.35s, box-shadow 0.35s", cursor: "pointer",
    }),
    projectBody: { padding: "28px 28px 24px" },
    projectIcon: { fontSize: "2rem", marginBottom: 16 },
    projectTitle: { fontFamily: "'Georgia', serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: 10 },
    projectDesc: { fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(232,230,223,0.5)", marginBottom: 20 },
    tagRow: { display: "flex", flexWrap: "wrap", gap: 8 },
    tag: {
        fontSize: "0.65rem", letterSpacing: "0.1em", padding: "5px 12px",
        background: "rgba(255,255,255,0.07)", borderRadius: "100px",
        color: "rgba(232,230,223,0.6)", textTransform: "uppercase",
    },
};

export function Projects() {
    return (
        <section id="projects" style={styles.section}>
            <FadeIn>
                <div style={styles.sectionTag}>// featured_work</div>
                <h2 style={styles.sectionTitle}>Projects I'm proud of</h2>
            </FadeIn>
            <div style={styles.projectsGrid}>
                {PROJECTS.map((p, i) => (
                    <FadeIn key={p.title} delay={i * 0.1}>
                        <div className="proj-card" style={styles.projectCard(p.color)}>
                            <div style={styles.projectBody}>
                                <div style={styles.projectIcon}>{p.icon}</div>
                                <div style={styles.projectTitle}>{p.title}</div>
                                <p style={styles.projectDesc}>{p.desc}</p>
                                <div style={styles.tagRow}>
                                    {p.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                                </div>
                                <div style={{ marginTop: 20, fontSize: "0.78rem", color: "#7fffb2", cursor: "pointer" }}>
                                    View on GitHub →
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
