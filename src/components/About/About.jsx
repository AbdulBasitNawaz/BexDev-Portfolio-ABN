import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FadeIn } from "../Common/FadeIn";
import SectionHeader from "../Common/SectionHeader";
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
                <SectionHeader tag="about_me" title="The developer behind the code" />
            </FadeIn>
            <div className="about-grid">
                <FadeIn delay={0.1}>
                    <p className="about-text">
                        Hey, I’m Abdul Basit Nawaz — a software engineer building high-performance web applications and automated digital systems. I focus on creating fast, reliable tech architectures that streamline operations and help businesses scale.
                    </p>
                    <p className="about-text">
                        My expertise spans full-stack engineering, secure network architecture, and bulletproof DevOps automation. Whether it is deploying cloud infrastructure on Linux or designing smart AI workflows, I build systems for maximum uptime.
                    </p>
                    <p className="about-text">
                        When I’m not configuring scalable servers or coding interfaces, I am deep-diving into modern software systems engineering or building automation scripts to eliminate repetitive tasks.
                    </p>
                </FadeIn>
                <div className="code-block-anim">
                    <div className="code-block">
                        <p className="code-line syntax-comment">// abdul_basit.config.js</p>
                        <p className="code-line syntax-keyword">const developer = {"{"}</p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">name:</span> <span className="syntax-string">"Abdul Basit Nawaz"</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">role:</span> <span className="syntax-string">"DevOps & Full Stack"</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">uptime:</span> <span className="syntax-string">"99.9%"</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">available:</span> <span className="syntax-literal">true</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">coffee_with_cereals:</span> <span className="syntax-literal">Infinity</span>,
                        </p>
                        <p className="code-line">
                            &nbsp;<span className="syntax-key">passion:</span> <span className="syntax-string">"Build your software & scale it up"</span>,
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
