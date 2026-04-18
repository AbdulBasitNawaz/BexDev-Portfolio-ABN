import React, { useState } from "react";
import { FadeIn } from "../Common/FadeIn";
import { LIVE_PROJECTS, FUTURE_PROJECTS } from "../../constants";
import "./Projects.css";

// Import project images
import proj1 from "../../assets/project1.avif";
import proj2 from "../../assets/project2.png";
import proj3 from "../../assets/project3.webp";
import proj4 from "../../assets/project4.png";

const imageMap = {
    "project1.avif": proj1,
    "project2.png": proj2,
    "project3.webp": proj3,
    "project4.png": proj4,
};

export function Projects() {
    const [activeTab, setActiveTab] = useState("deployed");

    const projectsToDisplay = activeTab === "deployed" ? LIVE_PROJECTS : FUTURE_PROJECTS;

    return (
        <section id="projects" className="projects-section">
            <FadeIn>
                <div className="projects-header">
                    <div className="header-left">
                        <div className="projects-tag">// portfolio_archives</div>
                        <h2 className="projects-title">Selected Projects</h2>
                    </div>
                    
                    <div className="tab-switcher">
                        <button 
                            className={`tab-btn ${activeTab === "deployed" ? "active" : ""}`}
                            onClick={() => setActiveTab("deployed")}
                        >
                            Deployed
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === "future" ? "active" : ""}`}
                            onClick={() => setActiveTab("future")}
                        >
                            Coming Soon
                        </button>
                    </div>
                </div>
            </FadeIn>

            <div className="projects-grid">
                {projectsToDisplay.map((p, i) => (
                    <FadeIn key={p.title + activeTab} delay={i * 0.1}>
                        <div className="project-card-new">
                            <div className="card-image-container">
                                {p.image ? (
                                    <img src={imageMap[p.image]} alt={p.title} className="card-img" />
                                ) : (
                                    <div className="card-img-placeholder">
                                        <span>COMING SOON</span>
                                    </div>
                                )}
                                <div className={`status-badge ${p.status.toLowerCase()}`}>
                                    <span className="dot"></span>
                                    {p.status}
                                </div>
                            </div>
                            
                            <div className="card-content">
                                <div className="card-top-row">
                                    <h3 className="card-title">{p.title}</h3>
                                </div>
                                
                                <p className="card-date">{p.date}</p>
                                
                                <p className="card-desc">{p.desc}</p>
                                
                                <div className="card-bottom-tags">
                                    <span className="cat-tag">{p.category}</span>
                                    {p.tags.slice(0, 2).map(t => (
                                        <span key={t} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
