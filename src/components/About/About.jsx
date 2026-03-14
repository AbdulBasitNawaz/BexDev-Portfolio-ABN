import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FadeIn } from "../Common/FadeIn";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const lines = gsap.utils.toArray(".code-line");
            
            gsap.set(lines, {
                clipPath: "inset(0 100% 0 0)"
            });

            gsap.to(lines, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 45%",
                    end: "bottom 55%",
                    scrub: 0.5,
                },
                clipPath: "inset(0 0% 0 0)",
                stagger: 0.2,
                ease: "none",
                force3D: true
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-section" ref={sectionRef}>
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
                <div className="code-block-anim">
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
                </div>
            </div>
        </section>
    );
}
