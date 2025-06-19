"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

function ReactLogo() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main React atom */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.2} />
      </mesh>

      {/* Electron orbits */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.1} />
      </mesh>

      <mesh rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.1} />
      </mesh>

      {/* Center nucleus */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export function ReactLogo3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ReactLogo />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="studio" />
    </Canvas>
  )
}
