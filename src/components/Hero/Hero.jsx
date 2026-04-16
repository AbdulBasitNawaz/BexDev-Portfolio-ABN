import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import developerImg from "../../assets/developer2.png";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ scrollTo }) {
    const [typed, setTyped] = useState("");
    const roles = ["Full Stack Developer", "Open Source Enthusiast", "API Architect", "React Specialist"];
    const roleIdx = useRef(0);
    const charIdx = useRef(0);
    const deleting = useRef(false);

    const sectionRef = useRef(null);
    const leftWrapperRef = useRef(null);
    const rightWrapperRef = useRef(null);
    const leftCardRef = useRef(null);
    const rightCardRef = useRef(null);

    useEffect(() => {
        const tick = () => {
            const word = roles[roleIdx.current];
            if (!deleting.current) {
                charIdx.current++;
                setTyped(word.slice(0, charIdx.current));
                if (charIdx.current === word.length) { deleting.current = true; return 2000; }
            } else {
                charIdx.current--;
                setTyped(word.slice(0, charIdx.current));
                if (charIdx.current === 0) {
                    deleting.current = false;
                    roleIdx.current = (roleIdx.current + 1) % roles.length;
                    return 300;
                }
            }
            return deleting.current ? 60 : 80;
        };
        let timer;
        const loop = () => { const delay = tick(); timer = setTimeout(loop, delay); };
        timer = setTimeout(loop, 100);
        return () => clearTimeout(timer);
    }, []);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 1025px)",
            isMobile: "(max-width: 1024px)",
        }, (context) => {
            const { isDesktop } = context.conditions;

            // Initial floating animation on WRAPPERS (Shared)
            gsap.to(leftWrapperRef.current, {
                y: "-=15",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(rightWrapperRef.current, {
                y: "+=15",
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.5
            });

            // Scroll animation on INNER CARDS (Responsive)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: isDesktop ? sectionRef.current : ".hero-right",
                    start: isDesktop ? "top top" : "top 45%",
                    end: isDesktop ? "bottom top" : "bottom 30%",
                    scrub: 1.5,
                }
            });

            tl.to(leftCardRef.current, {
                x: isDesktop ? 180 : 80,
                y: isDesktop ? 220 : 100,
                opacity: 0,
                scale: 0.5,
                rotation: 20,
                ease: "power1.inOut"
            }, 0);

            tl.to(rightCardRef.current, {
                x: isDesktop ? -180 : -80,
                y: isDesktop ? -220 : -100,
                opacity: 0,
                scale: 0.5,
                rotation: -20,
                ease: "power1.inOut"
            }, 0);
        }, sectionRef);

        return () => mm.revert();
    }, []);

    return (
        <section id="hero" className="hero" ref={sectionRef}>
            <div className="hero-left">
                <div className="fade-up delay-1">
                    <span className="badge">🟢 Available for new projects</span>
                </div>
                <h1 className="hero-name fade-up delay-2">
                    Abdul Basit
                </h1>
                <div className="type-row fade-up delay-3">
                    <span className="type-label">I'm a </span>
                    <span className="type-text">{typed}</span>
                    <span className="cursor" />
                </div>
                <p className="hero-desc fade-up delay-4">
                    I build fast, scalable, and beautifully crafted web applications. From pixel-perfect frontends to resilient backend systems — I ship things that work.
                </p>
                <div className="hero-actions fade-up delay-5">
                    <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
                    <button className="btn-outline" onClick={() => scrollTo("contact")}>Get In Touch →</button>
                </div>
                <div className="stat-row fade-up delay-6">
                    {[["6+", "Years Exp"], ["48", "Projects"], ["12k+", "GitHub Stars"]].map(([n, l]) => (
                        <div key={l}>
                            <div className="stat-num">{n}</div>
                            <div className="stat-label">{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-right">
                <div 
                    ref={leftWrapperRef}
                    className="float-wrapper left" 
                >
                    <div ref={leftCardRef} className="float-card">
                        <div className="float-label">Current Stack</div>
                        <div className="float-val">React · Node · TS</div>
                    </div>
                </div>

                <img src={developerImg} alt="Abdul Basit" className="hero-img" />

                <div 
                    ref={rightWrapperRef}
                    className="float-wrapper right" 
                >
                    <div ref={rightCardRef} className="float-card">
                        <div className="float-label">Open Source</div>
                        <div className="float-val">⭐ 12k+ Stars</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
