import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { FadeIn } from "../Common/FadeIn";
import SectionHeader from "../Common/SectionHeader";
import "./Skills.css";

// Tech stack logo imports
import pythonLogo from "../../assets/stackpython.png";
import nextLogo from "../../assets/stacknext.png";
import javaLogo from "../../assets/stackjava.png";
import streamlitLogo from "../../assets/stackstreamlit.png";
import tailwindLogo from "../../assets/stacktailwindcss.png";
import gsapLogo from "../../assets/stackgsap.svg";
import firebaseLogo from "../../assets/stackfirebase.webp";
import supabaseLogo from "../../assets/stacksupabase.webp";
import mssqlLogo from "../../assets/stackmssqlserver.webp";
import swingLogo from "../../assets/stackjavaswing.png";
import linuxLogo from "../../assets/stacklinux.png";
import awsLogo from "../../assets/stackaws.png";
import gitLogo from "../../assets/stackgit.png";

// Tech stack config with official brand colors and actual logo assets
const TECH_STACK = [
    { name: "Python", displayName: "Python", bgColor: "#1e293b", borderColor: "#3776AB", logo: pythonLogo },
    { name: "Next.js", displayName: "Next.js", bgColor: "#000000", borderColor: "#FFFFFF", logo: nextLogo },
    { name: "Java", displayName: "Java", bgColor: "#000000", borderColor: "#5382A1", logo: javaLogo },
    { name: "Streamlit", displayName: "Streamlit", bgColor: "#0f172a", borderColor: "#FF4B4B", logo: streamlitLogo },
    { name: "Tailwind CSS", displayName: "Tailwind CSS", bgColor: "#0f172a", borderColor: "#38BDF8", logo: tailwindLogo },
    { name: "GSAP", displayName: "GSAP", bgColor: "#000000", borderColor: "#88CE02", logo: gsapLogo },
    { name: "Firebase", displayName: "Firebase", bgColor: "#1a1a24", borderColor: "#FFCA28", logo: firebaseLogo },
    { name: "Supabase", displayName: "Supabase", bgColor: "#1c1c1c", borderColor: "#3ECF8E", logo: supabaseLogo },
    { name: "Microsoft SQL Server", displayName: "MS SQL Server", bgColor: "#1f1f1f", borderColor: "#E61C24", logo: mssqlLogo },
    { name: "Java Swing", displayName: "Java Swing", bgColor: "#003e6b", borderColor: "#0073C6", logo: swingLogo },
    { name: "Linux", displayName: "Linux", bgColor: "#2a2a2a", borderColor: "#FCC624", logo: linuxLogo },
    { name: "AWS", displayName: "AWS", bgColor: "#232f3e", borderColor: "#FF9900", logo: awsLogo },
    { name: "Git", displayName: "Git", bgColor: "#1f1f1f", borderColor: "#F05032", logo: gitLogo }
];

// Individual 3D floating card component
function SkillCard3D({ tech, position, parentRotation, isMobile }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Persistent canvas and texture to avoid memory leaks and flickering
    const { canvas, ctx, texture } = useMemo(() => {
        const c = document.createElement("canvas");
        c.width = 512;
        c.height = 512;
        const context = c.getContext("2d");
        const tex = new THREE.CanvasTexture(c);
        tex.minFilter = THREE.LinearFilter;
        return { canvas: c, ctx: context, texture: tex };
    }, []);

    const loadedImgRef = useRef(null);

    // Function to draw card state onto the persistent canvas
    const drawCardState = useCallback((logoImg, isHovered) => {
        ctx.clearRect(0, 0, 512, 512);

        // Rounded card background
        const cardBg = tech.bgColor || "#1e293b";
        ctx.fillStyle = cardBg;
        const r = 40;
        const w = 512;
        const h = 512;
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.quadraticCurveTo(w, 0, w, r);
        ctx.lineTo(w, h - r);
        ctx.quadraticCurveTo(w, h, w - r, h);
        ctx.lineTo(r, h);
        ctx.quadraticCurveTo(0, h, 0, h - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.fill();

        // Border glow (only on hover)
        if (isHovered) {
            ctx.lineWidth = 14;
            ctx.strokeStyle = tech.borderColor || "rgba(255, 255, 255, 0.15)";
            ctx.stroke();
        }

        // Draw Image Logo (fit inside area centered)
        if (logoImg) {
            const targetSize = tech.name === "Java Swing" ? 270 : 210;
            let drawW = logoImg.width;
            let drawH = logoImg.height;

            // Maintain aspect ratio
            if (drawW > drawH) {
                drawH = (drawH / drawW) * targetSize;
                drawW = targetSize;
            } else {
                drawW = (drawW / drawH) * targetSize;
                drawH = targetSize;
            }

            // Offset vertically on hover to make room for text. Center perfectly if not hovered.
            const centerY = isHovered ? (h - 40 - drawH) / 2 : (h - drawH) / 2;
            ctx.drawImage(logoImg, (w - drawW) / 2, centerY, drawW, drawH);
        }

        // Draw Title text (only on hover)
        if (isHovered) {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = 'bold 36px "Nanum Gothic", sans-serif';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(tech.displayName || tech.name, w / 2, h - 85);
        }

        texture.needsUpdate = true;
    }, [tech, ctx, texture]);

    // Redraw whenever hover state changes, reusing the loaded image
    useEffect(() => {
        if (loadedImgRef.current) {
            // Instantly redraw using the cached image (no flicker)
            drawCardState(loadedImgRef.current, hovered);
        } else {
            // Draw background without image
            drawCardState(null, hovered);

            // Load image once
            const img = new Image();
            img.onload = () => {
                loadedImgRef.current = img;
                // Use a functional update to ensure we draw with the latest hovered state
                setHovered((currentHovered) => {
                    drawCardState(img, currentHovered);
                    return currentHovered;
                });
            };
            img.src = tech.logo;
        }
    }, [tech, hovered, drawCardState]);

    // Bobbing/floating effect offsets
    const seed = useRef(Math.random() * 100);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Idle float when not hovered
        if (!hovered) {
            meshRef.current.position.y = position[1] + Math.sin(time + seed.current) * 0.1;
            meshRef.current.position.x = position[0] + Math.cos(time * 0.5 + seed.current) * 0.05;
            meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
            meshRef.current.rotation.y = Math.cos(time * 0.5) * 0.05;
            meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
        }
    });

    // Hover animation trigger
    useEffect(() => {
        if (!meshRef.current) return;

        const isEdgeCard = tech.name === "Tailwind CSS" || tech.name === "Git" || tech.name === "Streamlit" || tech.name === "AWS";

        // Kill any running animations on this mesh to prevent jumps/glitches
        gsap.killTweensOf(meshRef.current.rotation);
        gsap.killTweensOf(meshRef.current.position);
        gsap.killTweensOf(meshRef.current.scale);

        if (hovered) {
            // Cancel out parent rotation and stand facing camera flat
            gsap.to(meshRef.current.rotation, {
                x: -parentRotation[0],
                y: -parentRotation[1],
                z: -parentRotation[2],
                duration: 0.6,
                ease: "power3.out"
            });
            // Float closer to the viewer
            gsap.to(meshRef.current.position, {
                x: position[0],
                y: position[1],
                z: isMobile ? 1.0 : (isEdgeCard ? 0.8 : 1.5),
                duration: 0.6,
                ease: "power3.out"
            });
            // Scale up card
            gsap.to(meshRef.current.scale, {
                x: isMobile ? 1.0 : (isEdgeCard ? 1.06 : 1.15),
                y: isMobile ? 1.0 : (isEdgeCard ? 1.06 : 1.15),
                z: isMobile ? 1.0 : (isEdgeCard ? 1.06 : 1.15),
                duration: 0.6,
                ease: "power3.out"
            });
        } else {
            // Return back to default grid structure
            gsap.to(meshRef.current.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.to(meshRef.current.position, {
                x: position[0],
                y: position[1],
                z: position[2],
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.to(meshRef.current.scale, {
                x: 1.0,
                y: 1.0,
                z: 1.0,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
    }, [hovered, position, parentRotation, isMobile, tech.name]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={() => setHovered(false)}
            onClick={(e) => {
                e.stopPropagation();
                setHovered(!hovered);
            }}
        >
            <planeGeometry args={[isMobile ? 1.15 : 1.725, isMobile ? 1.46 : 2.185]} />
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
        </mesh>
    );
}

// Parent 3D scene grid wrapper
function SkillsScene() {
    // 3D group container rotation represents the isometric view angle
    const parentRotation = [0.25, -0.35, 0];
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Calculate grid positions for the 13 cards dynamically
    // Desktop: 5 columns. Mobile: 3 columns.
    const gridPositions = useMemo(() => {
        const colWidth = isMobile ? 1.45 : 2.5;
        const rowHeight = isMobile ? 1.8 : 2.9;

        if (isMobile) {
            // Mobile: 3 per row (3, 3, 3, 3, 1)
            const cols = 3;
            return TECH_STACK.map((_, index) => {
                const col = index % cols;
                const row = Math.floor(index / cols);
                const totalRows = Math.ceil(TECH_STACK.length / cols);

                const isLastRow = row === totalRows - 1;
                const itemsInThisRow = isLastRow ? (TECH_STACK.length % cols || cols) : cols;

                const x = itemsInThisRow === 1 ? 0 : col * colWidth - ((itemsInThisRow - 1) * colWidth) / 2;
                const y = -row * rowHeight + ((totalRows - 1) * rowHeight) / 2;
                return [x, y, 0];
            });
        } else {
            // Desktop: Row 0: 5 cards, Row 1: 5 cards, Row 2: 3 cards
            return TECH_STACK.map((_, index) => {
                let row, col, itemsInRow;
                if (index < 5) {
                    row = 0;
                    col = index;
                    itemsInRow = 5;
                } else if (index < 10) {
                    row = 1;
                    col = index - 5;
                    itemsInRow = 5;
                } else {
                    row = 2;
                    col = index - 10;
                    itemsInRow = 3;
                }
                const x = col * colWidth - ((itemsInRow - 1) * colWidth) / 2;
                // Center Y: row 0 (Y = rowHeight), row 1 (Y = 0), row 2 (Y = -rowHeight)
                const y = -row * rowHeight + rowHeight;
                return [x, y, 0];
            });
        }
    }, [isMobile]);

    return (
        <group rotation={parentRotation} position={[0, -0.25, 0]}>
            {TECH_STACK.map((tech, i) => (
                <SkillCard3D
                    key={tech.name}
                    tech={tech}
                    position={gridPositions[i]}
                    parentRotation={parentRotation}
                    isMobile={isMobile}
                />
            ))}
        </group>
    );
}

export function Skills() {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section id="skills" className="skills-section" ref={sectionRef} style={{ position: "relative" }}>
            <FadeIn>
                <SectionHeader tag="tech_stack" title="Tools & Technologies" />
            </FadeIn>
            
            <FadeIn delay={0.25}>
                <div className="skills-canvas-container">
                    <Canvas 
                        camera={{ position: [0, 0, isMobile ? 10.5 : 8.5], fov: 60 }}
                    >
                        <ambientLight intensity={1.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.2} />
                        <SkillsScene />
                    </Canvas>
                </div>
            </FadeIn>
        </section>
    );
}
