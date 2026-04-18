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
                        Hey, I'm Abdul Basit Nawaz — a full-stack developer with 2+ years turning complex problems into elegant, performant software. I care deeply about code quality, developer experience, and products that genuinely delight users.
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
                        <p className="code-line syntax-comment">// alex_carter.config.js</p>
                        <p className="code-line syntax-keyword">const developer = {"{"}</p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">name:</span> <span className="syntax-string">"Abdul Basit Nawaz"</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">role:</span> <span className="syntax-string">"Full Stack Dev"</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">location:</span> <span className="syntax-string">"San Diego, CA"</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">available:</span> <span className="syntax-literal">true</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">coffee:</span> <span className="syntax-literal">Infinity</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">passion:</span> <span className="syntax-string">"clean code"</span>,
                        </p>
                        <p className="code-line">
                            <span className="syntax-keyword">{"}"}</span><span className="syntax-key">;</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
