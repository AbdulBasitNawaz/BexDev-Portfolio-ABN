import React from "react";
import { FadeIn } from "../Common/FadeIn";
import { SKILLS } from "../../constants";
import "./Skills.css";

export function Skills() {
    return (
        <section id="skills" className="skills-section">
            <FadeIn>
                <div className="skills-tag">// tech_stack</div>
                <h2 className="skills-title">Tools & Technologies</h2>
            </FadeIn>
            <div className="skills-grid">
                {SKILLS.map((s, i) => (
                    <FadeIn key={s.cat} delay={i * 0.1}>
                        <div className="skill-card">
                            <div className="skill-cat">{s.cat}</div>
                            {s.items.map(item => (
                                <div key={item} className="skill-item">
                                    <span className="skill-dot" />
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
