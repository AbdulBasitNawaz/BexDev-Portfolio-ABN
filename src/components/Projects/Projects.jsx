import React from "react";
import { FadeIn } from "../Common/FadeIn";
import { PROJECTS } from "../../constants";
import "./Projects.css";

export function Projects() {
    return (
        <section id="projects" className="projects-section">
            <FadeIn>
                <div className="projects-tag">// featured_work</div>
                <h2 className="projects-title">Projects I'm proud of</h2>
            </FadeIn>
            <div className="projects-grid">
                {PROJECTS.map((p, i) => (
                    <FadeIn key={p.title} delay={i * 0.1}>
                        <div className="proj-card project-card" style={{ background: p.color }}>
                            <div className="project-body">
                                <div className="project-icon">{p.icon}</div>
                                <div className="project-title">{p.title}</div>
                                <p className="project-desc">{p.desc}</p>
                                <div className="tag-row">
                                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                                </div>
                                <div className="gh-link">
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
