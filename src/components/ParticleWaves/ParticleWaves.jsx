import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef();
  
  // Create a grid of particles - Reduced density for better readability
  const width = 60;
  const depth = 60;
  const count = width * depth;
  const spacing = 0.8;

  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let i = 0;
    for (let ix = 0; ix < width; ix++) {
      for (let iz = 0; iz < depth; iz++) {
        const x = (ix - width / 2) * spacing;
        const z = (iz - depth / 2) * spacing;
        const y = 0;

        pos[i] = x;
        pos[i + 1] = y;
        pos[i + 2] = z;

        i += 3;
      }
    }
    return { positions: pos };
  }, [count, width, depth]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    // Create wave effect based on time (no mouse interaction)
    let i = 0;
    for (let ix = 0; ix < width; ix++) {
      for (let iz = 0; iz < depth; iz++) {
        // Base sine wave - slowed down for a calmer effect
        const y = Math.sin((ix + time * 3) * 0.3) * 0.5 + Math.sin((iz + time * 2) * 0.5) * 0.5;
        
        positionsArray[i + 1] = y;
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate even slower
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06}
        color="#7fffb2"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function ParticleWaves() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
