import React, { useState, useRef, useEffect } from "react";
import { FadeIn } from "../Common/FadeIn";
import { LIVE_PROJECTS, FUTURE_PROJECTS, AZURIO_PROJECTS } from "../../constants";
import SectionHeader from "../Common/SectionHeader";
import { gsap } from "gsap";
import "./Projects.css";

// Import project images
import projectGym from "../../assets/ProjectGym1.jpeg";
import projectLeedOrg from "../../assets/ProjectLeedOrg1.png";
import projectTypido from "../../assets/ProjectTypido.jpeg";
import projectCalculator from "../../assets/ProjectCalculator.jpeg";
import projectReqoAssistant from "../../assets/ProjectReqoAssistant1.png";
import projectPong from "../../assets/ProjectPong.png";

const imageMap = {
    "ProjectGym1.jpeg": projectGym,
    "ProjectLeedOrg1.png": projectLeedOrg,
    "ProjectTypido.jpeg": projectTypido,
    "ProjectCalculator.jpeg": projectCalculator,
    "ProjectReqoAssistant1.png": projectReqoAssistant,
    "ProjectPong.png": projectPong,
};

const SHOW_PROJECTS = false; // Set to true to restore the original projects carousel

export function Projects() {
    const [activeTab, setActiveTab] = useState("deployed");
    const [showAll, setShowAll] = useState(false);
    const trackRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const projectsToDisplay = activeTab === "deployed" ? LIVE_PROJECTS : FUTURE_PROJECTS;

    const scroll = (direction) => {
        if (!trackRef.current) return;
        
        const scrollAmount = trackRef.current.offsetWidth * 0.8;
        const targetScroll = trackRef.current.scrollLeft + (direction === "next" ? scrollAmount : -scrollAmount);
        
        gsap.to(trackRef.current, {
            scrollLeft: targetScroll,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: checkScroll
        });
    };

    const checkScroll = () => {
        if (!trackRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    useEffect(() => {
        if (!SHOW_PROJECTS) return;
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        
        // Reset scroll on tab change
        if (trackRef.current) {
            trackRef.current.scrollLeft = 0;
            checkScroll();
        }
        
        return () => window.removeEventListener("resize", handleResize);
    }, [activeTab]);

    return (
        <section id="projects" className="projects-section">
            <FadeIn>
                <div className="projects-header">
                    <div className="header-left">
                        <SectionHeader tag="portfolio_archives" title="Selected Projects" />
                    </div>
                    
                    {SHOW_PROJECTS && (
                        <div className="header-right">
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

                            <div className="carousel-controls">
                                <button 
                                    className={`control-btn prev ${!canScrollLeft ? "disabled" : ""}`}
                                    onClick={() => scroll("prev")}
                                    disabled={!canScrollLeft}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button 
                                    className={`control-btn next ${!canScrollRight ? "disabled" : ""}`}
                                    onClick={() => scroll("next")}
                                    disabled={!canScrollRight}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </FadeIn>

            {SHOW_PROJECTS ? (
                <div 
                    className="carousel-container" 
                    ref={trackRef}
                    onScroll={checkScroll}
                >
                    <div className="carousel-track">
                        {projectsToDisplay.map((p, i) => (
                            <div className="carousel-item" key={p.title + activeTab}>
                                <FadeIn delay={i * 0.1} disabled={isMobile}>
                                    <div className="project-card-new">
                                        <div className="card-image-container">
                                            {p.image ? (
                                                <img src={imageMap[p.image]} alt={p.title} className="card-img" />
                                            ) : (
                                                <div className="card-img-placeholder">
                                                    <span>COMING SOON</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="card-content">
                                            <span className="cat-tag-new">{p.category}</span>
                                            <h3 className="card-title-new">{p.title}</h3>
                                            
                                            <div className="card-action-btn">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="azurio-projects-wrapper">
                    <div className="azurio-projects-list">
                        {AZURIO_PROJECTS.slice(0, showAll ? undefined : 4).map((p, i) => (
                            <FadeIn delay={0.2} key={p.title}>
                                <div className="azurio-project-block">
                                    <div className="azurio-project-image">
                                        {imageMap[p.image] ? (
                                            <img src={imageMap[p.image]} alt={p.title} />
                                        ) : (
                                            <div className="card-img-placeholder" style={{ width: '100%', height: '100%' }}>
                                                <span>COMING SOON</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="azurio-project-info">
                                        <h2 className="azurio-project-title">{p.title}</h2>
                                        <div className="azurio-project-tags">
                                            {p.tags.map(tag => (
                                                <span key={tag} className="azurio-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    {AZURIO_PROJECTS.length > 4 && (
                        <div className="show-more-container">
                            <button 
                                className="show-more-btn"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "SHOW LESS" : "SHOW MORE PROJECTS"}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
