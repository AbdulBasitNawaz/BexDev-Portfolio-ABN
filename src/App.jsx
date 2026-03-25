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
import './App.css'

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState("About");

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
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
