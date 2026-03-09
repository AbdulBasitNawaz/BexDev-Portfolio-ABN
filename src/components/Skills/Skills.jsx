import React from "react";
import { FadeIn } from "../Common/FadeIn";
import { SKILLS } from "../../constants";

const styles = {
    section: { padding: "110px 64px" },
    sectionTag: {
        fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#7fffb2", marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
        fontWeight: 700, lineHeight: 1.2, margin: 0,
    },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 56 },
    skillCard: {
        background: "#0f1117", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px", padding: "28px 24px",
        transition: "border-color 0.3s, transform 0.3s",
    },
    skillCat: {
        fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
        color: "#7fffb2", marginBottom: 16,
    },
    skillItem: {
        fontSize: "0.82rem", padding: "8px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        color: "rgba(232,230,223,0.7)", display: "flex", alignItems: "center", gap: 8,
    },
    skillDot: { width: 4, height: 4, borderRadius: "50%", background: "#7fffb2", flexShrink: 0 },
};

export function Skills() {
    return (
        <section id="skills" style={styles.section}>
            <FadeIn>
                <div style={styles.sectionTag}>// tech_stack</div>
                <h2 style={styles.sectionTitle}>Tools & Technologies</h2>
            </FadeIn>
            <div style={styles.skillsGrid}>
                {SKILLS.map((s, i) => (
                    <FadeIn key={s.cat} delay={i * 0.1}>
                        <div className="skill-card" style={styles.skillCard}>
                            <div style={styles.skillCat}>{s.cat}</div>
                            {s.items.map(item => (
                                <div key={item} style={styles.skillItem}>
                                    <span style={styles.skillDot} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
