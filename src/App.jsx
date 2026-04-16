import React, { useState } from 'react'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Skills } from './components/Skills/Skills'
import { Projects } from './components/Projects/Projects'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { CustomCursor } from './components/Common/CustomCursor'
import ParticleWaves from './components/ParticleWaves/ParticleWaves'
import { Preloader } from './components/Common/Preloader'
import { ScrollToTop } from './components/Common/ScrollToTop'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState("About");

    const scrollTo = (id) => {
        if (id.toLowerCase() === 'skills') {
            const st = ScrollTrigger.getById("skills-trigger");
            if (st) {
                gsap.to(window, { 
                    duration: 1.5, 
                    scrollTo: st.start + 1450, 
                    ease: "power2.inOut" 
                });
                return;
            }
        }
        
        const target = document.getElementById(id.toLowerCase());
        if (target) {
            const isMobile = window.innerWidth <= 1024;
            gsap.to(window, { 
                duration: 1.2, 
                scrollTo: { y: target, offsetY: isMobile ? 80 : 20 }, 
                ease: "power2.inOut" 
            });
        }
    };

    return (
        <div className="root-layout">
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <ParticleWaves />
            <CustomCursor />
            <ScrollToTop />
            <Header active={active} setActive={setActive} scrollTo={scrollTo} />
            <Hero scrollTo={scrollTo} />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
