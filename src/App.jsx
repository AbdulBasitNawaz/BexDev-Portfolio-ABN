import React, { useState } from 'react'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Skills } from './components/Skills/Skills'
import { Projects } from './components/Projects/Projects'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { CustomCursor } from './components/Common/CustomCursor'
import './App.css'

function App() {
    const [active, setActive] = useState("About");

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="root-layout">
            <CustomCursor />
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
