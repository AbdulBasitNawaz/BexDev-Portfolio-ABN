import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FadeIn } from "../Common/FadeIn";
import { SKILLS } from "../../constants";
import SectionHeader from "../Common/SectionHeader";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".skill-card-anim");
            
            // Cards Animation Trigger (Scrubs as the section scrolls into position)
            gsap.fromTo(cards, 
                {
                    x: "100vw",
                    opacity: 0
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        end: "top 20%",
                        scrub: 0.5, // Reduced from 1 for snappier response
                    },
                    x: 0,
                    opacity: 1,
                    stagger: 0.1, // Reduced stagger for smoother group entry
                    ease: "none", // 'none' is often smoother for scrub animations
                    force3D: true,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills-section" ref={sectionRef} style={{ position: 'relative' }}>
            <FadeIn>
                <SectionHeader tag="tech_stack" title="Tools & Technologies" />
            </FadeIn>
            <div className="skills-grid">
                {SKILLS.map((s, i) => (
                    <div key={s.cat} className="skill-card-anim">
                        <div className="skill-card">
                            <div className="skill-cat">{s.cat}</div>
                            {s.items.map(item => (
                                <div key={item} className="skill-item">
                                    <span className="skill-dot" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
