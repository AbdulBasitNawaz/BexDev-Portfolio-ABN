import React, { useState, useEffect, useRef } from "react";
import developerImg from "../../assets/developer.png";
import "./Hero.css";

export function Hero({ scrollTo }) {
    const [typed, setTyped] = useState("");
    const roles = ["Full Stack Developer", "Open Source Enthusiast", "API Architect", "React Specialist"];
    const roleIdx = useRef(0);
    const charIdx = useRef(0);
    const deleting = useRef(false);

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

    return (
        <section id="hero" className="hero">
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
                <div className="float-card left" style={{ animation: "float 4s ease-in-out infinite" }}>
                    <div className="float-label">Current Stack</div>
                    <div className="float-val">React · Node · TS</div>
                </div>

                <img src={developerImg} alt="Abdul Basit" className="hero-img" />

                <div className="float-card right" style={{ animation: "float 4s ease-in-out 1.5s infinite" }}>
                    <div className="float-label">Open Source</div>
                    <div className="float-val">⭐ 12k+ Stars</div>
                </div>
            </div>
        </section>
    );
}
