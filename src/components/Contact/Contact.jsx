import React from "react";
import { FadeIn } from "../Common/FadeIn";

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
    contactInner: { maxWidth: 600, margin: "0 auto", textAlign: "center" },
    contactSub: { fontSize: "0.9rem", color: "rgba(232,230,223,0.45)", lineHeight: 1.85, margin: "20px 0 48px" },
    form: { display: "flex", flexDirection: "column", gap: 14, textAlign: "left" },
    formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
    input: {
        width: "100%", background: "#0f1117",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
        padding: "14px 18px", color: "#e8e6df",
        fontFamily: "inherit", fontSize: "0.82rem", outline: "none",
        transition: "border-color 0.25s", boxSizing: "border-box",
    },
    btnPrimary: {
        background: "#7fffb2", color: "#0a0a0f",
        padding: "14px 32px", borderRadius: "4px",
        fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: 700,
        cursor: "pointer", border: "none", textTransform: "uppercase",
        transition: "all 0.25s", fontFamily: "inherit",
    },
};

export function Contact() {
    return (
        <section id="contact" style={styles.section}>
            <div style={styles.contactInner}>
                <FadeIn>
                    <div style={styles.sectionTag}>// let's_talk</div>
                    <h2 style={styles.sectionTitle}>Have a project in mind?</h2>
                    <p style={styles.contactSub}>
                        I'm always open to discussing new opportunities, collaborations, or just a good conversation about tech.
                    </p>
                </FadeIn>
                <FadeIn delay={0.15}>
                    <div style={styles.form}>
                        <div style={styles.formRow}>
                            <input style={styles.input} placeholder="Your Name" />
                            <input style={styles.input} placeholder="Email Address" />
                        </div>
                        <input style={styles.input} placeholder="Subject" />
                        <textarea
                            style={{ ...styles.input, resize: "vertical", minHeight: 130 }}
                            placeholder="Tell me about your project…"
                        />
                        <button className="btn-primary" style={{ ...styles.btnPrimary, alignSelf: "flex-start" }}>
                            Send Message ⌘
                        </button>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
