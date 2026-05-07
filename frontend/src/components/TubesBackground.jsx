import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Tube({ curve, color, speed, radius }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.1
      meshRef.current.rotation.y += speed * 0.002
    }
  })

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, radius, 8, false)
  }, [curve, radius])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.35}
        roughness={0.3}
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function GlowSphere({ position, color, scale }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.4} />
    </mesh>
  )
}

function Scene() {
  const tubes = useMemo(() => {
    const configs = []
    const colors = ['#ff6b00', '#ff8c33', '#ff4500', '#e65100', '#ff9800', '#ff5722']
    for (let i = 0; i < 12; i++) {
      const points = []
      const angle = (i / 12) * Math.PI * 2
      for (let j = 0; j < 5; j++) {
        points.push(new THREE.Vector3(
          Math.cos(angle + j * 0.5) * (3 + Math.random() * 4),
          (Math.random() - 0.5) * 8,
          Math.sin(angle + j * 0.5) * (3 + Math.random() * 4) - 5
        ))
      }
      configs.push({
        curve: new THREE.CatmullRomCurve3(points),
        color: colors[i % colors.length],
        speed: 0.15 + Math.random() * 0.3,
        radius: 0.03 + Math.random() * 0.06,
      })
    }
    return configs
  }, [])

  const spheres = useMemo(() => [
    { position: [-3, 2, -4], color: '#ff6b00', scale: 0.15 },
    { position: [4, -1, -6], color: '#ff8c33', scale: 0.1 },
    { position: [1, 3, -8], color: '#ff4500', scale: 0.12 },
    { position: [-2, -2, -3], color: '#e65100', scale: 0.08 },
  ], [])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1.5} color="#ff6b00" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#ff8c33" />
      <pointLight position={[5, 2, -5]} intensity={0.6} color="#ffffff" />
      <fog attach="fog" args={['#0a0a0a', 5, 25]} />

      {tubes.map((t, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <Tube {...t} />
        </Float>
      ))}

      {spheres.map((s, i) => (
        <GlowSphere key={`s${i}`} {...s} />
      ))}
    </>
  )
}

export default function TubesBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
