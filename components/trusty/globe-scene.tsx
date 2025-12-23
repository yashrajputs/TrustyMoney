"use client"

import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Sphere, Stars } from "@react-three/drei"
import * as THREE from "three"

const connections = [
  { from: { lat: 40.7128, lon: -74.006 }, to: { lat: 51.5074, lon: -0.1278 } }, // NY to London
  { from: { lat: 51.5074, lon: -0.1278 }, to: { lat: 1.3521, lon: 103.8198 } }, // London to Singapore
  { from: { lat: 1.3521, lon: 103.8198 }, to: { lat: 35.6762, lon: 139.6503 } }, // Singapore to Tokyo
  { from: { lat: 40.7128, lon: -74.006 }, to: { lat: -23.5505, lon: -46.6333 } }, // NY to São Paulo
  { from: { lat: 25.2048, lon: 55.2708 }, to: { lat: 51.5074, lon: -0.1278 } }, // Dubai to London
]

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new THREE.Vector3(x, y, z)
}

function createArcCurve(start: THREE.Vector3, end: THREE.Vector3) {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
  mid.normalize().multiplyScalar(2.6) // Height of arc
  return new THREE.QuadraticBezierCurve3(start, mid, end)
}

function ConnectionArc({ from, to }: { from: { lat: number; lon: number }; to: { lat: number; lon: number } }) {
  const particleRef = useRef<THREE.Mesh>(null)
  const progress = useRef(Math.random())

  const startPoint = latLonToVector3(from.lat, from.lon, 2.05)
  const endPoint = latLonToVector3(to.lat, to.lon, 2.05)
  const curve = createArcCurve(startPoint, endPoint)
  const points = curve.getPoints(60)
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame(() => {
    progress.current += 0.005
    if (progress.current > 1) progress.current = 0

    if (particleRef.current) {
      const point = curve.getPoint(progress.current)
      particleRef.current.position.copy(point)
    }
  })

  return (
    <group>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.4} linewidth={2} />
      </line>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  )
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  const earthTexture = useLoader(THREE.TextureLoader, "/earth-map-texture-with-continents-countries-blue-o.jpg")

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0015
  })

  return (
    <>
      <Sphere ref={earthRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
          emissive="#0a0a0a"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.03, 64, 64]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.1} roughness={1} />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.2} side={THREE.BackSide} />
      </Sphere>

      {/* Connection arcs */}
      {connections.map((conn, i) => (
        <ConnectionArc key={i} from={conn.from} to={conn.to} />
      ))}
    </>
  )
}

export function GlobeScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Stars radius={150} depth={60} count={3000} factor={5} fade speed={1} />

        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

        <Earth />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
