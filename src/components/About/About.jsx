import React from "react";
import { FadeIn } from "../Common/FadeIn";
import "./About.css";

export function About() {
    return (
        <section id="about" className="about-section">
            <FadeIn>
                <div className="about-tag">// about_me</div>
                <h2 className="about-title">The developer<br />behind the code</h2>
            </FadeIn>
            <div className="about-grid">
                <FadeIn delay={0.1}>
                    <p className="about-text">
                        Hey, I'm Abdul Basit Nawaz — a full-stack developer with 6+ years turning complex problems into elegant, performant software. I care deeply about code quality, developer experience, and products that genuinely delight users.
                    </p>
                    <p className="about-text">
                        My work spans frontend architecture, API design, and DevOps automation. I'm passionate about open source and have contributed to several major projects in the React and Node.js ecosystems.
                    </p>
                    <p className="about-text">
                        When I'm not coding, I'm writing dev blog posts, mentoring junior developers, or exploring new programming languages.
                    </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div className="code-block">
                        <p className="code-line" style={{ color: "#6e7a8a" }}>// alex_carter.config.js</p>
                        <p className="code-line" style={{ color: "#7fffb2" }}>const developer = {"{"}</p>
                        <p className="code-line" style={{ color: "#e8e6df" }}>  &nbsp;name: <span style={{ color: "#ff9966" }}>"Alex Carter"</span>,</p>
                        <p className="code-line" style={{ color: "#e8e6df" }}>  &nbsp;role: <span style={{ color: "#ff9966" }}>"Full Stack Dev"</span>,</p>
                        <p className="code-line" style={{ color: "#e8e6df" }}>  &nbsp;location: <span style={{ color: "#ff9966" }}>"San Francisco, CA"</span>,</p>
                        <p className="code-line" style={{ color: "#e8e6df" }}>  &nbsp;available: <span style={{ color: "#7fffb2" }}>true</span>,</p>
                        <p className="code-line" style={{ color: "#e8e6df" }}>  &nbsp;coffee: <span style={{ color: "#7fffb2" }}>Infinity</span>,</p>
                        <p className="code-line" style={{ color: "#e8e6df" }}>  &nbsp;passion: <span style={{ color: "#ff9966" }}>"clean code"</span>,</p>
                        <p className="code-line" style={{ color: "#7fffb2" }}>{"}"}<span style={{ color: "#e8e6df" }}>;</span></p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
