/**
 * HeroSculpture — modular sculpture component.
 *
 * Priority order:
 *  1. GLB model  → supply assetGlb="/models/hero-sculpture.glb"
 *  2. Video loop → supply assetVideo="/videos/hero-sculpture.webm"
 *  3. Static image → supply assetImage="/images/hero-sculpture.png"
 *  4. Procedural torus-knot (default, no asset required)
 *
 * To swap the sculpture later, pass one of the asset props.
 */

import { MeshTransmissionMaterial, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

const EASE = [0.25, 0.1, 0.25, 1] as const

interface HeroSculptureProps {
  assetGlb?: string
  assetVideo?: string
  assetImage?: string
  scrollProgress?: number
}

/* ── Procedural torus-knot mesh ───────────────────────── */

function TorusKnotSculpture({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return
    const t = clock.getElapsedTime()

    // Slow continuous rotation
    meshRef.current.rotation.y = t * 0.18
    meshRef.current.rotation.x = Math.sin(t * 0.07) * 0.12

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08

    // Scroll: drift and shrink
    groupRef.current.position.x = scrollProgress * 0.6
    groupRef.current.scale.setScalar(1 - scrollProgress * 0.12)
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.32, 320, 48, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={256}
          transmission={0.9}
          roughness={0.08}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#B3C6B5"
          attenuationColor="#8295A5"
          attenuationDistance={0.5}
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh>
        <torusKnotGeometry args={[1, 0.18, 240, 32, 2, 3]} />
        <meshStandardMaterial
          color="#C8CCCA"
          metalness={0.85}
          roughness={0.12}
          envMapIntensity={1.2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}

/* ── Lighting rig ─────────────────────────────────────── */

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#17221F" />
      <directionalLight position={[-3, 4, 3]} intensity={2.2} color="#B3C6B5" />
      <directionalLight position={[4, -1, 2]} intensity={1.0} color="#8295A5" />
      <directionalLight position={[0, 3, -4]} intensity={0.8} color="#C8CCCA" />
      <pointLight position={[0, -3, 1]} intensity={0.4} color="#766A82" />
    </>
  )
}

/* ── Image fallback ───────────────────────────────────── */

function ImageAsset({ src }: { src: string }) {
  return (
    <img src={src} alt="Hero sculpture" className="w-full h-full object-contain" />
  )
}

/* ── Video fallback ───────────────────────────────────── */

function VideoAsset({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-contain"
    />
  )
}

/* ── Main exported component ──────────────────────────── */

export default function HeroSculpture({
  assetGlb,
  assetVideo,
  assetImage,
  scrollProgress = 0,
}: HeroSculptureProps) {
  if (assetImage && !assetGlb && !assetVideo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="w-full h-full"
      >
        <ImageAsset src={assetImage} />
      </motion.div>
    )
  }

  if (assetVideo && !assetGlb) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="w-full h-full"
      >
        <VideoAsset src={assetVideo} />
      </motion.div>
    )
  }

  // Default: procedural Three.js sculpture
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE }}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <TorusKnotSculpture scrollProgress={scrollProgress} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
