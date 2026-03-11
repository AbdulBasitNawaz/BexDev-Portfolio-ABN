import React from "react";
import { FadeIn } from "../Common/FadeIn";
import "./Contact.css";

export function Contact() {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-inner">
                <FadeIn>
                    <div className="contact-tag">// let's_talk</div>
                    <h2 className="contact-title">Have a project in mind?</h2>
                    <p className="contact-sub">
                        I'm always open to discussing new opportunities, collaborations, or just a good conversation about tech.
                    </p>
                </FadeIn>
                <FadeIn delay={0.15}>
                    <div className="contact-form">
                        <div className="form-row">
                            <input className="contact-input" placeholder="Your Name" />
                            <input className="contact-input" placeholder="Email Address" />
                        </div>
                        <input className="contact-input" placeholder="Subject" />
                        <textarea
                            className="contact-input"
                            style={{ resize: "vertical", minHeight: 130 }}
                            placeholder="Tell me about your project…"
                        />
                        <button className="btn-primary contact-btn">
                            Send Message ⌘
                        </button>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
